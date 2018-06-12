.. _glitece:

*********************
Grid jobs via creamce submission: an alternative to WMS
*********************

The Workload Management System (WMS) is no longer officially supported. It is therefore unavoidable that sometime in the near-future the WMS will be decommissioned as the batch scheduler for the Grid clusters at SURFsara. This will lead to changes for many Grid users, in particular in the way that they carry out job submission, monitoring and retrieval using the glite-wms commands. 

Here we describe an alternative method for handling Grid jobs by users. This method will still work even when the WMS is no longer available. We refer to this method as (direct) creame submission and it makes use of glite-ce commands. These commands are similar to the glite-wms commands. However, there are a few differences that we will describe here.

We first briefly recap Grid jobs using basic glite-wms commands (1). We then list the glite-ce commands corresponding to the the most common glite-wms commands (2). We discuss the differences regarding the JDL file setup (3). We end by showing an example Grid job submitted with glite-wms and with glite-ce and discuss the differences (4).

.. contents:: 
    :depth: 4
    
    
===================
1. Grid Job handling via the Workload Management System
===================

The current (2018) Grid middleware is the Workload Management System (WMS). The WMS is responsible for distributing and managing tasks across the different compute and storage resources available on a Grid. Users typically submit and monitor their jobs to the WMS using glite-wms commands. These glite-wms commands and their relation to Grid jobs at SURFsara are explained in more detail here:

http://docs.surfsaralabs.nl/projects/grid/en/latest/Pages/Basics/first_grid_job.html

===================
2. Grid Job handling via direct creamce submission
===================

Direct job submission to the CREAMCE is handled through glite-ce commands. Below we list the relevant glite-ce commands corresponding to the most common glite-wms commands.


  .. code-block:: console

     $glite-wms-job-submit  ->  $glite-ce-job-submit
     $glite-wms-job-status  ->  $glite-ce-job-status
     $glite-wms-job-cancel  ->  $glite-ce-job-cancel
     $glite-wms-job-output  ->  $glite-ce-job-output


* On the command line, for both glite-ce and glite-wms commands, help is available via:

  $ <command> --help

* The glite-ce commands belong to the command line interface (CLI) for interacting with CREAM and are described in more detail here:

  http://cream-guide.readthedocs.io/en/latest/User_Guide.html

===================
3. Simple JDL Job files for WMS (a) and for direct creamce submission (b)
===================

* 3a. glite-wms:   your_wms_job.jdl

  .. code-block:: cfg

     [
     JobType = "Normal";
     Executable = "/bin/sh";
     Arguments = "startpilot.sh";
     InputSandbox = {"sandbox/startpilot.sh","sandbox/process_task.sh","sandbox/matrix"};
     Stdoutput = "stdout";
     StdError = "stderror";
     OutputSandbox = {"stdout", "stderror"};
     ShallowRetryCount = 0;
     Requirements=(RegExp("mediummc",other.GlueCEUniqueID));
     # Just 1 cores on a single node, is this WMS specific ?
     SmpGranularity = 1;
     CPUNumber = 1;
     # Can glite-ce run parametric jobs, or is this WMS specific ? 
     ]

* 3b. glite-ce:  your_ce_job.jdl

  .. code-block:: cfg

     [
     JobType = "Normal";
     Executable = "startpilot.sh";
     InputSandbox = {"sandbox/startpilot.sh","sandbox/process_task.sh","sandbox/matrix"};
     Stdoutput = "stdout";
     StdError = "stderror";
     OutputSandboxBaseDestURI = "gsiftp://localhost";
     OutputSandbox = {"stdout", "stderror"};
     RetryCount = 0;
     ShallowRetryCount = 0;
     # based on: https://github.com/sara-nl/ska2grid/blob/master/ska_test/simple.jdl
     ]

===================
4. Grid Job example: comparing glite-wms with glite-ce
===================

Please note that the glite-wms part of the below example may also be found at:

http://docs.surfsaralabs.nl/projects/grid/en/latest/Pages/Basics/first_grid_job.html