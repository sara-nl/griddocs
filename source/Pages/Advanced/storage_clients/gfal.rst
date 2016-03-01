
.. _gfal:

*************
*gfal* client
*************

This page includes the basic commands to use ``gfal``. For an overview of storage clients, see :ref:`storage-clients`.

.. contents:: 
    :depth: 4

====
gFAL
==== 

.. note:: To run the examples below you need to have a valid proxy, see :ref:`startgridsession`. 


Mandatory environment settings:

.. code-block:: console

   $export LCG_GFAL_INFOSYS=bdii.grid.sara.nl:2170


.. note:: The examples below will work both with :ref:`TURLs and SURLs <file-id>`.


Creating/listing 
================

* Listing directories on dCache:

  .. code-block:: console

     $gfal-ls -l gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/

* Listing directories on DPM:

  .. code-block:: console

     $gfal-ls -l gsiftp://gb-se-lumc.lumc.nl:2811/dpm/lumc.nl/home/lsgrid


* Create a new directory on dCache:

  .. code-block:: console

     $gfal-mkdir gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/newdir/ 

* Create a new directory on DPM:

  .. code-block:: console

     $gfal-mkdir gsiftp://gb-se-lumc.lumc.nl:2811/dpm/lumc.nl/home/lsgrid/homer/newdir/ 


Transferring data
=================

* Copy file from dCache to local machine:

  .. code-block:: console

     $gfal-copy gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar file:///`pwd`/zap.tar 

* Copy file from DPM to local machine:

  .. code-block:: console

     $gfal-copy gsiftp://gb-se-lumc.lumc.nl:2811/dpm/lumc.nl/home/lsgrid/homer/zap.tar file:///`pwd`/zap.tar 

* Copy file from local machine to dCache:

  .. code-block:: console

     $gfal-copy file:///`pwd`/zap.tar gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar

* Copy file from local machine to DPM:

  .. code-block:: console

     $gfal-copy file:///`pwd`/zap.tar gsiftp://gb-se-lumc.lumc.nl:2811/dpm/lumc.nl/home/lsgrid/homer/zap.tar

Recursive transfer
------------------

Recursive transfer of files is not supported with the ``gfal-copy`` command.


Parallel streams
----------------

Information not available yet.


Removing data
=============

* Remove a file from dCache:

  .. code-block:: console

     $gfal-rm gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar

* Remove a file from DPM:

  .. code-block:: console

     $gfal-rm gsiftp://gb-se-lumc.lumc.nl:2811/dpm/lumc.nl/home/lsgrid/homer/zap.tar

* Remove whole (non-empty) directory with all content from dCache:

  .. code-block:: console

     $gfal-rm -r gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/testdir/
	
	
* Remove whole (non-empty) directory with all content from DPM:

  .. code-block:: console

     $gfal-rm -r gsiftp://gb-se-lumc.lumc.nl:2811/dpm/lumc.nl/home/lsgrid/homer/testdir/	

