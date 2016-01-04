.. _first-grid-job:

**************
First Grid Job
**************

This section summarises all the steps to submit your first job on the Grid, check its status and retrieve the output:

.. contents:: 
    :depth: 4

.. warning:: You can continue with this guide *only after* you have completed the :ref:`preparations <preparation>` for Grid. If you skipped that, go back to the :ref:`prerequisites` section. Still need help with obtaining or installing your certificate? We can help! Contact us at helpdesk@surfsara.nl.
	 
Once you finish with the :ref:`first-grid-job`, you can continue with more :ref:`advanced` topics and also :ref:`best-practices`, the section that contains guidelines for porting real complex simulations on the Grid. 


.. _job-lifecycle:

==================
Grid job lifecycle
==================
		
.. sidebar:: Grid Job lifecycle

                .. seealso:: Have a look to our mooc video that describes the :ref:`mooc-job-lifecycle` step by step.
	
To run your application on the Grid you need to describe its requirements in a specific language called ``job description language`` (JDL). This is similar to the information that we need to specify when we run jobs using a batch scheduling system like :ref:`pbs`, although it is slightly more complex as we are now scheduling jobs across multiple sites.

Except for the application requirements, you also need to specify in the JDL the content of the in/out- put ``sandboxes``. These sandboxes allow you to transfer data to or from the Grid. The input sandbox contains all the files that you want to send with your job to the worker node, like e.g. a script that you want executed. The output sandbox contains all the files that you want to have transferred back to the UI. 

.. note:: The amount of data that you can transfer using the sandboxes is very limited, in the order of a few mega bytes. This means that you should normally limit the input sandbox to a few script files and the output sandbox to the stderr and stdout files.	

Once you have the jdl ready, you can submit it to the Workload Management System (WMS) and your job will be scheduled on a Grid worker node. This is what the WMS does for you. The purpose of WMS is to distribute and manage tasks across computing resources. More specifically, the WMS will accept your job, assign it to the most appropriate Computing Element (CE), record the job status and retrieve the output. 

.. image:: /Images/job_lifecycle.png
	:align: center


.. _startgridsession:

================
StartGridSession
================

Before submitting your first Grid job, you need to create a ``proxy`` from your certificate. This has a short lifetime and prevents you from passing along your personal certificate to the Grid. The job will keep a copy of your proxy and pass it along to the Worker Node.

This section will show you how to create a valid proxy:

* Login to your UI account:

.. code-block:: bash

	ssh homer@ui.grid.sara.nl # replace "homer" with your username

* Create a proxy with the following command, run:

.. code-block:: bash
 
	startGridSession lsgrid  #replace lsgrid with your VO
	
.. note:: What does the startGridSession script actually do?

	* It generates a ``local proxy`` in the UI /tmp directory
	* It uploads this proxy to ``Myproxy server``
	* It ``delegates`` the proxy to the WMS with your user name as the delegation ID
	
	If you want to know more , see the advanced section about :ref:`grid-authentication`.

And now you are ready to submit jobs to the Grid! Or copy data from and to the grid.
	

.. _jdl:

===============================	
Describe your job in a JDL file
===============================

To submit a Grid job you must describe this in a plain text file, called JDL. Optionally, you can check the Computing Elements (CEs) that this job may run on. The JDL will pass the details of your job to the WMS.

.. warning:: Make sure you have started your session and created already a :ref:`valid proxy <startgridsession>`. 

* Login to your User Interface. 
* Create a file with the following content describing the job requirements. Save it as ``simple.jdl``: 

.. code-block:: bash
	:linenos:
	
	Type = "Job";
	JobType = "Normal";
	Executable = "/bin/hostname";
	Arguments = "-f";
	StdOutput = "simple.out";
	StdError = "simple.err";
	OutputSandbox = {"simple.out","simple.err"}; 

This job involves no large input or output files. It will return to the user the hostname of the Worker Node that the job will land on. This is specified as the ``StdOutput`` file “simple.out” declared in the OutputSandbox.


.. _job-match:

Job list match
==============

Before actually submitting the job, you can optionally check the matching Computing Elements that satisfy your job description. It does not guarantee anything about the CE load, just matches your JDL criteria with the available VO resources:

.. code-block:: bash

	glite-wms-job-list-match -a simple.jdl # replace simple.jdl with your JDL file

Alternatively, use your delegation ID:

.. code-block:: bash

	glite-wms-job-list-match -d homer simple.jdl # replace homer with your delegation id, in this case the your login name 
	
