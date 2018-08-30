
.. _grid-storage:

************
Grid storage
************

In this page we will talk about the Grid storage facilities, the tools to interact with it and the method to handle data that is stored on tape.

.. contents:: 
    :depth: 4


====================
About Grid storage
====================

Each cluster on the Grid is equipped with a Storage Element or SE where data is stored. The Grid storage is useful for applications that handle large amount of data that can not be sent with the :ref:`job Sandbox <job-lifecycle>` or stored in a :ref:`pilot job database <pilotjob-db>`.

You can interact with the Grid storage from the :abbr:`UI (User Interface)` or from a Worker Node, within your running job. The scripts that can access the Grid storage can be submitted from:

* :ref:`The UI <get-ui-account>`
* :ref:`The Dutch Grid <dutch-grid>` 

To use the Grid storage you must:

* Have :ref:`a personal Grid certificate <get-grid-certificate>` [1]_
* Be member of :ref:`a VO <join-vo>` for which we have allocated storage space.

You can access the Grid storage with Grid :ref:`storage-clients`, through interfaces that speak protocols like :abbr:`SRM (Storage Resource Management)`, :abbr:`GridFTP (File Transfer Protocol with Grid authentication)`, :abbr:`GSIdCap (dCache Access Protocol with Grid auhthentication)` or :abbr:`Webdav (Web Distributed Authoring and Versioning)`. With these storage clients you can:

* list directories and files
* read (download) files
* write (upload) files
* delete files or directories
* :ref:`stage <staging>` files (copy them from tape to disk for faster reading)

.. [1] It is possible to access the dCache Grid storage without certificate, by using :ref:`webdav` with username/password authentication. However, authentication with username/password is less secure, and Webdav is not as fast as :abbr:`GridFTP (File Transfer Protocol with Grid authentication)`.


.. _storage-types:

======
dCache
======

The storage element located at SURFsara is accessible from *any* Grid cluster or :abbr:`UI (User Interface)`. It uses the `dCache system`_ for storing and retrieving huge amounts of data, distributed among a large number of server nodes. It consists of magnetic tape storage and hard disk storage and both are addressed by a common file system. See :ref:`dCache-specs` for details about our dCache instance.


.. _file-id:

=====================
Grid file identifiers
=====================

You can refer to your files on the Grid with different ways depending on which of the available :ref:`storage-clients` you use to manage your files: 

Transport URL or TURL
=====================

Examples:

.. code-block:: bash

	# lsgrid user homer stores the file zap.tar on dCache storage
	gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar
	
	# same, but with a Webdav TURL
	https://webdav.grid.surfsara.nl/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar

.. topic:: Clients for TURLs

	* uberftp
	* globus
	* gfal
	* fts
	* globusonline

Storage URL or SURL
===================

Example:

.. code-block:: bash

	# lsgrid user homer stores the file zap.tar on dCache storage
	srm://srm.grid.sara.nl:8443/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar 

	
.. topic:: Clients for SURLs

	* srm
	* gfal
	* fts


.. _storage-ports:

Default ports
=============

+------------+--------------------------------------+--------------------------------------+
| Protocol   | Host(s) and port(s)                  | Remark                               |
+============+======================================+======================================+
| SRM        | srm://srm.grid.sara.nl:8443          |                                      |
+------------+--------------------------------------+--------------------------------------+
| GridFTP    | gsiftp://gridftp.grid.sara.nl:2811   | Data channel port range: 20000-25000 |
+------------+--------------------------------------+--------------------------------------+
|            | https://webdav.grid.surfsara.nl:443  |                                      |
+            +--------------------------------------+                                      +
| Webdav     | https://webdav.grid.surfsara.nl:2880 | See :ref:`webdav` for details        |
+            +--------------------------------------+                                      +
|            | https://webdav.grid.surfsara.nl:2882 |                                      |
+            +--------------------------------------+                                      +
|            | https://webdav-cert.grid.sara.nl:443 |                                      |
+------------+--------------------------------------+--------------------------------------+
| GSIdCap    | gsidcap://gsidcap.grid.sara.nl:22128 |                                      |
+------------+--------------------------------------+--------------------------------------+
| xroot      | xrootd.grid.sara.nl:1094             | Used by CERN only                    |
+------------+--------------------------------------+--------------------------------------+
| all        | ipv4.grid.sara.nl                    | For clients that don't speak IPv6    |
+------------+--------------------------------------+--------------------------------------+

