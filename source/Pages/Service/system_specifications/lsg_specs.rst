.. _specs-lsg:

******************
LSG specifications
******************

This page describes the specifications for the Life Science Grid (LSG) clusters. For a list of the clusters, see :ref:`life-science-clusters`.

.. contents:: 
    :depth: 4

If you have any questions concerning the technical specifications below, please contact us at helpdesk@surfsara.nl.


.. _lsg-specs-summary:

Quick summary
============= 

``Last update: March 2016``

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


Worker Nodes
============

The jobs will be actually executed on this kind of nodes; this is the hardware specification:

  * PowerEdge R815 4xAMD Opteron(tm) Processor 6376
  * Type: Bulldozer
  * Cores: 64
  * RAM: 256GB
  * Number of nodes: 2


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

This is a virtual machine running on one of the Service Nodes; the CE gets the jobs from the users and sends them to the appropriate WNs:

  * Cores: 2
  * RAM: 4 GB
  * Number of nodes: 1
  

User Interface
==============

This is a virtual machine running on one of the Service Nodes; please be aware that this server's purpose is NOT to execute directly your programs. For local datasets every user has a default quota of 50GB, unless more is required for a specific purpose. Temporary datasets may be placed under the /scratch directory, which will be cleaned up periodically. Use instead Torque commands such us 'qsub' to submit your jobs to the Worker Nodes which have more CPU/Memory capacity. Thank you for your understanding. The VM specifications of the UI are:

  * Cores: 8
  * RAM: 16 GB
  * Number of nodes: 1
  
Service Nodes
=============

The hardware specifications of the service nodes::

  * PowerEdge R420 2xIntel(R) Xeon(R) CPU E5-2420 0 @ 1.90GHz
  * Type: Sandy Bridge architecture /w Sandy Bridge-EP cores
  * Cores: 24
  * RAM: 96 GB
  * Number of nodes: 2

.. _lsg-specs-queues:

Queues
======
 
=============== ===========================
Queue           Max. Walltime (hh:mm:ss)
=============== ===========================
express         00:30:00
infra           00:30:00
medium          36:00:00
long            72:00:00
=============== ===========================
