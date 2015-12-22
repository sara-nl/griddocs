.. _about-grid:

**************
About the Grid
**************

In this page you will find general information about the Grid services, how to grant access to the Grid infrastructure and make best use of it:

.. contents:: 
    :depth: 4


.. _intro-grid:

====================
Introduction to Grid
====================

The Grid is a loosely coupled collection of heterogeneous resources with a large variety in purpose and reliability. Grid computing is different from conventional high performance computing such as cluster computing in that grid systems typically have each processor core perform an independent task.  

.. sidebar:: More about Cluster computing basics?

		.. seealso:: Checkout our mooc video :ref:`mooc-cluster-computing`

In addition, Grid clusters are not exclusively connected to their own storage facilities but can be accessed transparently from all Grid compute clusters, and as such form a virtual supercluster. Grid systems and their applications are more scalable than classic clusters.  

The Grid is especially suited, therefore, to equations that cannot be solved in a single cluster within a reasonable timeframe. For example, experiments such as those involving the Large Hadron Collider (LHC) and large-scale DNA analyses are conducted using the Grid.


.. _how-it-works:

============
How it works
============

As a user you connect to the Grid by using a so-called UI (User Interface). Once you have received the right credentials (see :ref:`preparation`) you are set to go. 

First, you divide your problem into smaller units, called ``jobs``. These jobs are units of computation and can be submitted to the Grid. The way to do this is to describe each job in terms of a Job Description Language (JDL), where you list which program should be executed. 

.. sidebar:: More about Grid basics?

		.. seealso:: Checkout our mooc video :ref:`mooc-grid-overview` 

Each job in the form of a ``JDL`` file is then submitted to the ``Workload Management System``. This system schedules your jobs and knows which compute clusters in the Grid are ready to accept your job. These clusters each consist of several machines. The ``Compute Element`` (CE) is the server which communicates with the WMS and accepts jobs. It then distributes the jobs to other machines in the cluster, called ``Worker Nodes`` (WNs). These WNs are the machines which do the actual work. When finished with a job they will report back to the CE, which in turn will inform the user about the status of the job. 

In addition, the Grid interconnected clusters have a storage server, called the ``Storage Element`` (SE). These servers can be used to store files on a permanent basis. Data on the SE's can be replicated at multiple sites. 

In short, as a user you submit a job to execute a computation. The ``resource broker``, called WMS, distributes the job to the node that seems to be the best suitable for this job. When the job id finished, you can collect the results through WMS or the Grid storage directly. 


.. _use-or-not:

To use the Grid or not
======================

Grid computing is a form of distributed computing which can be very powerful when applied in the ``right way``. Grid is best suited for applications with a data-parallel nature that require many simultaneous ``independent`` calculations. With the help of Grid, large scale computational problems can be solved and large amounts of data can be stored. 

.. note:: Grid suits best applications that can be split up relatively easily in multiple, independent parts or else **embarrassingly parallel** jobs. 

.. sidebar:: Other HPC options
	
	For applications that concern small data or compute requirements, please have a look for other suitable `HPC systems`_ at SURFsara. 
	
Job submission has a high overhead. Submitting a “hello world” program takes minutes. Most of the times, your data and your software must be moved to the nodes and this is not always an easy task. You must also check your jobs for status and reschedule failed jobs. There are tools to help you automate these actions (see :ref:`pilot-jobs`), however, porting your solution requires time and effort. Therefore, Grid becomes interesting when submitting hundreds, thousands jobs simultaneously. 

The Grid infrastructure is able to accommodate a variety of communities and scientific fields, each with their own type of application and requirements, and without mutual interference. Typical Grid applications are:

* Large scale computational problems with the need to reduce computation time. 
* Large-scale data processing that require access large databases.
* Projects that required collaboration with national or international partners.  


.. _dutch-grid:

===================
Dutch National Grid
===================

The Grid consists of a large number of various clusters which are distributed all over the Netherlands and even abroad. SURFsara offers Grid services in cooperation with ``Nikhef`` and ``RUG-CIT``. All together form the **Dutch National Grid Initiative** (NGI_NL) offered to scientists affiliated with Dutch universities and institutes. 

The Grid can be used for a variety of purposes, however a single grid can be dedicated for a specific purpose. As for example our `Dutch Grid`_ infrastructure, which consists of a small number of tightly interconnected clusters, operated in a collaboration between SUFRsara, NIKHEF and RUG-CIT, is very potent in enabling ``high-throughput`` processing of ``large datasets`` in a minimum amount of time.

National and European
=====================

The Dutch portion of the Grid is connected to `EGI`_, the European Grid Initiative. This allows Grid users in the Netherlands and abroad easy access to one another's resources. EGI also supplies central monitoring and ensures the homogeneity of participating clusters.


.. _lsg:

=================
Life Science Grid
=================

About
=====

The `Life Science Grid`_ (LSG) is a network of compute clusters intended specifically for researchers in the life sciences. The LSG infrastructure consists of a series of connected computer clusters which are placed within the working environment of Life Scientists while being fully managed remotely by experts at SURFsara.
 
Since 2007, SURFsara has placed several powerful computer clusters at the local sites of interested universities. Research institutions in the Netherlands house clusters that are embedded in the international grid infrastructure. 

For whom
========

The Life Science Grid is open to all Life Scientists based in the Netherlands. It accommodates Life Scientists on Dutch universities and medical centers to perform data analysis or other computational work on a variety of scales, from a few occasional analysis runs up to thousands of production jobs continuously, on datasets ranging from a few gigabytes to hundreds of terabytes and beyond. 

