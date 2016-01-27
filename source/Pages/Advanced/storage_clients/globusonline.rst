.. warning:: Page under construction


.. _globusonline:

*********************
*globusonline* client
*********************

This page includes the basic commands to use ``fts``:

.. contents:: 
    :depth: 4
  
============
GlobusOnline
============

About
=====

Globus provides a web service to schedule file transfers from one storage endpoint to another. Since the service employs gridFTP as transfer protocol either the source or the sink has to be gridFTP-enable. The Globus Online web service allows to monitor the transfer processes via the web interface and reschedules transfers automatically when they fail. Storage endpoints can be different servers or only different locations on the same server. The data transfer is executed on behalf of the user employing his/her credentials or grid certificate.

There exists a python API which allows to steer and monitor the processes from within e.g. the data generating processes. Via this API data transfers can be easily integrated into workflows.

The service is run on Amazon cloud located in the US.


Requirements
============

Globus online makes use of grid proxies. Thus, a user needs to have:

* :ref:`A personal grid certificate <get-grid-certificate>`
* :ref:`A VO membership <join-vo>`

============
Installation
============

Globus Connect
==============

* Create an account here: https://www.globus.org/ by following the instructions.
* To transfer data one needs to define the endpoints. On servers or computers that do not run gridFTP you will first have to install the Globus Connect client software. Below we show an example on how to define your home folder on a grid User Interface machine as endpoint:

 * Click on the button ”Manage endpoints” followed by ”add Globus Connect personal”.
 * Provide a name for your endpoint e.g. ui.grid.sara.nl and press ”Generate Key”
 * Download the linux package for Globus Connect Personal
 * Copy the software to your home directory on the grid user interface and unpack::
 
    scp Downloads/globusconnect−latest.tgz homer@ui.grid.sara.nl: 
    tar −xzf globusconnect−latest.tgz 
    
 * Register the new endpoint by running::

    ./globusconnect −setup <Your Key>

<Your Key> is the key shown below the new endpoint in the browser.
   
  * Prior to employing the endpoint the client has to be started:: 
    
    ./globusconnect −start &

.. note:: These steps work for any personal (non gridFTP-enabled) server. 

* Define other endpoints:

By clicking the button ”Manage endpoints” followed by ”all” one will be directed to a list with all endpoints, e.g. the ``surfsara#dCache`` gridftp endpoint which points at the Grid Front End storage.

* To register a gridFTP-enabled enpoint click on ”add an endpoint” and follow the instructions there. You will need to provide a URL and a URI. In case of the SURFsara grid you will need to set URL = px.grid.sara.nl and URI = gsiftp://gridftp.grid.sara.nl:2811

.. note:: Before data can be transfered you need to register endpoints with Globus Online. This also holds true when working with another client than the web interface.


Python API
==========

Information not available yet.

======================
Data transfer workflow
======================

Activating endpoints
=====================

Globus Online executes data transfers on behalf of a user. To this end it employs a grid proxy that is provided by the user and instantiated with his/her grid credentials/certificates. Independent from using the python API or the web interface one first has to activate the endpoints from/to which data should be transfered.

* The non gridFTP-enabled endpoints like personal workstations or the home of the grid user interface machines are activated by running::

    ./globusconnect −start &

* To activate a gridFTP-enabled endpoint the user needs to provide the service with a grid proxy. Start a grid session and create a grid proxy on the proxy server::

    startGridSession <VOname>
    myproxy−init −−voms <VOname> −l <username>

The username is only valid for this proxy and could be anything. After that the user is asked to authenticate with his/her passphrase after which a passphrase for the proxy user is created. 

* The grid proxy is exported via the web interface.

Data transfers employing the web interface
==========================================

Data transfers can be easily started employing the web interface. One has to provide the names of the endpoints from and to which the data is transferred. Data to be transferred is selected by marking it and then clicking one of the arrows to determine sink and source.

The current state of data transfers can be monitored in the ”Activity” screen.

Data transfers employing the python API
=======================================

Information not available yet.
