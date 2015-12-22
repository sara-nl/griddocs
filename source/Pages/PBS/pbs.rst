.. warning:: Page under construction

.. _pbs:

**************
PBS local jobs
**************

In this page we will talk about local job submission to a single LSG cluster:

.. contents:: 
    :depth: 4
    

============
Introduction
============

<about pbs jobs on LSG>

================
Submit a PBS job
================

Quickstart example
==================

<add a qsub example>


Directives
==========

* Specify maximum Job Walltime in hh::mm:ss

.. code-block:: bash

	#PBS -l walltime=4:00:00 # the job will run 4h at maximum

* Specify #cores

.. code-block:: bash

	`#PBS -l nodes=1:ppn=1 // for multicore ppn>1`

* The default stdout/stderr target is the directory that you submit the job from. The following line changes the stdout/stderr directory to a specified path (e.g. samples directory):

.. code-block:: bash

	#PBS -e /home/homer/samples/
	#PBS -o /home/homer/samples/

* Notifications

.. code-block:: bash

	`#PBS -m abe
	`#PBS -M homer@troy.com #replace with your email


PBS Basics
==========

* Submit a job:

.. code-block:: bash

	qsub pbs-simple.sh	


* Submit the same job multiple times:

.. code-block:: bash

	qsub -t 1-3 -v ARG1=3 pbs-simple.sh	# submits the job 3 times


* Monitor the progress

.. code-block:: bash

	qstat -f 472897 # replace 472897 with your jobID
	qstat -f long # get details for all jobs in the long queue


Advanced Commands
=================
* List all running jobs per worker node and core:

.. code-block:: bash

	pbsnodes
	
* Show all the running jobs in the system and the occupied cores on the two worker nodes. The very last number in each row (after ‘/‘) shows the rank of corresponding core:

.. code-block:: bash

	qstat -an1


==========================
How to use local `scratch`
==========================

The home UI directory is mounted on the worker node via NFS. For better I/O performance, copy files, computation to the worker node's ``/scratch``.

.. note:: There is an environment variable set on the worker nodes called ``$TMPDIR`` that points to your job directory, e.g. /scratch/<jobID>.gb-ui-lumc.lumc.nl/.
	
	Use ``$TMPDIR`` in your scripts to locate the ``/scratch`` directory. The ``$TMPDIR`` directory also makes sure that any created data is cleaned up properly when the job has finished. 
	
Example with $TMPDIR
====================
 
* Use the ``{PBS_O_WORKDIR}`` variable to locate your scripts and make sure that your code does not contain any hardcoded paths pointing to your home directory. This variable points to the directory from where you submit the job. Edit the script that you submit with qsub as:

.. code-block:: bash

	cd $TMPDIR
	cp -r ${PBS_O_WORKDIR}/<your scripts,files> . # note the dot at the end of `cp` command.
	# ...
	# Run the executables
	# ...
	# When done, copy the output to your home directory:
	cp -r $TMPDIR/results ${PBS_O_WORKDIR}/

* Submit the script with ``qsub``.
	
	
==============================================	
How to use Grid Storage from the local cluster
==============================================

There are many cases that the data that your program needs to run can not be available locally, either because the volume of your home directory is limited or because it is already stored on the :ref:`grid-storage`.

Any interaction with the Grid, compute nodes or storage element, requires a `proxy` for your authentication. Even if you run your compute on a local cluster worker node but need to use data from the Grid storage, you will have to :ref:`get-grid-certificate` and :ref:`join-vo`.

To access the Grid storage from jobs submitted locally through qsub, you need
a valid proxy certificate.  However, for local jobs submitted using qsub this proxy certificate is not copied automatically. 

Therefore, to interact with the Grid storage, you need:

1. A proxy certificate, see :ref:`startgridsession`. You need to do this once, not for each job.
2. To tell the system where the proxy certificate is:

* Copy your proxy certificate to for example your home-directory using:

.. code-block:: bash

  cp /tmp/x509up_u41697 /home/homer/ # replace x509up_u41697 with your own proxy file, here "41697" is your unix user-id
  
* Set the rights of this file to 600 and treat it as confidential:

.. code-block:: bash

	chmod 600 /home/homer/x509up_u41697

Because your home-directory is shared across the cluster, your proxy will
also be available on all nodes within the cluster.

You also need to do this step once every week, and not for each job.

* Tell the system where your proxy certificate is, by setting an environment variable. Add in the job script:

.. code-block:: bash

	export X509_USER_PROXY=/home/homer/x509up_u41697

Now within the job, your :ref:`storage-clients` commands will work.
	
