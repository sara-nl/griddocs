.. warning:: Page under construction

.. _specs-gina:

*******************
Gina Specifications
*******************

Gina is the Grid cluster at SURFsara; currently all the servers are located at the Vancis B.V. datacenter divide into two rooms. After different tenders these servers belong to different brands (Dell & Fujitsu). Three service nodes are used to host the  virtual machines for different purposes (creamces, monitoring, installation, dns servers...). All the worker nodes are installed on physical nodes.

This page describes the specifications for the Gina Grid cluster at SURFsara:

.. contents:: 
    :depth: 4

If you have any questions concerning the technical specifications below, please contact us at helpdesk@surfsara.nl.


.. _gina-specs-summary:

=============
Quick summary
=============

============================ =====================================================
Gina cluster                 Capacity                                             
============================ =====================================================
Operating system             Linux CentOS 6.x 64bit                              
Total number of cores        5600 Xeon cores at 2.2 to 2.6 GHz                   
Total memory                 41TB                                                 
Total scratch space          2100TB                                              
Network backbone             160Gbit/s Ethernet connection with the Grid storage 
============================ =====================================================

``Last update: January 2016``


Worker nodes
============

am90-{01-33}, am91-{01-33}, am94-{01-33}:

  Dell R630
  2x Intel(R) Xeon(R) CPU E5-2680 v3 @ 2.50GHz (24 cores)
  192GB RAM
  ~8000GB scratch
  Type: Haswell architecture /w Haswell-EP cores (2014)
  Number of nodes: 100
  Total cores of this type: 2400
  Scratch per core: ~300GB
  RAM per core: 8GB


am95-{01-48}, v33-{17-48}:

  Dell R630
  2x Intel(R) Xeon(R) CPU           E5649  @ 2.53GHz (12 cores)
  48GB RAM
  ~850 GB scratch
  Type: Nehalem architecture /w Westmere-EP cores (2011)
  Number of nodes: 80
  Total cores of this type: 960
  Scratch per core: ~70GB
  RAM per core: 4GB

v35-{01-12}, v33-{01-06}:

  Dell R820
  4x Intel(R) Xeon(R) CPU E5-4620 0 @ 2.20GHz (32 cores)
  256GB RAM
  6.8TiB scratch
  Type: Sandy Bridge architecture /w Sandy Bridge-EP cores (2012)
  Number of nodes: 18
  Total cores of this type: 576
  Scratch per core: ~200GB
  RAM per core: 8GB

ar90-{01-52}, ar91-{01-52}:

  Fujitsu CX250
  2x Intel(R) Xeon(R) CPU E5-2650 v2 @ 2.60GHz (16 cores)
  128GB RAM
  ~11TB scratch
  Type: Ivy Bridge architecture /w Ivy Bridge-EP cores (2013)
  Number of nodes: 104
  Total cores of this type: 1664
  Scratch per core: ~680GB
  RAM per core: 8GB
 

Service Nodes
=============

Service{01,02,03}:

  Dell R420
  2xIntel(R) Xeon(R) CPU E5-2420 0 @ 1.90GHz (12 cores)
  96GB RAM
  Number of nodes: 3
  RAM per core: 8GB


CreamCEs
========

All 3 CreamCEs are virtualized and distribuited among the 3 Service Nodes. Every CreamCE has 4 cores and 9GB RAM in total.


Queues
======
 
=============== =========================== ===========================
Queue           Max. CPU Time (hh:mm:ss)    Max. Walltime (hh:mm:ss)
=============== =========================== ===========================
mediumc         n/a                         72:00:00
tutor           00:40:00                    00:10:00
extreme         120:00:00                   120:00:00
mc_test         n/a                         36:00:00
medium_8gb      36:00:00                    36:00:00
test_atlas_wn   36:00:00                    36:00:00
short           04:00:00                    04:00:00
long            96:00:00                    96:00:00
medium          36:00:00                    36:00:00
infra           02:00:00                    00:30:00
=============== =========================== ===========================
