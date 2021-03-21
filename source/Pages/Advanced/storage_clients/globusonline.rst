
.. _globusonline:

*********************
*globusonline* client
*********************

This page includes the basic commands to use ``globusonline``. For an overview of storage clients,
see :ref:`storage-clients`.

.. contents::
    :depth: 4

===================
About Globus Online
===================

Globus Online provides a service to transfer files from one storage endpoint to another via the Web GUI or an API.
The Globus Online web service allows to monitor the transfer processes via the web interface and reschedules
transfers automatically when they fail.

There exists a python API which allows to steer and monitor the processes from within e.g. the data generating processes.
Via this API data transfers can be easily integrated into workflows.

The service is run on the Amazon cloud located in the US.

.. _storage-endpoints:

=================
Storage Endpoints
=================

In order to access, share, transfer, or manage data using Globus, the first step is to create an endpoint on the
system(s) where the data is (or will be) stored.

These endpoints can be:

* Globus Connect Personal endpoints:

  * local machines like your laptop or a Virtual Machine
  * personal accounts on login nodes connected to clusters like your home account on :ref:`SURF grid UI <get-ui-account>` or `Spider UI <https://spiderdocs.readthedocs.io/en/latest/Pages/getting_started.html#logging-in>`_.

.. note:: It is not possible to transfer data between two Personal endpoints, unless you use Globus Plus groups or managed subscriptions.

* Globus Connect Server endpoints:

  * gridFTP servers, like the :ref:`Grid Storage <storage-types>` or `SURFsara's archive <https://www.surf.nl/en/services-and-products/data-archive/index.html>`_.

.. _personal-endpoints:

Personal endpoints
==================

On servers or computers that do not run GridFTP you will first have to install the Globus Connect client software.
Below we show how to define your laptop or your home folder on a User Interface machine as endpoint:

.. _local-machine-endpoint:

Activate a local machine endpoint
---------------------------------

* Create an account `here <https://www.globus.org/>`_ by following the instructions
* Login to the web interface:

.. image:: /Images/globusonline-login.png

* Install the Globus Connect client supported by the OS of your local machine as described `here <https://www.globus.org/globus-connect-personal>`_. There are different ways to install the client. Here we show examples on a Mac OS local machine:

  * From the web interface select on the left ENDPOINTS and then click on '+Create a personal endpoint':

  .. image:: /Images/globusonline-create-endpoint.png

  * Download and install the client:

  .. image:: /Images/globusonline-download.png

* Start and setup the Globus Connect client:

.. image:: /Images/globusonline-start-client.png

.. image:: /Images/globusonline-setup-client.png

.. image:: /Images/globusonline-setup-client2.png

* You should see the Globus Connect client running (e.g in the menu bar)

* Check in the web interface that your local machine is activated as Globus Online endpoint. On the left select FILE MANAGER, and in the collection search box find your collection and click on it. You should see your local files:

.. image:: /Images/globusonline-local-files.png

You can now use your local machine to transfer files to other Globus Online endpoints.

.. _grid-ui-endpoint:

Activate Grid UI endpoint
-------------------------

For a linux machine as the Grid UI, you need to configure the linux package for
Globus Connect Personal on your home UI account. The following steps assume that you already have
a Globus Online account. If not, please refer to the previous section.

* Log in to your :abbr:`UI (User Interface)` account:

.. code-block:: console

   $ssh -YC homer@ui.grid.surfsara.nl # replace "homer" with your username

* Download the linux package for Globus Connect Personal and extract the files:

.. code-block:: console

   $wget https://downloads.globus.org/globus-connect-personal/linux/stable/globusconnectpersonal-latest.tgz
   $tar xzf globusconnectpersonal-latest.tgz
   $cd globusconnectpersonal-3.1.3/

* Start the installation and follow the steps interactively. You will be asked to login to your Globus account:

.. code-block:: console

   $./globusconnectpersonal

.. image:: /Images/globusonline-ui-login.png

* A Firefox browser will open and ask you to login with your Globus account:

.. image:: /Images/globusonline-ui-login2.png

.. image:: /Images/globusonline-ui-login3.png

* Finish the Globus Connect Personal setup and give a name to your Grid UI collection:

.. image:: /Images/globusonline-ui-setup.png

.. image:: /Images/globusonline-ui-setup2.png

* Close the browser when finished. You should see a message on the UI shell that the setup completed successfully.

* The non GridFTP-enabled endpoints like Grid user interface machines personal endpoints need to be activated every time prior to usage with the following command:

.. code-block:: console

   $./globusconnect -start

* The command above will define your home folder on a grid user interface machine as endpoint. If you wish to grant access to other paths that you have access on the same machine, then you can define a comma separated list of full paths that Globus may access as (If no prefix is present, r/w is assumed):

.. code-block:: console

   $./globusconnect -start -restrict-paths /project/myData/

.. note::  The `globusconnect -start` command will keep your session open and the endpoint activated until you stop it with Ctrl+C. You may also run it as background process in a `screen` session.

* Open a browser in your laptop (the Grid UI Firefox is quite slow) and login to your Globus account to see your new Grid UI Personal endpoint. It should be in status 'ready':

.. image:: /Images/globusonline-ui-endpoint.png

* Select the Grid UI endpoint from the tab 'Your Collections' in your FILE MANAGER to see your home data:

