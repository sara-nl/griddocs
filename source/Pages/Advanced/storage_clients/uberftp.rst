.. _uberftp:


****************
*uberftp* client
****************
 
This page includes the basic commands to use ``uberftp``. For an overview of storage clients, see :ref:`storage-clients`.
    
In the following examples, a file named *zap.tar* is owned by *homer*, who has an account on the UI and is a member of a  VO *your-vo*, or with an account on the UI on the *lumc* cluster and is a member of the VO *lsgrid* (only in the case of LSG VO members). It should be noted again that the dCache storage located at SURFsara is accessible from any Grid cluster or UI, while the DPM storage located at various clusters can only be accessed by LSG users.

Creating/listing 
================

.. note:: To run the examples below you need to have a valid proxy, see :ref:`startgridsession`. 

Note that you should create a directory in your username as it is not created by default when your account is created. This is shown below.

* Create a new directory for a user *homer* on dCache:

  .. code-block:: console

     $uberftp -mkdir gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/your-vo/homer
     $uberftp -mkdir gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer

* Create a new directory for a user *homer* on :abbr:`DPM (Disk Pool Manager)` at *lumc* cluster:

  .. code-block:: console

     $uberftp -mkdir gsiftp://gb-se-lumc.lumc.nl:2811/dpm/lumc.nl/home/lsgrid/homer
     
* Listing directories on dCache:

  .. code-block:: console

     $uberftp -ls gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/your-vo/

* Listing directories on :abbr:`DPM (Disk Pool Manager)`:

  .. code-block:: console

     $uberftp -ls gsiftp://gb-se-lumc.lumc.nl:2811/dpm/lumc.nl/home/lsgrid


Transferring data
=================

* Copy file from local machine to dCache:

  .. code-block:: console

     $uberftp file:///home/homer/zap.tar gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar 

* Copy file from local machine to :abbr:`DPM (Disk Pool Manager)`:

  .. code-block:: console

     $uberftp file:///home/homer/zap.tar gsiftp://gb-se-lumc.lumc.nl:2811/dpm/lumc.nl/home/lsgrid/homer/zap.tar 
     
* Copy file from dCache to local machine:

  .. code-block:: console

    $uberftp gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar file:///home/homer/zap.tar 

* Copy file from :abbr:`DPM (Disk Pool Manager)` to local machine:

  .. code-block:: console

     $uberftp gsiftp://gb-se-lumc.lumc.nl:2811/dpm/lumc.nl/home/lsgrid/homer/zap.tar  file:///home/homer/zap.tar


.. note::  The asterisk “*” wildcard (match all characters) works with uberftp. Please use this option with caution, especially when deleting files.

Parallel streams
----------------

The GridFTP protocol allows for parallel streaming of data transfers. This makes a transfer more efficient and less susceptible to network errors, especially over long distances. If you have a lot of simultaneous transfers running anyway, increasing the number of streams per transfer will not make a big difference, because the network bandwidth may limit the results.

.. code-block:: console

   $uberftp -parallel 4 \
   $     gsiftp://gb-se-lumc.lumc.nl:2811/dpm/lumc.nl/home/lsgrid/homer/zap.tar \
   $     file:zap.tar

Results may vary based on circumstances. We suggest a number of 4 streams as a start.


Removing data
=============

* Remove a file from dCache:

  .. code-block:: console

     $uberftp -rm gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar

* Remove a file from :abbr:`DPM (Disk Pool Manager)`:

  .. code-block:: console

     $uberftp -rm gsiftp://gb-se-lumc.lumc.nl:2811/dpm/lumc.nl/home/lsgrid/homer/zap.tar

* Remove whole (non-empty) directory with all content from dCache:

  .. code-block:: console

     $uberftp -rm -r gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/testdir/


* Remove whole (non-empty) directory with all content from :abbr:`DPM (Disk Pool Manager)`:

  .. code-block:: console

     $uberftp -rm -r gsiftp://gb-se-lumc.lumc.nl:2811/dpm/lumc.nl/home/lsgrid/homer/testdir/	
