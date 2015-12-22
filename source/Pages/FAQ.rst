.. _FAQ:

***
FAQ
***

Check out in this page the most commonly asked questions about Grid. If you still have questions, please contact us at helpdesk@surfsara.nl:

.. contents:: 
    :depth: 4  


=========
Questions
=========

.. _where-to-start:

I never worked with the Grid before. Where is a good starting point?
====================================================================

New users are advised to read through our tutorial page, the :ref:`prerequisites` and :ref:`first-grid-job` which guides you through the whole process from getting a Grid certificate to the actual job run. The Grid team at SURFsara is willing to assist, just contact helpdesk@surfsara.nl.


.. _grid-terms:

Where can I lookup up Grid terms?
=================================

Check out the file Grid Glossary :download:`pdf <Tutorials/MOOC/slides/L5_W1_Grid_Glossary.pdf>` that contains most of the basic Grid terminology and abbreviations.


.. _get-log:

How can I get more logging info for my job?
===========================================

To find out more info about the status of your job, use:
 
.. code-block:: bash

	glite-wms-job-logging-info -v 2 https://wms2.grid.sara.nl:9000/PHyeyedC1EYBjP9l_Xq9mQ # replace with your job URL
	
And if you use a file to store your jobs, run:

.. code-block:: bash

	glite-wms-job-logging-info -v 2 -i jobIds # replace jobIds with your file


.. _key-match:

Does my key match the certificate?
==================================

Using the modulus you can  see whether a key and a certificate match. The modulus is a short message which can be used to identify a private key and the key which was signed with the certificate. If they match, the certificate signs that private key. If not, you may have mixed up different key or certificate files.

To find the modulus of your key, use::

  openssl rsa -in userkey.pem -noout -modulus

which requires the key which you used to protect your key file.
To find the modulus of your certificate, use::

  openssl x509 -in usercert.pem -noout -modulus

If the moduli of the key file and the certificate file do not match, you
cannot use that combination to identify yourself.


.. _expiry-date:

What is the expiry date of my certificate?
===========================================

To find out when your certificate is valid, use::

  openssl x509 -in usercert.pem -noout -dates

This will tell you when your certificate is valid. 

Note that a key does not have a validity period.


.. _cert-subject:

How can I see the subject of my certificate?
============================================

The subject of a certificate is the human-readable identification of who the certificate belongs to. It usually contains your name, country, organization and your e-mail address.

To find out who the certificate belongs to, use::

  openssl x509 -in usercert.pem -noout -subject


.. _available-se:

How can I find all the available LSG Storage Elements and get their SURLS?
==========================================================================

* To find out the available SEs for a certain VO, type:

.. code-block:: bash

	lcg-infosites --vo lsgrid ce 
	
* To specify a specific SURL (srm URL), use the following syntax:

.. code-block:: bash

	srm://gb-se-amc.amc.nl:8446/dpm/amc.nl/home/lsgrid/ # storage element at AMC

* A complete list of the LSG SURLs:

.. code-block:: bash

	srm://gb-se-amc.amc.nl:8446/dpm/amc.nl/home/lsgrid/
	srm://gb-se-ams.els.sara.nl:8446/dpm/els.sara.nl/home/lsgrid
	srm://gb-se-emc.erasmusmc.nl:8446/dpm/erasmusmc.nl/home/lsgrid
	srm://gb-se-kun.els.sara.nl:8446/dpm/els.sara.nl/home/lsgrid
	srm://gb-se-lumc.lumc.nl:8446/dpm/lumc.nl/home/lsgrid
	srm://gb-se-nki.els.sara.nl:8446/dpm/els.sara.nl/home/lsgrid
	srm://gb-se-rug.sara.usor.nl:8446/dpm/sara.usor.nl/home/lsgrid
	srm://gb-se-tud.ewi.tudelft.nl:8446/dpm/ewi.tudelft.nl/home/lsgrid	
	srm://gb-se-wur.els.sara.nl:8446/dpm/els.sara.nl/home/lsgrid
	srm://srm.grid.sara.nl:8443/pnfs/grid.sara.nl/data/lsgrid


.. _available-ce:

How can I find all the available LSG Compute Elements and use in my JDL?
========================================================================

* To find out the available CEs for a certain VO, type:

.. code-block:: bash

	lcg-infosites --vo lsgrid ce 
	
Note here that the Total, Running and Waiting numbers are per queue, and the CPU and Free number are per cluster.

* To specify a specific cluster in your JDL, use the following syntax:

.. code-block:: bash

	Requirements = (RegExp("rug",other.GlueCEUniqueID)); # this requires the job to land on the "rug" site
	
	# or you can specify the full UI hostname
	Requirements = RegExp("gb-ce-lumc.lumc.nl",other.GlueCEUniqueID); # job lands at lumc


.. _why-lsg-to-grid:

Do I need to switch from my local LSG cluster to Grid?
======================================================
If your local cluster is too busy to get a priority or if you want to run hundreds of jobs at the same time, then we advise you to submit through the grid middleware instead of submitting to the queue directly. There is obviously more capacity when you scale out to multiple clusters and even if there is maintenance on one cluster, your jobs will then be scheduled on other clusters.  


.. _pbs-walltime:

How to run PBS jobs with wallclock greater than 36 hours on LSG?
================================================================ 
In order to run pbs jobs on LSG that last more than 36 hours, you need to use ``-q long`` flag in your ``qsub`` command when submitting the job:
 
* If you do not specify a queue (``-q`` flag) or lwalltime, then the medium queue is picked and jobs lasting more than 36 hours will be killed.
* If you do not specify a queue (``-q`` flag) but specify -lwalltime > 36h, then you request more walltime than the max walltime available in the default medium queue and the job does not start.
* If you specify a queue (``-q`` flag) it is sufficient to get your jobs run for 72 hours.


.. _cpu-time:

How can I calculate the total CPU time I consumed?
==================================================

The total CPU time depends on the amount of cores that your application is using and the wallclock time that the corresponding job takes to finalise::

	CPU time = #cores x wallclock(per job) x #jobs	

For example, let's say that a single job takes 12 h to finish on a 4-core machine and we submitted 10,000 of those. The total CPU time spent is::

	CPU time = 4cores x 12h x 10,000 = 480,000 CPU hours ~ 55 CPU years 


.. _cpu-efficiency:

System usage and CPU efficiency
===============================

CPU efficiency is an important factor to detect if the jobs run smoothly on the infrastructure. The CPU efficiency depends on the real CPU usage and the WallClock time for the job to finish::

	CPU efficiency = CPU time / WallClock time

If the CPU was efficiently being used during the job runtime, then a single core job will have efficiency close to 100%. For multicore jobs the efficiency is higher than 100%.
