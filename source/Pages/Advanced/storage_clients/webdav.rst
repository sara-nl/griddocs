.. _webdav:

***************
*webdav* client
***************

This page includes the basic commands to use ``webdav``:

.. contents:: 
    :depth: 4
 
======
Webdav
======

.. note:: To run the examples below you need to have a UI (or ``CUA``) account that is configured within dCache and authorized to the data you want to access. Contact us if you need assistance with that.


Listing
=======

To list directories, you can point a browser like Firefox to https://webdav.grid.sara.nl/pnfs/grid.sara.nl/data/. When the browser asks for a username and password, you can provide your CUA username and password. When you click on a listed file, it will be downloaded, when you're authorized to do so. When you're not authorized to access a URL, you may see some unexpected behaviour.
You can also use text browsers like curl to list directories.


Transferring data
=================

* Copy a file from your local machine to dCache

.. code-block:: bash

  curl -k -f -u homer -p -L https://webdav.grid.sara.nl/pnfs/grid.sara.nl/data/lsgrid/homer/ -T /home/homer/zap.tar # replace homer with your username, lsgrid with your VO and zap.tar with your local file
  
  
* Copy a file from dCache to your local machine

.. code-block:: bash
  
  curl -k -u homer -p -L https://webdav.grid.sara.nl/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar -o zap.tar
  
Or with wget:
  
.. code-block:: bash

  wget --user=homer --no-check-certificate https://webdav.grid.sara.nl/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar 
  

Parallel streams
----------------

Information not available yet.
  

Renaming
========

This section is not finished.


Removing data
=============

* Delete a file from dCache:

.. code-block:: bash

  curl -k -u <username> -p -L -X DELETE https://webdav.grid.sara.nl/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar 


================
Graphical access
================
  
To work with Webdav on a windows-based environment, you can install Cyberduck (for Windows and Mac) from here: http://cyberduck.ch/

* Open a Webdav (HTTP/SSL) connection and connect to the server with your ui account username and password::

.. code-block:: bash

	https://webdav.grid.sara.nl/pnfs/grid.sara.nl/data/lsgrid/ # replace lsgrid with your VO
