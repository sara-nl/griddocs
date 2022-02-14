
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

     $dirac-wms-job-submit parametric.jdl -f jobIds 
	
In this case, 3 child jobs will be generated. Each job will generate two files: ``std0.out`` and ``std0.err``, ``std1.out`` and ``std1.err``, ``std2.out`` and ``std2.err``.	

* Monitor the job status to see the the parent job and the 3 child jobs with their status:

  .. code-block:: console

     $dirac-wms-job-status -f jobIds
     JobID=82 Status=Running; Site=GRID.SURF.nl; MinorStatus=Running; 
     JobID=83 Status=Running; Site=GRID.NIKHEF.nl; MinorStatus=Running; 
     JobID=84 Status=Running; Site=GRID.SURF.nl; MinorStatus=Running; 
     JobID=85 Status=Running; Site=GRID.NIKHEF.nl; MinorStatus=Running; 

    
    
This is just an example. In practice you shouldn't send more than **50** jobs this way (Parameters=50). The parametric jobs is the technology used for submitting the pilot jobs. There is no need to monitor their status or retrieve the job output through Dirac as the :ref:`pilot frameworks <pilot-frameworks>` will take care of this.

