.. _data-migration:

**************
Data migration
**************

This page explains how to migrate your data from your local LSG (Life Science Grid) cluster to Cartesius. Since the file systems of your local LSG cluster and Cartesius are separate, you cannot directly access the Cartesius home file system from LSG, or vice versa. However, you can use ``rsync`` to copy data between these file systems over the network. Here you will find instructions on how to copy data files/directories from LSG to Cartesius. 

.. contents:: 
    :depth: 4


=============
Prerequisites
=============

In order to start the data migration it is necessary to have the following accounts:

* **Account to an LSG cluster**. This is your existing personal login to access your local LSG cluster.

* **Account to Cartesius**. This is a new login that was created for you to access Cartesius. **NB:** the account is provided only to the active LSG users who asked for a replacement platform in the `questionnaire <https://userinfo.surfsara.nl/documentation/decommissioning-life-science-grid#heading5>`_. 

You will use the same username and password to access both the LSG cluster and Cartesius. In the instructions below you will access Cartesius directly from the UI (user interface machine) of your local LSG site. We have arranged access to Cartesius from all the LSG clusters. In case that you have problems accessing Cartesius outside the LSG clusters see `here <https://userinfo.surfsara.nl/systems/cartesius/faq#heading3>`_.


====================================
Copy your data from LSG to Cartesius
====================================


1. Login into your LSG cluster as normally
==========================================

You can start a transfer from an LSG site on Cartesius by logging on to your local LSG cluster (via SSH). Once you are logged in you can initiate a connection to Cartesius in order to push the data you require. Log in to your LSG UI (User Interface):

* The generic syntax is:

  .. code-block:: console
  
	 $ssh [USER@]HOST   

  , where USER is your username and HOST is the UI address of your local cluster (you can find the hostname in the :ref:`list of LSG hostnames <lsg-hostnames>`).

* Here is an example:

  .. code-block:: console

     $ssh homer@gb-ui-kun.els.sara.nl 

  , where ``homer`` is the USER and ``gb-ui-kun.els.sara.nl`` is the HOST at the LSG-KUN cluster.


2. Clean up 
===========

Before initiating the data transfer, you should remove all data that you do not intend to keep. This data can be stored in your HOME (``/home/$USER``) or NOBACKUP (``/home/nobackup/$USER``) directory. There are good reasons to clean up unnecessary data before you start the migration; less data means faster copying process. Also every user has his own home directory on Cartesius with default capacity quota of 200GiB and your data has to fit into this limit. You can remove the files that you don't need to keep with the ``rm`` unix command. 


3. Transfer your data
=====================

Once you have selected which data you want to keep (and removed the rest), you can start the data transfer to Cartesius by using two powerful tools: ``screen`` and ``rsync``. The ``screen`` tool makes sure your copying process continues when you accidentally lose connection to the server. The ``rsync`` tool is  a file synchronisation and file transfer program that can minimise network data transfer such that only the differences between and source and destination data are actually transmitted.

You will typically transfer data from your LSG HOME (``/home/$USER``) or NOBACKUP (``/home/nobackup/$USER``) directory to your Cartesius HOME (``/home/$USER``) or Project space (``/projects/0/PROJECT``) that you have been granted access to. 


* On the LSG UI start ``screen`` by typing the word screen and then 'ENTER', e.g.:

 .. code-block:: console
 
    $gb-ui-kun.els.sara.nl:/home/homer
    $homer$ screen #hit 'Enter'

**NB:** In case that you lose connection during the transfer, login the LSG UI again and use ``screen -r`` to reattach your session and return to your transfer. 

