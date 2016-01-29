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


.. _how-many-cpus:

How many cpu's, nodes does the grid offer?
===========================================

The grid infrastructure is interconnected clusters in Netherlands and abroad. The users can get access to multiple of these clusters based on their :ref:`Virtual Organisation <join-vo>`.

* Global picture: 170 datacenters in 36 countries: in total more than 330000 compute cores, 500 PB disk, 500 PB tape.

* In the Netherlands NGI_NL infrastructure: 14 datacenters (3 large grid clusters, 11 smaller ones): in total approx 10000 compute cores, 12 PB disk, tape capacity up to 170 PB.


.. _how-many-ch:

How many cpu hours are available?
=================================

The available core hours and storage depend on the funding models. We make tailored agreements to incorporate the user requirements and grant resources based on the applicable funding scheme.


.. _how-much-memory:

What is the average amount of memory available per node?
========================================================

The average memory per node depends on number of cores per node. It is typically 8GB per core, but the nodes vary between 12 and 64 cores per node (48 to 256GB RAM per node).


.. _transfer-speed:

What is the data transfer speed between grid locations?
=======================================================

In the Netherlands NGI_NL infrastructure the transfer speed between grid storage and grid processing cluster (at SURFsara) is up to 500Gbit/s. The transfer speed between nodes is 10Gbit/s and between sites it is typically 10 to 20 Gbit/s.


.. _cpu-time:

How can I calculate the total CPU time I consumed?
==================================================

The total CPU time depends on the amount of cores that your application is using and the wallclock time that the corresponding job takes to finish::

	CPU time = #cores x wallclock(per job) x #jobs	

For example, let's say that a single job takes 12 h to finish on a 4-core machine and we submitted 10,000 of those. The total CPU time spent is::

	CPU time = 4cores x 12h x 10,000 = 480,000 CPU hours ~ 55 CPU years 


.. _cpu-efficiency:

System usage and CPU efficiency
===============================

CPU efficiency is an important factor to detect if the jobs run smoothly on the infrastructure. The CPU efficiency depends on the real CPU usage and the WallClock time for the job to finish::

	CPU efficiency = CPU time / WallClock time

If the CPU was efficiently being used during the job runtime, then a single core job will have efficiency close to 100%. For multicore jobs the efficiency is higher than 100%.


.. _change-cert-pwd:

How can I change my grid certificate password?
==============================================

Before you create a new private key file with a new password, we recommend you to make a backup of the old userkey.pem file.

* To change your grid certificate password, type:

.. code-block:: bash

    openssl rsa -in ~/.globus/userkey.pem -des3 -out ~/.globus/new_private_key_file
    mv ~/.globus/new_private_key_file ~/.globus/userkey.pem # this will replace your old key file with the old password!

Note: this only changes the password you use for your certificate. If you think your certificate is compromised, you HAVE to revoke your certificate!


.. _unable-load-cert:

Unable to load certificate error
================================

If you get the following error:

.. code-block:: bash

    unable to load certificate 17714:error:0906D064:PEM routines:PEM_read_bio:bad base64
    decode:pem_lib.c:781:

when you use the command ``openssl x509 -text -noout -in usercert.pem``, it means that the email with the certificate wasn't saved properly as plain text (it included the Mime type for formatting). Repeat carerefully the steps as described in :ref:`Retrieve your DutchGrid certificate <retrieve-dutchgrid>` section. 


.. _grid-cert-permissions:

What are the correct permissions for my certificate files?
==========================================================

* Set the proper permissions to your certificate files:

.. code-block:: bash

	chmod 644 usercert.pem
	chmod 400 userkey.pem

* Verify the correct permissions:

.. code-block:: bash

	cd $HOME/.globus
	ls -l
	
	# -rw -r --r --    1 homer    homer            4499  May 10 13:47  usercert.pem
 	# -r --------      1 homer    homer             963  May 10 13:43  userkey.pem
 	
Note that the private key file should be **read-only** and only readable to you.


.. _valid-cred-error:

