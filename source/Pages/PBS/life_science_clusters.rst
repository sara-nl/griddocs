.. _life-science-clusters:

**************************
Life Science Grid clusters
**************************

The current page provides information about the Life Science Grid (LSG) clusters and their locations, local support contact persons, and DNS addresses of User Interface (UI) and Storage Element (SE) machines.

.. contents:: 
    :depth: 4

If you have any questions concerning access to the clusters below, please contact us at helpdesk@surfsara.nl.

=====
About
=====

The :ref:`Life Science Grid <LSG>` is a compute and data processing infrastructure that is available for all Life Science researchers working in the Netherlands. The Life Science Grid consists of a series of computer clusters that can be used either as a local facility or as an integrated Grid environment. For both types of usage, you will need an account on a User Interface machine. Accounts on the user interface machines are managed via a central system at SURFsara, and can be arranged after verification by a `local site support` contact person. To arrange access, the most efficient way is to ask (one of) your local support contact(s) to send a request to our helpdesk for access to the local User Interface machine. Your local support person will need your name, e-mail address, telephone number and nationality, and will verify that you are employed at the relevant institution and an active researcher in one of the Life Science disciplines. 

.. _lsg-dsa:

====================================
Locations and local support contacts
====================================

+--------------------------------------+------------+---------------------------+-----------------------------------------------+
| Location                             | LSG Site   | Local support contact(s)  | Notes                                         |
+======================================+============+===========================+===============================================+
| AMC, Amsterdam                       | LSG_AMC    | | Silvia Olabarriaga      |                                               |
+--------------------------------------+------------+---------------------------+-----------------------------------------------+
| Delft University of Technology       | LSG_TUD    | Robbert Eggermont         |                                               |
+--------------------------------------+------------+---------------------------+-----------------------------------------------+
| UMCG, Groningen                      | LSG_RUG    | | Peter Horvatovich       |                                               |
|                                      |            | | Morriz Swertz           |                                               |
+--------------------------------------+------------+---------------------------+-----------------------------------------------+
| LUMC, Leiden                         | LSG_LUMC   | Michèle Huijberts         |                                               |
+--------------------------------------+------------+---------------------------+-----------------------------------------------+
| Maastricht University                | LSG_UM     | | Maarten Coonen          |                                               |
|                                      |            | | Nuno Nunes              |                                               |
+--------------------------------------+------------+---------------------------+-----------------------------------------------+
| Radboud University, Nijmegen         | LSG_KUN    | | Christian Gilissen      | Includes a 2TB RAM High-memory node;          |
|                                      |            | | Gert Vriend             | contact helpdesk@surfsara.nl for access.      |
|                                      |            | | Janita Bralten          |                                               |
+--------------------------------------+------------+---------------------------+-----------------------------------------------+
| Erasmus MC, Rotterdam                | LSG_EMC    | Henri Vrooman             |                                               |
+--------------------------------------+------------+---------------------------+-----------------------------------------------+
| Utrecht University                   | LSG_BCBR   | | Alexandre Bonvin        |                                               |
|                                      |            | | Johan van der Zwan      |                                               |
+--------------------------------------+------------+---------------------------+-----------------------------------------------+
| VU University, Amsterdam             | LSG_VU     | René Pool                 |                                               |
+--------------------------------------+------------+---------------------------+-----------------------------------------------+
| Wageningen University                | LSG_WUR    | Harm Nijveen              |                                               |
+--------------------------------------+------------+---------------------------+-----------------------------------------------+


.. _lsg-hostnames:

===============
Cluster details
===============

The following table lists the DNS addresses of the User Interface and Storage Element services, for each of the LSG sites. 

