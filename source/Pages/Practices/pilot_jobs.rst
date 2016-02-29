.. toctree::
   :hidden:

   parametric/parametric
   topos/topos_overview
   topos/topos_example
   picas/picas_overview
   picas/picas_example
   
.. _pilot-jobs:

**********
Pilot jobs
**********

In this page we will show you how to run pilot jobs on the Grid and track the status of hundreds jobs running at a time:

.. contents:: 
    :depth: 4

================
About pilot jobs
================

.. sidebar:: More about Pilot jobs?

		.. seealso:: Check out our mooc video :ref:`mooc-pilot-jobs` 

When you have tens, hundreds of jobs that you submit to the Grid you may find yourself writing software which checks the status of all those jobs and tries to find out which ones have succeeded and which ones should be resubmitted.

In addition, when submitting a large number of jobs you will often find that they need to operate on the same database or some other static datasource. For every jobsubmission this database then has to be copied to the node the job is running on. This introduces a large overhead per job.

A solution to these problems is to use a pilot job framework. Such frameworks start by submitting a number of pilot jobs to the Grid. Pilot jobs are like normal jobs, but instead of executing the task directly they contact a central server once they are running on a worker node. Then, and only then, will they be assigned a task, get their data and start executing. The central server handles the request from pilot jobs and keeps a log of what tasks are being handled, are finished, and can still be handed out. The pilot job can request a new task, report the successfull completion of a task just executed or report that it is still working on the task it received previously. When the task server doesn't hear about the progress or completion of a task it has distributed, it will assume the pilot job is either dead or the job has failed. As a result the task will be assigned to another pilot job after it has made a request for a new task. 

A pilot job will not die after it has successfully completed a task, but immediately ask for another one. It will keep asking for new jobs, until there is nothing else to do, or its wall clock time is up. This reduces overhead for jobsubmission considerably.


.. _pilotjob-workflow:

==================
Pilot Job Workflow
==================

The picture below illustrates the workflow of pilot job systems: (1), the user uploads work to the central database. This could be a list of parameter settings that need to be executed using some application on a computational resource. The user then (2) submits jobs just containing the application to the Grid, which handles retrieving from (3) and updating of (4) the job database. This process continues until all the work present in the database has been done, the application has crashed or the job has run out of time on the computational resource. When all work has been done, the user retrieves (5) the results from the database.

.. image:: /Images/parametric_jobs.png
	:align: right



.. _pilotjob-db:

Pilot job database
==================

In :ref:`pilot frameworks <pilot-frameworks>`, the database server is a server which is not necessarily tied to Grid infrastructure. In fact, you can have simple access to a pilot job server with your Internet browser or with HTTP command line clients like wget and curl.

The concept of token pools can also be used to create workflows. A task server can deal out tokens from different pools in succession and pilot jobs can remove tokens from pools (by processing them) and create tokens in other pools. 


.. _pilotjob-advantages:
  
====================  
Pilot job advantages
====================

Notice that when you use :ref:`pilot frameworks <pilot-frameworks>` you do not have to worry about job failures. When jobs fail they will not request and process new tasks. The user should not look at the pilot jobs he/she has submitted but to the number of tasks being processed. There is no need to keep track of submitted (pilot) jobs and resubmit those (and only those) that failed. Remember a pilot job will die if all tasks have been processed.

A second advantage of using pilot jobs is the reduced overhead of job submission. Once a pilot job is in place it will process tasks as long as there are any, or it's wall clock time (the maximum time a job is allowed to run) is up. This can also be advantageous for jobs who all need to transfer a large datafile. In the last example, a database should be downloaded from a SE to the Worker Node were the job is running. Note, that this is always the same database for all jobs. When a pilot job is running and is processing task after task it only needs to download the database once.

  
====================
Pilot job submission
====================

To be able to submit multiple pilot jobs at once, they are submitted to the Grid with a specific :ref:`JDL <jdl>` type called ``Parametric``. Learn more about this technique in :ref:`parametric jobs <parametric-jobs>` section. 
  
  
.. _pilot-frameworks:  

====================
Pilot Job Frameworks
====================

There are several pilot frameworks for the Grid. At SURFsara we support two of them, ``PiCaS`` and ``ToPoS``:

 * :ref:`topos-overview`
 * :ref:`topos-example`
 * :ref:`picas-overview`
 * :ref:`picas-example`
