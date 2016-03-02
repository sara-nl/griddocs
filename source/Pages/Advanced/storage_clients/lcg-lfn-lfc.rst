
.. _lcg-lfn-lfc:

*********************
*lcg-lfn-lfc* clients
*********************

This page includes the basic commands to use ``lcg-lfn-lfc``. For an overview of storage clients, see :ref:`storage-clients`.

.. contents:: 
    :depth: 4
 

.. warning:: In general we don't recommend the ``lcg-lfn-lfc`` clients as many users reported difficulties in usage and encountered worse performance compared to the other :ref:`storage-clients`. If your solution still works with the ``lcg-`` tools you can keep on using those; though the ``lcg-`` tools are *not* supported anymore. 

=====
About
=====

The Logical File Catalog (LFC) allows you to give more descriptive names to your files, and to order your files in a directory structure. Bear in mind that the :abbr:`LFC (Logical File Catalog)` is not itself a storage system. It's just a database that keeps track of your files.

You can manipulate your data with a set of command line tools. Some of these commands start with ``lfc-``, while others start with ``lcg-``, which can be confusing at first.

lcg-...
    All these commands operate on the data itself. Additionally, some of these commands have "side effects" in the :abbr:`LFC (Logical File Catalog)`: e.g. the ``lcg-cr`` command uploads a file to an :abbr:`SE (Storage Element)` and registers this file in the :abbr:`LFC (Logical File Catalog)` under a certain name.

lfc-...
    These commands only operate on the :abbr:`LFC (Logical File Catalog)`, and don't manipulate data. E.g. the command ``lfc-mkdir`` creates a new directory in the :abbr:`LFC (Logical File Catalog)`.

lfn-...
    The ``lfn`` commands allow you interact with the :abbr:`LFC (Logical File Catalog)` logical names.    

.. note:: To run the examples below you need to have a valid proxy, see :ref:`startgridsession`. 


=========
lcg tools
=========
 
Creating/listing 
================

* List dCache directories:

  .. code-block:: console

     $lcg-ls  srm://srm.grid.sara.nl:8443/pnfs/grid.sara.nl/data/lsgrid/

* List :abbr:`DPM (Disk Pool Manager)` directories:

  .. code-block:: console

     $lcg-ls  srm://gb-se-lumc.lumc.nl:8446/dpm/lumc.nl/home/lsgrid/


Transferring data
=================

* Copy file from local machine to dCache:

  .. code-block:: console

     $lcg-cp file:`pwd`/zap.tar srm://srm.grid.sara.nl:8443/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar

* Copy file from local machine to :abbr:`DPM (Disk Pool Manager)`:

  .. code-block:: console

     $lcg-cp file:`pwd`/zap.tar srm://gb-se-lumc.lumc.nl:8446/dpm/lumc.nl/home/lsgrid/homer/zap.tar


Parallel streams
----------------

Information not available yet.


Removing data
=============

* Remove a file from dCache:

  .. code-block:: console

     $lcg-del -l srm://srm.grid.sara.nl:8443/pnfs/grid.sara.nl/data/lsgrid/homer/testfile


============================
Putting lcg-lfn-lfn together
============================

Creating/listing 
================

For each of the supported :abbr:`VOs (Virtual Organisations)`, a separate "top level" directory exists under the ``/grid/`` directory. E.g. to see all the files that are stored for the lsgrid :abbr:`VO (Virtual Organisation)`, make sure you have a running lsgrid VOMS proxy and then type:

.. code-block:: console

    $lfc-ls -l /grid/lsgrid/
    drwxrwxr-x   2 30125    3010             0 Feb 05 12:56 arni
    drwxrwxr-x   3 30146    3010             0 Mar 06 15:21 dutilh
    drwxrwxr-x   3 30147    3010             0 Feb 22 16:12 emc-gwatest
    ...
    ...
    ...

Rather than having to type an absolute path for every file and directory you use, it is instead possible to define a home directory from which you may use relative file/directory paths. You can do this by setting the environment variable ``LFC_HOME``:

.. code-block:: console

   $export LFC_HOME='/grid/lsgrid' 

* Creating a new directory:

  Before you can register any file of your own, you must create a new directory in the file catalog:

  .. code-block:: console

     $lfc-mkdir /grid/your_vo/your_username

* To check that you have created your directory type:

  .. code-block:: console

     $export LFC_HOME=/grid/your_vo
     $lfc-ls -l 

  and you should see your directory (plus possibly those of others). 


.. _replicating_files:

=================
Replicating files
=================

File replication means that you copy the same file to multiple storage
elements. If you then start a Grid job which uses that file, and the job
lands on one of the compute elements of the Life Science Grid, you
then use the file which is nearest to the compute element. This reduces
the time needed to copy the file, and reduces network traffic.

You can replicate a file and use the replicas with the following steps:

1. Copy your file to one of the storage elements, while registering the
   file in the *Logical File Catalog*

