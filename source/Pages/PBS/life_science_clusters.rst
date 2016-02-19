.. _life-science-clusters:

**************************
Life Science Grid Clusters
**************************

The current page provides information about the Life Science Grid clusters and their locations, local support contact persons, and DNS addresses of User Interface (UI) and Storage Element (SE) machines.

.. contents:: 
    :depth: 4

If you have any questions concerning access to the clusters below, please contact us at helpdesk@surfsara.nl.

=====
About
=====

The :ref:`Life Science grid <LSG>` is a compute and data processing infrastructure that is available for all Life Science researchers working in the Netherlands. The Life Science Grid consists of a series of computer clusters that can be used either as a local facility or as an integrated grid environment. For both types of usage, you will need an account on a User Interface machine. Accounts on the user interface machines are managed via a central system at SURFsara, and can be arranged after verification by a `local site support` contact person. To arrange access, the most efficient way is to ask (one of) your local support contact(s) to send a request to our helpdesk for access to the local User Interface machine. Your local support person will need your name, e-mail address, telephone number and nationality, and will verify that you are employed at the relevant institution and an active researcher in one of the Life Science disciplines. 

.. _lsg-dsa:

====================================
Locations and local support contacts
====================================

+--------------------------------------+------------+---------------------------+-----------------------------------------------+
| Location                             | LSG Site   | Local support contact(s)  | Notes                                         |
+======================================+============+===========================+===============================================+
| AMC, Amsterdam                       | LSG_AMC    | | Silvia Olabarriaga      |                                               |
|                                      |            | | Juan Luis Font          |                                               |
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

+----------+-------------------------------------+----------------------------------------------+
| LSG Site | User interface                      | Storage element                              |
+==========+=====================================+==============================================+
| LSG_AMC  | ``gb-ui-amc.amc.nl``                | ``gb-se-amc.amc.nl``                         |
+----------+-------------------------------------+----------------------------------------------+
| LSG_TUD  | ``gb-ui-tud.ewi.tudelft.nl``        | ``gb-se-tud.ewi.tudelft.nl``                 |
+----------+-------------------------------------+----------------------------------------------+
| LSG_RUG  | ``gb-ui-rug.sara.usor.nl``          | ``gb-se-rug.sara.usor.nl``                   |
+----------+-------------------------------------+----------------------------------------------+
| LSG_LUMC | ``gb-ui-lumc.lumc.nl``              | ``gb-se-lumc.lumc.nl``                       |
+----------+-------------------------------------+----------------------------------------------+
| LSG_UM   | ``ui.lsg.maastrichtuniversity.nl``  | ``se.lsg.maastrichtuniversity.nl``           |
+----------+-------------------------------------+----------------------------------------------+
| LSG_KUN  | ``gb-ui-kun.els.sara.nl``           | ``gb-se-kun.els.sara.nl``                    |
+----------+-------------------------------------+----------------------------------------------+
| LSG_EMC  | ``gb-ui-emc.erasmusmc.nl``          | ``gb-se-emc.erasmusmc.nl``                   |
+----------+-------------------------------------+----------------------------------------------+
| LSG_BCBR | ``ui.lsg.bcbr.uu.nl``               | ``se.lsg.bcbr.uu.nl``                        |
+----------+-------------------------------------+----------------------------------------------+
| LSG_VU   | ``ui.lsg.psy.vu.nl``                | ``se.lsg.psy.vu.nl``                         |
+----------+-------------------------------------+----------------------------------------------+
| LSG_WUR  | ``gb-ui-wur.els.sara.nl``           | ``gb-se-wur.els.sara.nl``                    |
+----------+-------------------------------------+----------------------------------------------+

User Interface machines can be accessed with any SSH client. 
To learn how to access the Storage Elements, see :ref:`grid-storage`

.. vim: set wm=7 :