Couldn't find valid credentials error
=====================================

If you get the following error when creating a new proxy::

   ERROR: Couldn't find valid credentials to generate a proxy.
   Use --debug for further information.

The permissions on your installed certificate are probably wrong. Set the :ref:`correct permissions <grid-cert-permissions>` and try creating a proxy again.


.. _get-non-voms-proxy:

Get non-vomsified proxy locally
===============================

* To download locally the proxy stored on :ref:`MyProxy server <myproxy-server>` you need to set a passphrase upon creation. To do this, protect your proxy with a MyProxy pass phrase by omitting option "-n"::

    myproxy-init -d
    
It will first ask your grid certificate password and then prompt you to enter a MyProxy passphrase twice. You will use the latter passphrase to download your proxy. 

Here is an example of the displayed output::
    
    # Your identity: /O=dutchgrid/O=users/O=sara/CN=Homer Simpson
    # Enter GRID pass phrase for this identity:
    # Creating proxy .......................... Done
    # Proxy Verify OK
    # Your proxy is valid until: Wed Jan 13 14:35:00 2016
    # Enter MyProxy pass phrase:
    # Verifying - Enter MyProxy pass phrase:
    # A proxy valid for 168 hours (7.0 days) for user /O=dutchgrid/O=users/O=sara/CN=Homer Simpson now exists on px.grid.sara.nl.

* Now use the MyProxy pass phrase to get this proxy locally on the UI::

    myproxy-get-delegation -d

Here is an example of the displayed output::
    
    # Enter MyProxy pass phrase:
    # A credential has been received for user /O=dutchgrid/O=users/O=sara/CN=Homer Simpson in /tmp/x509up_u39111. 
    
Note that the downloaded proxy will not include the voms attributes.


.. _renew-cert:

How can I renew my certificate?
===============================

The personal grid certificates are valid for a year. This means that every year you need to renew your personal grid certificate. The procedure for renewing your certificate depends on your CA, Digicert or Dutchgrid.

* For *Digicert* grid certificate, you can request a new certificate anytime from the `DigiCert portal`_. Follow this guide to :ref:`obtain and install a Digicert grid certificate <digicert>`.

* For *Dutchgrid* grid certificate, you have two options:

  * When your certificate has already expired, you *have* to request a new certificate from scratch with the jGridstart tool. Follow this guide to :ref:`obtain a Dutchgrid certificate <dutchgrid>`.
  * If your current certificate has *not* expired yet, you can *renew* your certificate. This is a faster procedure because you avoid revisiting your RA for your id verification. What you need to do: 
  
    1. Login to the UI  with X session enabled.
    2. Start the jGridstart tool on the UI (assuming that your current certificate is installed there): ``java -jar jgridstart-wrapper-XX.jar``
    3. Select ``Actions -> Renew`` from the menu bar.
    4. Generate a new request by verifying your details (name, surname, email, organisation). At this stage you will provide a new password for your new grid certificate - make sure you keep this safe! Click "Next".
    5. Submit the request. This will create a new private ``userkey.pem`` file in your ``~/.globus`` directory. Click "Next".
    6. You will receive your new certificate within few days via email. Once received, follow the instructions to :ref:`install it on the UI <retrieve-dutchgrid>`.
  
Keep in mind that when you renew your certificate the certificate key will change too. To avoid mixing up the old and new certificate files, check whether your new certificate and key :ref:`match each other <key-match>`.


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


.. _get-log:

How can I get more logging info for my job?
===========================================

To find out more info about the status of your job, use:
 
.. code-block:: bash

	glite-wms-job-logging-info -v 2 https://wms2.grid.sara.nl:9000/PHyeyedC1EYBjP9l_Xq9mQ # replace with your job URL
	
And if you use a file to store your jobs, run:

.. code-block:: bash

	glite-wms-job-logging-info -v 2 -i jobIds # replace jobIds with your file
    
..
..
..
..
..

.. Links:
.. _`DigiCert portal`: https://digicert.com/sso
  	
