
.. _job-requirements:

*********************
Grid job requirements
*********************

By telling what your job needs, you help the scheduler in finding the
right place to run your jobs, and it also helps using the different
compute nodes in the Grid efficiently.

This chapter describes how to write the requirements, how the
requirements determine where your jobs will run, and what they tell the
scheduler. Job requirements are provided as parameters in the :abbr:`JDL 
(Job Description Language)` file.

.. contents:: 
    :depth: 4
    

.. _req-syntax:

==================
Requirement syntax
==================

Job requirements are written as an optional statement in the :abbr:`JDL (Job Description Language)` file::

  Attribute = <parameter>;

.. seealso:: For detailed information about :abbr:`JDL (Job Description Language)` attributes supported by the DIRAC, have a look in the `DIRAC documentation`_.

============
Requirements
============

.. _req-wallclock:

Specifying Wall Clock time via the queue
==========================

Typically on grid sites, by specifying the wall clock time requirement the scheduler picks a
queue which is long enough for running the job. In the DIRAC configuration at SURF site (Gina), only the long queue (Walltime of 96 hours) is supported at this point. You can use the following convention to specify it::

    Tags={"long"};

If you do not specify this, the jobs that run at SURF will automatically be scheduled on the long queue. If you specify any other queue your jobs will not run at SURF site.


.. _req-cputime

Specifying CPU Time
===========================

You may also choose to specify a CPU Time, but at SURF site all jobs will land on the long queue (96 hours) irrespective of the CPU Time specified. But specifying this attribute may offer flexibility for you to use the same JDL for different grid sites where a CPU Time attribute is used to match the job to the correct queue. You can specify this attribute as follows::

    CPUTime = 345600;   #this is in seconds for the long queue


.. warning:: If a job is not actively using CPU for  
             more than 30 min, it will be considered as stalled and 
             automatically killed by DIRAC Watchdog



.. _req-ce:

Selecting particular Grid site or CE
=====================================

You may choose a specific Grid site or a :abbr:`CE (Compute Element)`   to run your jobs on, depending on which sites allow jobs for the specific VO::

     Site = {"GRID.SURF.nl"};
     GridCE = {"arc01.gina.surfsara.nl"};
   
If you are using DIRAC to submit your jobs, you do not have to specify either one of the parameters (unless you want your jobs to/not to run at a specific site).


.. _req-multicore:   
   
Multicore jobs
==============

``Numberof Processors`` is the number of CPU cores requested. ``SMPGranularity`` is the number of cores that must be scheduled on the same host::

    # Request just 4 cores on a single node 
    SmpGranularity = 4;
    NumberOfProcessors = 4;   
	

Note that if you do not specify ``SmpGranularity`` the requested number of cores can be distributed over different nodes, which is only useful for MPI (or likewise) applications.

.. warning:: If you are running a multi-core process in your job, and
             you do not set the correct number of CPU cores, **you will 
             oversubscribe a compute node, slowing down your own analysis,
             as well as others**.
   


.. Links:

.. _`EGEE JDL guide`: https://edms.cern.ch/ui/file/590869/1/WMS-JDL.pdf
	
.. vim: set wm=7 expandtab :

.. _`DIRAC documentation`: https://dirac.readthedocs.io/en/latest/UserGuide/GettingStarted/UserJobs/JDLReference/
