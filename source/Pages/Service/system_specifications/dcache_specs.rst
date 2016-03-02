.. _dCache-specs:

*********************
dCache specifications
*********************

This page describes the technical specifications for dCache. If you have any questions concerning the technical specifications below, please contact us at helpdesk@surfsara.nl.

.. contents:: 
    :depth: 4


.. _dCache-specs-about:

About
=====

dCache has the following concepts:

* A ``pool`` is a location on a server that can contain files.
* A ``poolgroup`` is a group of similar pools, assigned to a user group. Usually the pools are on different nodes to distribute the load.
* Our ~60 pool nodes are also configured as doors.
* A ``door`` is a service that can you can contact to send, receive or delete 
  files or restore files from tape using a specific protocol. Protocols are:
  
  * GridFTP (port range 20000-25000)
  * WebDAV
  * xroot
  * GSIdCap
  * dCache also offers NFS doors, but we currently don't support it; for special cases we might consider supporting this protocol.
  
* The ``namespace`` contains a list of all files and their metadata. The files are structured 
  in a virtual directory structure, starting with /pnfs/grid.sara.nl/. Each directory can be 
  mapped onto a pool group. Subdirectories inherit this mapping from their parent directory.

Here's a list of accessible dCache nodes:

* srm.grid.sara.nl
* `dcmain.grid.sara.nl:2288 <http://dcmain.grid.sara.nl:2288>`_ (a dCache web interface showing detailed configuration information)
* pool nodes::

  * fly{1..10}.grid.sara.nl
  * bw27-{1..9}.grid.sara.nl
  * bw32-{1..9}.grid.sara.nl
  * by27-{1..9}.grid.sara.nl
  * by32-{1..9}.grid.sara.nl
  * rabbit{1..3}.grid.sara.nl
  * v40-{8..10}.grid.sara.nl
  * whale{1..6}.grid.sara.nl

We have these DNS round robin aliases pointing to our doors:

* gridftp.grid.sara.nl
* webdav.grid.sara.nl

Here are some metrics per user group: `web.grid.sara.nl/dcache.php <http://web.grid.sara.nl/dcache.php>`_

The subnet is 145.100.32.0/22. You may need to change your firewall to access this subnet.


.. _dCache-specs-disk:

Disk storage
============

We currently (January 2016) have ~8 petabyte of disk storage capacity. This space is divided over several pool groups. These pool groups are for disk only data, t1d1 data (disk data with a tape replica) and for online caching of tape only data.


.. _dCache-specs-tape:

Tape storage
============

The Grid tape storage back-end contains ~22 petabyte of data (January 2016). There are two tape libraries: one in Almere and one in the Vancis datacenter in Amsterdam Science Park. Some data only has a single copy, but smaller projects typically have a double copy of their tape data.


.. _dCache-specs-performance:

Transfer performance
====================

Bandwidth
+++++++++

With dCache, we have reached bandwidths up to 25 gigabyte/s, and dCache is probably capable of much more, depending on the circumstances. This bandwidth was reached between the Gina compute cluster and the dCache cluster. Once, during an internal data migration operation, we have transferred 1 petabyte in 24 hours. With external endpoints however, bandwidth is most likely limited by the network path.

Limits
++++++

Number of transfers per pool
----------------------------

Each pool supports up to a certain number of concurrent transfers. The specific number for a certain pool group can be looked up in the `dCache web interface <http://dcmain.grid.sara.nl:2288/webadmin/poolgroups>`_. If the limit is reached, transfers will be queued, and they will seem stalled. After some time, transfers may time out. But even if they don't, your job may waste valuable computing time waiting for input files that don't arrive.

If that happens, you should reduce your number of concurrent transfers, or ask us whether the limit can be increased. We can not increase the limit endlessly because this would make our systems unstable. Not sure how to proceed? We can help! Contact us at helpdesk@surfsara.nl.

A single SRM door
-----------------

Also the :abbr:`SRM (Storage Resource Manager)` door has some limitations. There's only one of that kind, and sometimes it might be a performance bottleneck. It may be wise to bypass the :abbr:`SRM (Storage Resource Manager)` door and use GridFTP and WebDAV doors directly when possible. If in doubt, feel free to contact us for advice.
