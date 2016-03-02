
.. _topos-example:

*************
Topos Example
*************

This page presents a ToPoS pilot job example:

.. contents:: 
    :depth: 4

=======================
Overview of the example
=======================

An application called "fractals" needs to be executed in parallel a certain amount of times. Each time, the program is called with a different set of parameters. The parameters for all of these tasks are saved in a file in which a single line contains parameters for a single task.

Using the combination Grid, pilot jobs and the ToPoS service allows the user to run and finish all tasks without having to bother with failures and re-submissions, and make more efficient use of the Grid while doing so. 

The pipeline of the job is as follows. We upload the file that contains our parameters to the ToPoS service. After that we submit a parametric Grid job that, in an endless loop:

* asks ToPoS for the next line
* tells ToPoS not to give that line to anybody else as long as it works on it
* calls the fractals program with that line of parameters

 * if successful, tells ToPoS to delete that line
 * otherwise, tells ToPoS it can give out that same line again

* continues at the beginning of the loop

=======================
Quick overview of ToPoS
=======================

ToPoS, however, does not work with the notion of lines but rather with a notion of a set (called a "pool") and items within that set (called "tokens"). ToPoS is a RESTful webservice, and in order to use it, it is helpful to have a notion of the REST-style of software architecture. You can find the reference document for the 4.1 version of ToPoS at `ToPoS Reference Manual`_.

In short, you upload (a set of) information to the ToPoS service, which it makes available for download under a unique token URL. Each token URI exists only in the namespace of a certain pool URI - in other words, each token is part of a pool. The system allows you to ask for the next available token in a certain pool, and optionally lock that token for a certain time. If a token is locked, it means it will not be given out by the service for the specified amount of time. A lock in itself can also be managed through a unique lock URL, meaning you can delete or prolong the lock, if that should be needed.


===================
ToPoS sample client
===================

This example requires a ToPoS library implementing a subset of ToPoS' features. It is written in Bash script and requires ``curl`` and ``awk`` to be present. It has been tested on CentOS 6.7 and Ubuntu 14.04. You can find the documentation (including download location) on this library at the :ref:`ToPoS library for Bash <topos-bash-client>` page.

The ToPoS service offers the possibility to upload a text file of which each line will be made a token. We will use this functionality to make a single token of each line in our file with parameters. This way, each token represents a task that needs to be executed on the Grid.

===================
Running the example
===================

Start by downloading and unpacking the necessary files.

* Log in to the User Interface (UI): 

  .. code-block:: bash

     ssh homer@ui.grid.sara.nl 
     # replace homer with your username

* Copy the tarball :download:`pilot_topos_fractals.tar </Scripts/pilot_topos_fractals.tar>` to your :abbr:`UI (User Interface)` directory.

* Copy the fractals source code :download:`fractals.c </Scripts/fractals.c>` to your :abbr:`UI (User Interface)` directory.

* Copy the topos bash client :download:`topos </Scripts/topos>` to your :abbr:`UI (User Interface)` directory.
    
* Untar the example and check the files:

  .. code-block:: console

     $tar -xvf pilot_topos_fractals.tar
     $cd pilot_topos_fractals/
     $mv ../fractals.c ./
     $mv ../topos ./
     $chmod +x topos
     $ls -l

     -rwxr-xr-x 1 homer homer  convert
     -rwxr-xr-x 1 homer homer  createFractalsFromTokens
     -rwxr-xr-x 1 homer homer  createTokens
     -rw-rw-r-- 1 homer homer  fractals.c
     -rw-r--r-- 1 homer homer  fractals.jdl
     -rw-r--r-- 1 homer homer  README
     -rwxrwxr-x 1 homer homer  topos

* Compile the example:

  .. code-block:: console

     $cc fractals.c -o fractals -lm


.. warning:: It is advisable to compile your programs on the User Interface (UI) Machine. The Grid nodes have similar environments and the chance of your job to run successfully on a remote worker node is larger when your program is able to run on the :abbr:`UI (User Interface)`. 


Creating a parameter file for the fractals program
==================================================

This example includes a bash script (``./createTokens``) that generates a sensible parameter file, with each line representing a set of parameters that the fractals program can be called with. Without arguments it creates a fairly sensible set of 24 lines of parameters. You can generate different sets of parameters by calling the program with a combination of ``-q``, ``-d`` and ``-m`` arguments, but at the moment no documentation exists on these. We recommend not to use them for the moment.

After you ran the ``createTokens`` script you'll see output similar to the following:

.. code-block:: console

    $./createTokens 
    /tmp/tmp.fZ33Kd8wXK


Getting a unique ToPoS poolname
===============================

In order to run the tasks we first need to have the ToPoS service create tokens for us, based on the lines in our generated parameter file. Since all tokens need to be part of a pool, we first need to find out a suitable poolname. You can choose anything you like here, but the only way to be sure the poolname does not yet exist within ToPoS and to avoid clashes, we can ask the service for a unique poolname by calling:

.. code-block:: console

    $./topos newPool
    f24c058fdb6793ed7b6d5ff9

Note that the poolname does not end with a newline in order to make it easier usable by scripts.


Creating ToPoS tokens
=====================

Now that we have a poolname, either thought of by ourselves or by the ToPoS service, we can upload the file to the service and have it create tokens:

.. code-block:: console

    $./topos createTokensFromLinesInFile f24c058fdb6793ed7b6d5ff9 /tmp/tmp.fZ33Kd8wXK

You might see some HTML output that you can ignore. To check if the request went well you can have a look at your pool by querying the service from a browser. Point it at https://topos.grid.sara.nl/4.1/pools/[POOLNAME]/ and check that it contains tokens by looking under the Content section.


Running the example
===================

Now that the tokens are uploaded we can submit a Grid job. A sample :abbr:`JDL (Job Description Language)` file, submitting 10 jobs at once, is included. You still need to fill in the poolname you use in this file by replacing the placeholder [POOLNAME]. It will call the ``./createFractalsFromTokens`` script, which is the implementation of a simple pilot job that implements the pipeline as described above.

This script calls the fractals program. You can compile it by simply running:

.. code-block:: console

    $cc fractals.c -o fractals -lm

To have an impression of how ``./createFractalsFromTokens`` works you can call it on a local Linux machine (providing it can run the topos client and the fractals program):

.. code-block:: console

    $./createFractalsFromTokens -p [POOLNAME]

It will recursively generate an image based on parameters received from the specified ToPoS pool, and output the path to the generated image.

You can also submit the :abbr:`JDL (Job Description Language)` file (don't forget to edit it to include your poolname!) to the Grid and have all tokens processed in parallel. You will be able to see the progress by querying ToPoS through your browser and checking the amount of locks that exist, as well as the amount of tokens that are left.


Retrieve the output
===================

To check if the output is ready you can have a look at your pool by querying the service from a browser. Point it at https://topos.grid.sara.nl/4.1/pools/[POOLNAME].output/ and check that it contains the output of the tokens by looking under the Content section.

Note that for this example, we made the pilot job upload the results to another token pool with the same name as the original token pool and '.output' appended to it. However, this is not default ToPoS functionality, but done for the sake of keeping the example as simple as possible. In a normal situation, you'll almost always want to transfer the generated image (or whatever output you have) to a storage element or external storage using a supported protocol.




.. Links:

.. _`ToPoS Reference Manual`: https://topos.grid.sara.nl/4.1/reference_manual
