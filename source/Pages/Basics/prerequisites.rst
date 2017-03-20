.. _prerequisites:

*************
Prerequisites
*************

This section summarises all the preparations you need to make before you run a :ref:`simple job <first-grid-job>` on the Grid:

.. contents:: 
    :depth: 4


.. _preparation:

===========
Preparation
===========

The Grid is a cooperation of many different clusters and research organisations, and as such, there is no centralised user management. Yet, there must be a way for the system to identify you and your work. This is why **Grid certificates** and **Virtual Organisations** (VOs) are introduced.
 
.. sidebar:: More about Grid prerequisites?

		.. seealso:: Check out our mooc video :ref:`mooc-grid-prerequisites`.

Your digital identity starts with a private key. **Only you** are allowed to know the contents of this key. Next, you need a Grid certificate, which is issued by a Certificate Authority (CA). The Grid certificate contains your name and your organisation, and it says that the person who owns the private key is really the person mentioned, and that this is certified by the Certificate Authority.

Now this is your identity. Big international cooperations do not want to deal with every user individually. Instead, users become part of Virtual Organisations. Individual clusters give access and compute time to certain VOs, and if you are a member of a :abbr:`VO (Virtual Organisation)`, you can run your jobs on that cluster.


.. sidebar:: More about Grid Security?

		.. seealso:: Check out our mooc video :ref:`mooc-about-certificate`.

In order to run your work on the Grid, you have to make three essential steps:

1. :ref:`get-ui-account`, so that you can interact with the Grid.
2. :ref:`get-grid-certificate`, so that you can be identified on the Grid.
3. :ref:`join-vo`, so that you can run your jobs on the Grid.

The UI account will provide you with the proper environment to submit your jobs to the Grid. The Grid certificate is required to authorize you for using the Grid. Finally, the :abbr:`VO (Virtual Organisation)` membership is based on your research domain (e.g. ``lsgrid`` for Life Scientists) and determines which resources you can use.

These steps are described in this chapter.

	
.. _get-ui-account:

============================
Get a User Interface account
============================

*In this section we will describe how to get a User Interface account.*

The User Interface (UI) account will provide you with the environment to interact with the Grid. It is your access point to the Grid.  You log in to a UI machine via SSH. On this computer you can, amongst others, do the following things: access Grid resources, create proxies, submit jobs, compile programs or prototype your application. For debugging purposes it is good to know that the environment of a user interface is similar to a Grid worker node thus if your code runs on the user interface it will most likely run on a Grid worker node.

To get this :abbr:`UI (User Interface)` account, there are two options:

* If you work in Life Sciences sector and your local institutional cluster is part of the :ref:`lsg` (see :ref:`lsg-clusters`), then you can get an account to the local user interface. Please send us your request at helpdesk@surfsara.nl. We will ask confirmation for your affiliation with the institute from your designated site admin (see :ref:`local contacts <lsg-dsa>`) and provide you with an account on your local cluster.

* At any other case, we will give you an account on the SURFsara Grid :abbr:`UI (User Interface)` (server name: ``ui.grid.sara.nl``). For this, you need to contact us at helpdesk@surfsara.nl.

Please note that the :abbr:`UI (User Interface)` is simply a Linux machine and working on it requires some familiarity with linux commands and remote access methods. If you need help with this, check out our mooc video :ref:`remote-access`.


.. _get-grid-certificate:

======================
Get a Grid certificate
======================

Grid certificates are supplied by a Certificate Authority (CA). Users affiliated with Dutch institutes can request a digital certificate either by ``DigiCert CA`` or ``DutchGrid CA``.

.. sidebar:: How to obtain a Grid certificate?

		.. seealso:: Find detailed info in our mooc video :ref:`mooc-get-certificate`.

If you are a researcher in the Netherlands we recommended you to request a certificate via ``DigiCert CA``, by using your institutional login. This is the easiest and fastest way to get a Grid certificate. In cases that the DigiCert CA option is not applicable, you can request a DutchGrid CA certificate.

Here you can find details for obtaining and installing a Grid certificate:

.. toctree::
   :maxdepth: 1

   certificates/digicert
   certificates/dutchgrid

If you're not affiliated with a Dutch institute, please find a suitable :abbr:`CA (Certificate Authority)` at https://www.igtf.net/pmamap to obtain a Grid certificate from. We also have a :ref:`list of CAs that are supported on the grid <list-of-grid-cas>`.

.. _join-vo:

===========================
Join a Virtual Organisation
===========================

.. sidebar:: More about VOs?

		.. seealso:: Need to know more about VOs and how to get a membership? Check out our mooc video :ref:`mooc-vo`.
	
A Virtual Organisation or VO is a group of geographically distributed people that have common objectives and that are using shared Grid resources to achieve them. Every Grid user is a member of one or more Virtual Organisations. 

In practice your :abbr:`VO (Virtual Organisation)` membership determines to which resources (compute and storage) you have access to. You are eligible to register for a :abbr:`VO (Virtual Organisation)` only once you :ref:`get a valid certificate <get-grid-certificate>`. The :abbr:`VO (Virtual Organisation)` that is most suitable for you depends on the specific research area you are in. For example, if you are active in a field associated with the life sciences the ``lsgrid VO`` might be most suitable for you. If you still not sure which :abbr:`VO (Virtual Organisation)` is best for you, then contact us at helpdesk@surfsara.nl to guide you on this.

This section describes how to get a :abbr:`VO (Virtual Organisation)` membership.

.. warning:: At this point you must have the certificate successfully installed in your browser. If you don’t have that, go back the :ref:`previous step <get-grid-certificate>`.

* Open the link below from the browser where your certificate is installed (:abbr:`UI (User Interface)` or laptop). The page will ask you to confirm with your installed browser certificate:   https://voms.grid.sara.nl:8443/vomses/  
* Select the VO that you are interested for e.g. ``lsgrid``, from the front page listing all the available :abbr:`VOs (Virtual Organisations)`. If it is unclear to you for which VO you should register, please contact us at helpdesk@surfsara.nl. 
* Fill in some of your personal details (name, email, etc.), then read and accept the :abbr:`AUP (Acceptable Use Policy)`.
* Check that you have received a verification email titled “Your membership request for VO ...” and confirm with the URL, as described in the email.  
* You will receive an approval email titled “Your vo membership request for VO lsgrid has been approved” when the :abbr:`VO (Virtual Organisation)` administrator finally sings your request.

Once you finish this page instructions successfully, you are set to go and run your :ref:`first-grid-job`!
