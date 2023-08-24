
.. _softdrive-on-laptop:

************************
Softdrive on your laptop
************************

Using :ref:`Softdrive <softdrive>` is possible from various locations, such as the :ref:`Grid <dutch-grid>`, your local cluster, or your own computer. This page will show you how to use Softdrive from your own computer.

The instructions below have been tested in three different OS distributions: 

* Mac OS Ventura 13.5
* Centos 6.8 Desktop  
* Ubuntu 16.04 Desktop 
 
The setup consists of the following basic steps: 

.. contents::
    :depth: 2

You will need to run the installation commands as ``root``.


.. _install-cvmfs:

==========================================
1. Installing CVMFS and necessary packages
==========================================

This step is different for the three tested OS:

Mac OS
======

* Install FUSE for macOS from: https://osxfuse.github.io/

.. code-block:: bash

	e.g. https://github.com/osxfuse/osxfuse/releases/download/macfuse-4.5.0/macfuse-4.5.0.dmg

.. warning:: As of macOS 11 Big Sur, kernel extensions need to be enabled to install macFUSE:

        * Open the Security & Privacy System Preferences pane, go to the General preferences and allow loading system software from developer "Benjamin Fleischer"
        * Restart to allow for the system extension to be loaded

* Install the CernVM-FS package from: https://cernvm.cern.ch/portal/filesystem/downloads/

.. code-block:: bash

	e.g. curl -o ~/Downloads/cvmfs-2.11.0.pkg https://ecsft.cern.ch/dist/cvmfs/cvmfs-2.11.0/cvmfs-2.11.0.pkg

.. warning:: As of macOS 10.15 "Catalina", a reboot is required after the CernVM-FS package installation.
  
* Install a "personal" proxy server from: http://squidman.net/squidman/

.. code-block:: bash

	e.g. http://squidman.net/resources/downloads/SquidMan4.2.dmg

* Check your own http proxy port and keep it for later steps. By default it is ``8080``. 

Centos
======

* Install dependencies:

.. code-block:: bash

	$ yum install attr autofs gawk gdb uuid uuid-dev

* Install CernVM-FS packages:

.. code-block:: bash

	$ yum install https://ecsft.cern.ch/dist/cvmfs/cvmfs-release/cvmfs-release-latest.noarch.rpm
	$ yum install cvmfs cvmfs-config-default
		
* Create the file /etc/fuse.conf with the following content:

.. code-block:: bash

	$ vim /etc/fuse.conf
	$ cat /etc/fuse.conf

	user_allow_other

* Install a "personal" proxy server:

.. code-block:: bash

	$ yum install squid

* Check your own http proxy port and keep it for later steps: 

.. code-block:: bash

	$ cat /etc/squid/squid.conf | grep http_port 
	
By default it is ``3128``.
	
Ubuntu
====== 

* Install dependencies:

.. code-block:: bash

     $ apt-get install attr autofs gawk gdb uuid uuid-dev

* Install CernVM-FS packages:

.. code-block:: bash

	$ wget https://ecsft.cern.ch/dist/cvmfs/cvmfs-release/cvmfs-release-latest_all.deb
	$ dpkg -i cvmfs-release-latest_all.deb
	$ apt-get update
	$ apt-get install cvmfs cvmfs-config-default


* Edit the file ``/etc/fuse.conf`` with the following content (uncomment 'user_allow_other'):

.. code-block:: bash

	$ vim /etc/fuse.conf
	$ cat /etc/fuse.conf

	# Allow non-root users to specify the allow_other or allow_root mount options.
	user_allow_other

* Install a "personal" proxy server:

.. code-block:: bash
	
	$ apt-get install squid

* Check your own http proxy port and keep it for later steps: 

.. code-block:: bash

	$ cat /etc/squid/squid.conf | grep http_port 
	
By default it is ``3128``.

	
.. _configure-cvmfs:
	
====================
2. Configuring CVMFS
====================

