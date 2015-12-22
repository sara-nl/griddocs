
.. _grid-authentication:


Grid Authentication
*******************


Introduction: delegation of authentication
==========================================

Because of its decentralized nature, authentication on the grid uses
private keys and certificates to authenticate users. Posession of a
private key authenticates a person, and as such, you should never share
your private key with anyone else, or with any service. At the same time,
however, your jobs will typically run on systems you may not trust, so
you must somehow identify yourself with those systems. This is what
*delegation* is for: identifying yourself with a system you don't trust,
by creating a new private key and a certificate with a limited validity.
This chapter describes how you can create delegate your credentials.

The easiest is to use a *grid session*, which does everything for you in
one go.


Starting a gridsession
======================

The easiest way to start a session on the LifeScience Grid is to use the
script ``startGridSession <VO Name>``. 

This script:

* generates a proxy certificate, 
* stores it in the Myproxy server 
* delegates it to the *WMS* with your user name as the delegation ID (DID). 

Your jobs will now be able to run for week. The *WMS*, responsible for
the scheduling of your job, will renew the proxy certificate of running
jobs every 12 hours automatically, for one week. This means that your
jobs must finish before one week from starting the grid session. However,
running again gives your jobs more time.


Operations run by this script
-----------------------------

The first step in this script is to create a proxy certicate with *VOMS
extensions*, by running::

  voms-proxy-init -voms lsgrid

The command contacts the VOMS server, and if you are a member of the
requested VO, you get a proxy certificate which enables you to
access the Grid for 12 hours. The compute and storage elements you are
able to access depends on the VO.

Next, the script stores a week-long proxy certificate in the Myproxy
server by running::

 myproxy-init -d -n

This is useful for jobs that are running for more than 12 hours; the
glite middleware uses this server to re-obtain your credentials when they
are expired.


The last step in ``startGridSession`` is to delegate your credentials to
the *WMS*, by running::

  glite-wms-job-delegate-proxy -d $USER

The ``-d $USER`` flag acts as pointer which you can use in your job
submissions to avoid repeating delegation.

And now you are ready to submit jobs to the Grid! Or copy data from and
to the grid.

Commands for viewing your proxy information
-------------------------------------------

* To start your Grid session::

    startGridSession <VO Name>, example: "startGridSession lsgrid"

* To see how much time there is left on your Grid session::
  
    myproxy-info -d

* To renew your Grid session::

    startGridSession <VO Name>

* Example of the command to submit a job, note the use of ``-d $USER`` to
  tell your job that it should use your delegated proxy certificate (more
  on that in the rest of the tutorial)::
 
    glite-wms-job-submit -d $USER -o myjobs job.jdl
   
* To end your session::
 
    myproxy-destroy -d

.. note:: ``myproxy-destroy`` will not terminate any job. Jobs will continue
  to run and will fail when the the proxy certificate that was used at the
  time of submission, expires. Use ``glite-wms-job-cancel <JobID>`` to cancel
  running jobs.


Using VOMS Proxies
==================

In order to use Grid facilities, you have to create a proxy. A proxy is a
short-lived short-lived key/certificate combination which is used to
perform actions on the Grid on your behalf, without using passwords.  You
can read more at
http://www.globus.org/alliance/publications/papers/pki04-welch-proxy-cert-final.pdf
Services having access to your proxy can act on your behalf. This proxy
is a file owned by you and placed in the /tmp directory. You only deal
with this file in exceptional cases. 

Creating a VOMS proxy
---------------------

Make sure you first installed your key and 
certificate on the grid user interface that you are working on. Now issue the
command::

    voms-proxy-init --voms <YourVOName>

You should get something like this::

    mgjansen$ voms-proxy-init --voms lsgrid
    Cannot find file or dir: /home/mgjansen/.glite/vomses
    Enter GRID pass phrase:
    Your identity: /O=dutchgrid/O=users/O=sara/CN=Machiel Jansen
    Creating temporary proxy .................................... Done
    Contacting  voms.grid.sara.nl:30018 [/O=dutchgrid/O=hosts/OU=sara.nl/CN=voms.grid.sara.nl] "lsgrid" Done
    Creating proxy ..................................................................... Done
    Your proxy is valid until Fri Mar 14 00:53:02 2008

In essence this is the "user name" for the Grid. The pass phrase is the
pass phrase you used creating the certificate. The last line in the
example shows the expiration time of the proxy. So, from time to time you
will have to call voms-proxy-init again.

You may get the following error::
   ERROR: Couldn't find valid credentials to generate a proxy.
   Use --debug for further information.

The permissions on your installed certificate are probably wrong. Check the appropriate steps in "Installing your certificate".


Inspecting your proxy certificate
---------------------------------

You can inspect your system with the command::

    voms-proxy-info -all

Here is an example::

    mgjansen$ voms-proxy-info -all
    subject   : /O=dutchgrid/O=users/O=sara/CN=Machiel Jansen/CN=proxy
    issuer    : /O=dutchgrid/O=users/O=sara/CN=Machiel Jansen
    identity  : /O=dutchgrid/O=users/O=sara/CN=Machiel Jansen
    type      : proxy
    strength  : 2048 bits
    path      : /tmp/x509up_u512
    timeleft  : 11:57:01
    === VO lsgrid extension information ===
    VO        : lsgrid
    subject   : /O=dutchgrid/O=users/O=sara/CN=Machiel Jansen
    issuer    : /O=dutchgrid/O=hosts/OU=sara.nl/CN=voms.grid.sara.nl
    attribute : /lsgrid/Role=NULL/Capability=NULL
    attribute : /lsgrid/SARA/Role=NULL/Capability=NULL
    timeleft  : 11:57:02

