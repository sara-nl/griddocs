.. toctree::
   :hidden:

   parametric/parametric_dirac
   picas/picas_overview
   picas/picas_example_dirac

.. _gpu-jobs:

**********
GPU jobs
**********

In this page we will show you how to run jobs that use GPUs on the Grid:

.. contents::
    :depth: 4

==============
About GPU jobs
==============

Certain problems you want to run on special hardware to decrease the runtime of your program, such as on a GPU. The Grid has started to support and run GPUs jobs. This section contains the best practices of running GPU jobs on the Dutch Grid, as supported by SURF.

.. _gpu-job-submission:

====================
GPU job submission
====================

To submit a GPU job to the Grid, the :ref:`JDL <jdl>` file must contain a tag field set to ``gpu``. This field looks like the following:

  .. code-block:: console

    Tags = {"gpu"};

This will put your job in the GPU queue after which the job lands on a compute element (CE) that contains a GPU and can run the relevant code.


.. _quick-gpu:

=================
Quick GPU example
=================

To quickly  run the example, download the shell-script and jdl-file as given below.
For the full explanation on what the job just did, see the instructions in the :ref:`Example GPU Job <example-job>` section.

* Copy the shell-script :download:`gpu_job.sh </Scripts/gpu_job.sh>` to your :abbr:`UI (User Interface)` directory:

  .. code-block:: console

    $wget http://doc.grid.surfsara.nl/en/latest/_downloads/gpu_job.sh

* Copy the jdl-file :download:`gpu_job.sh </Scripts/gpu_job.jdl>` to your :abbr:`UI (User Interface)` directory:

  .. code-block:: console

    $wget http://doc.grid.surfsara.nl/en/latest/_downloads/gpu_job.jdl

And submit the job with:

  .. code-block:: console

    $dirac-wms-job-submit gpu_job.jdl
    JobID = 123


And inspect the output after retrieving the files with:

  .. code-block:: console

    $dirac-wms-job-get-output 123



.. _example-job:

===============
Example GPU Job
===============

An example of a GPU job starts with the code we want to run. For this example, we decide to run a CUDA example made by Nvidia, which can be found at `github <https://github.com/NVIDIA/cuda-samples.git>`_. To ensure the code runs on the Grid, it is containerized with `apptainer <https://apptainer.org/>`_ and the container is distributed through :ref:`CVMFS <cvmfs>`. 

To build the container yourself, you can run

  .. code-block:: console

    $apptainer build --fakeroot --nv --sandbox cuda_example_unpacked.sif cuda_example.def

on a machine with apptainer installed, where the user has fakeroot privileges. The ``cuda_example.def`` definitions file contains the following recipe:

  .. code-block:: docker

    Bootstrap: docker
    From: nvidia/cuda:11.8.0-devel-centos7

    %post
    #This section is run inside the container
    yum -y install git make
    mkdir /test_repo
    cd /test_repo
    git clone https://github.com/NVIDIA/cuda-samples.git
    cd /test_repo/cuda-samples/Samples/2_Concepts_and_Techniques/eigenvalues/
    make

    %runscript
    #Executes when the "apptainer run" command is used
    #Useful when you want the container to run as an executable
    cd /test_repo/cuda-samples/Samples/2_Concepts_and_Techniques/eigenvalues/
    ./eigenvalues

    %help
    This is a demo container to show how to build and run a CUDA application
    on a GPU node

This will create a container with the compiled ``eigenvalues`` example inside, which makes use of an Nvidia GPU to calculate the eigenvalues of a 2048 x 2048 matrix.

This container has already been distributed on CVMFS and can be found at ``/cvmfs/softdrive.nl/lodewijkn/cuda_example_unpacked.sif``.

To run this container on the Grid, making use of the GPUs, the following ``jdl`` has to be submitted to DIRAC, or the workload management system (WMS) of your choice. This jdl runs a shellscript on the CE, calling the container on CVMFS. This script, called ``gpu_job.sh`` is given as:

  .. code-block:: bash

    #!/bin/bash

    cat /proc/self/status | grep 'Cpus_allowed_list:'
    echo
    /usr/bin/nvidia-smi

    pwd
    hostname

    /cvmfs/oasis.opensciencegrid.org/mis/apptainer/bin/apptainer run --nv /cvmfs/softdrive.nl/lodewijkn/cuda_example_unpacked.sif

In the command that calls apptainer the ``--nv`` flag is necessary to expose the GPU to the container. The ``gpu_job.sh`` script is then passed along inwith the ``jdl`` to the Grid when submitting the job. The jdl, called ``gpu_job.jdl``, is given next:

  .. code-block:: console 

    [
      JobName = "my_gpu_job";
      Executable = "gpu_job.sh";
      StdOutput = "StdOut";
      StdError = "StdErr";
      InputSandbox = {"gpu_job.sh"};
      OutputSandbox = {"StdOut","StdErr"};
      Site = "GRID.SURF.nl";
      Tags = {"gpu"};
      CPUTime = 600;
    ]

To submit the job, ensure all the necessary files are available: the ``gpu_job.sh`` script and ``gpu_job.jdl`` jdl file. Then submit the job with:

  .. code-block:: console

    $dirac-wms-job-submit gpu_job.jdl

After the job has run succesfully, the ``stdout`` output looks like:

  .. code-block:: console

    Cpus_allowed_list:  11-21

    Thu Dec  8 14:57:12 2022
    +-----------------------------------------------------------------------------+
    | NVIDIA-SMI 515.65.01    Driver Version: 515.65.01    CUDA Version: 11.7     |
    |-------------------------------+----------------------+----------------------+
    | GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
    | Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
    |                               |                      |               MIG M. |
    |===============================+======================+======================|
    |   0  NVIDIA A10          Off  | 00000000:00:07.0 Off |                    0 |
    |  0%   42C    P0    57W / 150W |      0MiB / 23028MiB |      3%      Default |
    |                               |                      |                  N/A |
    +-------------------------------+----------------------+----------------------+

    +-----------------------------------------------------------------------------+
    | Processes:                                                                  |
    |  GPU   GI   CI        PID   Type   Process name                  GPU Memory |
    |        ID   ID                                                   Usage      |
    |=============================================================================|
    |  No running processes found                                                 |
    +-----------------------------------------------------------------------------+
    /tmp/ZTiMDmYBVN2nCifV3nVLvLKmABFKDmABFKDmURGKDmABFKDm5i8MKo/DIRAC_hA3xkNpilot/20
    wn-a10-04.gina.surfsara.nl
    Starting eigenvalues
    GPU Device 0: "Ampere" with compute capability 8.6

    Matrix size: 2048 x 2048
    Precision: 0.000010
    Iterations to be timed: 100
    Result filename: 'eigenvalues.dat'
    Gerschgorin interval: -2.894310 / 2.923303
    Average time step 1: 0.987820 ms
    Average time step 2, one intervals: 1.169709 ms
    Average time step 2, mult intervals: 2.616700 ms
    Average time TOTAL: 4.785920 ms
    Test Succeeded!


And  you have run your first GPU job on the Grid!
