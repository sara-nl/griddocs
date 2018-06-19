.. _glitece:

*********************
Grid jobs via creamce submission: an alternative to WMS
*********************

The Workload Management System (WMS) is no longer officially supported. It is therefore unavoidable that sometime in the near-future the WMS will be decommissioned as the batch scheduler for the Grid clusters at SURFsara. This will lead to changes for many Grid users, in particular in the way that they carry out job submission, monitoring and retrieval using the glite-wms commands. 

Here we describe an alternative method for handling Grid jobs by users. This method will still work even when the WMS is no longer available. We refer to this method as (direct) creame submission and it makes use of glite-ce commands. These commands are similar to the glite-wms commands. However, there are a few differences that we will describe here.

We first briefly recap Grid jobs using basic glite-wms commands (1). We then list the glite-ce commands corresponding to the most common glite-wms commands (2). We discuss the differences regarding the JDL file setup (3). We end by showing an example Grid job submitted with glite-wms and with glite-ce and discuss the differences (4).

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
     ]

===================
4. Grid Job example: comparing glite-wms with glite-ce
===================

Please note that the glite-wms part of the below example may also be found at:

http://docs.surfsaralabs.nl/projects/grid/en/latest/Pages/Basics/first_grid_job.html

* 4a. Job submission

  glite-wms:
  
    .. code-block:: console
  
       $ glite-wms-job-submit -d $USER your_wms_job.jdl 
         ...
         Your job identifier is:
         https://wms2.grid.sara.nl:9000/HnMrnxuzXWuM--JDXM8-pw


  glite-ce:

    .. code-block:: console
  
       $ glite-ce-job-submit -d -a -r creamce.gina.sara.nl:8443/cream-pbs-medium  your_ce_job.jdl
         ...
         2018-06-07 10:42:27,528 DEBUG - Will invoke JobStart for JobID [CREAM887592310]
         https://creamce.gina.sara.nl:8443/CREAM887592310


* 4b. Job status

  glite-wms:

    .. code-block:: console

       $ glite-wms-job-status https://wms2.grid.sara.nl:9000/HnMrnxuzXWuM--JDXM8-pw
         ...
         Status info for the Job : https://wms2.grid.sara.nl:9000/HnMrnxuzXWuM--JDXM8-pw
         Current Status:     Done(Success)
         ...

    Please note that all possible Status states are (e.g. $ glite-wms-job-status  --help):

      UNDEF, SUBMITTED, WAITING, READY, SCHEDULED, RUNNING, DONE, CLEARED, ABORTED, CANCELLED, UNKNOWN, PURGED



  glite-ce:

    .. code-block:: console

       $ glite-ce-job-status -L 2  https://creamce.gina.sara.nl:8443/CREAM887592310

         ******  JobID=[https://creamce.gina.sara.nl:8443/CREAM887592310]
	     Current Status = [DONE-OK]
         ...
         
	     Job status changes:
	     -------------------
	     Status         = [REGISTERED] - [Thu 07 Jun 2018 10:42:27] (1528360947)
	     Status         = [PENDING] - [Thu 07 Jun 2018 10:42:28] (1528360948)
	     Status         = [IDLE] - [Thu 07 Jun 2018 10:42:28] (1528360948)
	     Status         = [RUNNING] - [Thu 07 Jun 2018 10:45:35] (1528361135)
	     Status         = [REALLY-RUNNING] - [Thu 07 Jun 2018 10:45:41] (1528361141)
	     Status         = [DONE-OK] - [Thu 07 Jun 2018 10:46:44] (1528361204)
         ...

    The above information is an excerpt of the stdout output (command line) that is generated by the job-status call. In particular we show here the sequence of 'Status' for a succesfull job. The full excerpt can be found here (insert link to file minus personal details).

    Please note that all possible Status states are (e.g. glite-ce-job-status --help):

	  DONE-OK, DONE-FAILED, REGISTERED, PENDING, IDLE, RUNNING, REALLY-RUNNING, HELD, CANCELLED, ABORTED, UNKNOWN
	   

* 4c. Job output retrieval

  glite-wms:

    .. code-block:: console
    
       $ glite-wms-job-output https://wms2.grid.sara.nl:9000/HnMrnxuzXWuM--JDXM8-pw

         Connecting to the service https://wms2.grid.sara.nl:7443/glite_wms_wmproxy_server

         Job's DN is different from that one contained in your proxy file. GridFTP could 
         be unable to retrieve the output file. Do you want to continue (JobPurge will 
         be disabled) ? [y/n]n : y

         ================================================================================

		         	 JOB GET OUTPUT OUTCOME

         Output sandbox files for the job:
         https://wms2.grid.sara.nl:9000/HnMrnxuzXWuM--JDXM8-pw
         have been successfully retrieved and stored in the directory:
         /scratch/oonk_HnMrnxuzXWuM--JDXM8-pw

         ================================================================================

    Note1: the Job DN question is asked and has to be answered with 'y' due to a bug in WMS
    
    Note2: to retrieve the output the parameter 'OutputSandboxBaseDestURI' should not be set
    
    Note3: instead of /scratch one can use the option --dir to specify an output directory 


  glite-ce:

    .. code-block:: console
    
       $ glite-ce-job-output  https://creamce.gina.sara.nl:8443/CREAM887592310

       2018-06-07 10:54:28,881 INFO - For JobID [https://creamce.gina.sara.nl:8443/
         CREAM887592310] output will be stored in the dir 
         ./creamce.gina.sara.nl_8443_CREAM887592310

       $ ls ./creamce.gina.sara.nl_8443_CREAM887592310/
         stderror  stdout

    We see here that the stdout and stderror files, as specified in your_ce_job.jdl, are retrieved and saved to this local directory.

    Note1: a user defined output directory can be specified via the -D or --dir option

* 4d. Job cancellation

  Here we show an example in case you want to cancel a job after having submitted it. 

  glite-wms:

    .. code-block:: console

       $ glite-wms-job-submit -d $USER your_wms_job.jdl 

       $ glite-wms-job-cancel https://wms2.grid.sara.nl:9000/_XLil1T3EEIVCmDnWY-tmA

         Are you sure you want to remove specified job(s) [y/n]y : y

       $ glite-wms-job-status https://wms2.grid.sara.nl:9000/_XLil1T3EEIVCmDnWY-tmA


       ======================= glite-wms-job-status Success =====================
       BOOKKEEPING INFORMATION:

       Status info for the Job : https://wms2.grid.sara.nl:9000/_XLil1T3EEIVCmDnWY-tmA
       Current Status:     Cancelled
       ...

  glite-ce:

    .. code-block:: console

       $ glite-ce-job-submit -d -a -r creamce.gina.sara.nl:8443/cream-pbs-medium your_ce_job.jdl

       $ glite-ce-job-cancel https://creamce.gina.sara.nl:8443/CREAM423808807

         Are you sure you want to cancel specified job(s) [y/n]: y

       $ glite-ce-job-status https://creamce.gina.sara.nl:8443/CREAM423808807

       ******  JobID=[https://creamce.gina.sara.nl:8443/CREAM423808807]
	       Status        = [CANCELLED]
	       ExitCode      = []
	       Description   = [Cancelled by user]
       ...
