
.. _grid-storage:

************
Grid Storage
************

In this page we will talk about the Grid storage facilities, the tools to interact with it and the method to process data that is stored on tape (Staging):

.. contents:: 
    :depth: 4
    

====================
About Grid Storage
====================

Each cluster on the Grid is equipped with a Storage Element or SE where data is stored. The Grid storage is useful for applications that handle large amount of data that can not be sent with the :ref:`job Sandbox <job-lifecycle>` or stored in a :ref:`pilot job database <pilotjob-db>`.

You can interact with the Grid storage from the UI or from the worker node, within your running job. The scripts that can access the Grid Storage can be submitted from:

* :ref:`The UI <get-ui-account>`
* :ref:`Any local LSG cluster <lsg-clusters>`
* :ref:`The Dutch Grid <dutch-grid>` 

To use the Grid storage you must already have:

* :ref:`A personal grid certificate <get-grid-certificate>`
* :ref:`A VO membership <join-vo>`

In general we do not support direct interaction with the Grid storage. However,
dCache and DPM support srm and gridftp interfaces, which offer a lot of unix-like commands, like listing, copying, deleting files and so on.


.. _storage-types:

=============
Storage types
=============

There are two storage types available on the Dutch Grid sites: 

* The :ref:`dCache` storage element located at SURFsara and accessible from *any* Grid site.
* The :ref:`DPM` storage elements located at each :ref:`LSG cluster <lsg-clusters>` and accessible *only* by the :ref:`lsg` users.


.. _dCache:

dCache
======

The storage element located at SURFsara is accessible from *any* Grid cluster or UI. It uses the `dCache system`_ for storing and retrieving huge amounts of data, distributed among a large number of server nodes. It consists of magnetic tape storage and hard disk storage and both are addressed by a common file system.

.. _dpm:

DPM
===

The storage elements located at the various :ref:`LSG clusters <life-science-clusters>` are accessible *only* by the LSG users. The LSG clusters have local storage that uses DPM (short for Disk Pool Manager).


.. note:: The DPM storage is only disk storage and does not support tape back-end. In opposite, the dCache central storage has both disk and tape.


.. _file-id:

=====================
Grid file identifiers
=====================

You can refer to your files on the Grid with different ways depending on which of the available :ref:`storage-clients` you use to manage your files: 

* Transport URL or **TURL**, e.g.:

.. code-block:: bash

	# lsgrid user homer stores the file zap.tar on dCache storage
	gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar 
	
	# lsgrid user homer stores the file zap.tar on DPM storage at lumc cluster
	gsiftp://gb-se-lumc.lumc.nl:2811/dpm/lumc.nl/home/lsgrid/homer/zap.tar
	
.. topic:: Clients for TURLs

	* uberftp
	* globus
	* gfal
	* fts
	* globusonline

* Storage URL or **SURL**, e.g.:

.. code-block:: bash

	# lsgrid user homer stores the file zap.tar on dCache storage
	srm://srm.grid.sara.nl:8443/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar 
	
	# lsgrid user homer stores the file zap.tar on DPM storage at lumc cluster
	srm://gb-se-lumc.lumc.nl:8446/dpm/lumc.nl/home/lsgrid/homer/zap.tar 
	
.. topic:: Clients for SURLs

	* srm
	* gfal
	* fts
	* lcg-lfn-lfc	


* Logical File Name (LFN) and Grid Unique Identifier (GUID). These identifiers correspond to logical filename such as ``lfn:/grid/lsgrid/homer/zap.tar``


.. note:: The SURLs and TURLs contain information about where a ``physical`` file is located. While the GUIDs and LFNs identify a ``logical`` filename irrespective of its location. You only need to use these if you work with :ref:`large-data-lfc-practice` on multiple LSG sites.


.. _storage-ports:

Default ports
=============

dCache
------

