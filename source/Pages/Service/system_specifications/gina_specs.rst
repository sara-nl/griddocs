.. _specs-gina:

*******************
Gina specifications
*******************

Gina is the Grid cluster at SURFsara; currently all the servers are located at the Vancis B.V. datacenter divided over two rooms. After different tenders these servers belong to different brands (Dell & Fujitsu). Three service nodes are used to host virtual machines for different purposes (creamces, monitoring, installation, dns servers...). All the worker nodes are installed on physical nodes.

If you have any questions concerning the technical specifications below, please contact us at helpdesk@surfsara.nl.

.. _gina-specs-summary:

Quick summary
=============

============================ =====================================================
Gina cluster                 Capacity                                             
============================ =====================================================
Operating system             Linux CentOS 6.x 64bit                              
Total number of cores        4640 Xeon cores at 2.2 to 2.6 GHz                   
Total memory                 37TB                                                 
Total scratch space          2032TB                                              
Network backbone             Juniper Q-Fabric Network Fabric which also connects the Grid storage 
============================ =====================================================

``Last update: Juli 2016``

.. _gina-specs-wn:

Worker Nodes
============
This is the list of the different worker nodes in order of installation/configuration from newest to oldest:

Worker Nodes ``am90-{01-33}``, ``am91-{01-33}``, ``am94-{01-33}``:  

  *  Dell R630  
  *  2x Intel(R) Xeon(R) CPU E5-2680 v3 @ 2.50GHz (24 cores)  
  *  192GB RAM  
  *  ~8000GB scratch  
  *  Type: Haswell architecture /w Haswell-EP cores (2014)  
  *  Number of nodes: 100   
  *  Total cores of this type: 2400  
  *  Scratch per core: ~300GB  
  *  RAM per core: 8GB  
  
Worker Nodes ``ar90-{01-52}``, ``ar91-{01-52}``:  

  *  Fujitsu CX250  
  *  2x Intel(R) Xeon(R) CPU E5-2650 v2 @ 2.60GHz (16 cores)  
  *  128GB RAM  
  *  ~11TB scratch  
  *  Type: Ivy Bridge architecture /w Ivy Bridge-EP cores (2013)  
  *  Number of nodes: 104  
  *  Total cores of this type: 1664  
  *  Scratch per core: ~680GB  
  *  RAM per core: 8GB  

Worker Nodes ``v37-{01-12}``, ``v33-{01-06}``:  

  *  Dell R820  
  *  4x Intel(R) Xeon(R) CPU E5-4620 0 @ 2.20GHz (32 cores)  
  *  256GB RAM  
  *  6.8TiB scratch  
  *  Type: Sandy Bridge architecture /w Sandy Bridge-EP cores (2012)  
  *  Number of nodes: 18  
  *  Total cores of this type: 576  
  *  Scratch per core: ~200GB  
  *  RAM per core: 8GB  

Service nodes
=============

Service{01,02,03}: 

  *  Dell R420  
  *  2xIntel(R) Xeon(R) CPU E5-2420 0 @ 1.90GHz (12 cores)  
  *  96GB RAM  
  *  Number of nodes: 3  
  *  RAM per core: 8GB  

CreamCEs (Computing elements)
========

All 3 CreamCEs are virtualized and distributed among the 3 Service Nodes. Every CreamCE has 4 cores and 9GB RAM in total.

.. _gina-specs-network:

Network
============
GinA is connected to a Juniper Q-Fabric network fabric. On this fabric also the Grid storage is connected and makes high throughput possible. Currently we have seen over 20GB/sec (~170-200Gbit/sec) of peak network traffic to the Grid storage.
All workernodes are connected with a single 10Gbit ethernet connection.

.. _gina-specs-queues:

Queues
======
 
=============== =========================== =========================== ============================
Queue           Max. CPU Time (hh:mm:ss)    Max. Walltime (hh:mm:ss)    VOs(group) allowed
=============== =========================== =========================== ============================
extreme         120:00:00                   120:00:00                   emutd
long            96:00:00                    96:00:00                    geant4 atlas(production)
mediumc*        n/a                         72:00:00                    bbmri.nl(RP2) lofar lsgrid(mediummc) projects.nl(geomodel) pvier
medium          36:00:00                    36:00:00                    astron atlas alice bbmri.nl beapps biomed dans drihm.eu enmr.eu esr euclid-ec.org geant4 lhcb lofar lsgrid nlesc.nl omegac pvier vlemed xenon.biggrid.nl projects.nl
medium_8gb**    36:00:00                    36:00:00                    alice 
short           04:00:00                    04:00:00                    astron atlas bbmri.nl beapps biomed dans drihm.eu enmr.eu esr euclid-ec.org geant4 lhcb lofar lsgrid nlesc.nl omegac pvier vlemed xenon.biggrid.nl projects.nl  
infra           02:00:00                    00:30:00                    dteam ops pvier
=============== =========================== =========================== ============================
\*  This is a queue for multicore jobs

** This is a queue for jobs that require 8GB per core