The LSG infrastructure is tailored specifically for applications within the life-sciences domain, with features that follow-up on specific difficulties experienced by today’s Life Scientists. Data and applications can be shared not only among colleagues in your own research lab but also with collaborators at other locations, which is not a trivial thing in highly secured hospital environments. Data may also be secured behind the institute walls if needed. 


.. _lsg-clusters:

LSG clusters 
============

.. image:: /Images/LSG_700px.png
	:align: right

Currently, twelve clusters are in place at the following sites:    
    
+---------+-----------+
|**BCBR** |  Utrecht  |
+---------+-----------+         
|**AMC**  | Amsterdam |	    
+---------+-----------+         
|**EMC**  | Rotterdam |	   
+---------+-----------+         
|**KUN**  | Nijmegen  |
+---------+-----------+         
|**LUMC** | Leiden    |
+---------+-----------+         
|**NKI**  | Amsterdam |
+---------+-----------+         
|**RUG**  | Groningen |
+---------+-----------+         
|**TUD**  | Delft     |
+---------+-----------+         
|**UM**   | Maastricht| 
+---------+-----------+         
|**VU**   | Amsterdam |
+---------+-----------+         
|**WUR**  | Wageningen|
+---------+-----------+         
|**UU**   | Utrecht   |
+---------+-----------+

The technical specifications of a single LSG cluster are described in :ref:`specs-lsg`. 


.. _grant-access:

====================
How to grant access
====================


.. _access-local-lsg:

Access local LSG cluster
========================

Granting access to the local LSG cluster enables you:

* submitting :ref:`pbs` jobs directly to your local cluster
* the possibility to scale up to other LSG clusters (see :ref:`access-grid`) 

If your research is in the field of Life Sciences and your institute hosts a LSG cluster (see :ref:`lsg-clusters`), you are eligible to obtain an account to your local cluster.

To get an account on a local user interface, please send a request to your Designated Site Admin (see :ref:`lsg-dsa`) or contact us at helpdesk@surfsara.nl.


.. _access-grid:

Access the Dutch Grid or any LSG
================================

Granting access to the Dutch Grid or *all* of the LSG clusters enables you:

* submitting :ref:`Grid jobs <first-grid-job>` to multiple clusters via the Grid middleware
* store data to the :ref:`grid-storage`

Researchers at SURF-affiliated institutes can apply for compute and storage capacity on the Grid. For scientists not affiliated to SURF, rates are based on tailor made packages (e.g. the chosen bundle size). Specific details on obtaining accounts and on our rates can be found on our website under `Access Grid`_ section. 

Please contact us at helpdesk@surfsara.nl for any inquiry on our possibilities.


.. _quotas:

Estimate your quotas
--------------------
When you come to use the Grid you do so in the context of a project. A project is set to solve a problem, defined as some goals that you want to achieve. You must also have a plan on how you think you are going to tackle the problem to achieve those goals. You can work together with several people in a project. And every project gets a quota assigned.

A quota is a budget is set so that it gives an idea of the project requirements, and it involves:

* an amount of compute time, measured in core·hours
* an amount of storage space, for disk or tape or both
* a start and end date for your project

In order to allocate a project, thus, we need to establish a quota for it. And we can only do so by knowing what you want to do. That is why it is important that you understand how to estimate your needed quota.

.. sidebar:: not sure how to calculate your quota?
	
	Contact us at helpdesk@surfsara.nl and we can work together on estimating the resources for running your computation. 

We always recommend that you have run several tests of your programs somewhere else (e.g.: your laptop) before you request access to the Grid. It would be ideal if you could try running several representative (input) samples. That way you can see (and know in advance):

* how long it takes to run a few input scenarios
* how much space you need to store input, output and intermediate data
* what are the software requirements (required software tools, libraries, compilers, etc)


.. _our-services:

=============
Our Services
=============

To deploy your production runs smoothly on the Grid, our services can be of great value. Our standard services are indispensable for using the Grid, while additional services are available as an option. For additional services a separate offer can be made.

Standard services:

* ``High-throughput`` processing nodes for jobs execution
* Access to scalable :ref:`grid-storage` facilities, disk and tape
* Standard Grid Services like User Interfaces, Brokers, and Virtual Organisation management services
* ``Token Pool`` Services (:ref:`topos-overview` and :ref:`picas-overview`) for production run logistics, job collection management, monitoring and control
* Virtual filesystem service :ref:`softdrive` for centralized software deployment on distributed systems
* Dedicated ``light-paths``: we offer support bridging the last mile between the end points and your data sources.
* ``Consultancy``: advice and support on getting access, working with grid certificates, basic job submission, data access methods, best practices, advice on design and optimization of applications for performance improvements, integration with large-scale job-submission frameworks, and international upscaling.


.. _support:

=======
Support
=======

You may request support for our Grid services by contacting us by phone or email. Our dedicated team at `SURFsara helpdesk`_ is more than willing to assist you for any questions or complaints and listen carefully to your remarks for further improvement of our services.

Checkout the detailed information about `SURFsara helpdesk`_ and don't hesitate to contact us!

..

..

..

.. Links:

.. _`SURFsara helpdesk`: https://www.surf.nl/en/about-surf/contact/helpdesk-surfsara-services/index.html

.. _`Dutch Grid`: https://www.surf.nl/en/services-and-products/grid/index.html

.. _`EGI`: http://www.egi.eu/

.. _`Life Science Grid`: https://www.surf.nl/en/services-and-products/life-science-grid/index.html

.. _`HPC systems`: https://www.surf.nl/en/services-and-products/life-science-grid/portfolio-compute-services/index.html

.. _`Access Grid`: https://www.surf.nl/en/services-and-products/grid/access/index.html
