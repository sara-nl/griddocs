
.. _job-requirements:

*********************
Grid job requirements
*********************

By telling what your job needs, you help the scheduler in finding the
right place to run your jobs, and it also helps using the different
compute nodes in the Grid efficiently.

This chapter describes how to write the requirements, how the
requirements determine where your jobs will run, and what they tell the
scheduler.

.. contents:: 
    :depth: 4
    

.. _req-syntax:

==================
Requirement syntax
==================

Job requirements are written as an optional statement in the :abbr:`JDL (Job Description Language)` file::

  Requirements = <expression>;

Job requirements follow the :abbr:`JDL (Job Description Language)` syntax. This also means that you can have multiple requirements using boolean operators ``&&`` for
*requirement 1 AND requirement 2*, and ``||`` for *requirement 1 OR
requirement 2*. You can also use parentheses ``(...)`` for an even more
fine-grained control over requirements.

.. seealso:: For detailed information about :abbr:`JDL (Job Description Language)` attributes supported by the gLite Workload Management System, have a look in the `EGEE JDL guide`_.


============
Requirements
============

.. _req-wallclock:

Specifying Wall Clock time
==========================

**Parameter: other.GlueCEPolicyMaxWallClockTime**

Synopsis::

    # make sure that the job can run in a long queue of 72 hours (72 x 60 = 4320 minutes)
    Requirements = other.GlueCEPolicyMaxWallClockTime >= 4320;

By specifying the wall clock time requirement, the scheduler picks a
queue which is long enough for running the job. The parameter is
``other.GlueCEPolicyMaxWallClockTime``, the value is **in minutes**. Make
sure that your requirement uses the 'greater than or equal to' syntax
(``>=``).


Jobs in short queues tend to get a higher priority, jobs in long queues
tend to get a lower priority. You can use the :ref:`queues guideline <gina-specs-queues>` 
for determining in which queue your job will run. Note that you need to 
convert the hours in minutes in your :abbr:`JDL (Job Description Language)` requirement, e.g.:

   +------------+-------------------------+
   | queue      |  job length in minutes  |
   +============+=========================+
   | short      | 240 (= 4 hours)         |
   +------------+-------------------------+
   | medium     | 2160 (= 36 hours)       |
   +------------+-------------------------+
   | long       | 4320 (= 72 hours)       |
   +------------+-------------------------+


.. _req-ce:

Selecting particular compute elements
=====================================

**Parameter: other.GlueCEInfoHostName, other.GlueCEUniqueID**

Synopsis::

    # Only run on the AMC cluster
    Requirements = (
      other.GlueCEInfoHostName == "gb-ce-amc.amc.nl"
    );

    # Run on the WUR or on the LUMC cluster
    Requirements = (
      other.GlueCEInfoHostName == "gb-ce-amc.amc.nl"     ||
      other.GlueCEInfoHostName == "gb-ce-lumc.lumc.nl"
    );

    # Avoid one of SURFsara's Gina compute elements
    Requirements = (other.GlueCEInfoHostName != "creamce2.gina.sara.nl");
    
    # Exclude a specific site, e.g. iihe.ac.be
    Requirements=(!RegExp("iihe.ac.be", other.GlueCEUniqueID));

    # Schedule the jobs on a specific site, e.g. Gina
    Requirements=(RegExp("gina", other.GlueCEUniqueID));

With the ``other.GlueCEInfoHostName`` criterion you can specify on which compute element your jobs will be scheduled. Or even on which :abbr:`CE (Compute Element)` your jobs will *not* be scheduled. This is convenient in cases where you know
jobs will fail on particular systems, for some reason.

``other.GlueCEInfoHostName`` contains the hostname, while ``other.GlueCEUniqueID`` contains the full :abbr:`CE (Compute Element)` endpoint name including the queue. You can lookup these with the command ``lcg-infosites --vo lsgrid ce`` (see :ref:`example <available-ce>`). The last field is the ``GlueCEUniqueID``.

.. _req-multicore:   
   
Multicore jobs
==============

**Parameters: SmpGranularity, CPUNumber**

Synopsis::

    # Request just 4 cores on a single node 
    SmpGranularity = 4;
    CPUNumber = 4;   
	
``CPUNumber`` is the number of cores requested. ``SMPGranularity`` is the number of cores that must be scheduled on the same host.

Note that if you do not specify ``SmpGranularity`` the requested number of cores (``CPUNumber``) can be distributed over different nodes, which is only useful for MPI (or likewise) applications.

.. warning:: If you are running a multi-core process in your job, and
             you do not set the correct number of CPU cores, **you will 
             oversubscribe a compute node, slowing down your own analysis,
             as well as others**.
   

.. _req-cores:

Requesting a cluster with a minimum number of cores per node
============================================================

**Parameter: other.GlueHostArchitectureSMPSize**

Synopsis::

    # request a machine with at least 6 cpu cores on one node
    Requirements = (other.GlueHostArchitectureSMPSize >= 6);
    
    # job uses 4 cores
    CPUNumber = 4;
    SMPGranularity = 4;

The default is to select a cluster with ``GlueHostArchitectureSMPSize >= SmpGranularity``.
For efficient job allocation on a cluster it is often better to request a number of cores which is less
than the ``GlueHostArchitectureSMPSize`` (i.e. the number of cores per node).



.. Links:

.. _`EGEE JDL guide`: https://edms.cern.ch/ui/file/590869/1/WMS-JDL.pdf
	
.. vim: set wm=7 expandtab :