.. note:: The '-a' option should not be used frequently. It creates a proxy of your certificate 'on-the-fly' when the job is submitted; therefore '-a' is quite inefficient when submitting hundreds of jobs.

Your job is now ready. Continue to the next step to submit it to the Grid!


.. _job-submit:

==========================
Submit the job to the Grid
==========================

You should have your simple.jdl file ready in your UI up to this point. When you submit this simple Grid job to the WMS, a job will be created and sent to a remote Worker Node. There it will execute the command ``/bin/hostname -f`` and write its standard output and its standard error.

.. sidebar:: First Job explained

		.. seealso:: For more detailed information about submitting a simple Grid job, have a look to our mooc video :ref:`mooc-submit-job`.

To submit your first Grid job and get an understanding of the job lifecycle, we will perform these steps:

* :ref:`Job submission <job-submit>`
* :ref:`Status tracking <job-status>`
* :ref:`Output retrieval <job-output>`

A job can be submitted by typing in your UI Terminal this command:

.. code-block:: bash

	glite-wms-job-submit -d $USER -o jobIds simple.jdl
	
	
The option '-o' allows you to specify a file (in this case ``jobIDs``) to store the unique job identifier:

* You can use this URL identifier to monitor your job from the command line or your browser and to get the job output.
* Note that omitting the -o option means that the jobID is not saved in a file. When you do not save this id you will effectively loose the output of your job!
* The jobID string looks like this:

.. code-block:: bash

	cat jobIds

	# ###Submitted Job Ids### 
	# https://wms2.grid.sara.nl:9000/6swP5FEfGVZ69tVB3PwnDQ


.. _job-status:

====================
Track the job status
====================

To check the current job status from the command line, apply the following command that queries the ``WMS`` for the status of the job. 

* After submitting the job, type:

.. code-block:: bash

	glite-wms-job-status https://wms2.grid.sara.nl:9000/6swP5FEfGVZ69tVB3PwnDQ #replace with your jobID

* Alternatively, if you have saved your jobIds into a file you can use the '-i' option and the filename as argument:

.. code-block:: bash

	glite-wms-job-status -i jobIds

* Finally, a third way to check the job status is within the web browser that :ref:`you installed your certificate <install-cert-browser>`. Copy the link:

	https://wms2.grid.sara.nl:9000/6swP5FEfGVZ69tVB3PwnDQ

and paste it in your browser. Note that the URL can only be accessed by you as you are authenticated to the server with the certificate installed in this browser.


.. _job-cancel:

Cancel job
==========

If you realize that you need to cancel a submitted job, use the following command:

.. code-block:: bash

	glite-wms-job-cancel https://wms2.grid.sara.nl:9000/6swP5FEfGVZ69tVB3PwnDQ #replace with your jobID

Alternatively, you can use the jobIDs file:

.. code-block:: bash

	glite-wms-job-cancel -i jobIds


.. _job-output:

===================
Retrieve the output
===================

The output consists of the files included in the OutputSandbox. You can
retrieve the job output once it is successfully completed, in other words the
job status has changed from ``RUNNING`` to ``DONE``. The files in the
OutputSandbox can be downloaded for one week after the job finishes.

.. note:: 
        You can choose the output directory with the ``--dir`` option. If you do not use this option then the output will be copied under the UI ``/scratch`` directory with a name based on the ID of the job.  

* To get the output, type:

.. code-block:: bash

	glite-wms-job-output https://wms2.grid.sara.nl:9000/6swP5FEfGVZ69tVB3PwnDQ
	
Alternatively, you can use the jobIDs file:
	
.. code-block:: bash

	glite-wms-job-output --dir . -i jobIds

where you should substitute jobIds with the file that you used to store the
job ids.

If you omitted the ``--dir`` option, your output stored on the
``/scratch``-directory on the UI. Please remove your files from the
``/scratch``-directory when they are no longer necessary. Also keep in
mind that if the ``/scratch``-directory becomes too full, the
administrators remove the older files until enough space is available
again.

===============
Conclusion
===============

        
Congratulations! You have just executed your first job to the Grid!


.. seealso:: Try now to port your own application to the Grid. Checkout the :ref:`best-practices` section and run the example that suits your use case. The section :ref:`advanced` topics will help your understanding for several Grid modules used in the  :ref:`best-practices`. 

	Done with the :ref:`basics`, but not sure how to proceed? We can help! Contact us at helpdesk@surfsara.nl.


 
