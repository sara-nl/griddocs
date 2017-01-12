
.. _pbs:

**************
PBS local jobs
**************

In this page we will talk about job submission to the local Life Science Grid (LSG) cluster. The information here applies to :ref:`LSG users <lsg>` who own an account on their :ref:`local LSG cluster <lsg-clusters>`:

.. contents::
    :depth: 4


============
Introduction
============

The Life Science Grid or LSG is a group of clusters which can be used locally only, or as one big cluster (Grid). Each :ref:`local LSG cluster <lsg-clusters>` is part of the Life Science Grid that has its own User Interface (UI) and two Worker Nodes of 64 cores (see :ref:`LSG specifications <specs-lsg>`). You can use the local :abbr:`UI (User Interface)` for submitting both local :ref:`pbs jobs <pbs-submit>` or :ref:`Grid jobs <first-grid-job>`.

In this section we will focus on the usage of local :abbr:`LSG (Life Science Grid)` cluster as a common batch system. The local job submission can be useful when:

* prototyping your Grid application
* running multicore jobs with high number of cores (e.g. more than 8 cores)
* running applications that require just a few jobs to complete. For a large-scale applications that require thousands of analysis to complete, the best option is Grid due to its large compute and storage capacity.


.. _pbs-quickstart:

==================
Quickstart example
==================

In this example we will submit a simple :abbr:`PBS (Portable Batch System)` job to the local LSG cluster using the fractals example.


Preamble
========

* Log in to the :abbr:`LSG (Life Science Grid)` User Interface, e.g. "ams" cluster (you can find the hostname in the :ref:`list of LSG hostnames <lsg-hostnames>`):

  .. code-block:: console

     $ssh -X homer@gb-ui-ams.els.sara.nl   # replace homer with your username and the UI address of your local cluster

* Copy the tarball :download:`pbsp_fractals.tar </Scripts/pbs_fractals.tar>` to your :abbr:`UI (User Interface)` directory:

  .. code-block:: console

     $wget http://doc.grid.surfsara.nl/en/latest/_downloads/pbs_fractals.tar

* Copy the fractals source code :download:`fractals.c </Scripts/fractals.c>` to your :abbr:`UI (User Interface)` directory.

  .. code-block:: console

     $wget http://doc.grid.surfsara.nl/en/latest/_downloads/fractals.c

* Untar the example and check the files:

  .. code-block:: console

     $tar -xvf pbs_fractals.tar
     $cd pbs_fractals/
     $mv ../fractals.c ./
     $ls -l

     -rw-r--r-- 1 homer homer fractals.c
     -rw-rw-r-- 1 homer homer wrapper.sh

* Compile the example:

  .. code-block:: console

     $cc fractals.c -o fractals -lm


.. _pbs-submit:

Submit a PBS job
================

* Submit the job to the local cluster:

  .. code-block:: console

     $qsub wrapper.sh

     6401.gb-ce-ams.els.sara.nl

This command returns a jobID (6401) that can be used to monitor the progress of the job.

* Monitor the progress of your job:

  .. code-block:: console

     $qstat -f 6401   # replace 6401 with your jobID

  Optionally, when the job finishes, display the job output image:

  .. code-block:: console

     $convert output "output.png"
     $display output.png

* List your own jobs:

  .. code-block:: console

     $qstat -u homer   # replace homer with your username

* Cancel the job you submitted:

  .. code-block:: console

     $qdel 6401   # replace 6401 with your jobID



.. _pbs-direcives:

==========
Directives
==========

* Specify the maximum job walltime in ``hh::mm:ss``:

  .. code-block:: console

	##PBS -l walltime=4:00:00 # the job will run 4h at maximum

* Specify the number of cores to be allocated for your job:

  .. code-block:: console

	##PBS -l nodes=1:ppn=2  # asks two cores on a single node

* The default stdout/stderr target is the directory that you submit the job from. The following line changes the stdout/stderr directory to a specified path (e.g. samples directory):

  .. code-block:: console

	##PBS -e /home/homer/samples/
	##PBS -o /home/homer/samples/

