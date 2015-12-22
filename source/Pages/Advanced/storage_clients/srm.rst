.. warning:: Page under construction


.. _srm:

************
*srm* client
************

This page includes the basic commands to use ``srm``:

.. contents:: 
    :depth: 4
    
 

.. sidebar:: SRM basics

		.. seealso:: Have a look to our mooc video :ref:`mooc-srm` for additional examples.

===
SRM
===

The Storage Resource Manager (short SRM) has been designed to be the single interface for the management of both disk and tape storage resources. It provides options for copying files to/from the Grid storage, :ref:`staging` from tape, creating or removing files and so on. It uses :ref:`SURLs <file-id>` as the physical filename to reference a file.

The :ref:`srm` is one of the most popular :ref:`storage-clients`. However, srm- commands are using Java which has the tendency to allocate big amounts of memory and sometimes be slow. 

.. note:: To run the examples below you need to have a valid proxy, see :ref:`startgridsession`. 

SRM commands
============

* Copy file from dCache to local machine:

.. code-block:: bash

  srmcp -debug -server_mode=passive srm://srm.grid.sara.nl:8443/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar file:///`pwd`/zap.tar # note the flag -server_mode=passive!

* Copy file from DPM to local machine:

.. code-block:: bash

  srmcp -debug -server_mode=passive srm://gb-se-lumc.lumc.nl:8446/dpm/lumc.nl/home/lsgrid/homer/zap.tar file:///`pwd`/zap.tar # note the flag -server_mode=passive!

* Copy file from local machine to DPM:

.. code-block:: bash

  srmcp -debug -server_mode=passive file:///`pwd`/zap.tar srm://gb-se-lumc.lumc.nl:8446/dpm/lumc.nl/home/lsgrid/homer/zap.tar