+-----------+-----------------------------------+-----------------------------------+-------------------------------------------------------------------------------------------+
| LSG Site  | User interface                    | Storage element                   | LSG Storage SURL                                                                          |
+===========+===================================+===================================+===========================================================================================+
| LSG_AMC   | ``gb-ui-amc.amc.nl``              | ``gb-se-amc.amc.nl``              | ``srm://gb-se-amc.amc.nl:8446/dpm/amc.nl/home/lsgrid/``                                   |
+-----------+-----------------------------------+-----------------------------------+-------------------------------------------------------------------------------------------+
| LSG_TUD   | ``gb-ui-tud.ewi.tudelft.nl``      | ``gb-se-tud.ewi.tudelft.nl``      | ``srm://gb-se-tud.ewi.tudelft.nl:8446/dpm/ewi.tudelft.nl/home/lsgrid``                    |
+-----------+-----------------------------------+-----------------------------------+-------------------------------------------------------------------------------------------+
| LSG_RUG   | ``gb-ui-rug.sara.usor.nl``        | ``gb-se-rug.sara.usor.nl``        | ``srm://gb-se-rug.sara.usor.nl:8446/dpm/sara.usor.nl/home/lsgrid``                        |
+-----------+-----------------------------------+-----------------------------------+-------------------------------------------------------------------------------------------+
| LSG_LUMC  | ``gb-ui-lumc.lumc.nl``            | ``gb-se-lumc.lumc.nl``            | ``srm://gb-se-lumc.lumc.nl:8446/dpm/lumc.nl/home/lsgrid``                                 |
+-----------+-----------------------------------+-----------------------------------+-------------------------------------------------------------------------------------------+
| LSG_UM    | ``ui.lsg.maastrichtuniversity.nl``| ``se.lsg.maastrichtuniversity.nl``| ``srm://se.lsg.maastrichtuniversity.nl:8446/dpm/lsg.maastrichtuniversity.nl/home/lsgrid`` |
+-----------+-----------------------------------+-----------------------------------+-------------------------------------------------------------------------------------------+
| LSG_KUN   | ``gb-ui-kun.els.sara.nl``         | ``gb-se-kun.els.sara.nl``         | ``srm://gb-se-kun.els.sara.nl:8446/dpm/els.sara.nl/home/lsgrid``                          |
+-----------+-----------------------------------+-----------------------------------+-------------------------------------------------------------------------------------------+
| LSG_EMC   | ``gb-ui-emc.erasmusmc.nl``        | ``gb-se-emc.erasmusmc.nl``        | ``srm://gb-se-emc.erasmusmc.nl:8446/dpm/erasmusmc.nl/home/lsgrid``                        |
+-----------+-----------------------------------+-----------------------------------+-------------------------------------------------------------------------------------------+
| LSG_BCBR  | ``ui.lsg.bcbr.uu.nl``             | ``se.lsg.bcbr.uu.nl``             | ``srm://se.lsg.bcbr.uu.nl:8446/dpm/lsg.bcbr.uu.nl/home/lsgrid``                           |
+-----------+-----------------------------------+-----------------------------------+-------------------------------------------------------------------------------------------+
| LSG_VU    | ``ui.lsg.psy.vu.nl``              | ``se.lsg.psy.vu.nl``              | ``srm://se.lsg.psy.vu.nl:8446/dpm/lsg.psy.vu.nl/home/lsgrid``                             |
+-----------+-----------------------------------+-----------------------------------+-------------------------------------------------------------------------------------------+
| LSG_WUR   | ``gb-ui-wur.els.sara.nl``         | ``gb-se-wur.els.sara.nl``         | ``srm://gb-se-wur.els.sara.nl:8446/dpm/els.sara.nl/home/lsgrid``                          |
+-----------+-----------------------------------+-----------------------------------+-------------------------------------------------------------------------------------------+


User Interface machines can be accessed with any SSH client. 
To learn how to access the Storage Elements, see :ref:`grid-storage`

 
==========================
Aditional Storage Elements
==========================

The following Storage Elements are also availble when you are member of the ``lsgrid`` :abbr:`VO (Virtual Organisation)`.

+-----------------------+--------------------------------+-----------------------------------------------------------------+----------------------------------+
| Site                  | Storage element                | LSG Storage SURL                                                | Remarks                          |
+-----------------------+--------------------------------+-----------------------------------------------------------------+----------------------------------+
| SURFsara              | ``srm://srm.grid.sara.nl``     | ``srm://srm.grid.sara.nl:8443/pnfs/grid.sara.nl/data/lsgrid``   | See :ref:`dCache`                |
+-----------------------+--------------------------------+-----------------------------------------------------------------+----------------------------------+
| Test Cluster SURFsara | ``srm://gb-se-ams.els.sara.nl``| ``srm://gb-se-ams.els.sara.nl:8446/dpm/els.sara.nl/home/lsgrid``| Do not use: testing purpose only |
+-----------------------+--------------------------------+-----------------------------------------------------------------+----------------------------------+


.. vim: set wm=7 :
