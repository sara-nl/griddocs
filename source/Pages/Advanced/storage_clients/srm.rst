
.. _srm:

************
*srm* client
************

This page explains the use of the ``srm`` client. For an overview of storage clients, see :ref:`storage-clients`.

.. contents:: 
    :depth: 4
    
 

.. sidebar:: SRM basics

		.. seealso:: Have a look at our mooc video :ref:`mooc-srm` for additional examples.

===
SRM
===

The Storage Resource Manager (short SRM) has been designed to be a single interface for the management of both disk and tape storage resources. It provides options for copying files to/from the Grid storage, :ref:`staging` from tape, creating or removing files and so on. It uses :ref:`SURLs <file-id>` as the physical filename to reference a file.

The :ref:`srm` is one of the most popular :ref:`storage-clients`. However, srm- commands are using Java which has the tendency to allocate big amounts of memory and sometimes be slow, also because of the SRM protocol overhead. If transfer speed is important, use :ref:`uberftp`, :ref:`globus` or :ref:`gfal` instead.

.. note:: To run the examples below you need to have a valid proxy, see :ref:`startgridsession`. 


Creating/listing 
================

* Listing directories on dCache:

  .. code-block:: console

     $srmls srm://srm.grid.sara.nl:8443/pnfs/grid.sara.nl/data/lsgrid/
  
* Listing directories on DPM:

  .. code-block:: console

     $srmls srm://gb-se-lumc.lumc.nl:8446/dpm/lumc.nl/home/lsgrid/

* Create a new directory on dCache:

  .. code-block:: console

     $srmmkdir srm://srm.grid.sara.nl:8443/pnfs/grid.sara.nl/data/lsgrid/homer/newdir/ 

* Create a new directory on DPM:

  .. code-block:: console

     $srmmkdir srm://gb-se-lumc.lumc.nl:8446/dpm/lumc.nl/home/lsgrid/homer/newdir 


Transferring data
=================

.. note:: The ``-debug`` option would show you extra logging information for your transfers.

* Copy file from dCache to local machine:

  .. code-block:: console

     ## note the flag -server_mode=passive!
     $srmcp -server_mode=passive \
     $      srm://srm.grid.sara.nl:8443/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar \
     $      file:///`pwd`/zap.tar 


* Copy file from DPM to local machine:

  .. code-block:: console

    ## note the flag -server_mode=passive!
    $srmcp -server_mode=passive \
    $      srm://gb-se-lumc.lumc.nl:8446/dpm/lumc.nl/home/lsgrid/homer/zap.tar \
    $      file:///`pwd`/zap.tar

* Copy file from local machine to dCache:

  .. code-block:: console

    $srmcp -debug file:///`pwd`/zap.tar \
    $      srm://srm.grid.sara.nl:8443/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar

* Copy file from local machine to DPM:

  .. code-block:: console

    $srmcp -debug file:///`pwd`/zap.tar \
    $      srm://gb-se-lumc.lumc.nl:8446/dpm/lumc.nl/home/lsgrid/homer/zap.tar


Recursive transfer
------------------

Recursive transfer of files is not supported with the ``srm-*`` client commands.


Parallel streams
----------------

Information not available yet.


Removing data
=============

* Remove a file from dCache:

  .. code-block:: console

     $srmrm srm://srm.grid.sara.nl:8443/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar

* Remove a file from DPM:

  .. code-block:: console

     $srmrm srm://gb-se-lumc.lumc.nl:8446/dpm/lumc.nl/home/lsgrid/homer/zap.tar

Recursive delete
----------------

Recursive deletion of files is not supported with the ``srm-*`` client commands. It is possible to remove a directory as long as it is empty, i.e. content files have been removed.