This step is the same for the three tested OS:

Mac OS, Centos, Ubuntu
======================

* Create the file ``/etc/cvmfs/default.local`` with the following content:

.. code-block:: bash

	$ vim /etc/cvmfs/default.local
	$ cat /etc/cvmfs/default.local

	CVMFS_NFILES=32768
	CVMFS_REPOSITORIES=softdrive.nl
	CVMFS_QUOTA_LIMIT=2000
	CVMFS_HTTP_PROXY="http://localhost:8080"

.. warning:: **http proxy port**

	Note that the file /etc/cvmfs/default.local holds the configuration for your environment and it contains the CVMFS_HTTP_PROXY variable that points to your Squid proxy. In this example the http proxy listens to port 8080. Replace with own http proxy port retrieved in :ref:`step 1 <install-cvmfs>`, e.g. ``CVMFS_HTTP_PROXY="http://localhost:3128"`` if it listens to port 3128.

* Create the file ``/etc/cvmfs/config.d/softdrive.nl.conf`` with the following content:

.. code-block:: bash

	$ vim /etc/cvmfs/config.d/softdrive.nl.conf
	$ cat /etc/cvmfs/config.d/softdrive.nl.conf

	CVMFS_SERVER_URL=http://cvmfs01.nikhef.nl/cvmfs/@fqrn@
	CVMFS_PUBLIC_KEY=/etc/cvmfs/keys/softdrive.nl.pub

* Create the file ``/etc/cvmfs/keys/softdrive.nl.pub`` with the following content:

.. code-block:: bash

	$ vim /etc/cvmfs/keys/softdrive.nl.pub
	$ cat /etc/cvmfs/keys/softdrive.nl.pub

	-----BEGIN PUBLIC KEY-----
	MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA481/kCXbrVtLuzcFZ2uO
	EmiAKx28qXIkonPwr/gSmqQ8k1zQA7dKK5YZwZSbVwgYqvhvW6i3vKWLGVDj+elH
	1u8uumPzzlAJHrS1XoR8rY4xUULjQBvV9HuJxE6OK4ZEZPvQmeGmjXd446c8J5cv
	BQFtaonRnrxAbtO+Z0KtzsNOzBNFegu9z+lT7/fxV17Qh10w5IKQjm/v6jPdj1ME
	CrG4QW2S9+Y+7YzbRP5QYaE4cl5cBI3Yb048ufgLJMfX3++uqwGM+rqNs/CzHvsW
	dO6Jznr9EbzqbIrTsFeUThNmsGPObxOT3VmB0BTTjrZSYjgf8oEE4hdhgNQgh7vs
	OwIDAQAB
	-----END PUBLIC KEY-----


* Check the cvmfs config:

.. code-block:: bash

	 $ cvmfs_config chksetup
         # OK

If you don't get any errors, then CernVM-FS was successfully installed on your computer. Ignore the warnings for now.

.. _mount-softdrive:

=====================
3. Mounting Softdrive
=====================

This step is the same for the three tested OS:

Mac OS, Centos, Ubuntu
======================

* Create directories that will be used for the cvmfs mount point and cache folder:

.. code-block:: bash

	$ mkdir /cvmfs/softdrive.nl /var/lib/cvmfs

* Make sure that Squid is running

* Mount the SoftDrive directory :

.. code-block:: bash

	$ mount -t cvmfs softdrive.nl /cvmfs/softdrive.nl/
	
	CernVM-FS: running with credentials 10000:10000
	CernVM-FS: loading Fuse module... done
	CernVM-FS: mounted cvmfs on /cvmfs/softdrive.nl
		
	# check mount	
	$ ls /cvmfs/softdrive.nl/

You should be able to see the directories mounted under ``softdrive.nl`` and use the software locally by exporting the relevant paths to your environment.
 	
* Un-mount SoftDrive at will:	

.. code-block:: bash

	$ umount /cvmfs/softdrive.nl/ 