The last one, ipv4.grid.sara.nl, is a single VM that supports only IPv4 and no IPv6. It can be used for small scale access through GridFTP, Webdav, Xroot or GSIdCap where IPv6 causes problems. Don't use it for batch processing.


.. _storage-clients:

===============
Storage clients
===============

The ``InputSandbox`` and ``OutputSandbox`` attributes in the :ref:`JDL <JDL>` file are the basic way to move files to and from the User Interface (UI) and the Worker Node (WN). However, when you have large files (from about 100 MB and larger) then you should not use these sandboxes to move data around. Instead you should use the :ref:`storage-types` and work with several :ref:`storage-clients`. 

In this section we will show the common commands to use the various storage clients. 

.. note:: From the many Grid storage clients, we recommend you to use the : :ref:`globus` or :ref:`gfal`. These tools have a clean interface, and their speed is much better on our systems compared with their srm-* equivalents.

.. table:: Storage clients

  +---------------------+-----+--------------+---------+--------+-----------+-------------------+
  |                     |               protocols               |                               |
  +---------------------+-----+--------------+---------+--------+-----------+-------------------+
  | Client              | SRM | GridFTP [2]_ | GSIdCap | Webdav | 3rd party | Tape control [3]_ |
  +=====================+=====+==============+=========+========+===========+===================+
  | :ref:`globus`       | --  | yes          | --      | --     | --        | --                |
  +---------------------+-----+--------------+---------+--------+-----------+-------------------+
  | :ref:`srm`          | yes | [4]_         | [4]_    | [4]_   | yes       | yes               |
  +---------------------+-----+--------------+---------+--------+-----------+-------------------+
  | :ref:`gfal`         | yes | yes          | --      | --     | yes       | yes               |
  +---------------------+-----+--------------+---------+--------+-----------+-------------------+
  | :ref:`webdav`       | --  | --           | --      | yes    | --        | --                |
  +---------------------+-----+--------------+---------+--------+-----------+-------------------+
  | :ref:`fts`          | yes | yes          | --      | yes    | yes       | yes               |
  +---------------------+-----+--------------+---------+--------+-----------+-------------------+
  | :ref:`globusonline` | --  | yes          | --      | --     | yes       | --                |
  +---------------------+-----+--------------+---------+--------+-----------+-------------------+
  | :ref:`uberftp` [5]_ | --  | yes          | --      | --     | --        | --                |
  | (not recommended)   |     |              |         |        |           |                   |
  +---------------------+-----+--------------+---------+--------+-----------+-------------------+

.. [2] The GridFTP protocol offers the best network performance.

.. [3] Examples of tape control: staging a file from tape to disk, or get its locality (tape or disk).

.. [4] SRM and LCG commands use the :abbr:`SRM (Storage Resource Management)` protocol for metadata level operations and switch to another protocol like GridFTP for file transfers. This may cause protocol overhead. For example, authentication needs to be done twice: once for each protocol. For small files, that may be inefficient.

.. [5] UberFTP currently has a dangerous bug that may destroy data. See https://ggus.eu/?mode=ticket_info&ticket_id=129103 for details.

.. toctree::
   :hidden:
   
   storage_clients/uberftp
   storage_clients/globus
   storage_clients/srm
   storage_clients/gfal
   storage_clients/webdav
   storage_clients/fts
   storage_clients/globusonline

.. _staging:

=============
Staging files
=============

The :ref:`dCache` storage at SURFsara consists of magnetic tape storage and hard disk storage. If your :ref:`quota allocation <quotas>` includes tape storage, then the data stored on magnetic tape has to be copied to a hard drive before it can be used. This action is called :ref:`staging` or 'bringing a file online'.

.. note:: Staging is important. If your job reads a file that is on tape but not online, your job will wait until dCache brings the file online (or reaches a timeout). This may take minutes when it's quiet, but it may take days when multiple users are staging large datasets. That would be a waste of CPU cycles. But that's not all: the number of concurrent transfers is limited per pool, so it would also be a waste of transfers slots.


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

There are some more file statuses. See the `SRMv2 specifications <https://sdm.lbl.gov/srm-wg/doc/SRM.v2.2.html#_Toc241633052>`_ for a full list.

.. _staging-single-file:

Staging a single file
=====================

.. note:: For the staging examples below, you need a valid proxy, see :ref:`startgridsession`.

