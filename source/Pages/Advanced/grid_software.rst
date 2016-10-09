.. _grid-software:

*************
Grid software
*************


In this page we will talk about the options to run your software on the Grid worker nodes:

.. contents:: 
    :depth: 4
    

.. _softdrive:

=========
Softdrive 
=========

Softdrive is the service that allows you to install software in a central place and distribute it *automagically* on the Grid. You install the software once, and it will be available on all clusters, to all users. This means that you no longer need to supply your software in your *input sandbox*, or download your software in your job. 

This page is about using Softdrive on the grid infrastructure. The use of Softdrive is however not limited to grid alone, as it can equally well be applied to your own clusters, your :ref:`own computer <softdrive-on-laptop>` or in `cloud environments`_. 


.. _cvmfs:

CVMFS
=====

Softdrive is using the `CVMFS service`_ (short for CernVM File System) on the background. CVMFS is a network file system based on HTTP and optimized to deliver experiment software in a fast, scalable, and reliable way. 


Quickstart
==========

In this example, we will distribute a few small files to all nodes in the Life Sciences Grid. This should give you an idea of what is possible with *Softdrive*.

Softdrive works by logging in the software distribution node, and putting your files there. Next, you tell the software distribution system that you are ready installing files. These files will be made available on all nodes in the :ref:`lsg` and on all other nodes on the :ref:`dutch-grid`.


Access
------

Users of the National e-Infrastructure are entitled to use Softdrive
without the need for a separate resource request.  You can request
access by sending an e-mail with your current project allocation id to
helpdesk@surfsara.nl.


Logging in on the softdrive 
---------------------------

Once access has been arranged, you can log in on the software
distribution node, using your Grid :abbr:`UI (User Interface)`
username and password:

.. code-block:: console

	$ssh homer@softdrive.grid.sara.nl # replace homer with your username

In your home-directory (e.g. ``/home/homer``), you will find a *README* file with detailed information about the *Softdrive* usage.


Distributing an example file
----------------------------

To demonstrate distributing files to all Grid nodes, create a file and a directory within your home directory:

.. code-block:: bash

    # a test directory and a file
    softdrive.grid.sara.nl:/home/homer$ mkdir -p test_dir
    softdrive.grid.sara.nl:/home/homer$ echo "Hello world" > test_dir/hello.txt

To make this directory file available on all nodes on the Grid, you have to copy the ``test_dir`` under ``/cvmfs/softdrive.nl/$USER``:

.. code-block:: bash

    softdrive.grid.sara.nl:/home/homer$ cp -r test_dir /cvmfs/softdrive.nl/homer # replace homer with your username

* To force the update everywhere in the Grid, trigger publication by executing command:

.. code-block:: bash

    publish-my-softdrive
    
Updating on all Grid nodes can take up to two hours.

.. note:: You need to run the command ``publish-my-softdrive`` each time you make a change in your ``/cvmfs/softdrive.nl/$USER`` directory in order to take effect on the Grid sites.

 
Finding your files on the Grid nodes
------------------------------------

On nodes, your Softdrive files will be available under:

.. code-block:: console

	/cvmfs/softdrive.nl/homer/ # replace homer with your username
  
Log in to your :ref:`UI account <get-ui-account>` and check whether your files are there:

.. code-block:: console  
  
    ui.grid.sara.nl:/home/homer$ ls /cvmfs/softdrive.nl/homer/ 
    drwxr-xr-x 17 cvmfs cvmfs 4096 Dec 16 12:11 test_dir
    

.. note:: If your software is statically compiled, then copying the executables from your home directory to ``/cvmfs/softdrive.nl/$USER/`` should work. Just remember to export the ``/cvmfs/softdrive.nl/$USER`` software paths into your Grid scripts or :abbr:`UI (User Interface)` ``.bashrc``. In other cases with library path dependencies, we advice you to install your software directly under ``/cvmfs/softdrive.nl/$USER`` or use a prefix. An example of software installation in Softdrive can be found in section :ref:`anaconda on Grid <softdrive-anaconda>`.


.. _python-grid:

==================
Python on the Grid
==================

On the local Grid clusters the python version installed is *Python 2.6.6*. If you need a different python version or additional packages, we recommend you to install `Anaconda python`_ in your UI or :ref:`Softdrive <softdrive>` account.

Next is an example of installing the *Anaconda* python distribution in *Softdrive*.

.. _softdrive-anaconda:
 
Softdrive anaconda 
================== 
 
* Log in to Softdrive with your account:

.. code-block:: console  
 
   $ssh homer@softdrive.grid.sara.nl # replace homer with your username

* Download in your home account the latest version of Anaconda installer for linux, e.g.:

.. code-block:: console  

   $wget https://3230d63b5fc54e62148e-c95ac804525aac4b6dba79b00b39d1d3.ssl.cf1.rackcdn.com/Anaconda2-2.4.0-Linux-x86_64.sh 

* Run the installer (read and approve the license terms) in Softdrive:

.. code-block:: console  

   $bash Anaconda2-2.4.0-Linux-x86_64.sh

Note here! The installer will ask you to which location to install the software. Do not accept the default but change it to: ``/cvmfs/softdrive.nl/$USER/anaconda-2-2.4.0/``:

.. code-block:: console  
    
    Anaconda2 will now be installed into this location:
    /home/homer/anaconda2
    - Press ENTER to confirm the location
    - Press CTRL-C to abort the installation
    - Or specify a different location below

    [/home/homer/anaconda2] >>> /cvmfs/softdrive.nl/homer/anaconda-2-2.4.0/
    ...

That was it! You can now publish the software that is installed in your ``/cvmfs/softdrive.nl/homer/anaconda-2-2.4.0`` directory. To do so, run this command in Softdrive:

.. code-block:: console  

    $publish-my-softdrive

Then check after 1-2 hours from the :abbr:`UI (User Interface)` if the ``/cvmfs/softdrive.nl/homer/anaconda-2-2.4.0`` exists.

Finally, remember to include the installation path in your scripts as:

.. code-block:: console  

    $export PATH=/cvmfs/softdrive.nl/homer/anaconda-2-2.4.0/bin:$PATH # replace homer with your username
  
  
  
.. _docker:

======
Docker
====== 

At the moment it is not possible to run Docker containers on the :ref:`dutch-grid` or :ref:`lsg`. We are currently investigating different possibilities. Please contact us at helpdesk@surfsara.nl to discuss about the available options.



.. Links:

.. _`Anaconda python`: https://www.continuum.io/downloads  

.. _`CVMFS service`: https://cernvm.cern.ch/portal/filesystem  

.. _`cloud environments`: http://doc.hpccloud.surfsara.nl/softdrive  
