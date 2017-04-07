.. _fts:

************
*fts* client
************

This page includes the basic commands to use the FTS (File Transfer Service). For an overview of storage clients, see :ref:`storage-clients`.

.. contents:: 
    :depth: 3


===
FTS
===

Introduction
============

`FTS3`_ is a file transfer service for reliable file transfers across sites or else, *third party* transfers. You cannot use it to transfer files from your local machine to dCache and vice-versa. FTS3 service has been running for years. It was developed by Cern for WLCG data transfers up to petabytes per month.

From the user perspective, it allows data movement, retrying if necessary, monitoring and displaying usage statistics, see `FTS3 wiki`_. From the operations view, it optimises resource usage. 

The wisdom of FTS is the *Optimiser* which decides whether to increase or decrease the amount of transfers attempted at a time. It evaluates any symptoms of saturation and decreases the number of parallel transfers when there is an increase of recoverable errors, or the throughput worsens.

FTS3 has a REST API and supports all the basic transfer protocols, such as: GridFTP, SRM, Webdav, HTTPS, xroot.  


SURFsara FTS instance
=====================

Our FTS instance can be found at: `SURFsara FTS UI`_. The site can be accessed when you have a certificate installed in your browser. The FTS UI provides a sophisticated and easy to use web interface for transfer management and monitoring.

The `SURFsara FTS Rest API`_ be used from command-line clients or the web-interface version (`SURFsara WebFTS`_), or python bindings. The Cern website offers several examples to interact with the API with python, see `FTS Easy Bindings`_.

The FTS command-line client is currently installed on the UI ``ui.grid.sara.nl``. It is not available on the :ref:`LSG UI <lsg-hostnames>` machines.

The following graph depicts the FTS transfer lifecycle:

  .. image:: /Images/Using_the_File_Transfer_Service.png

  .. comment: Image source is at https://www.websequencediagrams.com/?lz=dGl0bGUgVXNpbmcgdGhlIEZpbGUgVHJhbnNmZXIgU2VydmljZQoKcGFydGljaXBhbnQgVXNlciBJbnRlcmZhY2UADg1GVFMAHg1TdG9yYWdlIEVsZW1lbnQgMQABHTIKCgBODiAtPiBGVFM6IGZ0cy10AIEOBy1zdWJtaXQKCmxvb3AgZm9yIGVhY2ggZmlsZSBpbiBqb2IKICBGVFMgLT4AbhI6IHByZXBhcmUANAUASwgAFxoyAAEwMTogc3RhcnQAUAwAgXURAFMXR3JpZEZUUACBRQYAICAAghMFcmVzdWx0AFATMgATEGVuZACCNyd0YXR1cwoAgjoHAINeDgBoCQo&s=roundgreen


Authentication
==============
 
To use the :abbr:`FTS (File Transfer Service)` you need to create a local proxy. The fts submit command automatically delegates the proxy to the :abbr:`FTS (File Transfer Service)` server. The default lifetime is 12 hours. This means that you need to submit an fts command at least once every 12h to renew the delegation, e.g. by checking the status of the transfers with an ``fts-transfer-status`` command. When the remaining lifetime of the stored proxy passes under 4 hours, fts-transfer-submit will automatically delegate a new one as long as there is a valid *local proxy*.

.. note:: To run the examples in this page you need to have a valid local proxy.  The ``voms-proxy-init`` tool can be used to generate a proxy with :abbr:`VOMS (Virtual Organization Membership Service)` attributes from the personal certificate. Alternatively, you can use the startGridSession tool available on the SURFsara UIs. See also :ref:`startgridsession-explained`.

First, create a proxy with your VO attributes on the UI:

.. code-block:: console

   $startGridSession lsgrid #replace lsgrid with your own VO
   

FTS file transfers
==================

Submit a transfer
-----------------

The ``fts-transfer-submit`` command submits transfer-jobs by specifying the source and destination file location. The file location can be a :abbr:`SURL (Storage URL)`, :abbr:`TURL (Transport URL)` or HTTPS link. The source and destination endpoints are GridFTP or :abbr:`SRM (Storage Resource Manager)` servers. 

