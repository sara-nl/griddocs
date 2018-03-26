.. _data-migration:

**************
Data migration
**************

This page explains how to migrate your data from your local LSG (Life Science Grid) cluster to Cartesius. Since the file systems of your local LSG cluster and Cartesius are separate, you cannot directly access the Cartesius home file system from LSG, or vice versa. However, you can use ``rsync`` to copy data between these file systems over the network. Here you will find instructions how to copy data files/directories from LSG to Cartesius. 

.. contents:: 
    :depth: 4


=============
Prerequisites
=============

In order to start the data migration it is necessary to have the following accounts:

* **Account to an LSG cluster**.  
This is your existing personal login to access your local LSG cluster.

* **Account to Cartesius**.  
This is a new login that was created for you to access Cartesius. **NB:** the account is provided only to the active LSG users who asked for a replacement platform in the `questionnaire <https://userinfo.surfsara.nl/documentation/decommissioning-life-science-grid#heading5>`_. 

You will use the same username and password to access both the LSG cluster and Cartesius. In the instructions below you will access Cartesius directly from the UI (user interface machine) of your local LSG site. We have arranged access to Cartesius from all the LSG clusters. In case that you have problems accessing Cartesius outside the LSG clusters see `here <https://userinfo.surfsara.nl/systems/cartesius/faq#heading3>_`.


====================================
Copy your data from LSG to Cartesius
====================================


1. Login into your LSG cluster as normally
==========================================

You can start a transfer from an LSG site on Cartesius by logging on to your local LSG cluster (via SSH). Once you are logged in you can initiate a connection to Cartesius in order to push the data you require. Log in to your LSG UI (User Interface):

* The generic syntax is:

  .. code-block:: console
  
	 $ssh [USER@]HOST`   

, where USER is your username and HOST is the UI address of your local cluster (you can find the hostname in the :ref:`list of LSG hostnames <lsg-hostnames>`).

* Here is an example:

  .. code-block:: console

     $ssh homer@gb-ui-kun.els.sara.nl 

, where ``homer`` is the USER and ``gb-ui-kun.els.sara.nl`` is the HOST at KUN cluster.


2. Clean up 
===========

Before initiating the data transfer, you should remove all data that you do not intend to keep. This data can be stored in your HOME (``/home/$USER``) or NOBACKUP (``/home/nobackup/$USER``) directory. There are good reasons to clean up unnecessary data before you start the migration; less data means faster copying process. Also every user has his own home directory on Cartesius with default capacity quota of 200GiB and your data has to fit into this limit. You can remove the files that you don't need to keep with the `rm` unix command. 


3. Transfer your data
=====================

Once you have selected which data you want to keep (and removed the rest), you can start the data transfer to Cartesius by using two powerful tools: ``screen`` and ``rsync``. The ``screen`` tool makes sure your coping process continues when accidentally lose connection to the server. The ``screen`` tool is  a file synchronisation and file transfer program that can minimise network data transfer such that only the differences between and source and destination data are actually transmitted.

You will typically transfer data from your LSG HOME (``/home/$USER``) or NOBACKUP (``/home/nobackup/$USER``) directory to your Cartesius HOME (``/home/$USER``) or Project space (``/projects/0/PROJECT``) that you have been granted access to. 


* Start ``screen`` by typing the word screen and then 'ENTER' from your LSG account, e.g.:

 .. code-block:: console
 
	gb-ui-kun.els.sara.nl:/home/homer
	homer$ screen #hit 'Enter'

In case that you lose connection during the transfer, login the LSG UI again and use ``screen -r`` to reattach your session and return to your transfer. 

* Start transferring your data from LSG to Cartesius with ``rsync``: 

  * The generic syntax is:

    .. code-block:: console
  
	    $rsync [OPTION] ... SRC [SRC] ... [USER@]HOST:DEST  

    , where SRC is the local file or directory (or a list of multiple files and directories) to copy from, and DEST represents the remote file or directory to copy to. 
    
   * Here is an example:

     .. code-block:: console

     	 $rsync -aP ~/* cartesius.surfsara.nl:~  # hit 'ENTER', type your password and hit 'ENTER' again to start copying 
     	 
     , where ``~/*`` is the SRC (all of my home data left after cleaning up) and ``cartesius.surfsara.nl:~`` is the HOST:DEST directory in my Cartesius account.

**NB**: If rsync fails you can rerun the same command; the transfer of the data will continue where it did stop because ``rsync`` will synchronise files and directories between your LSG folders and Cartesius system. While coping please do not alter files to prevent accidental loss of files due to mixing up systems.
    

4. Check your data on Cartesisus    
================================
    
When coping is done then log into Cartesius and you will find your data here. Access your Cartesius account:

* The generic syntax is:

  .. code-block:: console
  
	 $ssh [USER@]cartesius.surfsara.nl`   

, where USER is your username 

* Here is an example:

  .. code-block:: console

	  gb-ui-kun.els.sara.nl:/home/homer
     homer$ssh homer@cartesius.surfsara.nl

* To disconnect simply type

  .. code-block:: console
	
	$logout # hit 'Enter' after this command


============
Useful links
============

* Up-to-date information about the LSG decommissioning can be found `here <https://userinfo.surfsara.nl/documentation/decommissioning-life-science-grid>_`.
* The deadline and overall planning for the data migration can be found `here <https://userinfo.surfsara.nl/documentation/decommissioning-life-science-grid#heading6>_`.
* Information about the Cartesius supercomputer can be found `here <https://userinfo.surfsara.nl/systems/cartesius/description>_`.
* Any questions on the data migration procedure? Please ask at helpdesk@surfsara.nl.
