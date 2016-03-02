
.. _topos-perl-client:

**********
Perl ToPoS
**********

This page contains information about ``PerlToPoS``, a perl client for ToPoS:


.. contents::
    :depth: 4


.. comment: The 'highlight' statement will set the default language for all code blocks after a '::'.
.. highlight:: perl


.. _perl-client-intro:

============
Introduction
============

PerlToPoS is a ToPoS client library written in Perl. The library has no dependencies other than those found on all Grid nodes, so including the two modules 'ToposPool.pm' and 'ToposToken.pm' is enough to run pilot jobs using PerlToPoS.

As an introduction, the following example shows a simple, but functional PerlToPoS client::
	
	use ToposPool;
	use ToposToken;
	
	# open an existing pool, assumed to be filled with tokens
	my $pool = ToposPool -> new ("my_pool");
	
	while (my $token = $pool -> next_token) {
	
	    # process the token, which can contain text or a file,
	    # store the results
	    ...
	
    	# when processed, remove the token
	    $token -> delete;
	}
	
	# no more tokens

While the example seems simple and uses no advanced feature like locking tokens, it shows most of what is needed to use ToPoS in Perl scripts. Moreover, it shows that all HTTP commands have been hidden in the objects and methods.


.. _obtain-perltopos:

===================
Obtaining PerlToPoS
===================

The PerlToPoS client libraries can be downloaded from `GitHub PerlTopos`_.


.. _perltopos-structure:

=====================
Writing ToPoS Clients
=====================

General script structure for shared tokens
==========================================

For scripts which use shared tokens, no locking mechanism is used, making the script easy. In this case, the structure of pilot jobs will be:

    1. include the library modules
    2. open an existing pool, either from:
        * a known pool name, or
        * a pool name stored in a file
    3. while there are more tokens:
        1. get the next token
        2. process the token contents
        3. store the results
        4. if the token was successfully processed and the results stored:
            * delete the token

General script structure for exclusive tokens
=============================================

If tokens are to be exclusive, tokens must be locked and optionally renewed while the computation is still running. A possible structure is then:

    1. include the library modules
    2. open an existing pool, either from:
        * a known pool name, or
        * a pool name stored in a file
    3. while there are more tokens:
        1. get the next token, locking it
        2. while not finished:
        
           1. process the token contents
           2. renew the lock
           
        3. store the results
        4. if the token was successfully processed and the results stored:
            * delete the token

Opening an existing pool
========================

To open an existing pool with a known name (or simple name), use the 'new' method::

    my $pool = ToposPool -> new('name');

This method returns a pool object which has various methods for manipulating the ToPoS pool.

If the pool name was saved in a file (see saving the pool name to a file), the 'load' function can be used to read the pool name from a file and open the existing pool with that name. This is again convenient if after populating a new pool with tokens, the pool name was saved to a file. The command is::

    my $pool = ToposPool -> load('my_pool_file.txt');

If no pool file is specified, the file is assumed to be 'pool_id.txt', which is also the default for saving pools, see populating pools.

Getting the next token
======================

After opening an existing pool, tokens objects can be retrieved from that pool with the 'next_token' method::

    my $token_object = $pool -> next_token;  # no lock

If no arguments are specified, the token is not locked. If an optional argument is specified, it the token is locked for the specified duration in seconds::

    my $locked_token = $pool -> next_token(60); # lock for 60 seconds

The 'next_token' method returns a ToposToken object (not text!), which can be further inspected using the methods below.

If there are no more tokens, or if all remaining tokens are locked, 'next_token' returns 'undef', so it can be used in a 'while' construct as shown in the introduction.


Getting the token contents
==========================

Tokens can contain plain text or a file, depending on what was stored in the token when it was created. To find out what the token contains, use the 'is_file' method::
	
    if ($token_object -> is_file) {
        # token is a file
        ...
    }
    else {
        # token is plain text
        ...
    }


