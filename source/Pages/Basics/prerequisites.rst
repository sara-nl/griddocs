.. _prerequisites:

*************
Prerequisites
*************

This section summarises all the preparations you need to make to be able to run a :ref:`simple job <first-grid-job>` on the Grid:

.. contents:: 
    :depth: 4


.. _preparation:

===========
Preparation
===========

The Grid is an international cooperation of many different clusters and research organisations, and as such, there is no centralised user management. Yet somehow, there must be a way for the system to identify you and your work. This is why ``Grid certificates`` and ``Virtual Organisations`` (VOs) were introduced.
 
.. sidebar:: More about Grid prerequisites?

		.. seealso:: Checkout our mooc video :ref:`mooc-grid-prerequisites`.

Your digital identity starts with a private key. **Only you** are allowed to know the contents of this key. Next, you need a Grid Certificate, which is issued by a Certificate Authorities (CA). The grid certificate contains your name and your organisation, and it says that the person who owns the private key is really the person mentioned, and that this is certified by the Certificate Authority.

Now this is your identity. Big international cooperations do not want to deal with every user individually. Instead, users become part of Virtual Organisations (VOs). Individual clusters give access and compute time to certain VOs, and if you are a member of a VO, you can run your jobs on that cluster.


.. sidebar:: More about Grid Secutity?

		.. seealso:: Checkout our mooc video :ref:`mooc-about-certificate`.

In order to run your work on the Grid, you have to make three essential steps:

1. :ref:`get-grid-certificate`, so that you can be identified on the grid.
2. :ref:`get-ui-account`, so that you can interact with the grid.
3. :ref:`join-vo`, so that you can run your jobs.

The Grid certificate is required to authorize you for using the Grid. The UI account will provide you with the proper environment to submit your jobs to the Grid. Finally, the VO membership is based on your research domain (e.g. ``lsgrid`` for Life Scientists) and determines which resources you can use. 

These steps are described in this chapter.


.. _get-grid-certificate:

======================
Get a Grid Certificate
======================

*In this section we will describe how to get a personal Grid Certificate.*

Grid certificates are supplied by a Certification Authority (CA). Users affiliated with Dutch institutes can request a digital certificate either by ``Digicert CA`` or ``DutchGrid CA``.

.. sidebar:: How to obtain a Grid certificate?

		.. seealso:: Find detailed info in our mooc video :ref:`mooc-get-certificate`.

If you are a researcher in the Netherlands we recommended you to request a certificate via ``Digicert CA``, by using your institutional login and ``SURFconext``. This is the easiest and fastest way to get a Grid certificate. 
		

.. _digicert:

Obtain a *Digicert* certificate
===============================

DigiCert CA allows you to get your Grid certificate *instantly* from the GEANT Trusted Certificate Service (former was the Terena portal), by using your institutional login and SURFconext. 

* Request a so called ``Grid Premium`` certificate by accessing the `DigiCert portal`_.

.. note::  If you need help to obtain your Digicert certificate, please read the `User Guide`_  or contact us at helpdesk@surfsara.nl.  
	
	
.. _dutchgrid:
	
Obtain a *DutchGrid* certificate
================================

In case that your institute does not support SURFconext and is not possible to :ref:`digicert`, then you need to apply for a DutchGrid CA certificate.

* Request a ``DutchGrid`` certificate by launching the `JGridstart`_ tool from your laptop. Then follow the instructions in the same link under section "Request and manage your personal certificates with jGridstart".	
	
	
.. _get-ui-account:

============================
Get a User Interface account
============================

*In this section we will describe how to get a User Interface account.*

The UI account will provide you with the environment to interact with the Grid. You have to login to a User Interface (UI) machine in order to submit your jobs to the grid. To get this account, there are two options:

* If you work in Life Sciences sector and your local institutional cluster is part of the :ref:`lsg` (see :ref:`lsg-clusters`), then you can request a UI as described in section :ref:`access-local-lsg`.

* At any other case, we will give you an account on the ``SURFsara grid-ui`` (server name: ``ui.grid.sara.nl``). Just contact us at helpdesk@surfsara.nl.

Please note that the UI is simply a Linux machine and working on it requires some familiarity with linux commands and remote access methods. If you need help with this, checkout our mooc video :ref:`remote-access`.


.. _install-cert:

Install your certificate 
========================

Once you have a received your  a certificate you will need to install it on the user interface machine and on your browser.

Since you can get your certificate in different ways, you might need to separate your certificate into a public and private part. Before you start installing your grid certificate, it is good to understand the different formats and forms of grid certificates.

.. topic:: About grid certificate formats

	Essentially, there are two grid certificate formats, and you will need both:

	* the **pem** format, which has a separate file for the key and the certificate; this format is used on the Grid compute and storage systems;
	* the **p12** format, which has one file containing both the key and the certificate (in one binary file); this format can be imported in a browser and is used to manage VO memberships.

	Since you will generally want to become a VO member, then run computations or store data, will have to get one of the two, and then convert from one format to the other. 

	.. warning:: Digicert creates pkcs12 files, whereas Dutchgrid creates PEM files. The information below describes how to convert from the pem-format to p12 and vice versa.


.. _p12-to-pem:

Convert pkcs12 to PEM
---------------------

To convert a pkcs12 file to the PEM format, you need two commands; one to extract the key, and one to extract your certificate.

