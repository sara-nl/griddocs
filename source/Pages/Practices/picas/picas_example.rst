.. _picas-example:

*************
Picas Example
*************

This page presents a PiCaS pilot job example:

.. contents:: 
    :depth: 4


===================
Problem description
===================

.. sidebar:: More about Picas in practice?

		.. seealso:: Check out our mooc videos Picas examples :ref:`Part I <mooc-picas-example1>` and :ref:`Part II <mooc-picas-example2>`.

In this example we will implement the following pilot job workflow:
 
* First we define and generate the application tokens with all the necessary parameters.
* Then we define and create a shell script to process one task (*process_task.sh*) that will be sent with the job using the input sandbox. This contains some boiler plate code to e.g. setup the environment, download software or data from the Grid storage, run the application etc. This doesn’t have to be a shell script, however, setting up environment variables is easiest when using a shell script, and this way setup scripts are separated from the application code.
* We also define and create a Python script to handle all the communication with the token pool server, call the process_task,sh script, catch errors and do the reporting.
* Finally we define the :abbr:`JDL (Job Description Language)` on the User Interface machine to specify some general properties of our jobs. This is required to submit a batch of pilot jobs to the Grid that will in turn initiate the Python script as defined in the previous step.


Prerequisites
=============
To be able to run the example you must have:

* All the three Grid :ref:`prerequisites` (User Interface machine, Grid certificate, VO membership) 
* An account on PiCaS server (send your request to <helpdesk@surfsara.nl>)


====================
Picas sample example
====================

* Log in to the :abbr:`UI (User Interface)` and download the :download:`pilot_picas_fractals.tgz </Scripts/pilot_picas_fractals.tgz>` example, the couchdb package for Python :download:`couchdb.tgz </Scripts/couchdb.tgz>` and the fractals source code :download:`fractals.c </Scripts/fractals.c>`.

* Untar ``pilot_picas_fractals.tgz`` and inspect the content:

.. code-block:: console

    $tar -zxf pilot_picas_fractals.tgz
    $cd pilot_picas_fractals/
    $ls -l
    -rwxrwxr-x 1 homer homer 1247 Jan 28 15:40 createTokens
    -rw-rw-r-- 1 homer homer 1202 Jan 28 15:40 createTokens.py
    -rw-rw-r-- 1 homer homer 2827 Jan 28 15:40 createViews.py
    -rw-rw-r-- 1 homer homer  462 Jan 28 15:40 fractals.jdl
    drwxrwxr-x 2 homer homer  116 Jan 28 15:40 sandbox

Detailed information regarding the operations performed in each of the scripts below is embedded to the comments inside each of the scripts individually.

* Also download the current PiCaS version as ``picas.zip`` from GitHub and put both PiCaS and the couchdb.tgz file in the ``sandbox`` directory:

.. code-block:: console

    $cd sandbox
    $curl --location https://github.com/sara-nl/picasclient/archive/master.zip > picas.zip
    $mv ../../couchdb.tgz ./

* And finally compile the fractals program (and put it in the sandbox directory) and move one directory up again:

.. code-block:: console

    $cc ../../fractals.c -o fractals -lm
    $cd ..

The sandbox directory now holds everything we need to send to the Grid worker nodes.

Prepare your Tokens
===================


Create the Tokens
-----------------

This example includes a bash script (``./createTokens``) that generates a sensible parameter file, with each line representing a set of parameters that the fractals program can be called with. Without arguments it creates a fairly sensible set of 24 lines of parameters. You can generate different sets of parameters by calling the program with a combination of ``-q``, ``-d`` and ``-m`` arguments, but at the moment no documentation exists on these. We recommend not to use them for the moment.

* After you ran the ``createTokens`` script you'll see output similar to the following:

.. code-block:: console

    $./createTokens 
    /tmp/tmp.fZ33Kd8wXK
    $cat /tmp/tmp.fZ33Kd8wXK


Upload your Tokens to the PiCaS server
--------------------------------------

Now we will start using PiCaS. For this we need the downloaded CouchDB and PiCaS packages for Python and set the hostname, database name and our credentials for the CouchDB server:

* Edit ``sandbox/picasconfig.py`` and set the PiCaS host URL, database name, username and password.

* Link the ``picasconfig.py`` file in the current directory. This makes it available for the scripts that need to upload the tokens to CouchDB:

.. code-block:: console

   $ln sandbox/picasconfig.py

* Make the CouchDB package locally available:

.. code-block:: console

   $tar -zxf sandbox/couchdb.tgz

* Upload the tokens:

.. code-block:: console

   $python createTokens.py /tmp/tmp.fZ33Kd8wXK
	
* Check your database in this link:

    https://nosql01.grid.sara.nl:6984/_utils/database.html?homerdb
    
    replace homerdb with your Picas database name

* Create the Views (pools) - independent to the tokens (should be created only once): 

.. code-block:: console
 
   $python createViews.py


Run the example locally
-----------------------

* If you submit the jobs on the :abbr:`UI (User Interface)`, the job will start fetching tokens from the pool server and run the application locally on the :abbr:`UI (User Interface)` machine:

.. code-block:: console

    $cd sandbox/
    $./startpilot.sh
    
    Connected to the database homerdb sucessfully. Now starting work...
    -----------------------
    Working on token: token_2
    lock 1453570581
    _rev 2-8d7f141114b7335b50612ba4dfb92b3d
    hostname ui
    exit_code
    scrub_count 0
    done 0
    input -q 0.100 -d 256 -m 8400
    output
    _id token_2
    type token
    -----------------------
    /usr/bin/time -v ./process_task.sh "-q 0.100 -d 256 -m 8400" token_2 2> logs_token_2.err 1> logs_token_2.out
    -----------------------
    Working on token: token_6
    lock 1453570589
    ...
    
You can monitor the progress for the Tokens that are waiting, running, finished or in error state, from the PiCaS website here:

    https://nosql01.grid.sara.nl:6984/_utils/database.html?homerdb
    
    replace homerdb with your Picas database name
    	
While the :abbr:`UI (User Interface)` has started processing tokens, submit the pilot jobs to the Grid. Continue to the next section ...
	 

Run the example on the Grid
---------------------------
    
* Create a proxy:

.. code-block:: console

   $startGridSession lsgrid # replace lsgrid with your VO

* Submit the pilot jobs:

.. code-block:: console

   $glite-wms-job-submit -d $USER -o jobIDs fractals.jdl
	

It will recursively generate an image based on parameters received from PiCas. At this point, some of your tokens are processed on the Grid worker nodes and some of the tokens are already processed on the :abbr:`UI (User Interface)`. Note that the :abbr:`UI (User Interface)` is not meant for production runs, but only for testing few runs before submitting the pilot jobs to the Grid.

* Convert the :abbr:`UI (User Interface)` output file to .png format and display the picture:

.. code-block:: console

   $convert output_token_6 output_token_6.png # replace with your output filename
    
For the tokens that are processed on Grid, you can send the output to the :ref:`Grid Storage <grid-storage>` or some other remote location.


Checking failed jobs
--------------------

While your pilot jobs process tasks, you can keep track of their progress through the CouchDB web interface. There are views installed to see:

 * all the tasks that still need to be done (Monitor/todo)
 * the tasks that are locked (Monitor/locked)
 * tasks that encountered errors (Monitor/error)
 * tasks that are finished (Monitor/done)

When all your pilot jobs are finished, ideally, you'd want all tasks to be 'done'. However, often you will find that not all jobs finished successfully and some are still in a 'locked' or 'error' state. If this happens, you should investigate what went wrong with these jobs. Incidentally, this will be due to errors with the Grid middleware, network or storage. In those cases, you can remove the locks and submitting some new pilot jobs to try again. In other cases, there could be errors with your task: maybe you've sent the wrong parameters or forgot to download all necessary input files. Reviewing these failed tasks gives you the possibility to correct them and improve your submission scripts. After that, you could run those tasks again, either by removing their locks or by creating new tokens if needed and then submitting new pilot jobs.
