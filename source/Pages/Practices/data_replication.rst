
.. _large-data-lfc-practice:

****************
Data replication
****************

In this page we will show an example for running applications on multiple :abbr:`LSG (Life Science Grid)` clusters with replicas that also require big volumes data:

.. contents:: 
    :depth: 4

.. sidebar:: lcg/lfc/lfn? Only for large files with multiple replicas.

	The lectures ``Data management on the Grid`` :ref:`partI <mooc-lcg-lfn1>`, :ref:`partII <mooc-lcg-lfn2>` and :ref:`partIII <mooc-lcg-lfn3>` present the lcg/lfc/lfn :ref:`storage-clients`. However, we advise you to better use the :ref:`globus` or :ref:`srm`, unless you need to run jobs on multiple sites which require access on the **same** large dataset (or database). In case of doubts, contact us at helpdesk@surfsara.nl.

===================
Problem description
===================

The ``InputSandbox`` and ``OutputSandbox`` attributes in the :abbr:`JDL (Job Description Language)` file are the basic way to move files to and from the User Interface (UI) and the Worker Node (WN). However, if large (from about 100 MB and larger) or many files are involved you should not use these sandboxes to move data around. Instead you can use the :ref:`Storage Elements <grid-storage>` and work with the ``lfc`` and ``lcg`` commands. These commands, and the storage system in general, are explained in the section :ref:`lcg-lfn-lfc clients <lcg-lfn-lfc>`. 

Here we give an example of how to use large input and output files which are needed by a job. We will use replicas to avoid transferring e.g. a database to multiple clusters every time.

=================
Data Requirements
=================

This case describes the ``DataRequirements`` attribute in your job description file; this attribute is a list of classads representing the data requirements for the job. Each classad has to contain three attributes :

``InputData``
    The list of input files needed by the job
``DataCatalog``
    The type of data catalog - needed by the Grid middleware. This is needed in order to 
    resolve logical names to physical names. Fill in "DLI" here.
``DataCatalogType`` 
    The address (URL) of the data catalog if this is not the :abbr:`VO (Virtual Organisation)` default one. 

The presence of the ``DataRequirements`` attribute causes the job to run on a Computing Element (CE) which is next to the Storage Element (SE) where the requested file is stored. Note that this attribute doesn't perform the actual copy of the file from the :abbr:`SE (Storage Element)` to the WN; as we will see, this has to be done by the user.

To do this, first register a file on a :abbr:`SE (Storage Element)` and to the :abbr:`LFC (Logical File Catalog)`. We do this by copy and register (``lcg-cr``):

.. code-block:: console

    $lcg-cr --vo lsgrid -d gb-se-ams.els.sara.nl -l lfn:/grid/lsgrid/homer/test.txt file:/home/homer/local_test.txt 
    guid:522350d4-a28a-48aa-939b-d85c9ab5443f

Note that the guid part is what we get as return value from the command. It identifies the file uniquely in the Grid storage. You can save this id for emergencies. The part which starts with ``lfn:`` identifies the logical file name of our uploaded file.

.. note:: The :abbr:`LFC (Logical File Catalog)` needs to support your :abbr:`VO (Virtual Organisation)` in order to work.

Second, create a :abbr:`JDL (Job Description Language)` file that describes your job. It will contain the :abbr:`LFC (Logical File Catalog)` of the file, as is shown here.

.. code-block:: bash

    $ cat inputdata.jdl
    [
        Executable = "/bin/sh";
        Arguments = "scriptInputData.sh lfn:/grid/lsgrid/homer/test.txt";

        StdOutput = "std.out";
        StdError = "std.err";

        InputSandbox = "scriptInputData.sh";
        OutputSandbox = {"std.out","std.err"};

        DataRequirements = {
                [
                  InputData = {"lfn:/grid/lsgrid/homer/test.txt"};
                  DataCatalogType = "DLI";
                  DataCatalog = "http://lfc.grid.sara.nl:8085";
                ]
        };
        DataAccessProtocol = {"gsiftp"};

        RetryCount = 3;
    ]