To extract your key, run::
 
	openssl pkcs12 -in user.p12 -out userkey.pem -nocerts

Note that you will first need to enter the password that was used to *create* the pkcs12 file. Next, you need to enter a password to protect the exported key. Enter that password again to verify. Note that you must enter a password and the password must be at least N characters; if the password is too short, ``openssl`` will fail without error. Using the same password as for the p12 file is fine. 

To extract your certificate, run::

	openssl pkcs12 -in user.p12 -out usercert.pem -nokeys


.. _pem-to-p12:

Convert PEM to pkcs12
---------------------

To convert a PEM file to the pkcs12 format, you need the following command, run::

	openssl pkcs12 -export -inkey userkey.pem -in usercert.pem -out browsercert.p12

This will ask you for a password three times: the first is to unlock your private key stored in the file ``userkey.pem``. The pkcs12-file will be password protected, which needs a new password, and the same password for confirmation. Note that your can use the same password as the password for the private key file, but this is not necessary.


.. _install-cert-ui:

Install Grid certificate on UI
------------------------------

* Open a terminal and connect to the UI machine with your :ref:`personal account <get-ui-account>`:

.. code-block:: bash

	ssh homer@ui.grid.sara.nl # replace "homer" with your username!
 
* Create a ``$HOME/.globus`` directory in your UI account:

.. code-block:: bash

 	mkdir $HOME/.globus
 
* Copy your certificate files from your local machine (or from any other location where your credentials are stored) to your ``.globus`` ui directory: 
 
.. code-block:: bash

	scp userkey.pem usercert.pem <username>@ui.grid.sara.nl:~/.globus  # replace homer and certificate filenames
	
.. warning:: In case that you only have the p12 format, first :ref:`convert the .p12 file to the two .pem files <p12-to-pem>`	

* Set the proper permissions to your certificate files:

.. code-block:: bash

	cd $HOME/.globus
	chmod 644 usercert.pem
	chmod 400 userkey.pem
	
The certificate and private key file should now be present in the .globus directory (notice the dot!) on the User Interface machine. Note that the private key file should be **read-only** and only readable to you. 

* Verify key permissions:

.. code-block:: bash

	cd $HOME/.globus
	ls -l
	
	# -rw -r --r --    1 homer    homer            4499  May 10 13:47  usercert.pem
 	# -r --------      1 homer    homer             963  May 10 13:43  userkey.pem


.. _install-cert-browser:

Install Grid certificate on browser
-----------------------------------

For some Grid-services, like :ref:`registering for a Virtual Organization <join-vo>`, you will need to install your Grid Certificate in your browser. This page explains how to do this. 

.. warning:: You can import a certificate in your browser only when it is in the format p12. If you only have the usercert.pem and userkey.pem files, first :ref:`convert the .pem files to p12 <pem-to-p12>`	

* To import the .p12 files in your browser, open a Firefox window and apply the following steps (Note that you may have to copy the p12 file to a directory accessible from your browser):

  * From the Firefox Menu bar select: Edit > Preferences > Encryption > View Certificates > Import
  * Select the browsercert.p12
  * Open: <enter the export password you set in previous step>
	
.. sidebar:: Problems installing the certificate?

		.. seealso:: Need more details for installing your certificate on the UI or browser? Checkout our mooc video :ref:`mooc-ui`.
	
* Verify that your certificate is valid and properly installed in your browser by accessing this website: 

	https://voms.grid.sara.nl:8443/vomses/

If you receive an SSL authentication error, then try repeating the steps carefully as they come. If you managed to access the page above, your certificate is successfully installed!

We will need access to this website in the next step. 
	
.. topic:: See also:
	
    :ref:`key-match`	

    :ref:`expiry-date` 	

    :ref:`cert-subject`


.. _join-vo:

===========================
Join a Virtual Organisation
===========================

.. sidebar:: More about VOs?

		.. seealso:: Need to know more about VOs and how to get a membership? Checkout our mooc video :ref:`mooc-vo`.
	

Your VO will determine which resources you can use. You are eligible to register for a VO only once you :ref:`get a valid certificate <get-grid-certificate>`. The VO that is most suitable for you depends on the specific research area you are in. For example, if you are active in a field associated with the life sciences the ``lsgrid VO`` might be most suitable for you. If you still not sure which VO is best for you, then contact us at helpdesk@surfsara.nl to guide you on this.

This section describes how to get a VO membership.

.. warning:: At this point you must have the certificate successfully installed in your browser. If you don’t have that, go back the :ref:`previous step <install-cert-browser>`.

* Register for your VO here: https://voms.grid.sara.nl:8443/vomses/
* Select the tutor VO from the front page listing all the available VOs, e.g. ``lsgrid``. If it is unclear to you for which VO you should register, please contact us at helpdesk@surfsara.nl. 
* Fill in some of your personal details (name, email, etc.), then read and accept the AUP.
* Check that you have received a verification email titled “Your membership request for VO ...” and confirm with the URL, as described in the email.  
* You will receive an approval email titled “Your vo membership request for VO tutor has been approved” when the VO administrator finally sings your request.

Once you finish this page instructions successfully, you are set to go and run your :ref:`first-grid-job`!

..

..

..

.. Links:

.. _`User Guide`: https://ca.dutchgrid.nl/tcs/TCS2015help.pdf
.. _`DigiCert portal`: https://digicert.com/sso
.. _`JGridstart`: http://ca.dutchgrid.nl
