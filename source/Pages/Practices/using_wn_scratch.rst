
.. _storage-grid-wn:

****************************************
How to use the storage on the Grid nodes
****************************************

In this page you will learn the principles when using the local storage on the Grid worker nodes within your Grid jobs.

.. contents:: 
    :depth: 4


===================
Problem description
===================

When you submit a job to the Grid site at SURFsara, it will land on one of the :ref:`Gina <specs-gina>` nodes. On the worker node, your job can use the local ``/scratch`` directory for storing data that is required during the job execution. 

The local ``/scratch`` directory is a temporary file space that is shared across the entire worker node and it is ideal for applications that deal with large volumes of data and require high throughput processing. 

However, the ``/scratch`` space on the worker node should be used with caution. Your data should be written in your job's ``/scratch`` subdirectory and not directly under the ``/scratch``. This practice prevents from filling up the worker node storage which would lead in blocking new jobs or failures on running jobs on the node. 

In the example below we explain how to use ``/scratch`` efficiently. 


==================
Using the /scratch
==================

The worker node ``/scratch`` storage is not directly accessible by the UI or other remote machines. You can access scratch only within your job scripts executed on the worker node. To make good use of the local ``/scratch`` you should adapt your job scripts to:

* create a temporary directory under your job directory for storing the job data before the analysis starts
* effectively remove the temporary directory once the analysis ends and before your job exits 

When you submit a job to the Grid, it creates a unique job directory once it lands on a worker node. The job directory format is ``/scratch/XXX.batch.gina.sara.nl/CREAMXXX``,
where 'XXX' is your job identifier. Creating a temporary directory under this partition helps to collect the generated data by a particular job in a single directory. 

.. note:: There is an environment variable set on the worker nodes called ``$TMPDIR`` that points to ``/scratch``. Do not use the command ```mktemp -d -p ${TMPDIR}`` to create the temporary directory because it will create directly a first level directory under ``/scratch`` (i.e. ``/scratch/tmp.nCXtOkxcr8``) which will be regularly checked and deleted for our system healthiness. 

The following code block is an example for creating the temporary directory within your job and removing it effectively after the analysis ends:

.. code-block:: bash

    JOBDIR=${PWD} #the job lands here
    echo $JOBDIR
    #/scratch/20372174.batch.gina.sara.nl/CREAM20372174

    RUNDIR=`mktemp -d -p ${JOBDIR}` #create a temporary working directory on scratch  
    echo $RUNDIR
    #/scratch/20372174.batch.gina.sara.nl/CREAM20372174/tmp.nCXtOkxcr8

    cd ${RUNDIR} #move to the working directory
    # copy your data here
    #run the analysis
	
    cd ${JOBDIR} #once analysis ends, move the the dir where the job landed
    rm -rf ${RUNDIR} #remove the temp dir and all of the generated data before exiting the job
    exit 0
 	
	


