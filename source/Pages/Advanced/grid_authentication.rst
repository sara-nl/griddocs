.. _grid-authentication:

*******************
Grid Authentication
*******************

This section explains concepts and operations regarding the grid authentication mechanisms:

.. contents:: 
    :depth: 4


==========================================
Introduction: delegation of authentication
==========================================

Grid, by its very nature, is decentralized. This means that users must
authenticate themself to the grid services they want to use. This is accomplished 
by means of a personal certificate and accompanying private key that 
every grid user must have. The combinbation of a certificate and private key
uniquely identifies an user. Therefore, you should **never share
your private key** with anyone else or with any service. At the same time,
however, your jobs will typically run on systems you may not trust. However,
to be able use those systems you mustidentify yourself with those systems.
This is where *delegation* comes in: identifying yourself with a system you don't trust
by creating a new certificat/private key pair, called a proxy, with a limited 
time validity. This chapter describes how you can delegate your credentials.

The easiest is to use a *grid session*, which does everything for you in
one go.


.. _startgridsession-explained:

=======================
Starting a grid session
=======================

The easiest way to start a session on the grid is to use the ``startGridSession <VO Name>`` command (see :ref:`example <startgridsession>`) on a user interface (UI) machine.

.. sidebar:: More about creating proxies?

		.. seealso:: For more detailed information about the proxies, have a look to our mooc video :ref:`mooc-startgridsession`.

The ``startGridSession`` command:

* generates a ``local proxy`` of your certificate and private key;
* uploads the proxy to the ``Myproxy server``;
* delegates this proxy WMS with your user name as the ``delegation ID`` (DID). 

Your jobs will now be able to run for week. The WMS, who is responsible for
the scheduling of your job, will renew the proxy certificate of running
jobs *every 12 hours* automatically, for one week. This means that your
jobs must finish within a week from starting the grid session. However,
running the command again gives your jobs more time.

.. note:: Every time you submit the ``startGridSession`` command it renews your grid session for an additional a week.

Instead of ``startGridSession``, you can run the following three commands separately with the same results:

.. code-block:: bash

	# 1. VOMS server: create a voms proxy with voms extensions that enables you to access the Grid for *12 hours*.
	voms-proxy-init --voms lsgrid  #replace lsgrid with your VO
	
	# 2. MyProxy server: store a *week* long proxy certificate in the Myproxy server; useful for jobs that are running for more than 12 hours.
	myproxy-init -d -n 
	
	# 3. WMS: delegate your credentials to the WMS
	glite-wms-job-delegate-proxy -d $USER

The next section explains the startGridSession operations step-by-step. See also ``startGridSession -h``.


.. _voms-proxies:

Using VOMS Proxies
==================

In order to use Grid facilities, you have to create a proxy. A proxy is a
short-lived certificate/private key combination which is used to
perform actions on the Grid on your behalf without using passwords.  You
can read more in this `paper <http://toolkit.globus.org/alliance/publications/papers/pki04-welch-proxy-cert-final.pdf>`_ from Globus Alliance Members.
Services that have been provided with a copy of your proxy can act on your behalf. This proxy
is a file owned by you and placed in the ``/tmp`` directory of the UI. You only deal
with this file directly in exceptional cases. 

Creating a VOMS proxy
---------------------

Make sure you have installed your certificate and private on the grid user interface that you are working on. 
They should be place in the ``.globus`` directory under your home directory and should be named ``usercert.pem``
and `userkey.pem``. They must have the following ownerships and permissions::
	
	ls -l $HOME/.globus/usercert.pem
	-rw-r--r-- 1 homers homers 1956 Nov 16 12:20 /home/homers/.globus/usercert.pem
		
	ls -l $HOME/.globus/userkey.pem
	-r-------- 1 homers homers 1956 Nov 16 12:20 /home/homers/.globus/usercert.pem
	
where ``homers`` should be replace with your username.

* Now issue the following command to create a *local* proxy. The pass phrase is the grid certificate password::

    voms-proxy-init --voms lsgrid

You will see the following output in your terminal::

	Enter GRID pass phrase for this identity:
	Contacting voms.grid.sara.nl:30018  [/O=dutchgrid/O=hosts/OU=sara.nl/CN=voms.grid.sara.nl] "lsgrid"...
	Remote VOMS server contacted successfully.
	Created proxy in /tmp/x509up_u39111.
	Your proxy is valid until Thu Jan 05 02:07:29 CET 2016

This proxy is your "username" for the Grid. The last line in the example shows the expiration time of the proxy. 

Non standard location
`````````````````````
To store your local proxy in a non standard location, use the `-out` option::

    voms-proxy-init -voms lsgrid --valid 168:00 -out /home/homer/my_proxy_cert

See ``voms-proxy-init -h`` for more options. 

Inspecting your proxy certificate
---------------------------------

* You can inspect your local proxy with the command::

    voms-proxy-info -all

