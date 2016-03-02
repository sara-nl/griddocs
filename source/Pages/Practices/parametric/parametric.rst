
.. _parametric-jobs:

***************
Parametric jobs
***************

The :ref:`pilot jobs <pilot-jobs>` use the technique of parametric jobs for the job submission to the Grid. In this page we give an example of parametric jobs:

.. contents:: 
    :depth: 4

=====
About
=====

Pilot jobs are submitted to the Grid with a specific :ref:`Job Description Language <jdl>` type called ``Parametric``. A parametric job causes a set of jobs to be generated from one :abbr:`JDL (Job Description Language)` file.


=======
Example
=======

In the example below, the parametric job will create 3 child jobs (see line 4) that will all run the same executable (see line 6). The value ``_PARAM_`` will be replaced by the actual value of Parameters during the :abbr:`JDL (Job Description Language)` expansion.

``ParameterStart`` defines the starting value for the variation, ``ParameterStep`` the step for each variation and ``Parameters`` defines the value where the submission of jobs will stop (that value itself is not used) . The number of jobs is: 
(Parameters – ParameterStart) / ParameterStep 

* Log in to your User Interface. 
* Create a file with the following content describing the job requirements. Save it as ``parametric.jdl``: 

  .. code-block:: cfg
	:linenos:
	
	JobType = "Parametric";
	ParameterStart=0;
	ParameterStep=1;
	Parameters=3;
	
	Executable = "/bin/hostname";
	Arguments = "-f";
	StdOutput = "std_PARAM_.out";
	StdError = "std_PARAM_.err";
	OutputSandbox = {"std_PARAM_.out","std_PARAM_.err"}; 


* You can submit the parametric job as any Grid job:

  .. code-block:: console

     $glite-wms-job-submit -d $USER -o jobIds parametric.jdl
	
In this case, 3 child jobs will be generated. Each job will generate two files: ``std0.out`` and ``std0.err``, ``std1.out`` and ``std1.err``, ``std2.out`` and ``std2.err``.	

* Monitor the job status to see the the parent job URL and the 3 child jobs URLs with their status:

  .. code-block:: console

     $glite-wms-job-status -i jobIds


     ======================= glite-wms-job-status Success =====================
     BOOKKEEPING INFORMATION:
     
     Status info for the Job : https://wms2.grid.sara.nl:9000/3ii77P1aSSTKue-MkT_y9g
     Current Status:     Running
     Submitted:          Sat Jan 4 12:54:56 2016 CET
     ==========================================================================
    
     - Nodes information for:
         Status info for the Job : https://wms2.grid.sara.nl:9000/0OZYR142AXspdm807L6YWA
         Current Status:     Running
         Status Reason:      unavailable
         Destination:        ce.lsg.bcbr.uu.nl:8443/cream-pbs-express
         Submitted:          Sat Jan 4 12:54:56 2016 CET
     ==========================================================================
     
         Status info for the Job : https://wms2.grid.sara.nl:9000/9uO8Hp6H3qCBAK3abx7G4A
         Current Status:     Running
         Status Reason:      unavailable
         Destination:        gb-ce-amc.amc.nl:8443/cream-pbs-express
         Submitted:          Sat Jan 4 12:54:56 2016 CET
     ==========================================================================
     
         Status info for the Job : https://wms2.grid.sara.nl:9000/CVYq7F6lqokBvJvsfU4ELw
         Current Status:     Running
         Status Reason:      unavailable
         Destination:        gb-ce-lumc.lumc.nl:8443/cream-pbs-express
         Submitted:          Sat Jan 4 12:54:56 2016 CET
     ==========================================================================
    
This is just an example. In practice you shouldn't send more than **50** jobs this way (Parameters=50). The parametric jobs is the technology used for submitting the pilot jobs. There is no need to monitor their status or retrieve the job output through the :abbr:`WMS (Workload Management System)` as the :ref:`pilot frameworks <pilot-frameworks>` will take care of this.

