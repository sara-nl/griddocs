.. _glitece:

**********************
Creamce job submission
**********************

In this page we present the `Creamce` job submission as an alternative to the `Workload Management System` (WMS) job submission to the Grid. We first discuss the need to use the `Creamce` instead of :abbr:`WMS (Workload Management System)`, then we briefly recap the basic :abbr:`WMS (Workload Management System)` commands (``glite-wms``) and the corresponding `Creamce` commands (``glite-ce``). We also present the differences regarding the JDL file setup and show an example Grid job submitted directly to the `Creamce`.

.. contents:: 
    :depth: 4


===================
WMS decommissioning
===================

.. sidebar:: More about the WMS?

		.. seealso:: The :abbr:`WMS (`Workload Management System)` is responsible for distributing and managing tasks across the different compute and storage resources available on a Grid. Check out the WMS job submission in :ref:`first-grid-job` 

The gLite Workload Management System (WMS) software is no longer officially supported since 2018. It is therefore unavoidable that the SURFsara :abbr:`WMS (Workload Management System)` servers (``wms1.grid.sara.nl`` and ``wms2.grid.sara.nl``) will be decommissioned sometime in the future. This will lead to changes for Grid users who carry out the job submission, monitoring and retrieval using the ``glite-wms`` commands. As alternatives to the :abbr:`WMS (Workload Management System)`, we suggest the following options:

* Direct job submission to the Creamce. This option is recommended to users who submit their jobs to specific Grid clusters (known endpoints), e.g. directly to :ref:`Gina <specs-gina>`.  

* Migrating to the `DIRAC`_ service. This option is recommended to users who use multiple Grid clusters in multiple locations, where the actual endpoints might not be known. DIRAC is a tool that provides features very similar to the :abbr:`WMS (Workload Management System)`.

In this page we show a few examples to help you with the transition to the `Creamce` job submission. If you are interested in `DIRAC`, please contact us at helpdesk@surfsara.nl to discuss about the possibilities for your VO. 


========================
Creamce vs. WMS commands
========================

The direct job submission to the CREAMCE is handled through ``glite-ce`` commands. Below we list the relevant ``glite-ce`` commands corresponding to the most common ``glite-wms`` commands.

.. sidebar:: More about `Creamce` commands?

		.. seealso:: The ``glite-ce`` commands belong to the command line interface (CLI) for interacting with CREAM and are described in more detail in the `Cream guide`_.


.. code-block:: console

   $glite-wms-job-submit  ->  glite-ce-job-submit
   $glite-wms-job-status  ->  glite-ce-job-status
   $glite-wms-job-cancel  ->  glite-ce-job-cancel  
   $glite-wms-job-output  ->  glite-ce-job-output


* On the command line, for both ``glite-ce`` and ``glite-wms`` commands, help is available via:

.. code-block:: console

   $ <command> --help


===============
JDL differences 
===============

There are a few differences in the JDL syntax between the :abbr:`WMS (Workload Management System)` and the `Creamce` job submission. Most important is the specification of the OutputSandbox and the queue to submit the job. See the examples here:

Suppose that we want to submit the following ``wrapper.sh`` script, which is stored in our local sandbox folder, to the ``medium`` (36h) queue of Gina (see :ref:`gina-specs-queues`):

    .. code-block:: sh

	   #!/bin/bash
	   echo `date`
	   echo ${HOSTNAME}
	   echo ${PWD}
	   sleep 30
	   ls -allh ${PWD}
	   exit 0  

Then we create a JDL to submit the simple job above to the Gina (see :ref:`specs-gina`) Grid cluster. The JDL for the :abbr:`WMS (Workload Management System)` would look like this:

* glite-wms:   your_wms_job.jdl

  .. code-block:: cfg

     [
     JobType = "Normal";
     Executable = "wrapper.sh";
     InputSandbox = {"sandbox/wrapper.sh"};
     Stdoutput = "stdout";
     StdError = "stderror";
     OutputSandbox = {"stdout", "stderror"};
     RetryCount = 0;
     ShallowRetryCount = 0;
     Requirements=(RegExp("gina.sara.nl:8443/cream-pbs-medium", other.GlueCEUniqueID));
     ]

In order to submit the job directly to the `Creamce`, the JDL looks like this: 

* glite-ce:  your_ce_job.jdl

  .. code-block:: cfg

     [
     JobType = "Normal";
     Executable = "wrapper.sh";
     InputSandbox = {"sandbox/wrapper.sh"};
     Stdoutput = "stdout";
     StdError = "stderror";
     OutputSandbox = {"stdout", "stderror"};
     OutputSandboxBaseDestURI = "gsiftp://localhost";
     RetryCount = 0;
     ShallowRetryCount = 0;
     ]

Note that in the `Creamce` JDL we have removed the line that specifies the queue because it will be specified with the job submission command and we have changed the ``OutputSandbox`` destination to the ``OutputSandboxBaseDestURI`` from where we will retrieve the output as shown in the next section.



===========================================
Direct Creamce job submission and lifecycle
===========================================

Once we have prepared the JDL and the job scripts, we are ready to submit the job. Here are the steps to submit the job directly to the Creamce. All the steps include an example to the equivalent :abbr:`WMS (Workload Management System)` operations:

Proxy creation
==============

First create a local proxy on the :abbr:`UI (User Interface)`:

.. code-block:: console

   $voms-proxy-init --voms lsgrid --valid 168:00
	 
.. note:: The Creamce job submission lacks the WMS feature that takes care of the proxy delegation and extension (see :ref:`grid-authentication`). This means that your proxy on the Creamce will be valid for 24 hours and your jobs will be killed after this time. We are looking into options for the proxy extension to provide the same functionality as the ``startGridSession`` command.


Job submission
==============

* Submitting the job with the :abbr:`WMS (Workload Management System)` would look like this:
  
    .. code-block:: console
  
       $ glite-wms-job-submit -d $USER your_wms_job.jdl 
         Your job identifier is:
         https://wms2.grid.sara.nl:9000/HnMrnxuzXWuM--JDXM8-pw


* In order to submit the job directly to the `Creamce` medium queue, the command looks like this: 

    .. code-block:: console
  
       $ glite-ce-job-submit -a -r creamce.gina.sara.nl:8443/cream-pbs-medium  your_ce_job.jdl
         https://creamce.gina.sara.nl:8443/CREAM887592310


Job status
==========

* Getting the job status with the :abbr:`WMS (Workload Management System)` would look like this:

    .. code-block:: console

       $ glite-wms-job-status https://wms2.grid.sara.nl:9000/HnMrnxuzXWuM--JDXM8-pw
         ...
         Status info for the Job : https://wms2.grid.sara.nl:9000/HnMrnxuzXWuM--JDXM8-pw
         Current Status:     Done(Success)
         ...

    Please note that all possible Status states are (e.g. ``$ glite-wms-job-status  --help``):

      UNDEF, SUBMITTED, WAITING, READY, SCHEDULED, RUNNING, DONE, CLEARED, ABORTED, CANCELLED, UNKNOWN, PURGED



* In order to get the status of a job that is submitted directly to the `Creamce`, run this command: 

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

    The above information is an excerpt of the stdout output (command line) that is generated by the job-status call. In particular we show here the sequence of 'Status' for a successful job. 

    Please note that all possible Status states are (e.g. ``glite-ce-job-status --help``):

	  DONE-OK, DONE-FAILED, REGISTERED, PENDING, IDLE, RUNNING, REALLY-RUNNING, HELD, CANCELLED, ABORTED, UNKNOWN
	   

Job output retrieval
====================

* Getting the job output with the :abbr:`WMS (Workload Management System)` would look like this:
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

    Note1: the Job DN question is asked and has to be answered with 'y' due to a bug in WMS.
    Note2: to retrieve the output the parameter 'OutputSandboxBaseDestURI' should not be set. 
    Note3: instead of /scratch one can use the option --dir to specify an output directory.

* In order to get the output of a job that is submitted directly to the `Creamce`, run this command: 

    .. code-block:: console
    
       $ glite-ce-job-output  https://creamce.gina.sara.nl:8443/CREAM887592310

       2018-06-07 10:54:28,881 INFO - For JobID [https://creamce.gina.sara.nl:8443/
         CREAM887592310] output will be stored in the dir 
         ./creamce.gina.sara.nl_8443_CREAM887592310

       $ ls ./creamce.gina.sara.nl_8443_CREAM887592310/
         stderror  stdout

    We see here that the stdout and stderror files, as specified in your_ce_job.jdl, are retrieved and saved to this local directory.


Job cancellation
================

Here we show an example in case you want to cancel a job after having submitted it. 

* Cancelling a job with the :abbr:`WMS (Workload Management System)` would look like this:

    .. code-block:: console

       $ glite-wms-job-cancel https://wms2.grid.sara.nl:9000/_XLil1T3EEIVCmDnWY-tmA

         Are you sure you want to remove specified job(s) [y/n]y : y

       $ glite-wms-job-status https://wms2.grid.sara.nl:9000/_XLil1T3EEIVCmDnWY-tmA


       ======================= glite-wms-job-status Success =====================
       BOOKKEEPING INFORMATION:

       Status info for the Job : https://wms2.grid.sara.nl:9000/_XLil1T3EEIVCmDnWY-tmA
       Current Status:     Cancelled
       ...

* In order to cancel a job that is submitted directly to the `Creamce`, run this command: 

    .. code-block:: console

       $ glite-ce-job-cancel https://creamce.gina.sara.nl:8443/CREAM423808807

         Are you sure you want to cancel specified job(s) [y/n]: y

       $ glite-ce-job-status https://creamce.gina.sara.nl:8443/CREAM423808807

       ******  JobID=[https://creamce.gina.sara.nl:8443/CREAM423808807]
	       Status        = [CANCELLED]
	       ExitCode      = []
	       Description   = [Cancelled by user]
       ...
       
       
.. _`DIRAC`: http://diracgrid.org/
.. _`Cream guide`: http://cream-guide.readthedocs.io/en/latest/User_Guide.html