You can see that a proxy certificate has a limited lifetime and is stored
in the ``/tmp`` directory. It also has an extension which mentions the VO
information. By using this information and based on your VO membership,
the VOMS system can authorize you to certain resources on the Grid.

.. note:: In the step after this step, you will delegate your proxy
    certificate to the proxy server and there it will be valid by default for
    a week. So it will be possible that long running jobs and jobs that
    started running only after a few days can continue to run. However, the
    proxy certificate that you use locally is only valid for 12 hours. So
    remember that after 12 hours you have to create a new proxy certificate
    to interact with the Grid (and your long running jobs).


Using the Grid/MyProxy Server
=============================


The following command stores a proxy certificate in the proxy server
where it will issue new proxy certificates on your behalf for a week.
This is necessary for jobs that need more than 12 hours to run.::

  myproxy-init -d -n

You should get something like this::

  anatolid$ myproxy-init -d -n
  Your identity: /DC=org/DC=terena/DC=tcs/C=NL/O=Stichting Academisch Rekencentrum Amsterdam/CN=Anatoli Danezi
  Anatoli.Danezi@surfsara.nl
  Enter GRID pass phrase for this identity:
  Creating proxy ............................................................
  ...................................... Done
  Proxy Verify OK
  Your proxy is valid until: Sun Mar 10 22:46:51 2013
  A proxy valid for 168 hours (7.0 days) for user /DC=org/DC=terena/DC=tcs/C=NL/O=Stichting Academisch Rekencentrum
  Amsterdam/CN=Anatoli Danezi Anatoli.Danezi@surfsara.nl now exists on px.grid.sara.nl.


The delegated proxy can be received locally from other authorized Grid
machines. To do this, protect your proxy with a MyProxy pass phrase by
omitting option -n::

  anatolid$ myproxy-init -d
  Your identity: /DC=org/DC=terena/DC=tcs/C=NL/O=Stichting Academisch Rekencentrum Amsterdam/CN=Anatoli Danezi
  Anatoli.Danezi@surfsara.nl
  Enter GRID pass phrase for this identity:
  Creating proxy ...................................................... Done
  Proxy Verify OK
  Your proxy is valid until: Sun Mar 10 23:16:00 2013
  Enter MyProxy pass phrase:
  Verifying - Enter MyProxy pass phrase:
  A proxy valid for 168 hours (7.0 days) for user /DC=org/DC=terena/DC=tcs/C=NL/O=Stichting Academisch Rekencentrum
  Amsterdam/CN=Anatoli Danezi Anatoli.Danezi@surfsara.nl now exists on px.grid.sara.nl.

Use MyProxy pass phrase to get the delegated proxy locally::

  anatolid$ myproxy-get-delegation -d
  Enter MyProxy pass phrase:
  A credential has been received for user /DC=org/DC=terena/DC=tcs/C=NL/O=Stichting Academisch Rekencentrum
  Amsterdam/CN=Anatoli Danezi Anatoli.Danezi@surfsara.nl in /tmp/x509up_xxx



Credential delegation
=====================

This page explains the usage of the command glite-wms-job-delegate-proxy.
This is also used in the startGridSession script.

Credential delegation solves the following problem: Before job submission
you may want to delegate your credentials to the Workload Management
System (WMS). This can speed up multiple job submissions, but more
importantly, when the Grid is busy or when you submit a large number of
jobs, it can take more then the standard 12 hours that your proxy
certificate is valid for the jobs to start. In that case your proxy
certificate expired and the jobs will fail.

The solution solution is to use *proxy delegation* before submitting jobs
to the grid::

  glite-wms-job-delegate-proxy -d <delegation id>.

When you submit a job to the grid it will be sent to the Workload
Management System (WMS). This system will then schedule your job and send
it to a worker node somewhere on the grid. The job will be run on your
behalf, therefore, you should delegate your credentials to the WMS. You
only have to do this once per session. When you renew your proxy
certificate (by typing voms-proxy-init) you have to delegate it to the
WMS once more.

We assume that you have used the ``voms-proxy-init command`` and have a valid
proxy credential. If not, please see ``voms-proxy-init``.

Use the following command::

  glite-wms-job-delegate-proxy -d <delegation id>

The variable delegation id is just a string to label the delegation (in
this case the your login name from the system). This string is needed in
later commands to identify your session. You can use any string you like
after the ``-d`` option.

Instead of creating a delegation ID with -d, the -a option can be used.
This causes a delegated proxy to be established automatically. In this
case you do not need to remember a delegation identifier. However,
repeated use of this option is not recommended, since it delegates a new
proxy each time the commands are issued. Delegation is a time-consuming
operation, so it's better to use glite-wms-job-delegate-proxy and reuse
the delegation ID when submitting your jobs.

Let's create a delegation ID using the WMProxy by creating a delegation
identifier using your username. To get the username we take the $USER
environment variable. Remember that you can use any string you like as a
delegation identifier.::

  $ echo $USER
  mgjansen
  
  $ glite-wms-job-delegate-proxy -d $USER
  
  Connecting to the service https://wms.grid.sara.nl:7443/glite_wms_wmproxy_server
  
  
  ================== glite-wms-job-delegate-proxy Success ==================
  
  Your proxy has been successfully delegated to the WMProxy:
  https://wms.grid.sara.nl:7443/glite_wms_wmproxy_server
  
  with the delegation identifier: mgjansen
  
  ==========================================================================


.. vim: set wm=7 :
