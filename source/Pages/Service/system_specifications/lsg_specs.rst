.. _specs-lsg:

******************
LSG specifications
******************

This page describes the specifications for the Life Science Grid (LSG) clusters. For a list of the clusters, see :ref:`life-science-clusters`.

.. contents:: 
    :depth: 4


.. warning:: The Life Science Grid infrastructure is scheduled to be decommissioned mid 2018. After the decommissioning the smaller LSG clusters within the UMC's and other universities will cease to exist; the large central Grid clusters at NIKHEF and SURFsara will remain. More details about the decommissioning can be found here: https://userinfo.surfsara.nl/documentation/decommissioning-life-science-grid


.. _lsg-specs-summary:

Quick summary
============= 

``Last update: December 2016``

At the time of writing two different hardware setups coexists in the LSG. The "classic" hardware setup is being progressively replaced by an updated one. The present document will differentiate between this two setups.

"Classic" hardware setup
------------------------

============================ =====================================================
LSG cluster                  Capacity                                             
============================ =====================================================
Operating system             Linux CentOS 6.x 64bit
Total number of cores        128 CPU cores at 2.3 GHz
Total amount of memory       512 GB
Total scratch space          10TB
Disk storage                 40TB of staging area                             
Network backbone             10Gbit/s local switch, 1Gbit/s external connectivity
============================ =====================================================

Clusters still using the "classic" hardware setup:
  * AMS
  * BCBR
  * EMC
  * RUG
  * TUD
 
Updated hardware setup
----------------------

============================ =====================================================
LSG cluster                  Capacity                                             
============================ =====================================================
Operating system             Linux CentOS 6.x 64bit
Total number of cores        184 CPU cores at 2.2 GHz (Intel Xeon E5-2650)
Total amount of memory       656 GB
Total scratch space          20TB
Disk storage                 40TB of staging area                             
Network backbone             10Gbit/s local switch, 1Gbit/s external connectivity
============================ =====================================================

Clusters using the updated hardware setup:
  * AMC
  * KUN
  * LUMC
  * UM
  * VU
  * WUR


Worker Nodes
============

The jobs will be actually executed on this kind of nodes; this is the hardware specification:

Classic hardware setup
----------------------
  * Dell PowerEdge R815 4xAMD Opteron(tm) Processor 6376
  * Type: Bulldozer
  * Cores: 64
  * RAM: 256GB
  * Number of nodes: 2

Updated hardware setup
----------------------
  * Fujitsu Primergy RX2530 M2, Intel(R) Xeon(R) CPU E5-2650 v4 @ 2.20GHz
  * Type: Broadwell
  * Cores: 23 (46 threads with HT enabled)
  * RAM: 164 GB
  * Number of nodes: 4


Storage Node
============

This node stores all the data related to the user jobs:

  * PowerEdge R515 2xAMD Opteron(tm) Processor 4280
  * Type: Bulldozer
  * Cores: 16
  * RAM: 128 GB
  * Number of nodes: 1
  * Storage space: 40TB
  

Computing Element
=================

The Computing Element (CE) is a virtual machine hosted by the corresponding LSG cluster; the CE gets the jobs from the users and sends them to the appropriate WNs:

Classic hardware setup:
  * Cores: 2
  * RAM: 4 GB
  * Number of nodes: 1
  
Updated hardware setup:
  * Cores: 2
  * RAM: 8 GB
  * Number of nodes: 1
  

User Interface
==============

Each LSG cluster hosts a User Interface (UI) a virtual machine from where the users can prepare and submit their jobs. Please be aware that this server's purpose is NOT to execute directly your programs. Use instead Torque commands such us 'qsub' to submit your jobs to the Worker Nodes which have more CPU/Memory capacity. The VM specifications of the UI are:
This is a virtual machine running on one of the Service Nodes; please be aware that this server's purpose is NOT to execute directly your programs. For local datasets every user has a default quota of 50GB, unless more is required for a specific purpose. Temporary datasets may be placed under the /scratch directory, which will be cleaned up periodically. Use instead Torque commands such us 'qsub' to submit your jobs to the Worker Nodes which have more CPU/Memory capacity. Thank you for your understanding. The VM specifications of the UI are:

Classic hardware setup:

  * Cores: 8
  * RAM: 16 GB
  * Number of nodes: 1
  
Updated hardware setup:
  * Cores: 8
  * RAM: 8 GB
  * Number of nodes: 1


.. TODO: this section is of no use for end users
   moreover, new LSG clusters are bases on an Openstack cluster
   which is of no interest neither for final users

.. comment: Service Nodes
   =============

.. comment: The hardware specifications of the service nodes:
  * PowerEdge R420 2xIntel(R) Xeon(R) CPU E5-2420 0 @ 1.90GHz
  * Type: Sandy Bridge architecture /w Sandy Bridge-EP cores
  * Cores: 24
  * RAM: 96 GB
  * Number of nodes: 2


.. _lsg-specs-queues:

Queues
======

Each LSG cluster offers a set of job queues:

=============== ===========================
Queue           Max. Walltime (hh:mm:ss)
=============== ===========================
express         00:30:00
infra           00:30:00
medium          36:00:00
long            72:00:00
=============== ===========================

The *infra* queue is reserved for system checking and maintenance, final users are not allowed to submit jobs to this queue.

The above queues can be used by both :ref:`grid jobs <life-science-clusters-details>` and :ref:`PBS jobs <pbs>`.
