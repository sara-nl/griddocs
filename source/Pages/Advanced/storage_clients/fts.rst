.. _fts:

************
*fts* client
************

This page includes the basic commands to use the FTS (File Transfer Service). For an overview of storage clients, see :ref:`storage-clients`.

.. contents:: 
    :depth: 4


===
FTS
===

`FTS3`_ is a file transfer service for reliable file transfers across sites or else, *third party* transfers. You cannot use it to transfer files from your local machine to dCache and vice-versa. FTS3 service has been running for years. It was developed by Cern for WLCG data transfers up to petabytes per month.

From the user perspective, it allows data movement, retrying if necessary, monitoring and displaying usage statistics, see `FTS3 wiki`_. From the operations view, it optimises resource usage. 

It supports all the basic transfer protocols, such as: GridFTP, SRM, Webdav, HTTPS, xroot. It is open source and can be used from command-line clients or WebFTS, the web-interface version, or python bindings. 

The FTS client is currently installed on the UI ``ui.grid.sara.nl``. It is not available on the :ref:`LSG UI <lsg-hostnames>` machines.

  .. image:: /Images/Using_the_File_Transfer_Service.png

  .. comment: Image source is at https://www.websequencediagrams.com/?lz=dGl0bGUgVXNpbmcgdGhlIEZpbGUgVHJhbnNmZXIgU2VydmljZQoKcGFydGljaXBhbnQgVXNlciBJbnRlcmZhY2UADg1GVFMAHg1TdG9yYWdlIEVsZW1lbnQgMQABHTIKCgBODiAtPiBGVFM6IGZ0cy10AIEOBy1zdWJtaXQKCmxvb3AgZm9yIGVhY2ggZmlsZSBpbiBqb2IKICBGVFMgLT4AbhI6IHByZXBhcmUANAUASwgAFxoyAAEwMTogc3RhcnQAUAwAgXURAFMXR3JpZEZUUACBRQYAICAAghMFcmVzdWx0AFATMgATEGVuZACCNyd0YXR1cwoAgjoHAINeDgBoCQo&s=roundgreen


Authentication
==============
 
To use the :abbr:`FTS (File Transfer Service)` you need to create a local proxy. Then`fts-transfer-submit` automatically delegates the proxy to the :abbr:`FTS (File Transfer Service)` server (default lifetime is 12 hours). When the remaining lifetime of the stored proxy passes under 4 hours, fts-transfer-submit will automatically delegate a new one as long as there is a valid **local proxy**.


FTS file transfers
==================

.. note:: To run the examples below you need to have a valid local proxy.  The ``voms-proxy-init`` tool can be used to generate a proxy with :abbr:`VOMS (Virtual Organization Membership Service)` attributes from the personal certificate. See :ref:`startgridsession-explained`. 


fts-transfer-submit
-------------------
This command submits transfer-jobs by specifying the source and destination file location. The file location can be a :abbr:`SURL (Storage URL)`, :abbr:`TURL (Transport URL)` or HTTPS link. The source and destination endpoints are GridFTP or :abbr:`SRM (Storage Resource Manager)` servers. The output of the command is a *unique ID* that can be used for tracing the transfer status.


Basic options
-------------

* ``-v``: enable verbose information  
* ``-s``: specify fts server  
* ``-K``: enable checksum. By default, adler32 is supported on the SURFsara servers.


File transfer - TURL to TURL
----------------------------

.. code-block:: console

   $fts-transfer-submit -s https://fts3.grid.sara.nl:8443 \
   $    gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar \
   $    gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/penelope/zap.tar 


File transfer - TURL to TURL
----------------------------

.. code-block:: console

   $fts-transfer-submit -s https://fts3.grid.sara.nl:8443 \
   $    gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar \
   $    gsiftp://gridftp.grid.sara.nl:2811/pnfs/grid.sara.nl/data/lsgrid/penelope/zap.tar


File transfer - SRMv2 to SRMv2
------------------------------

.. code-block:: console

   $fts-transfer-submit -s https://fts3.grid.sara.nl:8443 \
   $    srm://srm.grid.sara.nl:8443/srm/managerv2?SFN=/pnfs/grid.sara.nl/data/lsgrid/zap.tar \
   $    srm://srm.grid.sara.nl:8443/srm/managerv2?SFN=/pnfs/grid.sara.nl/data/lsgrid/penelope/zap.tar

.. note:: Combinations between TURLS, SURLS, HTTPS and SRMv2 are possible.


Bulk transfers
--------------

If you have multiple files to transfer, you can submit the transfers in one bulk operation. Example:

.. code-block:: console

   $fts-transfer-submit -s https://fts3.grid.sara.nl:8443 \
   $    -f transfer-list.txt

The list of transfers should have this format:

.. code-block:: cfg

   file1-source-SURL-or-TURL file1-destination-SURL-or-TURL
   file2-source-SURL-or-TURL file2-destination-SURL-or-TURL
   ...

An example:

.. code-block:: cfg

   srm://srm.grid.sara.nl:8443/pnfs/grid.sara.nl/data/lsgrid/homer/file1 srm://gb-se-amc.amc.nl:8446/dpm/amc.nl/home/lsgrid/homer/file1
   srm://srm.grid.sara.nl:8443/pnfs/grid.sara.nl/data/lsgrid/homer/file2 srm://gb-se-amc.amc.nl:8446/dpm/amc.nl/home/lsgrid/homer/file2

More information and examples of bulk transfers and FTS in general can be found at `CERN FTS3 documentation`_.

Monitor Status
==============

Command line
------------

The ``fts-transfer-submit`` command will return instantly an ID for the specific job. This ID can be used to trace the status of the transfer:

.. code-block:: console

   $fts-transfer-status -s https://fts3.grid.sara.nl:8443  9e665677-76e5-4734-b729-b69e161da99a
   ## replace the string with your ID


Web interface
-------------

You can monitor the transfer status and trace the logging information on this page:

	https://fts3.grid.sara.nl:8449/fts3

At the moment any jobs are visible to anyone under any :abbr:`VO (Virtual Organisation)`, but this can be closed by our system administrators upon request, just contact us at helpdesk@surfsara.nl.


.. Links:
.. _`FTS3`: http://fts3-service.web.cern.ch/
.. _`FTS3 wiki`: https://svnweb.cern.ch/trac/fts3/wiki/UserGuide
.. _`CERN FTS3 documentation`: http://fts3-docs.web.cern.ch/fts3-docs/docs/cli/cli.html
