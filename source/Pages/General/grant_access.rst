.. _grant-access:

*****************
How to get access
*****************

In this page you will find general information about getting access to the Life Science Grid and the National Dutch Grid infrastructure:

.. contents:: 
    :depth: 4


.. _access-local-lsg:

==============================
Local access to an LSG cluster
==============================

Granting local access to a Life Science Grid (LSG) cluster enables you:

* submitting jobs (:ref:`pbs`) jobs directly to your local cluster
* the possibility to scale up to other LSG clusters (see :ref:`access-grid`) 

If your research applies to one of the life science disciplines and your institute hosts a LSG cluster (see :ref:`lsg-clusters`), you are eligible to obtain an account on your local LSG cluster.

To get an account on a local user interface, please send a request to your Designated Site Admin (see :ref:`lsg-dsa`) or contact us at helpdesk@surfsara.nl.


.. _access-grid:

========================================
Access to the National Dutch Grid or LSG
========================================

Access to the Dutch Grid or the :abbr:`LSG (Life Science Grid)` clusters (including non-local access) allows for: 

* submitting :ref:`Grid jobs <first-grid-job>` to multiple clusters via the Grid middleware
* storing data to the :ref:`grid-storage`

Researchers at SURF-affiliated institutes can apply for compute and storage capacity on the Grid by submitting the `SURFsara application form`_. For scientists not affiliated to SURF, rates are based on tailor made packages. Specific details on obtaining accounts can be found in the `Access Grid`_ section of our website. 

Please contact us at helpdesk@surfsara.nl for any inquiry on our possibilities.


.. _quotas:

Estimate your resource needs
============================

When you request to use the Grid you do so in the context of a project. A project is set to solve a problem, defined as some goals that you want to achieve, which includes a plan on how you will achieve those goals. For each project a suitable amount of resources will be allocated. You can work together with several people in the same project and using the same resource allocation. 

In general, each project resource allocation involves: 

* an amount of compute time, measured in core·hours
* an amount of storage space, for disk or tape or both
* a start and end date for your project

In order for us to make a suitable allocation for a project, we need to know what your goals are and how you want to achieve those goals. That is why it is important for you to understand how to estimate the resources for your project.

.. sidebar:: Not sure how to calculate your resource requirements?
	
	Contact us at helpdesk@surfsara.nl and we can work together on estimating the resources for running your computation.

For a proper estimation of resources requirements it is best to start with a few test runs of the code (if existing) on another system (e.g.: your laptop). The outcome of such tests will in many cases be sufficient to derive a total requirement for your larger-scale production runs. Sometimes a more elaborate process is needed to come to an estime, for example if the code does not exist yet of if changes to the existing code are still pending. Ideally you have been running a few representative samples of your runs before you file a resource request, in order to have some concrete information ready about the resources needed by your jobs, such as: 

* how long it takes to run a representative input scenario
* how much space you need to store input, output and intermediate data
* what the software requirements are (required software tools, libraries, compilers, etc.)
* how many scenarios (jobs) you need to run for a complete analysis

In case you don't know how to prepare such an inventory, we would be happy to assist you with that. 


.. Links:

.. _`SURFsara helpdesk`: https://www.surf.nl/en/about-surf/contact/helpdesk-surfsara-services/index.html

.. _`Access Grid`: https://www.surf.nl/en/services-and-products/grid/access/index.html

.. _`SURFsara application form`: https://e-infra.surfsara.nl/
