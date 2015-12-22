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
 
Webdav interface is supported on dCache upon request for your VO group. Please contact helpdesk@surfsara.nl if you want to enable it for your project's storage. 

For the examples below we will use ``curl`` and ``wget`` commands to inderact with Webdav.

.. note:: To run the examples below you need to have a UI (or ``CUA``) account that is mapped and configured with your webdav pool.


Copy a file from your local machine to dCache
=============================================

.. code-block:: bash

  curl -k -f -u homer -p -L https://webdav.grid.sara.nl/pnfs/grid.sara.nl/data/lsgrid/homer/ -T /home/homer/zap.tar # replace homer with your username, lsgrid with your VO and zap.tar with your local file
  
  
Copy a file from dCache to your local machine
=============================================

.. code-block:: bash
  
  curl -k -u homer -p -L https://webdav.grid.sara.nl/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar -o zap.tar
  
Or with wget:
  
.. code-block:: bash

  wget --user=homer --no-check-certificate https://webdav.grid.sara.nl/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar 
  

Delete a file from dCache
=========================

.. code-block:: bash

  curl -k -u <username> -p -L -X DELETE https://webdav.grid.sara.nl/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar 


================
Graphical access
================
  
To work with Webdav on a windows-based environment, you can install Cyberduck (for Windows and Mac) from here: http://cyberduck.ch/

* Open a Webdav (HTTP/SSL) connection and connect to the server with your ui account username and password::

.. code-block:: bash

	https://webdav.grid.sara.nl/pnfs/grid.sara.nl/data/lsgrid/ # replace lsgrid with your VO