Here is an example::

    # subject   : /O=dutchgrid/O=users/O=sara/CN=Homer Simpson/CN=proxy
    # issuer    : /O=dutchgrid/O=users/O=sara/CN=Homer Simpson
    # identity  : /O=dutchgrid/O=users/O=sara/CN=Homer Simpson
    # type      : full legacy globus proxy
    # strength  : 1024
    # path      : /tmp/x509up_u39111
    # timeleft  : 11:48:24
    # key usage : Digital Signature, Key Encipherment, Data Encipherment
    # === VO lsgrid extension information ===
    # VO        : lsgrid
    # subject   : /O=dutchgrid/O=users/O=sara/CN=Homer Simpson
    # issuer    : /O=dutchgrid/O=hosts/OU=sara.nl/CN=voms.grid.sara.nl
    # attribute : /lsgrid/Role=NULL/Capability=NULL
    # attribute : /lsgrid/SARA/Role=NULL/Capability=NULL
    # timeleft  : 11:48:24
    
You can see that a proxy certificate has a limited lifetime and is stored
in the ``/tmp`` directory. It also has attributes which mention the VO
information. A grid service who has been provided with a copy of your proxy, 
will contact the VOMS service for authorisation information and subsequently
grant or deny you access.

.. note:: In the :ref:`next step <myproxy-server>`, you will delegate your proxy
    certificate to the proxy server and there it will be valid by default for
    a week. So it will be possible that long running jobs and jobs that
    started running only after a few days can continue to run. However, the
    proxy certificate that you use locally is only valid for 12 hours. So
    remember that after 12 hours you have to create a new proxy certificate
    to interact with the Grid (and your long running jobs).


.. _myproxy-server:

Using the MyProxy Server
========================

The following command stores a proxy certificate in the proxy server
where it will issue new proxy certificates on your behalfcfor a week.
This is necessary for jobs that need more than 12 hours to run.

* Issue this command on the UI::

    myproxy-init -d -n

You should get something like this::

	Your identity: /O=dutchgrid/O=users/O=sara/CN=Homer Simpson	
	Enter GRID pass phrase for this identity:
	Creating proxy ................................................. Done
	Proxy Verify OK
	Your proxy is valid until: Wed Jan 13 14:25:06 2016	
	A proxy valid for 168 hours (7.0 days) for user /O=dutchgrid/O=users/O=sara/CN=Homer Simpson now exists on px.grid.sara.nl.

The delegated proxy can be received locally from other authorized Grid machines. 


Inspecting the *myproxy* certificate
------------------------------------

* You can inspect the the *myproxy* certificate with the command::

    myproxy-info -d

Here is an example of the displayed output::

	username: /O=dutchgrid/O=users/O=sara/CN=Homer Simpson
	owner: /O=dutchgrid/O=users/O=sara/CN=Homer Simpson
	timeleft: 167:56:36  (7.0 days)


.. _credential-delegation:

Credential delegation
=====================

This section explains the usage of the command ``glite-wms-job-delegate-proxy``, which is also executed when running the :ref:`startGridSession <startgridsession-explained>`.

When you submit a job to the grid it will be sent to the Workload
Management System (WMS). This system will then schedule your job and send
it to a worker node somewhere on the grid. The job will be run on your
behalf, therefore, you should delegate your credentials to the WMS. 

Credential delegation solves the following problem: when the grid is busy or when you submit a large number of jobs, it can take more then the standard 12 hours for the jobs to start than your local proxy certificate is valid. The solution is to use *proxy delegation* before submitting jobs.

We assume that you have issued the ``voms-proxy-init command`` and have a valid
local proxy. If not, please see :ref:`voms-proxy-init command <voms-proxies>`.

* To delegate your proxy to the WMS, run on the UI::

    echo $USER
    glite-wms-job-delegate-proxy -d $USER  # the $USER is the delegation id

The variable ``$USER`` is the delegation id (in this case your login name from the system). This string is needed in other commands to identify your session. In general, you can use any string you like after the ``-d`` option.

Instead of creating a delegation ID with ``-d``, the ``-a`` option can be used.
This causes a delegated proxy to be established automatically. In this
case you do not need to remember a delegation identifier. However,
repeated use of this option is not recommended, since it delegates a new
proxy each time the commands are issued. Delegation is a time-consuming
operation, so it's better to use the -d ``$USER`` when submitting a large
number of jobs one after the other.

Here is an example of the displayed output::

	Connecting to the service https://wms2.grid.sara.nl:7443/glite_wms_wmproxy_server
	================== glite-wms-job-delegate-proxy Success ==================	
	
	Your proxy has been successfully delegated to the WMProxy(s):
	https://wms2.grid.sara.nl:7443/glite_wms_wmproxy_server
	with the delegation identifier: homer
	
	==========================================================================


.. _proxy-info-commands:

===========================================
Commands for viewing your proxy information
===========================================

* To start your Grid session::
 
	startGridSession lsgrid  # replace lsgrid with your VO

* To see how much time there is left on your Grid session::
  
    myproxy-info -d

* To renew your Grid session::

   startGridSession lsgrid  #replace lsgrid with your VO
   
* To end your session::
 
    myproxy-destroy -d

* To remove your local ``/tmp/x509up_uXXX`` proxy::

    voms-proxy-destroy

.. note:: ``myproxy-destroy`` will not terminate any job. Jobs will continue
  to run and will fail when the the proxy certificate that was used at the
  time of submission, expires. Use :ref:`glite-wms-job-cancel <job-cancel>` to cancel
  running jobs.

..

..

..

.. Links:

.. _`Globus Alliance publications`: http://toolkit.globus.org/alliance/publications/

.. vim: set wm=7 :
