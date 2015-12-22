.. _globus:

***************
*globus* client
***************

This page includes the basic commands to use ``globus``:

.. contents:: 
    :depth: 4
    

============
Globus tools
============

.. note:: To run the examples below you need to have a valid proxy, see :ref:`startgridsession`. 


* Copy file from dCache to local machine:

.. code-block:: bash

  globus-url-copy gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar file:///`pwd`/zap.tar 

* Copy file from DPM to local machine:

.. code-block:: bash

  globus-url-copy gsiftp://gb-se-lumc.lumc.nl.nl:2811/dpm/lumc.nl/home/lsgrid/homer/zap.tar file:///`pwd`/zap.tar # note the flag -server_mode=passive!

* Copy file from local machine to dCache:

.. code-block:: bash

	globus-url-copy file:///`pwd`/zap.tar gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar

* Copy file from local machine to DPM:
 
.. code-block:: bash

  globus-url-copy file:///`pwd`/zap.tar gsiftp://gb-se-lumc.lumc.nl.nl:2811/dpm/lumc.nl/home/lsgrid/homer/zap.tar


* Recursive upload to dCache:

.. code-block:: bash

  globus-url-copy -cd -r /home/homer/testdir/ gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/testdir/ # replace testdir with your directory

* Recursive upload to DPM:

.. code-block:: bash

  globus-url-copy -cd -r /home/homer/testdir/ gsiftp://gb-se-lumc.lumc.nl.nl:2811/dpm/lumc.nl/home/lsgrid/homer/testdir/

* Recursive download from dCache:

First create the directory locally, e.g. ``testdir``:

.. code-block:: bash

	globus-url-copy -cd -r gsiftp:///gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/testdir/ /home/homer/testdir/
	
* Recursive download from DPM:	

.. code-block:: bash

  globus-url-copy -cd -r gsiftp://gb-se-lumc.lumc.nl.nl:2811/dpm/lumc.nl/home/lsgrid/homer/testdir/ /home/homer/testdir/

* Third party transfer:

.. code-block:: bash

  globus-url-copy -cd -r gsiftp://gb-se-lumc.lumc.nl.nl:2811/dpm/lumc.nl/home/lsgrid/homer/testdir/ gsiftp://gb-se-ams.els.sara.nl/dpm/els.sara.nl/home/lsgrid/penelope/testdir

