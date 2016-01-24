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

.. sidebar:: More about Picas in practice?

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


====================
Picas sample example
====================

* Login to the ui and download the :download:`pilot_picas_fractals.tar </Scripts/pilot_picas_fractals.tar>` example.

* Untar the example scripts and inspect the content:

.. code-block:: bash

    cd pilot_picas_fractals/
    ls -l
    # drwxrwxr-x 2 homer homer  6 Jan 5 16:10 Application
    # drwxrwxr-x 4 homer homer 75 Jan 5 16:11 Tokens

Detailed information regarding the operations performed in each of the scripts below is embedded to the comments inside each of the scripts individually.     
   
   
Prepare your Tokens     
===================


Create the Tokens
-----------------

* Move to the Tokens directory:

.. code-block:: bash

    cd Tokens

* List the files in Tokens directory:

.. code-block:: bash

    ls -l
    # drwxr-xr-x 4 homer homer 4096 Jan 4 16:11 couchdb
    # -rwxr-xr-x 1 homer homer 1247 Jan 4 16:25 createTokens
    # -rw-rw-r-- 1 homer homer 1193 Jan 4 16:11 createTokens.py
    # -rw-rw-r-- 1 homer homer 2855 Jan 4 16:11 createViews.py
    # drwxr-xr-x 2 homer homer 4096 Jan 4 16:11 picas


This example includes a bash script (./createTokens) that generates a sensible parameter file, with each line representing a set of parameters that the fractals program can be called with. Without arguments it creates a fairly sensible set of 24 lines of parameters. You can generate different sets of parameters by calling the program with a combination of -q, -d and -m arguments, but at the moment no documentation exists on these. We recommend not to use them for the moment.

* After you ran the createTokens script you'll see output similar to the following:

.. code-block:: bash

    ./createTokens 
    # /tmp/tmp.fZ33Kd8wXK
    # cat /tmp/tmp.fZ33Kd8wXK


Upload your Tokens to the PiCas server
--------------------------------------

* Upload the tokens:

.. code-block:: bash

	python createTokens.py /tmp/tmp.fZ33Kd8wXK $PICAS_DB $PICAS_USR $PICAS_USR_PWD  
	
* Check your database in this link:

    https://nosql01.grid.sara.nl:6984/_utils/homerdb/ # replace homerdb with your Picas database name

* Create the Views (pools) - independent to the tokens (should be created only once): 

.. code-block:: bash
 
	python createViews.py $PICAS_DB $PICAS_USR $PICAS_USR_PWD


Run the example
===============
	
* Move to the Application directory:

.. code-block:: bash

    cd Application/

* List the files in Application directory:

.. code-block:: bash

    ls -l
    # fractals.jdl  
    # sandbox/

    ls -l sandbox/
    # -rw-rw-r-- 1 homer homer 307200 Jan 4 17:37 couchdb.tar
    # -rwxrwxr-x 1 homer homer   9735 Jan 4 17:41 fractals
    # -rw-r--r-- 1 homer homer   2593 Jan 4 17:41 fractals.c
    # -rwxrw-r-- 1 homer homer    944 Jan 4 17:37 master.sh
    # -rw-rw-r-- 1 homer homer  71680 Jan 4 17:37 picas.tar
    # -rw-rw-r-- 1 homer homer   3046 Jan 4 17:37 pilot.py
    # -rwxrw-r-- 1 homer homer    681 Jan 4 17:37 startpilot.sh	
    

Run the example locally
-----------------------

* If you submit the jobs on the UI, the job will start fetching tokens from the pool server and run the application locally on the UI machine:

.. code-block:: bash

    cd sandbox/
    . startpilot.sh PICAS_DB PICAS_USR PICAS_USR_PWD # replace PICAS_DB PICAS_USR PICAS_USR_PWD with your database name, username and password on Picas
    
    # Connected to the database homerdb sucessfully. Now starting work...
    # -----------------------
    # Working on token: token_2
    # lock 1453570581
    # _rev 2-8d7f141114b7335b50612ba4dfb92b3d
    # hostname ui
    # exit_code
    # scrub_count 0
    # done 0
    # input -q 0.100 -d 256 -m 8400
    # output
    # _id token_2
    # type token
    # -----------------------
    # /usr/bin/time -v ./master.sh "-q 0.100 -d 256 -m 8400" token_2 2> logs_token_2.err 1> logs_token_2.out
    # -----------------------
    # Working on token: token_6
    # lock 1453570589    
    # ...
    
You can monitor the progress for the Tokens that are waiting, running, finished or in error state, from the PiCaS website here:

    https://nosql01.grid.sara.nl:6984/_utils/homerdb/ # replace homerdb with your Picas database name
    	
While the UI has started processing tokens, submit the pilot jobs to the Grid. Continue to the next section ...
	 

Run the example on the Grid
---------------------------
    
* Create a proxy:  

.. code-block:: bash

	startGridSession lsgrid # replace lsgrid with your VO  

* Modify the ``fractals.jdl`` by replacing [$PICAS_DB] [$PICAS_USR] [$PICAS_USR_PWD] with your credentials (hard-coded). 

* Submit the pilot jobs:  

.. code-block:: bash

	glite-wms-job-submit -d $USER -o jobIDs fractals.jdl
	

It will recursively generate an image based on parameters received from PiCas. At this point, some of your tokens are processed on the grid worker nodes and some of the tokens are already processed on the UI. Note that the UI is not meant for production runs, but only for testing few runs before submitting the pilot jobs to the grid.

* Convert the UI output file to .png format and display the picture:

.. code-block:: bash

    convert output_token_6 output_token_6.png # replace with your output filename
    
For the tokens that are processed on grid, you can send the output to the :ref:`Grid Storage <grid-storage>` or some other remote location.


	