The output of the submit command is a *unique ID* that can be used for tracing the transfer status.

When the FTS transfer starts, it creates the target file with 0 bytes. If the transfer fails the target file is removed independent to the amount of bytes that had already been transferred.

.. note:: We have noticed that using SURLs instead of TURLs slightly increases the performance (due to the SRM load balancer).

Basic options
-------------

Here are some basic options to use when initiating FTS transfers. The proposed values for retrials, parallel streams and timeout settings depend on the amount of files and volume of data to be transferred. If you need help to estimate these values, please contact us at helpdesk@surfsara.nl

* ``-v``: enable verbose information  
* ``-s https://fts3.grid.sara.nl:8443``: specify the fts server.
* ``-K``: enable checksum. By default, adler32 is supported on the SURFsara servers.
* ``--retry 2 --retry-delay 300``: in case of errors (timeouts, overwriting, etc) the file transfer will be retried after 5 minutes 
* ``--nostreams 4``: the longer the distance between the transfer endpoints, the more streams you need to achieve transfers less vulnerable to congestion
* ``--timeout 14400``: this option helps in case of large file transfers to make sure that the connection will not timeout before the transfer is complete. If you omit this option, the default timeout is 4000 sec


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


.. note:: Provided that you have a valid certificate installed in your browser, you can submit your file jobs to different endpoints via a web interface, the `SURFsara WebFTS`_ page. Please note that the service is still in Beta phase and we advise you to contact us before using it. 


Monitor Status
==============

Command line
------------

The ``fts-transfer-submit`` command will return instantly an ID for the specific job. This ID can be used to trace the status of the transfer:

.. code-block:: console

   $fts-transfer-status -s https://fts3.grid.sara.nl:8443  9e665677-76e5-4734-b729-b69e161da99a
   ## replace the string '9e665677-76e5-4734-b729-b69e161da99a' with your transfer job ID

For bulk transfers, monitor the status overview of all submitted files with:

.. code-block:: console

   $fts-transfer-status -s https://fts3.grid.sara.nl:8443 —list 9e665677-76e5-4734-b729-b69e161da99a | grep State: | sort | uniq —count


Web interface
-------------

Alternative to the ``fts-transfer-status`` command, you can use a graphical interface to monitor the status and trace the logging information in the following page:

	https://fts3.grid.sara.nl:8449/fts3

At the moment any jobs are visible to anyone under any :abbr:`VO (Virtual Organisation)`, but this can be closed by our system administrators upon request, just contact us at helpdesk@surfsara.nl.


Failed transfers
================ 

In case that you monitor any failed transfers, then once the bulk transfer finishes, collect them and resubmit only the list with the files that failed. 

Make a list to retry the failed transfers: 

.. code-block:: console

   $fts-transfer-status -s https://fts3.grid.sara.nl:8443 --list [JOBID] | grep -3 State:.*FAILED | egrep 'Source:|Destination:' | sed -e 's/  Source:      //' -e 'N;s/\n  Destination://' > srm_fts_retry1.txt # replace the [JOBID] with your bulk job ID

Submit the failed transfers with: 

.. code-block:: console

   $fts-transfer-submit -s https://fts3.grid.sara.nl:8443 --retry 2 --retry-delay 300 --nostreams 4 --timeout 14400 -f srm_fts_retry1.txt >> fts_jobids



.. Links:
.. _`FTS3`: http://fts3-service.web.cern.ch/
.. _`FTS3 wiki`: https://svnweb.cern.ch/trac/fts3/wiki/UserGuide
.. _`CERN FTS3 documentation`: http://fts3-docs.web.cern.ch/fts3-docs/docs/cli/cli.html
.. _`SURFsara FTS UI`: https://fts3.grid.sara.nl:8449/fts3
.. _`SURFsara FTS Rest API`: https://fts3.grid.sara.nl:8446/
.. _`SURFsara WebFTS`: https://webfts.grid.sara.nl:8446/
.. _`FTS Easy Bindings`: http://fts3-docs.web.cern.ch/fts3-docs/fts-rest/docs/easy/index.html