Getting the content of a plain text token object
------------------------------------------------

If a token object contains plain text, the text can be retrieved using the 'content' method::

    my $token_content = $token_object -> content;


Getting the file contained in a file token object
-------------------------------------------------

If a token object contains a file, there are two convenient methods:

* 'filename' which returns the name of the file when it was uploaded, but without any path information;
* 'save', which will save the file in the current directory (as a safety feature), with the original file name or with the specified file name.

Both methods can be used as follows::

    if ($token_object -> is_file) {
        $token_object -> save;
        process_file ($token_object -> filename);
    }

where 'process_file' is assumed to be some routine responsible for the actual processing, taking a file name as an argument.

The 'save' method has an optional argument which stores the file under the given name::

    # does not use the original name
    $token_object -> save('my_file.dat');


Renewing token locks
====================

Locks on tokens can be renewed using the 'renew_lock' method, which has an optional timeout. If no timeout is specified, the timeout of the previous lock is reused::

    $token_object -> renew_lock;       # same timeout as previous lock
    $token_object -> renew_lock(600);  # 600 second / 10 minute lock renewal


Deleting tokens
===============

After successful processing and storing the results, the token must be deleted from the token pool - otherwise tokens will be recycled and your pilot job will never finish!

Deleting a token is done using the 'delete' method on a token::

    $token_object -> delete;


=======================
Manipulating ToPoS pool
=======================

In client scripts, pool objects are only used to get next tokens. In preparation scripts, the methods of a pool object can be used in scripts to manipulate the pool itself, for example to populate the pool with tokens.


Creating a new pool with a random name
======================================

A new pool with a random name is created using the 'new' method without any arguments::

    my $pool = ToposPool -> new();


Saving the pool name to a file
==============================

To avoid having to copy-and-paste a random pool name, the pool name can be saved to a file using the 'save' method. The method takes one optional argument, the file name. If no file name is specified, the pool name is saved in a file called 'pool_id.txt'::

    $pool -> save("my_pool_id.txt");
    $pool -> save;  # saves the pool name in 'pool_id.txt'

The pool can be opened again using the 'load' method, again with an optional file name::

    my $pool = ToposPool -> load("my_pool_id.txt");
    my $pool = ToposPool -> load;  # loads the pool from 'pool_id.txt'

The file containing the pool name can be used in the InputSandbox in Grid jobs, making it easy to reopen the ToPoS pool from a pilot job.


Populating a pool with tokens
=============================

There are three (currently supported) ways of populating a pool with tokens:

    1. creating text tokens individually
    2. creating multiple text tokens from a file
    3. creating file tokens


Creating text tokens individually
---------------------------------

To create a token containing text, use the 'create_token' method::

    # create text one token
    $pool -> create_token('abc def');


Creating multiple tokens from a file
------------------------------------

Multiple tokens can be created from a file if each line in the file contains exactly one token, using the 'create_tokens_from_file' method::

    # create multiple tokens; assume that the file 'input_file_names.txt'
    # contains a list of input file names which must be processed
    $pool -> create_tokens_from_file('input_file_names.txt');


Creating a file token
---------------------

To create a file token, use the 'upload_file_as_token' method::

    # upload 'input_1.dat', which will become a token
    $pool -> upload_file_as_token('input_1.dat');


Deleting a pool
===============

A token pool can be deleted, effectively removing all tokens in the pool, using the 'delete' method on a pool::

    # remove all tokens in the pool
    $pool -> delete;


Getting the pool name
=====================

If you need to know the name of the pool, use the 'name' method::

    my $pool_name = $pool -> name;


================
Complete example
================

As a complete example, the following scripts will first populate a new pool with numbers; the pilot job will then compute the square of the numbers as a processing stage and store the results in a second pool.

Creating a script to populate a new pool with tokens
====================================================

