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

The ``globus-*`` client does not offer an option to create or list directories. For this purpose, use a different client, e.g. :ref:`uberftp client <uberftp>`.


Transferring data
=================

.. note:: The options ``-dbg -gt 2 -vb`` would show you extra logging information for your transfer.

* Copy file from dCache to local machine:

.. code-block:: bash

    globus-url-copy gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar file:///`pwd`/zap.tar 

* Copy file from DPM to local machine:

.. code-block:: bash

    globus-url-copy gsiftp://gb-se-lumc.lumc.nl:2811/dpm/lumc.nl/home/lsgrid/homer/zap.tar file:///`pwd`/zap.tar 

* Copy file from local machine to dCache:

.. code-block:: bash

    globus-url-copy file:///`pwd`/zap.tar gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar

* Copy file from local machine to DPM:
 
.. code-block:: bash

    globus-url-copy file:///`pwd`/zap.tar gsiftp://gb-se-lumc.lumc.nl:2811/dpm/lumc.nl/home/lsgrid/homer/zap.tar

* Recursive upload to dCache:

.. code-block:: bash

    globus-url-copy -cd -r /home/homer/testdir/ gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/testdir/ # replace testdir with your directory

* Recursive upload to DPM:

.. code-block:: bash

    globus-url-copy -cd -r /home/homer/testdir/ gsiftp://gb-se-lumc.lumc.nl:2811/dpm/lumc.nl/home/lsgrid/homer/testdir/

* Recursive download from dCache:

First create the directory locally, e.g. ``testdir``.

.. code-block:: bash

    globus-url-copy -cd -r gsiftp:///gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/testdir/ /home/homer/testdir/
	
* Recursive download from DPM:	

First create the directory locally, e.g. ``testdir``.

.. code-block:: bash

    globus-url-copy -cd -r gsiftp://gb-se-lumc.lumc.nl:2811/dpm/lumc.nl/home/lsgrid/homer/testdir/ /home/homer/testdir/

* Third party transfer (between dCache sites):

First create the remote directory, e.g. ``targetdir``.

.. code-block:: bash

    globus-url-copy -cd -r gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/sourcetdir/ gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/penelope/targetdir/   # note: you must include the trailing slash!

.. seealso:: For dCache 3rd party transfers see also :ref:`fts client <fts>`. 

* Third party transfer (between DPM sites):

First create the remote directory, e.g. ``targetdir``.

.. code-block:: bash

    globus-url-copy -cd -r gsiftp://gb-se-lumc.lumc.nl:2811/dpm/lumc.nl/home/lsgrid/homer/testdir/ gsiftp://gb-se-ams.els.sara.nl/dpm/els.sara.nl:2811/home/lsgrid/penelope/testdir/ # note: you must include the trailing slash!


Parallel streams
----------------

The ``globus-url-copy`` uses by default 10 parallel streams for transfers.


Removing data
=============

The ``globus-*`` client does not offer an option to delete files or directories. For this purpose, use a different client, e.g. :ref:`uberftp client <uberftp>`.

