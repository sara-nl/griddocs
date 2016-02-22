.. _webdav:

***************
*webdav* client
***************

This page includes the basic commands to use ``webdav``. For an overview of storage clients, see :ref:`storage-clients`.

.. contents:: 
    :depth: 4
 
======
Webdav
======

The webdav protocol has the following advantages:

* It supports username & password authentication
* It uses the common port 443. Some overly strict firewalls may block outgoing traffic, but port 443 is so common that it is seldom blocked. However, using webdav to bypass firewalls should be seen as a temporary solution; it would be better to open up your institute's firewall to allow access to the dCache subnet.

It also has disadvantages:

* It is not a high performance transfer protocol. If this is important, use GridFTP instead.
* Support by webdav clients varies widely. Some operations (like renaming a file) may not work in certain clients and circumstances. Modifying/overwriting a file, although the webdav protocol supports it, doesn't work on dCache; you'll need to delete the old file and upload the new file instead.

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

webdav.grid.sara.nl is a DNS round robin that will direct you to a (more or less) random host in a pool of webdav servers.

.. note:: To run the examples below you need to have a UI (or ``CUA``) account that is configured within dCache and authorized to the data you want to access. Contact us if you need assistance with that.


Listing
=======

To list directories, you can point a browser like Firefox to https://webdav.grid.sara.nl/pnfs/grid.sara.nl/data/. When the browser asks for a username and password, you can provide your CUA username and password. When you click on a listed file, it will be downloaded, when you're authorized to do so. When you're not authorized to access a URL, you may see some unexpected behaviour.

You can also use text browsers like curl to list directories.


Creating directories
====================

To create a directory with curl:

.. code-block:: bash

  curl --capath /etc/grid-security/certificates/ --fail --user homer \
       --request MKCOL https://webdav.grid.sara.nl/pnfs/grid.sara.nl/data/lsgrid/homer/directory


Transferring data
=================


Uploading
---------

To copy a file from your local machine to dCache:

.. code-block:: bash

  curl --capath /etc/grid-security/certificates/ --fail --location --user homer \
       --upload-file zap.tar \
       https://webdav.grid.sara.nl/pnfs/grid.sara.nl/data/lsgrid/homer/
  # replace homer with your username, lsgrid with your VO and zap.tar with your local file

The command will ask for the password of 'homer' on the command line. If you don't want to type the password each time, specify --netrc and store the password in the .netrc file in your home dir. Make sure it is not readable by others (chmod 600 .netrc). See 'man curl' for more details.

It is possible to specify the password on the command line like this: --user homer:password. However, this should be avoided because it allows other local users to read the password with the 'ps' command.

If on your system there are no Grid :abbr:`CA (Certificate Authority)` certificates available in /etc/grid-security/certificates/, you can install them by following these instructions: https://dist.eugridpma.info/distribution/igtf/, or you can specify --insecure to skip certificate checking (not recommended).


Downloading
-----------

To copy a file from dCache to your local machine:

.. code-block:: bash
  
  curl --capath /etc/grid-security/certificates/ --fail --location --user homer \
       https://webdav.grid.sara.nl/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar \
       --output zap.tar
  
Or with wget:
  
.. code-block:: bash

  wget --user=homer --ask-password --ca-directory=/etc/grid-security/certificates \
       https://webdav.grid.sara.nl/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar 

Note: wget does not support certificate/proxy authentication.

If you don't have an /etc/grid-security/certificates directory, you could specify --no-check-certificate, but we don't recommend this.


Downloading with proxy authentication
-------------------------------------

To download a file while using a proxy to authenticate, you first have to create your proxy, see :ref:`startgridsession`.

Then use a command like this:

.. code-block:: bash

  curl --capath /etc/grid-security/certificates/ \
       --cert $X509_USER_PROXY --cacert $X509_USER_PROXY \
       https://webdav.grid.sara.nl:2882/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar

.. note:: It is possible that your proxy DN is mapped to another user account than your own CUA user account. If you have permission issues with either username or proxy and not the other, contact us to check the user mapping.


Renaming
========

Curl can rename files if proxy authentication is used.

.. code-block:: bash

     curl --capath /etc/grid-security/certificates/  --fail --location \
          --cert $X509_USER_PROXY --cacert $X509_USER_PROXY \
          --request MOVE \
          https://webdav.grid.sara.nl:2882/pnfs/grid.sara.nl/data/lsgrid/homer/oldfile \
          --header "Destination:https://webdav.grid.sara.nl:2882/pnfs/grid.sara.nl/data/lsgrid/homer/newfile"

File properties and locality are not changed. A file that is stored on tape (nearline) will stay on tape, even if it is moved to a directory for disk-only files.

As far as we know, renaming does not work when username/password authentication is used.


Removing data
=============

Deleting a file from dCache:

.. code-block:: bash

     curl --capath /etc/grid-security/certificates/ --user homer --location \
          --request DELETE https://webdav.grid.sara.nl/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar 


================
Graphical access
================
  
To work with Webdav on Windows or Mac OS X, you can install Cyberduck from here: https://cyberduck.io/. Please note that the App store package costs money; the download from the website is free, but will ask for a donation.

* Download the .zip file, open it, and drag the .app file into your Applications folder to install it. 
* Open a Webdav (HTTP/SSL) connection and connect to the server with your ui account username and password:

  .. code-block:: bash

	https://webdav.grid.sara.nl/pnfs/grid.sara.nl/data/lsgrid/ # replace lsgrid with your VO

.. image:: /Images/cyberduck.png
	:align: center
