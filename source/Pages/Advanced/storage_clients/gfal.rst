
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

* Create a new directory on dCache:

  .. code-block:: console

     $gfal-mkdir gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/newdir/

Transferring data
=================

* Copy file from dCache to local machine:

  .. code-block:: console

     $gfal-copy gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar file:///`pwd`/zap.tar

* Copy file from local machine to dCache:

  .. code-block:: console

     $gfal-copy file:///`pwd`/zap.tar gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar


Recursive transfer
------------------

Recursive transfer of files is not supported with the ``gfal-copy`` command.

Removing data
=============

* Remove a file from dCache:

  .. code-block:: console

     $gfal-rm gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar

* Remove whole (non-empty) directory with all content from dCache:

  .. code-block:: console

     $gfal-rm -r gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/testdir/


Checksums
=========

* Get checksum for a file on dCache:

.. code-block:: console

   $gfal-sum gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar ADLER32


Locality
========

* Get locality (ONLINE, NEARLINE) for a file on dCache:

.. code-block:: console

   $gfal-xattr gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar user.status
