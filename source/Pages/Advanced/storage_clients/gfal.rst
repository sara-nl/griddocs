
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

FIFO transfers
--------------

Using a fifo pipe allows you to tar/untar a file on the fly and use half of the space on the WN, e.g. tarring a directory and
uploading the tarball to dCache would require 2x(directory size) space on the WN without a fifo.

* Download a tar ball from dCache using fifo

.. code-block:: console

   INPUT_FIFO="GRID_input_fifo.tar"
   mkfifo ${INPUT_FIFO}
   tar -Bxf ${INPUT_FIFO} & TAR_PID=$!
   gfal-copy gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar file:///${PWD}/${INPUT_FIFO} && wait ${TAR_PID}

* Upload a tar ball to dCache using fifo

.. code-block:: console

   OUTPUT_FIFO="GRID_output_fifo.tar"
   tar -Bcf ${OUTPUT_FIFO} ${PWD}/mydir/ & TAR_PID=$!
   gfal-copy file:///${PWD}/${OUTPUT_FIFO} gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar && wait ${TAR_PID}

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
