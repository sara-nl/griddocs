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

The webdav protocol has the following advantages:

* It supports username & password authentication
* It uses the common port 443. Some overly strict firewalls may block outgoing traffic, but port 443 is so common that it is seldom blocked. However, using webdav to bypass firewalls should be seen as a temporary solution; a better solution would be to open up your institute's firewall to allow access to the dCache subnet.

It also has a disadvantage:

* It is not a high performance transfer protocol. If this is important, use gridftp instead.

dCache has the following webdav doors:

+------------------------------------+-----------------------------+---------------------------------+
| URL including port                 | Authentication method       | Redirection behaviour           |
+====================================+=============================+=================================+
| https://webdav.grid.sara.nl:443    | Username/password           | Redirects on read               |
+------------------------------------+-----------------------------+---------------------------------+
| https://webdav.grid.sara.nl:2880   | Username/password           | No redirects                    |
+------------------------------------+-----------------------------+---------------------------------+
| https://webdav.grid.sara.nl:2882   | User certificate or proxy   | Redirects on read and write     |
+------------------------------------+-----------------------------+---------------------------------+

If you don't know which one you should use, choose the first. It has a good load balancing. The second, on port 2880, may be useful for certain webdav clients that don't support redirects. Use the third one only if you need to use webdav with a certificate or proxy.

.. note:: To run the examples below you need to have a UI (or ``CUA``) account that is configured within dCache and authorized to the data you want to access. Contact us if you need assistance with that.


Listing
=======

To list directories, you can point a browser like Firefox to https://webdav.grid.sara.nl/pnfs/grid.sara.nl/data/. When the browser asks for a username and password, you can provide your CUA username and password. When you click on a listed file, it will be downloaded, when you're authorized to do so. When you're not authorized to access a URL, you may see some unexpected behaviour.

You can also use text browsers like curl to list directories.


Transferring data
=================

* Copy a file from your local machine to dCache

.. code-block:: bash

  curl --insecure -f -u homer -p -L https://webdav.grid.sara.nl/pnfs/grid.sara.nl/data/lsgrid/homer/ -T /home/homer/zap.tar # replace homer with your username, lsgrid with your VO and zap.tar with your local file
  
  
* Copy a file from dCache to your local machine

.. code-block:: bash
  
  curl --insecure -u homer -p -L https://webdav.grid.sara.nl/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar -o zap.tar
  
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

  curl --insecure -u <username> -p -L -X DELETE https://webdav.grid.sara.nl/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar 


================
Graphical access
================
  
To work with Webdav on a windows-based environment, you can install Cyberduck (for Windows and Mac) from here: http://cyberduck.ch/

* Open a Webdav (HTTP/SSL) connection and connect to the server with your ui account username and password:

.. code-block:: bash

	https://webdav.grid.sara.nl/pnfs/grid.sara.nl/data/lsgrid/ # replace lsgrid with your VO