+------------+--------------------------------------+-------------------------------------------+
| Protocol   | Host(s) and port(s)                  | Remark                                    |
+============+======================================+===========================================+
| SRM        | srm://srm.grid.sara.nl:8443          |                                           |
+------------+--------------------------------------+-------------------------------------------+
| gridftp    | gsiftp://gridftp.grid.sara.nl:2811   | Data channel port range: 20000-25000      |
+------------+--------------------------------------+-------------------------------------------+
| webdav     | https://webdav.grid.sara.nl:443      | Redirects on read;                        |
|            |                                      | Authentication with username/password     |
+            +--------------------------------------+-------------------------------------------+
|            | https://webdav.grid.sara.nl:2880     | No redirects;                             |
|            |                                      | Authentication with username/password     |
+            +--------------------------------------+-------------------------------------------+
|            | https://webdav.grid.sara.nl:2881     | Redirects;                                |
|            |                                      | Authentication with user certificate      |
+------------+--------------------------------------+-------------------------------------------+
| gsidcap    | gsidcap://gsidcap.grid.sara.nl:22128 |                                           |
+------------+--------------------------------------+-------------------------------------------+
| xroot      | xrootd.grid.sara.nl:1094             | Used by CERN only                         |
+------------+--------------------------------------+-------------------------------------------+


DPM
---

* The default ``DPM`` srm port is **8446**::

    srm://gb-se-lumc.lumc.nl:8446/...
  
 
* The default ``DPM`` gridftp port is **2811**::

    gsiftp://gb-se-lumc.lumc.nl:2811/...


.. _storage-clients:

===============
Storage clients
===============

The InputSandbox and OutputSandbox attributes in the :ref:`JDL <JDL>` file are the basic way to move files to and from the User Interface (UI) and the Worker Node (WN). However, when you have large files (from about 100 MB and larger) then you should not use these Sandboxes to move data around. Instead you should use the :ref:`storage-types` and work with several :ref:`storage-clients`. 

In this section we will show the common commands to use the various storage clients. 

.. note:: From the many Grid storage clients, we recommend you to use :ref:`uberftp` and :ref:`globus` or :ref:`gfal`. These tools have a clean interface, and their speed is much better on our systems compared with their srm-* equivalents.

.. table:: Storage clients

  +----------------------+------+---------------+---------------+--------+-----------+-------+----------------------+
  |                      |                  protocols                    |                                          |
  +----------------------+------+---------------+---------------+--------+-----------+-------+----------------------+
  | Client               | SRM  | GridFTP       | GSIdCap       | WebDAV | 3rd party | Speed | Tape control [1]_    |
  +======================+======+===============+===============+========+===========+=======+======================+
  | :ref:`uberftp`       | --   | yes           | --            | --     | --        | high  | --                   |
  +----------------------+------+---------------+---------------+--------+-----------+-------+----------------------+
  | :ref:`globus`        | --   | yes           | --            | --     | --        | high  | --                   |
  +----------------------+------+---------------+---------------+--------+-----------+-------+----------------------+
  | :ref:`srm`           | yes  | indirect [2]_ | indirect [2]_ | ?      | --        |       | yes                  |
  +----------------------+------+---------------+---------------+--------+-----------+-------+----------------------+
  | :ref:`gfal`          | yes  | yes           | ?             | ?      | --        |       | yes                  |
  +----------------------+------+---------------+---------------+--------+-----------+-------+----------------------+
  | :ref:`webdav`        | --   | --            | --            | yes    | --        |       | --                   |
  +----------------------+------+---------------+---------------+--------+-----------+-------+----------------------+
  | :ref:`fts`           | yes  | ?             | ?             | ?      | yes       |       | --                   |
  +----------------------+------+---------------+---------------+--------+-----------+-------+----------------------+
  | :ref:`globusonline`  | yes  | yes           | ?             | ?      | yes       |       | --                   |
  +----------------------+------+---------------+---------------+--------+-----------+-------+----------------------+
  | :ref:`lcg-lfn-lfc`   | yes  | indirect [2]_ | ?             | ?      | --        |       | --                   |
  +----------------------+------+---------------+---------------+--------+-----------+-------+----------------------+

.. [1] Examples of tape control: staging a file from tape to disk, or get its locality (tape or disk).
.. [2] SRM commands use the SRM protocol for metadata level operations and switches to other protocols like gridftp for file transfers.

.. toctree::
   :hidden:
   
   storage_clients/uberftp
   storage_clients/globus
   storage_clients/srm
   storage_clients/gfal
   storage_clients/webdav
   storage_clients/fts
   storage_clients/globusonline
   storage_clients/lcg-lfn-lfc