.. * Send job status notifications to your email:

  .. code-block:: console

	##PBS -m abe
	##PBS -M homer@troy.com #replace with your email



.. _pbs-system-commands:

======================
System status commands
======================

* List all the running/queued jobs in the cluster:

  .. code-block:: console

     $qstat

* Get details for all jobs in a queue, e.g. "long":

  .. code-block:: console

     $qstat -f long

* Show all the running jobs in the system and the occupied cores on the two worker nodes. The very last number in each row (after ‘/‘) shows the rank of corresponding core:

  .. code-block:: console

     $qstat -an1

* List all running jobs per worker node and core:

  .. code-block:: console

     $pbsnodes



============
Local queues
============

On the LSG clusters you can find different :ref:`queue types <lsg-specs-queues>`. We recommend you to estimate the walltime of your jobs and specify the queue to send your job. This can be done with the '-q’ option in your ``qsub`` command. For example, if you want to run a job for 72 hours, you need to specify the queue "long":

.. code-block:: console

   $qsub -q long wrapper.sh # allow job to run for 72 hours

If you don’t specify a particular queue, then your jobs will be scheduled by default on the medium queue (32 hours limit).  When the queue walltime is reached, the job will be killed.

.. seealso:: :ref:`How to run PBS jobs with wallclock greater than 36 hours on the Life Science Grid? <pbs-walltime>`


.. _pbs-scratch:

==========================
How to use local `scratch`
==========================


When you submit a local job, it will land on one of the cluster nodes. This means that the working directory will be different to the directory from where you submit the job (the worker node is a different machine to the :abbr:`UI (User Interface)`).

The home :abbr:`UI (User Interface)` directory is mounted on the worker node via NFS. For better I/O performance, copy files, computation to the worker node's ``/scratch``.

.. note:: There is an environment variable set on the worker nodes called ``$TMPDIR`` that points to your job directory, e.g. ``/scratch/<jobID>.gb-ui-ams.els.sara.nl/``.

	Use ``$TMPDIR`` in your scripts to locate the ``/scratch`` directory. The ``$TMPDIR`` directory also makes sure that any created data is cleaned up properly when the job has finished.

Example with $TMPDIR
====================

* Use the ``{PBS_O_WORKDIR}`` variable to locate your scripts and make sure that your code does not contain any hard-coded paths pointing to your home directory. This variable points to the directory from where you submit the job. Edit the script that you submit with qsub as:

  .. code-block:: bash

	cd $TMPDIR
	cp -r ${PBS_O_WORKDIR}/<your scripts,files> .  # note the dot at the end of `cp` command
	# ...
	# Run the executables
	# ...
	# When done, copy the output to your home directory:
	cp -r $TMPDIR/results ${PBS_O_WORKDIR}/

* Submit the script with ``qsub``.



.. _pbs-grid-storage:

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

  .. code-block:: console

     $cp /tmp/x509up_u39111 /home/homer/  # replace x509up_u39111 with your own proxy file, here "39111" is your unix user-id

* Set the rights of this file to 600 and treat it as confidential:

  .. code-block:: console

     $chmod 600 /home/homer/x509up_u39111

Because your home-directory is shared across the cluster, your proxy will
also be available on all nodes within the cluster.

You also need to do this step once every week, and not for each job.

* Tell the system where your proxy certificate is, by setting an environment variable. Add in the job script:

  .. code-block:: console

     $export X509_USER_PROXY=/home/homer/x509up_u39111

Now within the job, your :ref:`storage-clients` commands will work.


.. seealso:: This section covers the basic usage of :abbr:`PBS (Portable Batch System)` jobs particularly on the :abbr:`LSG (Life Science Grid)`. For advanced usage of a :abbr:`PBS (Portable Batch System)` cluster you may check out the `Lisa batch usage`_ guide or the `NYU Cluster usage`_ guide.



.. Links:

.. _`Lisa batch usage`: https://userinfo.surfsara.nl/systems/lisa/usage/batch-usage

.. _`NYU Cluster usage`: https://wikis.nyu.edu/display/NYUHPC/Running+jobs