* Start transferring your data from LSG to Cartesius with ``rsync``: 

  * The generic syntax is:

    .. code-block:: console
  
       $rsync [OPTION] ... SRC [SRC] ... [USER@]HOST:DEST  

    , where SRC is the local file or directory (or a list of multiple files and directories) to copy from, and DEST represents the remote file or directory to copy to. 


  * Here is an example:

    .. code-block:: console

       $rsync -aP ~/* cartesius.surfsara.nl:~  # hit 'ENTER', type your password and hit 'ENTER' again to start copying 
     	 
    , where ``~/*`` is the SRC (all of my home data left after cleaning up) and ``cartesius.surfsara.nl:~`` is the HOST:DEST directory in my Cartesius account.

You can use the same command to copy files from other locations on your LSG-UI, e.g. the NOBACKUP (``/home/nobackup/$USER``) directory by replacing [SRC] with the location that your data is stored.

**NB**: If rsync fails you can rerun the same command; the transfer of the data will continue where it stopped because ``rsync`` will synchronise files and directories between your LSG folders and Cartesius system. While copying, please do not alter files to prevent accidental loss of files due to mixing up of systems.
    

4. Check your data on Cartesius    
================================
    
When copying is done, please check your data on Cartesius before deleting the data from the LSG. You can access your Cartesius account to inspect your files:

* The generic syntax is:

  .. code-block:: console
  
	 $ssh [USER@]cartesius.surfsara.nl   

  , where USER is your username 

* Here is an example:

  .. code-block:: console

     $gb-ui-kun.els.sara.nl:/home/homer
     $homer$ ssh homer@cartesius.surfsara.nl

* To disconnect simply type

  .. code-block:: console
	
     $logout # hit 'Enter' after this command


5. Data validation   
==================

If you want to validate the integrity of the data that you have migrated on Cartesius then we recommend you the following options:

* On the LSG UI, apply the once again the rsync command that you used to copy your data to Cartesius. If all the files have been trasnferred correctly you should receive an empty list, e.g.:

 .. code-block:: console
 
    $rsync -aP ~/* cartesius.surfsara.nl:~ 	
    ##sending incremental file list
    ##<empty> 	

* On both the LSG UI and the Cartesius UI, check the total size of all your files. Due to the different filesystems (blocksize) between the LSG UI and Cartesius, the standard `du` command would return different sizes for the same data on the two sytems. Therefore, we suggest you run the following long command both in the two systems. The result number should be the same in both systems:

 .. code-block:: console

    $gb-ui-kun.els.sara.nl:/home/homer  # source is the LSG UI
    $homer$ find ./* -type f -print0 | xargs -0 ls -l | awk '{print $5;}' |  paste -s -d+ | bc
    ##103096205

 .. code-block:: console

    $cartesius.surfsara.nl:/home/homer  # destination is the Cartesius UI 
    $homer$ find ./* -type f -print0 | xargs -0 ls -l | awk '{print $5;}' |  paste -s -d+ | bc
    ##103096205

* The best way to validate your data is calculating the checksum of each file and comparing it with the checksum of the copied files. Please note that depending on the amount od your files and their sizes, this operation can be computationally expensive and take long time. Here is an example:

 .. code-block:: console
 
    $gb-ui-kun.els.sara.nl:/home/homer  # source is the LSG UI
    $homer$  find ./* -type f | xargs md5sum > md5sums.txt  # it calculates the md5sum of all the files and stores it in a text file
    $homer$ rsync -aP ~/* cartesius.surfsara.nl:~ # run rsync to copy the md5sums.txt file too
    ##sending incremental file list
    ##md5sums.txt

 .. code-block:: console  
 
    $cartesius.surfsara.nl:/home/homer  # destination is the Cartesius UI 
    $homer$ md5sum -c md5sums.txt
    ##all files should be marked 'OK'
    

============
Useful links
============

* Up-to-date information about the LSG decommissioning can be found `here <https://userinfo.surfsara.nl/documentation/decommissioning-life-science-grid>`_.
* The deadline and overall planning for the data migration can be found `here <https://userinfo.surfsara.nl/documentation/decommissioning-life-science-grid#heading6>`_.
* Information about the Cartesius supercomputer can be found `here <https://userinfo.surfsara.nl/systems/cartesius/description>`_.
* Any questions on the data migration procedure? Please ask at helpdesk@surfsara.nl.