2. Replicate the file to other storage elements, and register the copies
   under the same entry in the *Logical File Catalog*

3. In your job description, tell the scheduler where to run jobs by
   specifying a *data requirement*


This section describes the steps.


Copying files and registering files in the *logical file catalog*
=================================================================

To copy a file from a user interface to one of the storage elements, and
register the file in the logical file catalog:

* determine the full path of the file; for example, using the ``pwd``
  command:

  .. code-block:: console

     $pwd
     /home/homer/Projects/input.dat

* determine the full path of the target file, on *dCache* or *DPM*; see
  :ref:`file-id` about how to refer to the target file.

* use ``lcg-cr`` and the fulls path to the file to store the first copy of your
  file on one of the Storage Elements, and register the file in the *logical
  file catalog*:
  
  .. code-block:: console
  
     $lcg-cr --vo lsgrid \
     $       -d srm://gb-se-kun.els.sara.nl/dpm/els.sara.nl/home/lsgrid/homer/input.dat \
     $       -l lfn:/grid/lsgrid/homer/input.dat \
     $       file:///home/homer/Projects/input.dat

  In this example, the file ``input.dat`` is copied from the ``Projects``
  directory on the local user interface, to a storage element on the Life
  Science Cluster in Nijmegen, and registered in the :abbr:`LFC (Logical File Catalog)`, with the credentials
  from the :abbr:`VO (Virtual Organisation)` *lsgrid*. Note that this requires membership of the *lsgrid* VO.

* use ``lcg-rep`` to create a replica of the file, and register the replica
  with the :abbr:`LFC (Logical File Catalog)`:

  .. code-block:: console

    $lcg-rep \
    $     -d srm://gb-se-amc.amc.nl/dpm/amc.nl/home/lsgrid/homer/input.dat \
    $     lfn:/grid/lsgrid/homer/input.dat

  Note that the :abbr:`LFC (Logical File Catalog)` location is the same as in the ``lcg-cr`` command.

* verify that there are two copies of the file, registered under the same
  :abbr:`LFC (Logical File Catalog)` entry:

  .. code-block:: console

     $lcg-lr lfn:/grid/lsgrid/homer/input.dat
     srm://gb-se-kun.els.sara.nl/dpm/els.sara.nl/home/lsgrid/homer/input.dat
     srm://gb-se-amc.amc.nl/dpm/amc.nl/home/lsgrid/homer/input.dat



===========================
Troubleshooting LFC entries
===========================

.. note:: The :abbr:`LFC (Logical File Catalog)` needs to support your :abbr:`VO (Virtual Organisation)` in order to work.

The :abbr:`LFC (Logical File Catalog)` is a place where you register files, so you can find their replicas that a physically stored on a Storage Element.

If the physical storage is removed or lost, and you don't have any other replica's, you end up with only a registration in the :abbr:`LFC (Logical File Catalog)`.

.. code-block:: none

    ------------------------------------------------
    Setting up a testfile to reproduce the situation:
    
    Copy and register a testfile.
    lcg-cr testfile -l lfn://grid/lsgrid/homer/demo/testfile
    
    Deleting the srm entry and not the lfc entry.
    lcg-del --nolfc srm://srm.grid.sara.nl/pnfs/grid.sara.nl/data/lsgrid/generated/2015-06-05/file25a8581b-1d76-4579-ab1f-5d2e8e58b33c
    ------------------------------------------
    Trying to delete the lfc entry:
    lcg-del -a lfn://grid/lsgrid/homer/demo/testfile
    Gives me the error:
    
    [SE][advisoryDelete] httpg://srm.grid.sara.nl:8443/srm/managerv1: java.rmi.Remote
    Exception: srm advisoryDelete failed; nested exception is:
    java.lang.RuntimeException:  advisoryDelete(User [name=lsgrid, uid=18050,
    gids=[18050], root=/],pnfs/grid.sara.nl/data/lsgrid/generated/2015-06-05/file25a
    8581b-1d76-4579-ab1f-5d2e8e58b33c) Error file does not exist, cannot delete
    
    To remove the lfc entry you can use a 
    Lcg-uf [guid] [surl] command:

    List guid
    Lcg-lg lfn://grid/lsgrid/homer/demo/testfile
    
    List registered replica's SURL(s)
    Lcg-lr lfn://grid/lsgrid/homer/demo/testfile
    
    Issue unregister command to remove the lfc entry:
    
    lcg-uf guid:644ee342-c1f8-4964-b878-a4bd5ccb3d6a srm://srm.grid.sara.nl/pnfs/grid.sara.nl/data/lsgrid/generated/2015-06-05/file25a8581b-1d76-4579-ab1f-5d2e8e58b33c

    
Or shorter command doing exactly the same::

    f=lfn:/grid/lsgrid/homer/demo/testfile lcg-uf $(lcg-lg $f) $(lcg-lr $f)
