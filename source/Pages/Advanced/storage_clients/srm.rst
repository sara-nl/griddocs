
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


* Create a new directory on dCache:

  .. code-block:: console

     $srmmkdir srm://srm.grid.sara.nl:8443/pnfs/grid.sara.nl/data/lsgrid/homer/newdir/


Transferring data
=================

.. note:: The ``-debug`` option would show you extra logging information for your transfers.

* Copy file from dCache to local machine:

.. code-block:: console

   ## note the flag -server_mode=passive!
   $srmcp -server_mode=passive \
   $srm://srm.grid.sara.nl:8443/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar \
   $file:///`pwd`/zap.tar


* Copy file from local machine to dCache:

.. code-block:: console

   $srmcp -debug file:///`pwd`/zap.tar \
   $srm://srm.grid.sara.nl:8443/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar


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

Recursive delete
----------------

Recursive deletion of files is not supported with the ``srm-*`` client commands. It is possible to remove a directory as long as it is empty, i.e. content files have been removed.

.. _srm-staging:

Staging
=======

Staging a single file
---------------------

* Check the locality status of a file:

.. code-block:: bash

   $srmls -l srm://srm.grid.sara.nl:8443/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar | grep locality
   #locality:ONLINE_AND_NEARLINE


* Submit a staging request for a single file. After submitting the staging command below, the prompt is waiting for the file to get online. Once the file gets online, a unique request id is returned. The pin lifetime is set in seconds, in this examples the requested pin time is a day (or 86400 sec):

.. code-block:: bash

   $srm-bring-online -request_lifetime=86400 srm://srm.grid.sara.nl:8443/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar
   #srm://srm.grid.sara.nl:8443/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar brought online, use request id 897617461 to release


* Unpin a file:

After submitting the unpinning command below, the file will remain cached but purgeable until new requests will claim the available space:

.. code-block:: bash

   $srm-release-files srm://srm.grid.sara.nl:8443/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar  -request_tokens=[tokenID] #replace tokenID with 897617461 retrieved above

* Release all pins of a file:

.. code-block:: bash

   $srm-release-files srm://srm.grid.sara.nl:8443/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar


Staging a list of files
-----------------------

Here is an example to stage a list of files. Let's say that you want to stage all the `.tgz` files in a certain
dCache directory like `/pnfs/grid.sara.nl/data/lsgrid/homer/`. We will use the command `srm-bring-online`.
However, when you run this command the prompt will hang until the file is actually staged.
So you can start first a `screen` shell to make sure your copying process continues when you accidentally
loose connection to the server.

* Start screen on the UI:

.. code-block:: bash

   $screen

* Create the file list and note that you need to use a SURL for your filepaths:

.. code-block:: bash

   $FILES=`srmls srm://srm.grid.sara.nl/pnfs/grid.sara.nl/data/lsgrid/homer/ | egrep 'tgz' | awk '{print "srm://srm.grid.sara.nl:8443"$2}'`


* Check if the list looks OK. All filenames should be split with spaces in one line:

.. code-block:: bash

   $echo $FILES
   #srm://srm.grid.sara.nl:8443/pnfs/grid.sara.nl/data/lsgrid/homer/file1.tgz srm://srm.grid.sara.nl:8443/pnfs/grid.sara.nl/data/lsgrid/homer/file2.tgz srm://srm.grid.sara.nl:8443/pnfs/grid.sara.nl/data/lsgrid/homer/file3.tgz srm://srm.grid.sara.nl:8443/pnfs/grid.sara.nl/data/lsgrid/homer/file4.tgz

* Check the status of the files to see how many are online (Disk) and how many are nearline (Tape):

.. code-block:: bash

   $srmls -l $FILES | grep locality | awk '/ONLINE/{i++};/:NEARLINE/{j++}; END{print "Disk:", i, ", Tape:",  j}'
   #Disk:  , Tape: 4


* Submit the stage command to request staging the bulk of files. You can store the output in a file `stage.log` to save the request IDs. The pin lifetime here is set to 1 week, but note that this counts from the moment you submit the request independent to the actual time that the files are on disk:

.. code-block:: bash

   $srm-bring-online $FILES -request_lifetime=604800 > stage.log
   # prompt will hang until operation is complete for all the files

* Once processing of the requested files is done, you can release the bulk of files so that the pin is removed and the staging read-pool is free for other data:

.. code-block:: bash

   $srm-release-files $FILES