Here is an example of how to stage a single file:

.. code-block:: console

	$srm-bring-online srm://srm.grid.sara.nl/pnfs/grid.sara.nl/data/lsgrid/test
	srm://srm.grid.sara.nl/pnfs/grid.sara.nl/data/lsgrid/test brought online, use request id 424966221 to release

Don't use this method to stage multiple files. Use the ``stage.py`` example below instead, because it is much more efficient.

How to display the locality:

.. code-block:: console

	$srmls -l srm://srm.grid.sara.nl/pnfs/grid.sara.nl/data/lsgrid/test | grep locality
	  locality:ONLINE_AND_NEARLINE



.. _staging-group-of-files:

Staging groups of files
=======================

The example below shows how to stage a list of files with known :abbr:`SURLs (Storage URLs)`.

* Copy and untar the tarball :download:`staging scripts </Scripts/staging.tar>` to your :abbr:`UI (User Interface)` home directory.

* Create a proxy on the :abbr:`UI (User Interface)`:

  .. code-block:: console
  
	$startGridSession lsgrid  

* The file paths should be listed in a file called ``files`` with the following format:

  .. code-block:: console

	/pnfs/grid.sara.nl/data/...

  Let's say that you have a list of :abbr:`SURLs (Storage URLs)` that you want to stage. Convert the list of 
  :abbr:`SURLs (Storage URLs)` in the ``datasets/example.txt`` file to the desired ``/pnfs`` format: 

  .. code-block:: console

	$grep --only-matching '/pnfs/grid.sara.nl.*' datasets/example.txt > files

* Display the locality of the files with:

  .. code-block:: console

	$python state.py


* Stage the files:  

  .. code-block:: console

	$python stage.py

This script stages a number of files from tape. You can change the pin lifetime in the ``stage.py`` script by changing the ``srmv2_desiredpintime`` attribute in seconds.



.. _monitor-staging:

Monitor staging activity
========================

Once you submit your stage requests, you can use the gfal scripts to monitor the status or check the webpage below that lists all the current staging requests:

	http://dcmain.grid.sara.nl:2288/poolInfo/restoreHandler/lazy


.. _unpin-file:

Unpin a file
============

Your files may remain *online* as long as there is free space on the disk pools. When a pool group is full and free space is needed, dCache will purge the least recently used cached files. The tape replica will remain on tape.

The disk pool where your files are staged has limited capacity and is only meant for data that a user wants to process on a Grid site. When you :ref:`pin a file <staging-single-file>` you set a `pin lifetime`. The file will not be purged until the pin lifetime has expired. Then the data may be purged from disk, as soon as the space is required for new stage requests. When the disk copy has been purged, it has to be staged again in order to be processed on a Worker Node.

When a pool group is full with pinned files, staging is paused. Stage requests will just wait until pin lifetimes for other files expire. dCache will then use the released space to stage more files until the pool group is full again. When this takes too long, stage requests will time out. So pinning should be used moderately.

When you are done with your processing, we recommend you release (or unpin) all the files that you don't need any more. In order to unpin a file, run from the UI:

.. code-block:: console

	$srm-release-files srm://srm.grid.sara.nl:8443/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar # replace with your SURL

This command will initiate unpinning of file ``zap.tar`` (even if you submitted multiple pin requests) and the file will remain cached but purgeable until new requests will claim the available space. It is an optional action, but helps a lot with the effective system usage.

.. warning:: At the moment neither the ``srm-bring-online`` nor the python ``gfal`` scripts can effectively release a file if there are multiple pin requests. Please use ``srm-release-files``.


.. Links:

.. _`dCache system`: https://www.dcache.org/

.. vim: set wm=7 :



=========
Checksums
=========

dCache checks the checksum of a file on many operations (for instance, during tape store & restore operations). If dCache finds, that the checksum of a file does not match the checksum it has in its database, dCache will refuse to continue and will present an error message instead.

dCache is configured to use Adler32 checksums by default, for performance reasons. It is however possible to transfer files to dCache while verifying MD5 checksums. Globus Online works only with MD5 checksums, and previous versions of dCache did not support MD5 checksums, so one would have to disable checksum checking in Globus. Now, dCache does support MD5 checksums during transfers, even when the default checksum type is Adler32. So now Globus Online and dCache should be able to work together with checksums enabled. If a GridFTP client uploads data with MD5 verification enabled, dCache will calculate the MD5 checksum, return this to the client and store it in its database.

