.. _uberftp:


****************
*uberftp* client
****************
 
This page includes the basic commands to use ``uberftp``:

.. contents:: 
    :depth: 4
    
    
=======    
Uberftp
=======

Creating/listing 
================

.. note:: To run the examples below you need to have a valid proxy, see :ref:`startgridsession`. 

* Listing directories on dCache:

.. code-block:: bash

  uberftp -ls gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/
  
* Listing directories on DPM:

.. code-block:: bash

  uberftp -ls gsiftp://gb-se-lumc.lumc.nl:2811/dpm/lumc.nl/home/lsgrid
  
* Create a new directory on dCache:

.. code-block:: bash

  uberftp -mkdir gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/newdir 

* Create a new directory on DPM:
 
.. code-block:: bash

  uberftp -mkdir gsiftp://gb-se-lumc.lumc.nl:2811/dpm/lumc.nl/home/lsgrid/homer/newdir 


Transferring data
=================

* Copy file from local machine to dCache:

.. code-block:: bash

  uberftp file:///home/homer/zap.tar gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar 

* Copy file from local machine to DPM:

.. code-block:: bash

  uberftp file:///home/homer/zap.tar gsiftp://gb-se-lumc.lumc.nl:2811/dpm/lumc.nl/home/lsgrid/homer/zap.tar 


Parallel streams
----------------

Information not available yet.


Removing data
=============

* Remove a file from dCache:

.. code-block:: bash

    uberftp -rm gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar

* Remove a file from DPM:

.. code-block:: bash

    uberftp -rm gsiftp://gb-se-lumc.lumc.nl:2811/dpm/lumc.nl/home/lsgrid/homer/zap.tar

* Remove whole (non-empty) directory with all content from dCache:

.. code-block:: bash

	uberftp -rm -r gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/testdir/
	
	
* Remove whole (non-empty) directory with all content from DPM:

.. code-block:: bash

	uberftp -rm -r gsiftp://gb-se-lumc.lumc.nl:2811/dpm/lumc.nl/home/lsgrid/homer/testdir/	

		

		
