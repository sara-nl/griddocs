.. _globus:

***************
*globus* client
***************

This page includes the basic commands to use ``globus``. For an overview of storage clients, see :ref:`storage-clients`.

.. contents:: 
    :depth: 4
    

============
Globus tools
============

.. note:: To run the examples below you need to have a valid proxy, see :ref:`startgridsession`. 


Creating/listing 
================

* Listing directories on dCache:

  .. code-block:: console
  
     $globus-url-copy -list gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/

* Listing directories on DPM:

  .. code-block:: console
  
     $globus-url-copy -list gsiftp://gb-se-lumc.lumc.nl:2811/dpm/lumc.nl/home/lsgrid/
     
The ``globus-*`` client does not offer an option to create directories. For this purpose use a different client, e.g. :ref:`uberftp client <uberftp>`.


Transferring data
=================

.. note:: The options ``-dbg -gt 2 -vb`` would show you extra logging information for your transfer.

* Copy file from dCache to local machine:

  .. code-block:: console

     $globus-url-copy \
     $    gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar \
     $    file:///`pwd`/zap.tar 

* Copy file from DPM to local machine:

  .. code-block:: console

     $globus-url-copy \
     $    gsiftp://gb-se-lumc.lumc.nl:2811/dpm/lumc.nl/home/lsgrid/homer/zap.tar \
     $    file:///`pwd`/zap.tar 

* Copy file from local machine to dCache:

  .. code-block:: console

     $globus-url-copy \
     $    file:///`pwd`/zap.tar \
     $    gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar

* Copy file from local machine to DPM:

  .. code-block:: console

     $globus-url-copy \
     $    file:///`pwd`/zap.tar \
     $    gsiftp://gb-se-lumc.lumc.nl:2811/dpm/lumc.nl/home/lsgrid/homer/zap.tar

* Recursive upload to dCache:

  .. code-block:: console

     $globus-url-copy -cd -r \
     $    /home/homer/testdir/ \
     $    gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/testdir/
     ## replace testdir with your directory

* Recursive upload to DPM:

  .. code-block:: console

     $globus-url-copy -cd -r \
     $    /home/homer/testdir/ \
     $    gsiftp://gb-se-lumc.lumc.nl:2811/dpm/lumc.nl/home/lsgrid/homer/testdir/

* Recursive download from dCache:

  First create the directory locally, e.g. ``testdir``.

  .. code-block:: console

     $globus-url-copy -cd -r \
     $    gsiftp:///gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/testdir/ \
     $    /home/homer/testdir/
	
* Recursive download from DPM:	

  First create the directory locally, e.g. ``testdir``.

  .. code-block:: console

     $globus-url-copy -cd -r \
     $    gsiftp://gb-se-lumc.lumc.nl:2811/dpm/lumc.nl/home/lsgrid/homer/testdir/ \
     $    /home/homer/testdir/

* Third party transfer (between dCache sites):

  First create the remote directory, e.g. ``targetdir``.

  .. code-block:: console

     $globus-url-copy -cd -r \
     $    gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/sourcetdir/ \
     $    gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/penelope/targetdir/   
     ## note: you must include the trailing slash!

  .. seealso:: For dCache 3rd party transfers see also :ref:`fts client <fts>`. 

* Third party transfer (between DPM sites):

  First create the remote directory, e.g. ``targetdir``.

  .. code-block:: console

     $globus-url-copy -cd -r \
     $    gsiftp://gb-se-lumc.lumc.nl:2811/dpm/lumc.nl/home/lsgrid/homer/testdir/ \
     $    gsiftp://gb-se-ams.els.sara.nl/dpm/els.sara.nl:2811/home/lsgrid/penelope/testdir/ 
     ## note: you must include the trailing slash!


Parallel streams
----------------

The ``globus-url-copy`` uses by default 10 parallel streams for transfers.


Removing data
=============

The ``globus-*`` client does not offer an option to delete files or directories. For this purpose, use a different client, e.g. :ref:`uberftp client <uberftp>`.


Fifo pipes
==========

When you want to process data from a large ``tar`` file (hundreds of Gigabytes) that is stored on the Grid Storage, it is possible to extract just the content without copying the complete tar file on the Worker Node. Similarly, you can upload a directory that will be stored in a tar file on the Grid storage on-the-fly. This trick saves space on the local node from keeping the double copy of the data and is possible by using the ``fifo pipes`` technique. 

Extract directory from dCache
-----------------------------

Extract the content of a tar file from the Grid storage on the worker node or UI:

  .. code-block:: console
     
     ## Create fifo for input data
     $INPUT_FIFO="GRID_input_fifo.tar" 
     $mkfifo $INPUT_FIFO 
     ## Extract the directory from fifo and catch PID
     $tar -Bxf ${INPUT_FIFO} & TAR_PID=$! 
     ## Download the content of the tar file, replace zap.tar with your tar file
     $globus-url-copy -vb \
     $    gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar \
     $    file:///`pwd`/${INPUT_FIFO} && wait $TAR_PID 

Extract a file
--------------

Extract a particular from a known directory location in a ``tar`` file:

  .. code-block:: console
     
     ## Create fifo for input file
     $INPUT_FIFO="GRID_input_fifo.tar" 
     $mkfifo $INPUT_FIFO 
     ## Extract a particular file from fifo and catch PID
     $tar -Bxf ${INPUT_FIFO} zap/filename & TAR_PID=$! # replace zap/filename with the exact location of you file in the tar
     ## Download the file, replace zap.tar with your tar file
     $globus-url-copy -vb \
     $    gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar \
     $    file:///`pwd`/${INPUT_FIFO} && wait $TAR_PID 

Transfer directory to dCache
----------------------------

  .. code-block:: console
     
     $OUTPUT_FIFO="GRID_output_fifo.tar"	 
     $mkfifo ${OUTPUT_FIFO} # create a fifo pipe
     ## Push output directory to file (fifo) and catch PID
     $tar -Bcf ${OUTPUT_FIFO} zap/ & TAR_PID=$! # replace zap/ with the directory to be uploaded  
     ## Upload the final dir with fifo
     $globus-url-copy -vb file:///${PWD}/${OUTPUT_FIFO} \
     $    gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar && wait ${TAR_PID}
     ## note:add stall-timeout flag in sec (e.g. -stall-timeout 7200) for large files that take too long to complete checksum on the server after transfer