dCache does not enable a user to add MD5 checksums of **existing** data.

We may however, if your project needs it, change the default checksum from Adler32 to MD5 for your poolgroups. From the moment we do that, for new files, dCache will store MD5 checksums in its database, and this MD5 checksum will be used to verify file integrity during operations. Checksums for existing data will not be recalculated however: they will remain Adler32.

Checksums can be listed with `srmls -l`:

.. code-block:: console

	$srmls -l srm://srm.grid.sara.nl/pnfs/grid.sara.nl/data/lsgrid/test | grep locality

Also through :ref:`webdav` you can retrieve a file's checksum. The checksum value comes from the database so it performs well.


.. _SRM-interaction-diagram:


==================
Transport security
==================

With most protocols, the authentication is done over a secured channel (usually encrypted with TLS). After authentication, the data is transferred in plain text. Since most users are from High Energy Physics, this is usually no problem.

Life scientists however may need to store private data such as MRI scans or DNA scans. The European GDPR law requires careful handling of such personal data. We therefore suggest that you keep such data safe during transport. Below we give an overview which protocols in dCache encrypt data during transfer.

Data channel encryption:

* WebDAV over port 2880
* WebDAV over port 2883
* WebDAV over port 443 only through https://webdav-cert.grid.sara.nl

NO data channel encryption:

* WebDAV over port 443
* WebDAV over port 2882
* SRM
* GridFTP (dCache does not support GridFTP data encryption. Please be warned that `globus-url-copy -dcpriv` does not warn you about this and tranfers your data in plain text.)
* GSIdCap, dCap
* Xroot

Since WebDAV is currently the only way to encrypt data in transit, we continuously try to improve the security of our WebDAV doors. We regularly test our WebDAV doors with tools like `the Qualys SSLtest <https://www.ssllabs.com/ssltest/>`_, `nmap <https://nmap.org/>`_, `Greenbone/OpenVAS <http://www.openvas.org/>`_, and others and follow their recommendations.

The conclusion: if your data is personal, safely upload it to and download it from dCache, by using WebDAV over ports 2880 or 2883.


===============================
SRM interaction example diagram
===============================

Here is a sequence diagram that illustrates how the :abbr:`SRM (Storage Resource Manager)` commands interact with the Grid storage.

.. image:: /Images/Using_SRM.png

.. comment: Image source at https://www.websequencediagrams.com/?lz=dGl0bGUgVXNpbmcgU1JNCgpzcm0tYnJpbmctb25saW5lXG5jb21tYW5kIC0-IFNSTVxuZG9vcjogUHJveHkgY2VydGlmaWNhdGUKbm90ZSBvdmVyABsMQXV0aGVudGljYXRpbmcgXG4mIHVzZXIgbWFwcGluZwoASQkgLT4gAGMZOiBZb3UncmUgYQBFCmVkAIEDKXNybUJyaW5nTwCBTQUgPFNVUkw-AIEWGm9yaXplZD8AgTsWUXVldWluZyByZXN0b3JlIG9wZXJhdGlvbgCBIilTdGFnaW5nAIEABywgY2hlY2sgYmFjayBsYXRlcgCCPgsAgXYbV2FpdGluZwCCYBZSAIEYBWluZyBmaWxlAIMrKUlzAIIVByAAg3YGPwCCdSplcywANAhpcwA4BwCESAVjcACDU28AZgsAhB0aAHwac3JtR2V0AIN7KQBhHVVzZSA8VACCTAVmb3IgZG93bmxvYQBtFEdyaWRGVFAAhjkkABwPAIZBIABNDQCCDxQAhxcLAIIHFQCBDA8AghgFAIFPBQB2HgCGPQgAXyFGaWxlIHRyYW5zZmVyCgo&s=roundgreen

As you can see from this diagram, there can be a lot of overhead per file. For this reason, Grid storage performs best with large files. We recommend to store files of several megabytes to gigabytes. Some users have files of more than 2 terabytes, but that may be impractical on other systems with limited space like worker nodes.

===============================
Importing large amounts of data
===============================

The `Data Ingest Service <https://www.surf.nl/en/services-and-products/data-ingest-service/index.html>`_ is a SURFsara service for researchers who want to store or analyze large amounts of data at SURFsara. The service is convenient for users who lack sufficient bandwidth or who have stored their data on a number of external hard disks.