This :abbr:`JDL (Job Description Language)` mentions the script ``scriptInputData.sh`` (as value of Arguments) which will be submitted to the :abbr:`WMS (Workload Management System)`, and run on a Worker Node. This script needs an inputfile, and expects an :abbr:`LFN (Logical File Name)` as argument. We will use the file that we copied to an :abbr:`SE (Storage Element)` earlier. In the ``DataRequirements`` section, we mention the :abbr:`LFN (Logical File Name)` of this file as value of ``InputData``. Notice that the ``DataCatalogType`` and ``DataCatalog`` are also described. You can copy these values.

Note that this in itself is not enough for the script to use the file. It still needs to be copied to the worker node where the job lands. All that is achieved by this :abbr:`JDL (Job Description Language)` description is that the job will land close to an :abbr:`SE (Storage Element)` which contains the needed data. The copying is done by the script itself. To actually copy the file associated with this :abbr:`LFN (Logical File Name)` from the :abbr:`SE (Storage Element)` to the :abbr:`WN (Worker Node)`, the script uses an ``lcg-cp`` command. The script ``scriptInputData.sh`` is shown below.

The script gets the file, performs the ``ls`` command and shows the content of the file to ``stdout``.

.. code-block:: bash

     $ cat scriptInputData.sh 
     #!/bin/sh

     # Set the proper environment
     export LFC_HOST=lfc.grid.sara.nl
     export LCG_GFAL_INFOSYS=bdii.grid.sara.nl:2170
     export LCG_CATALOG_TYPE=lfc
    
     # Download the file from the SE to the WN where this job runs
     # note that the LFN is passed as input to this script
     lcg-cp --vo lsgrid $1 file:`pwd`/local_file
    
     echo "########################################"
     ls -la local_file
     echo "########################################"
     # type the file just downloaded
     cat local_file

Now the actual submission, status checking, output retrieval and inspection can take place. If you want to try this example, you have to create two files, ``inputdata.jdl`` and ``scriptInputData.sh``, filling them with the content displayed above. Of course, you have to register your own file and consequently change the :abbr:`LFN (Logical File Name)` requested within the ``DataRequirements`` attribute.


Moving output data from the job to the SE
==========================================

What do you do when you have to move data from a running job on the Worker Node to a Storage Element? The answer is: the job has to do it by having a script copy the data. We give an example. Assume that the following script code is executed by a running job.

.. code-block:: bash

    $ cat registeringfile-script.sh   
    #!/bin/sh
    # Author : Emidio Giorgio
    # Usage : register a file to the default SE, with a specified LFN 
    #  - The file to copy and register is passed as first input argument to the script ($1)
    #  - The logical file name it will have is the second input argument to the script ($2)
    #  - the LFN will be like this /grid/lsgrid/YOUR_DIRECTORY/$2 
    
    # Set the proper environment
    export LFC_HOST=lfc.grid.sara.nl
    export LCG_GFAL_INFOSYS=bdii.grid.sara.nl:2170
    export LCG_CATALOG_TYPE=lfc
    
    # Actually upload the file to the SE
    # path to the file to be registered is built as {current path}/{relative path from this script to filename}
    # REPLACE CHANGEME with an (already existing) LFC directory of your choice 
    lcg-cr --vo lsgrid -l lfn:/grid/lsgrid/CHANGEME/$2  file:$PWD/$1

This script is in charge of copying the output of your job. The simplest thing is to run it from within the main job script, as shown below:

.. code-block:: bash

    $ cat  scriptWhichDoesSomething.sh
    #!/bin/sh
    
    # do whatever 
    echo "This is a very dummy test" > fileout.txt
    
    # run the script which registers the file fileout.txt just created above 
    /bin/sh registeringfile-script.sh fileout.txt data_from_the_WN
    
    # greetings 
    echo "All done correctly (I hope). Bye bye"

This could be a starting point for your :abbr:`JDL (Job Description Language)`:

.. code-block:: bash

    $ cat  JobWritingToSE.jdl
    [
        Executable = "/bin/sh";
        Arguments = "scriptWhichDoesSomething.sh";

        StdOutput = "std.out";
        StdError = "std.err";

        # carry out also the script which registers the file  
        InputSandbox = {"scriptWhichDoesSomething.sh","registeringfile-script.sh"};
        OutputSandbox = {"std.out","std.err"};
    ]

Alternatively, you can just append the content of ``registeringfile-script.sh`` to your main script. 
