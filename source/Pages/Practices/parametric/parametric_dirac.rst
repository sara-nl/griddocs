
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

In the example below, the parametric job will create 3 child jobs that will all run the same executable. The value ``%j`` will be replaced by the actual value of Parameters during the :abbr:`JDL (Job Description Language)` expansion.

``ParameterStart`` defines the starting value for the variation, ``ParameterStep`` the step for each variation and ``Parameters`` defines the value where the submission of jobs will stop (that value itself is not used) . The number of jobs is: 
(Parameters – ParameterStart) / ParameterStep 

* Log in to your User Interface. 
* Create a file with the following content describing the job requirements. Save it as ``parametric.jdl``: 

  .. code-block:: cfg
	:linenos:
	
	[
 	 Type = "Job";
 	 JobName = "Parametric";
 	 ParameterStart = 0;
 	 ParameterStep = 1;
 	 Parameters = 3;

 	 Executable = "/bin/hostname";
 	 Arguments = "-f";
 	 StdOutput = "StdOut_%j";			#Name of the file to get the standard output stream
 	 StdError = "StdErr_%j";			#Name of the file to get the standard error stream
 	 OutputSandbox = {"StdOut_%j","StdErr_%j"};	#j placeholder replaced by Dirac job ID
 
	 Site = "GRID.SURF.nl";         		#Job destination site
 	 NumberOfProcessors = 1;       			#Number of cores on a single node, options: 1,2,4,or 8
 	 Tags = {"long"};              			#Queue name, long default walltime is 96 hours
	 #CPUTime = 1000;              			#Max CPU time required by the job in seconds 
        ]

* You can submit the parametric job as any Grid job:

  .. code-block:: console

     $dirac-wms-job-submit parametric.jdl -f jobIds 
	
In this case, 3 child jobs will be generated. Each job will generate two files: ``StdOut_0`` and ``StdErr_0``, ``StdOut_1`` and ``StdErr_1``, ``StdOut_2`` and ``StdErr_2``.	

* Monitor the job status to see the the parent job and the 3 child jobs with their status:

  .. code-block:: console

     $dirac-wms-job-status -f jobIds
     JobID=82 Status=Running; Site=GRID.SURF.nl; MinorStatus=Running; 
     JobID=83 Status=Running; Site=GRID.NIKHEF.nl; MinorStatus=Running; 
     JobID=84 Status=Running; Site=GRID.SURF.nl; MinorStatus=Running; 
     JobID=85 Status=Running; Site=GRID.NIKHEF.nl; MinorStatus=Running; 

    
    
This is just an example. In practice you shouldn't send more than **50** jobs this way (Parameters=50). The parametric jobs is the technology used for submitting the pilot jobs. There is no need to monitor their status or retrieve the job output through Dirac as the :ref:`pilot frameworks <pilot-frameworks>` will take care of this.

