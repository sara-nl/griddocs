
.. _bootstrap:

*********************
Bootstrap application
*********************

When you have a binary program that you want to execute on the Grid you need to create a bootstrap application. This will execute a wrapper script that contains all the necessary information for your job to run. In this page we will show an example to run your bootstrap application on the Grid:

.. contents:: 
    :depth: 4

    
===================
Problem description
===================

You want to execute your own binary program on the Grid. When you have a binary program that you want to execute on the Grid you can send it along with the job submission. This can be done when the executable is not too large. The limit is about 100MB, for larger executables you can use :ref:`Softdrive <softdrive>` or the :ref:`Grid storage <grid-storage>`. 

.. sidebar:: Bootstrap basics

		.. seealso:: Have a look at our mooc video :ref:`Executables on Grid <mooc-bootstrap>` for a simple example to get started.

To send such an executable along we will use the InputSandBox in the job description. The program itself will be executed by a simple shell script ("wrapper.sh"). There are several reasons to wrap the call to your executable with a script. One important one is that the executable file might not have executable permissions after it is copied to the Grid worker node. A second is that it is more flexible in the use of input parameters and also to redirect the output. In short, this script provides the correct environment for the execution of the binary.

In this page we will demonstrate a simple bootstrap application using the fractals example.

==================
Quickstart example
==================


Preamble
========

* Log in to the User Interface (UI):

  .. code-block:: console

     $ssh homer@ui.grid.sara.nl # replace homer with your username
    
* Copy the tarball :download:`bootstrap_fractals.tar </Scripts/bootstrap_fractals.tar>` to your :abbr:`UI (User Interface)` directory.

* Copy the fractals source code :download:`fractals.c </Scripts/fractals.c>` to your :abbr:`UI (User Interface)` directory.
    
* Untar the example and check the files:

  .. code-block:: console

     $tar -xvf bootstrap_fractals.tar
     $cd bootstrap_fractals/
     $mv ../fractals.c ./
     $ls -l

     -rw-r--r-- 1 homer homer fractals.c
     -rw-rw-r-- 1 homer homer fractals.jdl
     -rw-rw-r-- 1 homer homer wrapper.sh

* Compile the example:

  .. code-block:: console

     $cc fractals.c -o fractals -lm


.. warning:: It is advisable to compile your programs on the User Interface (UI) Machine. The Grid nodes have similar environments and the chance of your job to run successfully on a remote worker node is larger when your program is able to run on the UI. 


Run locally
===========

* Run the example locally on the UI with a set of parameters to understand the program:

  .. code-block:: console

     $./fractals -o output -q 0.184 -d 2280 -m 4400 # try different parameters, e.g. -q 0.184 -d 2280 -m 4400
    
This will take a while, depending on the input parameters you selected. Once finished, it will create the "output" file.

* Convert the output file to .png format and display the picture:

  .. code-block:: console

     $convert output "output.png"
     $display output.png
    
    
Run on the Grid
===============

* Create a proxy valid for a week:  

  .. code-block:: console

     $startGridSession lsgrid # replace lsgrid with your VO

* Inspect the :abbr:`JDL (Job Description Language)` file ``fractals.jdl``:

  .. code-block:: cfg

     Type = "Job";
     JobType = "Normal";
     Executable = "/bin/sh";
     Arguments = "wrapper.sh";
     StdOutput = "stdout";
     StdError = "stderr";
     InputSandbox = {"wrapper.sh","fractals"};
     OutputSandbox = {"stdout","stderr","output"}; 

In the :abbr:`JDL (Job Description Language)` file we specify the content of the in- and output sandboxes. These sandboxes allow you to transfer small files to or from the Grid. The input sandbox contains all the files that you want to send with your job to the worker node, like e.g. the fractals script that you want executed. The output sandbox contains all the files that you want to have transferred back to the :abbr:`UI (User Interface)`, e.g. the output fractals image.   

* Inspect the contents of the ``wrapper.sh`` script:

  .. code-block:: bash

     $ cat wrapper.sh
     #!/bin/bash
     chmod u+x fractals
     ./fractals -o output -q 0.184 -d 2280 -m 4400
     ...
    
Once this jobs lands on the Grid, it will execute the ``wrapper.sh`` script which is a master script to set the program environment and initiate the program execution. In the ``wrapper.sh`` script you may include also the commands to retrieve input from a Grid storage location or transfer the output results to a Grid storage location.

* Submit the job to the Grid:

  .. code-block:: console

     $glite-wms-job-submit -d $USER -o jobIds fractals.jdl

* Check the job status from command line on the :abbr:`UI (User Interface)`:

  .. code-block:: bash

     glite-wms-job-status https://wms2.grid.sara.nl:9000/6swP5FEfGVZ69tVB3PwnDQ #replace with your jobID
  
     # or
     glite-wms-job-status -i jobIds

* Once the job is finished, get the job output to the :abbr:`UI (User Interface)`:

  .. code-block:: console

     $glite-wms-job-output --dir . -i jobIds    
    
* Convert the output file to .png format and display the picture:

  .. code-block:: console

     $convert homer_6swP5FEfGVZ69tVB3PwnDQ/output "output.png" # replace with your job output directory
     $display output.png    
