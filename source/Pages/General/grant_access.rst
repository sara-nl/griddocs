.. _grant-access:

*******************
How to grant access
*******************

In this page you will find general information about getting access to the Life Science Grid and the National Dutch Grid:

.. contents:: 
    :depth: 4


.. _access-local-lsg:

========================
Access local LSG cluster
========================

Granting access to the local LSG cluster enables you:

* submitting :ref:`pbs` jobs directly to your local cluster
* the possibility to scale up to other LSG clusters (see :ref:`access-grid`) 

If your research is in the field of Life Sciences and your institute hosts a LSG cluster (see :ref:`lsg-clusters`), you are eligible to obtain an account to your local cluster.

To get an account on a local user interface, please send a request to your Designated Site Admin (see :ref:`lsg-dsa`) or contact us at helpdesk@surfsara.nl.


.. _access-grid:

=====================================
Access the National Dutch Grid or LSG
=====================================

Granting access to the Dutch Grid or the LSG clusters (including non-local clusters) enables you:

* submitting :ref:`Grid jobs <first-grid-job>` to multiple clusters via the Grid middleware
* storing data to the :ref:`grid-storage`

Researchers at SURF-affiliated institutes can apply for compute and storage capacity on the grid by submitting the `SURFsara application form`_. For scientists not affiliated to SURF, rates are based on tailor made packages (e.g. the chosen bundle size). Specific details on obtaining accounts and on our rates can be found in the `Access Grid`_ section of our website. 

Please contact us at helpdesk@surfsara.nl for any inquiry on our possibilities.


.. _quotas:

Estimate your quotas
====================

When you come to use the grid you do so in the context of a project. A project is set to solve a problem, defined as some goals that you want to achieve. You must also have a plan on how you think you are going to tackle the problem to achieve those goals. You can work together with several people in a project. And every project gets a quota assigned.

A quota is a budget is set so that it gives an idea of the project requirements, and it involves:

* an amount of compute time, measured in core·hours
* an amount of storage space, for disk or tape or both
* a start and end date for your project

In order to allocate a project, thus, we need to establish a quota for it. And we can only do so by knowing what you want to do. That is why it is important that you understand how to estimate your needed quota.

.. sidebar:: not sure how to calculate your quota?
	
	Contact us at helpdesk@surfsara.nl and we can work together on estimating the resources for running your computation. 

We always recommend that you have run several tests of your programs somewhere else (e.g.: your laptop) before you request access to the grid. It would be ideal if you could try running several representative (input) samples. That way you can see (and know in advance):

* how long it takes to run a few input scenarios
* how much space you need to store input, output and intermediate data
* what are the software requirements (required software tools, libraries, compilers, etc)
* how many scenarios (jobs) you need to submit for a complete analysis

..

..

..

.. Links:

.. _`SURFsara helpdesk`: https://www.surf.nl/en/about-surf/contact/helpdesk-surfsara-services/index.html

.. _`Access Grid`: https://www.surf.nl/en/services-and-products/grid/access/index.html

.. _`SURFsara application form`: https://e-infra.surfsara.nl/
