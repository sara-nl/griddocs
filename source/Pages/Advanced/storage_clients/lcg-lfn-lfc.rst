.. warning:: Page under construction


.. _lcg-lfn-lfc:

*********************
*lcg-lfn-lfc* clients
*********************

This page includes the basic commands to use ``lcg-lfn-lfc``:

.. contents:: 
    :depth: 4


.. warning:: If your jobs still works with the lcg- tools you can keep on using those; though the lcg- tools are *not* supported anymore. 

=========
lcg tools
=========

.. note:: To run the examples below you need to have a valid proxy, see :ref:`startgridsession`. 

 
List ``ls``
===============

* List dCache directories::

	lcg-ls  srm://srm.grid.sara.nl:8443/pnfs/grid.sara.nl/data/lsgrid/

* List DPM directories::

	lcg-ls  srm://gb-se-lumc.lumc.nl:8446/dpm/lumc.nl/home/lsgrid/


Transfer files
==============

* Copy file from local machine to dCache::

	lcg-cp file:`pwd`/zap.tar srm://srm.grid.sara.nl:8443/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar

* Copy file from local machine to DPM::

	lcg-cp file:`pwd`/zap.tar srm://gb-se-lumc.lumc.nl:8446/dpm/lumc.nl/home/lsgrid/homer/zap.tar



=======
LFC/lfn
=======

-----------
Basic usage
-----------


<TODO: copy content from the old wiki>  


----------------------
Keeping LFC up-to-date
----------------------

<TODO: copy content from "keeping LFC up-2-date">



---------------------------
Troubleshooting LFC entries
---------------------------

<TODO: copy content from old wiki>


============================================
Recursive file operations with ``lcg-rec-*``
============================================

<TODO: copy content from old wiki>