The first script populates a new pool with tokens, each of which contains a number. With the two PerlToPoS modules 'ToposPool.pm' and 'ToposToken' in a fresh directory, create the script::
	
    #!/usr/bin/perl
	
    use ToposPool;
    use ToposToken;
    use strict;
    use warnings;
    
    my $pool = ToposPool -> new ("example_input_pool");
     
    # fill the pool with numbers from 1 through 100
    for my $i (1..100) {
        $pool -> create_token ($i);
    }
     
    # done

Run the script - it should run in a few seconds.

After running the script you can verify that the pool was indeed filled with tokens by browsing

 http://topos.grid.sara.nl/4.1/pools/example_input_pool


Creating a pilot job
====================

We used a pool named "input_pool" for storing the data which must be processed. For simplicity, let's call the pool with results "output_pool". The script for the pilot job is::

    #!/usr/bin/perl
    
    use ToposPool;
    use ToposToken;
    use strict;
    use warnings;
     
    my $input_pool  = ToposPool -> new ("example_input_pool");
    my $output_pool = ToposPool -> new ("example_output_pool");
    
    # process input tokens until there are no more tokens
     
    # lock the token for 3 seconds
    while ( my $token = $input_pool -> next_token(3) ) {
    
        # get the text contained in the token
        my $n = $token -> content;
     
        # 'process' the input data
        my $n_squared = $n * $n;
     
        # store the results
        my $result = sprintf("The square of %d is %d", $n, $n_squared);
    
        $output_pool -> create_token ($result);
    
        # delete the token
        $token -> delete;
    }
    
    # done

Save the script as 'example_pilotjob.pl'.

Note that the timeout for a task is set to 3 seconds. It is expected that each task, so processing and storing data, should take no longer than 1 second; the largest delay is in the network traffic to and from ToPoS, and even 1 second is pessimistic. If however some task fails in the processing (in this case very unlikely, but not unlikely in real-world cases) or in the storing phase (real possibility, due to network hiccups), the token is unlocked and available to other pilot jobs.


Creating a job submission file
===============================

The job submission file is a regular :ref:`Job Description Language <jdl>` file with the following properties:

* the job type must be ``Parametric``
* the number of parameters is the number of machines that should be used per job submit
* the executable must be ``/usr/bin/perl``
* the first argument must be the name of the script; so in the example above, the argument is ``example_pilotjob.pl``
* the input sandbox must at least contain the two PerlToPoS perl modules and the name of the pilot job script

We create a job submission file which will start the processing on 5 nodes. Replace <your VO name> with the name of your Virtual Organisation.

.. code-block:: cfg

    # example JDL file for the square computation
    Type                         = "Job";
    JobType                      = "Parametric";
    VirtualOrganisation          = "<your VO name>";
    DefaultNodeShallowRetryCount = 5;
 
    # Parametrization.
    Parameters                   = 5;
    ParameterStart               = 1;
    ParameterStep                = 1;
    
    # Specify the input data ...
    InputSandbox                 = {"ToposToken.pm",
                                     "ToposPool.pm",
                                     "example_pilotjob.pl" };
 
    # Executable and arguments
    Executable                   = "/usr/bin/perl";
    Arguments                    = "example_pilotjob.pl";
     
    # Specify output data ...
    StdOutput                    = "stdout_PARAM_.log";
    StdError                     = "stderr_PARAM_.log";
    
    OutputSandbox                = {"stdout_PARAM_.log",
                                 "stderr_PARAM_.log" };

You can submit the job to start the processing. The results are stored back in ToPoS, in

    http://topos.grid.sara.nl/4.1/pools/example_output_pool/tokens

Each token contains a result, which you can verify by browsing the tokens.

Note that each pilot job will process the available work. This means that you can submit the job multiple times, each time requesting 5 cores. If more cores are available, this speeds up the processing. When all work is done, the jobs simply quit. This is useful for tasks with longer processing. 



.. Links:

.. _`GitHub PerlTopos`: https://github.com/sara-nl/PerlTopos
