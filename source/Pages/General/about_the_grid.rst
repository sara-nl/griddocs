.. _about-grid:

**************
About the Grid
**************

In this page you will find general information about the Grid, how it works and what is suited for:

.. contents:: 
    :depth: 4


.. _intro-grid:

====================
Introduction to Grid
====================

The ``Grid`` is a loosely coupled collection of heterogeneous resources with a large variety in purpose and reliability. The grid consists of multiple geographically distributed compute clusters interconnected with fast network. Grid computing is different from conventional high performance computing such as cluster computing in that grid systems typically have each processor core perform an independent task.  

.. sidebar:: More about Cluster computing basics?

		.. seealso:: Checkout our mooc video :ref:`mooc-cluster-computing`

In addition, grid clusters are not exclusively connected to their own storage facilities but can be accessed transparently from all grid compute clusters, and as such form a virtual supercluster. Grid systems and their applications are more scalable than classic clusters.  

The Grid is especially suited, therefore, to applications that cannot be solved in a single cluster within a reasonable timeframe. Common examples are the Large Hadron Collider (LHC) experiments, large-scale DNA analyses and Monte-Carlo simulations.


.. _how-it-works:

============
How it works
============

As a user you connect to the grid by using a so-called ``User Interface`` (UI). Once you have received the right credentials (see :ref:`preparation`) you are set to go. 

First, you divide your problem into smaller units, called ``jobs``. These jobs are units of computation and can be submitted to the grid. The way to do this is to describe each job in terms of a ``Job Description Language`` (JDL), where you list which program should be executed and the requirements of the compute node to run the job. 

.. sidebar:: More about Grid basics?

		.. seealso:: Checkout our mooc video :ref:`mooc-grid-overview` 

Each job in the form of a JDL file is then submitted to the ``Workload Management System`` (WMS). The WMS is the scheduler that knows which grid compute clusters are ready to accept your job. Each grid cluster consists of a ``Compute Element`` (CE) and several ``Worker Nodes`` (WNs). The CE is the server which communicates with the WMS and accepts jobs. It then distributes the jobs to other compute nodes in the cluster, called Worker Nodes. These WNs are the machines which do the actual work. When finished with a job they will report back to the CE, which in turn will inform the WMS about the status of the job. 

In addition, the Grid interconnected clusters have a storage server, called the ``Storage Element`` (SE). These servers can be used to store files on a permanent basis. Data on the SE's can be replicated at multiple sites. The Grid clusters can be also interconnected with a central Grid storage (see :ref:`dCache <dCache>`) for saving input, output or intermediate results.

In short, as a user you submit a job to execute a computation. The ``resource broker``, called WMS, distributes the job to the node that seems to be the best suitable for this job. When the job is finished, you can collect the results through WMS or the central Grid storage directly. 


.. _use-or-not:

======================
To use the Grid or not
======================

Grid computing is a form of distributed computing which can be very powerful when applied in the ``right way``. Grid is best suited for applications with a data-parallel nature that require many simultaneous ``independent`` calculations. With the help of grid, large scale computational problems can be solved and large amounts of data can be stored. 

.. note:: Grid suits best applications that can be split up relatively easily in multiple, independent parts or else **embarrassingly parallel** jobs. 

.. sidebar:: Other HPC options
	
	For applications that concern small data or compute requirements, please have a look for other suitable `HPC systems`_ at SURFsara. 
	
Job submission has a high overhead. Submitting a “hello world” program takes minutes. Your data and your software must be available on the worker nodes and this is not always an easy task. You must also check your jobs for status and reschedule failed jobs. There are tools to help you automate these actions (see :ref:`pilot-jobs`), however, porting your solution requires time and effort. Therefore, Grid becomes interesting when submitting hundreds, thousands jobs simultaneously. 

The grid infrastructure is able to accommodate a variety of communities and scientific fields, each with their own type of application and requirements, and without mutual interference. Typical grid applications are:

* Large scale computational problems with the need to reduce computation time. 
* Large-scale data processing that require access to large databases.
* Projects that require collaboration with national or international partners.  


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
