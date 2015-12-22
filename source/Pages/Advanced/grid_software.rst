.. _grid-software:

*************
Grid Software
*************


In this page we will talk about the options to run your software on the Grid worker nodes:

.. contents:: 
    :depth: 4
    

.. _softdrive:

=========
Softdrive 
=========

``Softdrive`` is the service that allows you to install software in a central place and distribute it *automagically* on the Grid. You install the software once, and it will be available on all clusters, to all users. This means that you no longer need to supply your software in your *input sandbox*, or download your software in your job.


.. _cvmfs:

CVMFS
=====

Softdrive is using the ``CVMFS`` (short for CernVM File System) tool on the background. CVMS is a network file system based on HTTP and optimized to deliver experiment software in a fast, scalable, and reliable way. 


Quickstart
==========

In this example, we will distribute a few small files to all nodes in the Life Sciences Grid. This should give you an idea of what is possible with *Softdrive*.

Softdrive works by logging in the software distribution node, and putting your files there. Next, you tell the software distribution system that you are ready installing files. These files will be made available on all nodes in the :ref:`lsg` and on all other nodes on the :ref:`dutch-grid`.


CVMFS group membership
----------------------

To distribute your files using Softdrive, you must be a member of the group ``cvmfs``. If you are not a member yet, send an e-mail to helpdesk@surfsara.nl with a membership request.


Logging in on the softdrive 
---------------------------

After you have been added to the ``softdrive`` group, you can log in on the software distribution node, using your grid username and password:

.. code-block:: bash

	ssh homer@softdrive.grid.sara.nl # replace homer with your username

In your home-directory, you will find:

* a directory ``cvmfs.tree``, where you will store your files for distribution
* a file ``cvmfs.modified``, which you have to ``touch`` to start the distribution of your files.


Distributing an example file
----------------------------

To demonstrate distributing files to all grid nodes, create a file and a directory within the ``cvmfs.tree`` directory:

.. code-block:: bash

  	# a test file
  	cat "Hello world" > cvmfs.tree/hello.txt
  
  	# directory and a file
  	mkdir -p cvmfs.tree/some_dir
  	cat "In a directory" > cvmfs.tree/some_dir/some_file.txt

These commands create two files and one directory.

To make these files available on all nodes on the grid, you have to ``touch`` the file ``cvmfs.modified``, which will force the update everywhere:

.. code-block:: bash

  	touch cvmfs.modified

Updating on all nodes can take up to two hours.

 
Finding your files on the grid nodes
------------------------------------

On nodes, your files in the ``cvmfs.tree`` directory will be available under:

.. code-block:: bash

	/cvmfs/softdrive.nl/homer/cvmfs.tree # replace homer with your username
  
  
  
.. _python-grid:
  
==============
Python on Grid
============== 
 
.. warning:: Section under construction
 
  
.. _docker:

======
Docker
====== 

At the moment it is not possible to run Docker containers on the :ref:`dutch-grid` or :ref:`lsg`. Contact us at helpdesk@surfsara.nl to discuss about the available options.