.. _staging:

=============
Staging files
=============

The :ref:`dCache` storage at SURFsara consists of magnetic tape storage and hard disk storage. If your :ref:`quota allocation <quotas>` includes tape storage, then the data stored on magnetic tape has to be copied to a hard drive before it can be used. This action is called :ref:`staging` or 'bringing a file online'.

.. table:: Staging terms

  +---------------------+-----------------------------------------------------------------+
  | Locality            | Meaning                                                         |
  +=====================+=================================================================+
  | ONLINE              | The file is only on disk                                        |
  +---------------------+-----------------------------------------------------------------+
  | NEARLINE            | The file is only on tape; it should be staged before reading it |
  +---------------------+-----------------------------------------------------------------+
  | ONLINE_AND_NEARLINE | The file is both on disk and on tape                            |
  +---------------------+-----------------------------------------------------------------+


.. _pin-file:

File pinning example
====================

The example below shows how to stage a list of files with known SURLs.

.. note:: To run the example below you need to have a valid proxy, see :ref:`startgridsession`. 

* Copy and untar the tarball :download:`staging scripts </Scripts/staging.tar>` to your UI directory.

* Create a proxy on UI:

.. code-block:: bash
  
	$ startGridSession lsgrid  

* The file paths should be listed in a file called ``files`` with the following format:

.. code-block:: bash

	/pnfs/grid.sara.nl/data/...

Let's say that you have a list of SURLs that you want to stage. Convert the list of SURLs in the datasets/example.txt file to the desired ``/pnfs`` format: 

.. code-block:: bash

	$ sed -e "s/srm:\/\/srm.grid.sara.nl:8443//" datasets/example.txt > files

* Display the locality of the files with:

.. code-block:: bash

	$ python state.py


* Stage the files:  

.. code-block:: bash

	$ python stage.py

This script stages a number of files from tape. You can change the pin lifetime in the stage.py script by changing the ``srmv2_desiredpintime`` attribute in seconds.

* Display the locality of a single file:

.. code-block:: bash

	$ srmls -l srm://srm.grid.sara.nl/pnfs/grid.sara.nl/data/lsgrid/test | grep locality
	  locality:ONLINE_AND_NEARLINE



.. monitor-staging:

Monitor staging activity
------------------------

Once you submit your stage requests, you can use the gfal scripts to monitor the status or check the webpage below that lists all the current staging requests:

	http://dcmain.grid.sara.nl:2288/poolInfo/restoreHandler/lazy


.. _unpin-file:

Unpin a file
------------

Your files may remain ``ONLINE`` as long as there is free space on the disk pools and then they will be purged for new coming staging requests.

The disk pool where your files are staged has limited capacity and is only meant for data that a user wants to process on a Grid site. When you :ref:`pin a file <pin-file>` you set a `pin lifetime` that, when it expires, causes the data to be released automatically. Then the data may be purged from disk, as soon as the space is required for stage requests.

Once the data is unpinned, it will remain of course on tape and has to be staged again in order to be processed on a Worker Node. 

When you are done with your processing, we recommend you release (or unpin) all the files that you don't need any more. In order to unpin a file, run from the UI:

.. code-block:: bash

	$ srm-release-files srm://srm.grid.sara.nl:8443/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar # replace with your SURL

This command will initiate unpinning of file "zap.tar" (even if you submitted multiple pin requests) and the file will remain cached but purgeable until new requests will claim the available space. It is an optional action, but helps a lot with the effective system usage.

.. warning:: At the moment neither the srm-bring-online nor the python gfal scripts can effectively release a file if there are multiple pin requests. Please use ``srm-release-files``.


.. Links:

.. _`dCache system`: https://www.dcache.org/

.. vim: set wm=7 :


===============================
Importing large amounts of data
===============================

The `Data Ingest Service <https://www.surf.nl/en/services-and-products/data-ingest-service/index.html>`_ is a SURFsara service for researchers who want to store or analysis large amounts of data at SURFsara. The service is convenient for users who lack sufficient bandwidth or who have stored their data on a number of external hard disks.
