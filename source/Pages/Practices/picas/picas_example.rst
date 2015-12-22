.. warning:: Page under construction

.. _picas-example:

*************
Picas Example
*************

This page presents a PiCaS pilot job example:

.. contents:: 
    :depth: 4


===================
Problem description
===================

.. sidebar:: More about Picas in practise?

		.. seealso:: Checkout our mooc videos Picas examples :ref:`Part I <mooc-picas-example1>` and :ref:`Part II <mooc-picas-example2>`.

In this example we will implement the following pilot job workflow:
 
* First we define and generate the application tokens with all the necessary parameters.  
* Then we define and create a master shell script (*master.sh*) that will be send with the job using the input sandbox. This contains some boiler plate code to e.g. setup the environment, download software or data from the Grid storage, run the application etc. This doesn’t have to be a shell script, however, setting up environment variables is easiest when using a shell script, and this way setup scripts are separated from the application code.  
* We also define and create a python script to handle all the communication with the token pool server, call the master script, catch errors and do the reporting.   
* Finally we define the jdl on the user interface machine to specify some general properties of our jobs. This is required to submit a batch of pilot jobs to the Grid that will in turn initiate the python script as defined in the previous step.  


Prerequisites
=============
To be able to run the example you must have:

* All the three Grid :ref:`prerequisites` (User Interface machine, Grid certificate, VO membership) 
* An account on PiCaS server (send your request to <helpdesk@surfsara.nl>)  

Run the example
===============

* Copy and untar the example scripts <here tarball> to your UI account:
* Upload your Tokens to the PiCas server:

.. code-block:: bash

	python createTokens.py [parameter] $PICAS_DB $PICAS_USR $PICAS_USR_PWD`   

* Create the Views (pools) - independent to the tokens: 

.. code-block:: bash
 
	python createViews.py $PICAS_DB $PICAS_USR $PICAS_USR_PWD`
    
* Create a proxy:  

.. code-block:: bash

	startGridSession lsgrid # replace lsgrid with your VO  

* Modify the JDL by replacing [$PICAS_DB] [$PICAS_USR] [$PICAS_USR_PWD] with your credentials (hard-coded). 

* Submit the pilot jobs:  

.. code-block:: bash

	glite-wms-job-submit -d $USER -o jobIDs picas-example.jdl
	

Submit jobs from your laptop (optional)
---------------------------------------

Submit jobs from LSG (optional)
-------------------------------
	
Monitoring
==========

You can monitor the progress for the Tokens that are waiting, running, finished or in error state, from the PiCaS website here:

	https://nosql01.grid.sara.nl:6984/_utils/	
