.. warning:: Page under construction


.. _gfal:

*************
*gfal* client
*************

This page includes the basic commands to use ``gfal``:

.. contents:: 
    :depth: 4

====
gFAL
====

.. note:: To run the examples below you need to have a valid proxy, see :ref:`startgridsession`. 
 

Mandatory environment settings:

.. code-block:: bash

  # export LCG_GFAL_INFOSYS=bdii.grid.sara.nl:2170


List ``ls``
===============

* List dCache directories::

	gfal-ls srm://srm.grid.sara.nl:8443/pnfs/grid.sara.nl/data/lsgrid

* List DPM directories::

	gfal-ls srm://gb-se-lumc.lumc.nl:8446/dpm/lumc.nl/home/lsgrid/


Transfer files
==============

* Copy file from local machine to dCache::

	gfal-copy file:`pwd`/zap.tar srm://srm.grid.sara.nl:8443/pnfs/grid.sara.nl/data/lsgrid/homer/zap.tar

* Copy file from local machine to DPM::

	gfal-copy file:`pwd`/zap.tar srm://gb-se-lumc.lumc.nl:8446/dpm/lumc.nl/home/lsgrid/homer/zap.tar