.. image:: /Images/globusonline-ui-endpoint2.png

.. image:: /Images/globusonline-ui-endpoint3.png


.. _server-endpoints:

Server endpoints
================

When you use GridFTP as transfer protocol either the source or the destination has to be GridFTP-enabled.
The storage endpoints can be different servers or only different locations on the same server.
Globus online makes use of Grid proxies for GridFTP transfers. The data transfer is executed on behalf of the
user with the use of his/her Grid proxy. Thus, a user needs to have the following
when using GlobusOnline together with dCache:

* :ref:`A personal Grid certificate <get-grid-certificate>`
* :ref:`A VO membership <join-vo>`

.. _dcache-endpoint:

Activate dCache endpoint
------------------------

* To activate a GridFTP-enabled endpoint the user needs to provide the service with a Grid proxy. Login to the grid UI, start a Grid session and create a Grid proxy on the proxy server:

.. code-block:: console

   $ssh -YC homer@ui.grid.surfsara.nl
   $startGridSession lsgrid  #replace lsgrid with your VO
   $myproxy-init --voms lsgrid -l homer  #replace lsgrid with your VO and homer e.g. with your name. The username is only valid for this proxy and could be anything you choose.
   ## Enter GRID pass phrase for this identity: [give your grid certificate passwword]
   ## Enter MyProxy pass phrase: [give any passphrase you like. This passphrase will be used later to activate the dCache endpoint]

* Login to the Globus web interface from a browser in your laptop and on the left go to ENDPOINTS. On top search for ``surf#dCache_gridftp``. This GridFTP endpoint points at the :ref:`dCache` Grid storage.

.. image:: /Images/globusonline-dcache1.png

* To activate the dCache Gridftp endpoint, click on the ``surf#dCache_gridftp`` endpoint and then 'Activate'. Provide the username and passphrase from the previous step when you created a proxy on the grid UI and click 'Authenticate':

.. image:: /Images/globusonline-dcache2.png

.. image:: /Images/globusonline-dcache3.png

.. image:: /Images/globusonline-dcache4.png

* Check in the web interface that the dCache endpoint is activated as Globus Online endpoint. On the left select FILE MANAGER, and provide the following details in the 'Collection' and 'Path'. You should see your dCache VO files:

  * Collection: ``surf#dCache_gridftp``
  * Path: ``/pnfs/grid.sara.nl/data/lsgrid/SURFsara/``  #replace with your VO and project path

  .. image:: /Images/globusonline-dcache5.png

  .. image:: /Images/globusonline-dcache6.png


.. _globus-data-transfers:

==============
Data transfers
==============

.. sidebar:: using Globusonline

Before data can be transferred you need to :ref:`activate the endpoints <storage-endpoints>` from/to which data should be transferred.
Globus Online executes data transfers on behalf of a user. Data transfers can be easily started employing the web interface. You have to provide the names of the endpoints
from and to which the data is transferred.

Data to be transferred is selected by marking it and then clicking one of the arrows to determine sink and source.
The current state of data transfers can be monitored in the ACTIVITY tab.

Interacting with Globusonline is possible via the Web Interface or with a python API. The examples here show the
webinterface transfers.

.. _dcache-transfers:

dCache transfers
================

Transferring data to/from dCache requires that the dCache endpoint is activated and a Grid proxy is provided
by the user and instantiated with his/her Grid credentials/certificates.

Creating bookmarks of your endpoints and desired storage paths allows you to define easily the source and target
data locations prior to the transfers. You can create bookmarks on the Web interface:

.. image:: /Images/globusonline-bookmark1.png

.. image:: /Images/globusonline-bookmark2.png

.. image:: /Images/globusonline-bookmark3.png

The next sections give some examples for data transfers between the activated endpoints.

.. _local-machine-to-dcache-transfers:

From local machine
------------------

* From the web interface, go to FILE MANAGER and click on the Collection box. Your bookmarks are displayed. Select your local machine:

.. image:: /Images/globusonline-local-transfers1.png

.. image:: /Images/globusonline-local-transfers2.png

* Go to FILE MANAGER and on the right side of the page, click on the Collection box. Your bookmarks are displayed. Select your dCache_gridftp endpoint:

.. image:: /Images/globusonline-local-transfers3.png

* Go to FILE MANAGER and select the source and target directories and files. When ready, click 'Start':

.. image:: /Images/globusonline-local-transfers4.png

* In the ACTIVITY tab you can monitor the transfer progress:

.. image:: /Images/globusonline-local-transfers5.png


.. _gridui-to-dcache-transfers:

From Grid UI
------------

* From the web interface, go to FILE MANAGER and click on the Collection box. Your bookmarks are displayed. Select your Grid UI endpoint:

.. image:: /Images/globusonline-ui-transfer1.png

* Go to FILE MANAGER and on the right side of the page, click on the Collection box. Your bookmarks are displayed. Select your dCache_gridftp endpoint:

.. image:: /Images/globusonline-bookmark3.png

* Go to FILE MANAGER and select the source and target directories and files. When ready, click 'Start':

.. image:: /Images/globusonline-ui-transfer2.png

* In the ACTIVITY tab you can monitor the transfer progress:

.. image:: /Images/globusonline-ui-transfer3.png

Refresh the directory contents of the target endpoint to see your transferred files.
