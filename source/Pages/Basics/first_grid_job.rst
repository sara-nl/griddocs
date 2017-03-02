.. _first-grid-job:

**************
First Grid job
**************

This section summarises all the steps to submit your first job on the Grid, check its status and retrieve the output:

.. contents:: 
    :depth: 4

.. warning:: You can continue with this guide *only after* you have completed the :ref:`preparations <preparation>` for Grid. If you skipped that, go back to the :ref:`prerequisites` section. Still need help with obtaining or installing your certificate? We can help! Contact us at helpdesk@surfsara.nl.
	 
Once you finish with the :ref:`first-grid-job`, you can continue with more :ref:`advanced topics <advanced>` and also :ref:`best-practices`, the section that contains guidelines for porting real complex simulations on the Grid. 


.. _job-lifecycle:

==================
Grid job lifecycle
==================
		
.. sidebar:: Grid job lifecycle

                .. seealso:: Have a look at our mooc video that describes the :ref:`mooc-job-lifecycle` step by step.
	
To run your application on the Grid you need to describe its requirements in a specific language called **job description language** (JDL). This is similar to the information that we need to specify when we run jobs using a batch scheduling system like :ref:`pbs`, although it is slightly more complex as we are now scheduling jobs across multiple sites.

Except for the application requirements, you also need to specify in the :abbr:`JDL (Job Description Language)` the content of the *input/output sandboxes*. These sandboxes allow you to transfer data to or from the Grid. The input sandbox contains all the files that you want to send with your job to the worker node, like e.g. a script that you want executed. The output sandbox contains all the files that you want to have transferred back to the :abbr:`UI (User Interface)`. 

.. note:: The amount of data that you can transfer using the sandboxes is very limited, in the order of a few megabytes (less than **100MB**). This means that you should normally limit the input sandbox to a few script files and the output sandbox to the stderr and stdout files.

Once you have the :abbr:`JDL (Job Description Language)` file ready, you can submit it to multiple clusters with ``glite-*`` commands. The Workload Management System (WMS) will schedule your job on a Grid worker node. The purpose of WMS is to distribute and manage tasks across computing resources. More specifically, the WMS will accept your job, assign it to the most appropriate Computing Element (CE), record the job status and retrieve the output.

The following animations illustrate the Grid lifecycle as described above:

* `Grid WMS animation`_
* `Grid job status animation`_

.. _startgridsession:

================
StartGridSession
================

Before submitting your first Grid job, you need to create a *proxy* from your certificate. This has a short lifetime and prevents you from passing along your personal certificate to the Grid. The job will keep a copy of your proxy and pass it along to the Worker Node.

This section will show you how to create a valid proxy:

* Log in to your :abbr:`UI (User Interface)` account:

  .. code-block:: console

     $ssh homer@ui.grid.sara.nl # replace "homer" with your username

* Create a proxy with the following command and provide your Grid certificate password when prompted:

  .. code-block:: console

     $startGridSession lsgrid  #replace lsgrid with your VO
     
  Alternatively, you might have to login to a VO group. In that case, the syntax is as follows:
  
  .. code-block:: console
  
    $startGridSession lsgrid:/lsgrid/vo_group #replace both the 'lsgrid' words with your VO and 'vo_group' with the name of your VO group

  You should see a similar output displayed in your terminal:

  .. code-block:: console

	Now starting...
	Please enter your GRID password:
	voms-proxy-init -voms lsgrid --valid 168:00 -pwstdin
	Contacting voms.grid.sara.nl:30018 [/O=dutchgrid/O=hosts/OU=sara.nl/CN=voms.grid.sara.nl] "lsgrid"...
	Remote VOMS server contacted successfully.

	Created proxy in /tmp/x509up_u39111.

	Your proxy is valid until Tue Jan 11 09:31:56 CET 2016
	Your identity: /O=dutchgrid/O=users/O=sara/CN=Homer Simpson
	Creating proxy ..................................................... Done
	Proxy Verify OK
	Your proxy is valid until: Tue Jan 11 09:31:56 2016
	A proxy valid for 168 hours (7.0 days) for user /O=dutchgrid/O=users/O=sara/CN=Homer Simpson now exists on px.grid.sara.nl.
	Your delegation ID is: homer

.. note:: What does the startGridSession script actually do?

	* It generates a *local proxy* ``x509up_uXXX`` in the :abbr:`UI (User Interface)` ``/tmp/`` directory
	* It uploads this proxy to Myproxy server
	* It delegates the proxy to the :abbr:`WMS (Workload Management System)` with your user name as the delegation ID (DID)

	If you want to know more, see the advanced section about :ref:`grid-authentication`.

And now you are ready to submit jobs to the Grid! Or copy data from and to the Grid.
	

.. _jdl:

===============================	
Describe your job in a JDL file
===============================

To submit a Grid job you must describe this in a plain text file, called :abbr:`JDL (Job Description Language)`. Optionally, you can check the Computing Elements (CEs) that this job may run on. The JDL file will pass the details of your job to the :abbr:`WMS (Workload Management System)`.

.. warning:: Make sure you have started your session and created already a :ref:`valid proxy <startgridsession>`. 

* Log in to your User Interface. 
* Create a file with the following content describing the job requirements. Save it as ``simple.jdl``: 

  .. code-block:: cfg
	:linenos:
	
	Type = "Job";
	JobType = "Normal";
	Executable = "/bin/hostname";
	Arguments = "-f";
	StdOutput = "simple.out";
	StdError = "simple.err";
	OutputSandbox = {"simple.out","simple.err"}; 

This job involves no large input or output files. It will return to the user the hostname of the Worker Node that the job will land on. This is specified as the ``StdOutput`` file ``simple.out`` declared in the ``OutputSandbox`` statement.


.. _job-match:

Job list match
==============

Before actually submitting the job, you can optionally check the matching Computing Elements that satisfy your job description. It does not guarantee anything about the :abbr:`CE (Compute Element)` load, just matches your :abbr:`JDL (Job Description Language)` criteria with the available VO resources:

.. code-block:: console

   $glite-wms-job-list-match -a simple.jdl # replace simple.jdl with your JDL file

Alternatively, use your delegation ID:

.. code-block:: console

   $glite-wms-job-list-match -d homer simple.jdl # replace homer with your delegation id, in this case your login name 
	
.. note:: The ``-a`` option should not be used frequently. It creates a proxy of your certificate 'on-the-fly' when the job is submitted; therefore ``-a`` is quite inefficient when submitting hundreds of jobs.

Your job is now ready. Continue to the next step to submit it to the Grid!

To submit your first Grid job and get an understanding of the job lifecycle, we will perform these steps:

* :ref:`Job submission <job-submit>`
* :ref:`Status tracking <job-status>`
* :ref:`Output retrieval <job-output>`

.. _job-submit:

==========================
Submit the job to the Grid
==========================

.. sidebar:: First Job explained

		.. seealso:: For more detailed information about submitting a simple Grid job, have a look at our mooc video :ref:`mooc-submit-job`.

You should have your ``simple.jdl`` file ready in your :abbr:`UI (User Interface)` up to this point. When you submit this simple Grid job to the :abbr:`WMS (Workload Management System)`, a job will be created and sent to a remote Worker Node. There it will execute the command ``/bin/hostname -f`` and write its standard output and its standard error in the ``simple.out`` and ``simple.err`` respectively.

* Submit the simple job by typing in your :abbr:`UI (User Interface)` terminal this command:

  .. code-block:: console

     $glite-wms-job-submit -d $USER -o jobIds simple.jdl

     Connecting to the service https://wms2.grid.sara.nl:7443/glite_wms_wmproxy_server
     ====================== glite-wms-job-submit Success ======================
     The job has been successfully submitted to the WMProxy
     Your job identifier is:

     https://wms2.grid.sara.nl:9000/JIVYfkMxtnRFWweGsx0XAA

     The job identifier has been saved in the following file:
     /home/homer/jobIds
     ==========================================================================

Note the use of ``-d $USER`` to tell your job that it should use your delegated proxy certificate.	
	
The option ``-o`` allows you to specify a file (in this case ``jobIDs``) to store the unique job identifier:

* You can use this URL identifier to monitor your job from the command line or your browser and to get the job output.
* Note that omitting the ``-o`` option means that the jobID is not saved in a file. When you do not save this id you will effectively loose the output of your job!

The jobID string looks like this:

.. code-block:: console

   $cat jobIds

    ###Submitted Job Ids### 
    https://wms2.grid.sara.nl:9000/JIVYfkMxtnRFWweGsx0XAA


.. _job-status:

====================
Track the job status
====================

To check the current job status from the command line, apply the following command that queries the :abbr:`WMS (Workload Management System)` for the status of the job. 

* After submitting the job, type:

  .. code-block:: console

     $glite-wms-job-status https://wms2.grid.sara.nl:9000/JIVYfkMxtnRFWweGsx0XAA #replace with your jobID

* Alternatively, if you have saved your jobIds into a file you can use the ``-i`` option and the filename as argument:

  .. code-block:: console

     $glite-wms-job-status -i jobIds

* Finally, a third (optional) way to check the job status is with the web browser in which :ref:`you installed your certificate <digicert_browser_install>`. In this browser open the jobID link:

	https://wms2.grid.sara.nl:9000/JIVYfkMxtnRFWweGsx0XAA #replace with your jobID

Note that the URL can only be accessed by you as you are authenticated to the server with the certificate installed in this browser. If your certificate is not installed in this browser, you will get an authentication error.


.. _job-cancel:

Cancel job
==========

* If you realize that you need to cancel a submitted job, use the following command:

  .. code-block:: console

     $glite-wms-job-cancel https://wms2.grid.sara.nl:9000/JIVYfkMxtnRFWweGsx0XAA #replace with your jobID

* Alternatively, you can use the ``jobIds`` file:

  .. code-block:: console

     $glite-wms-job-cancel -i jobIds


.. _job-output:

===================
Retrieve the output
===================

The output consists of the files included in the ``OutputSandbox`` statement. You can
retrieve the job output once it is successfully completed, in other words the
job status has changed from ``RUNNING`` to ``DONE``. The files in the
output sandbox can be downloaded for approximately one week after the job finishes.

.. note:: 
        You can choose the output directory with the ``--dir`` option. If you do not use this option then the output will be copied under the :abbr:`UI (User Interface)` ``/scratch`` directory with a name based on the ID of the job.  

* To get the output, type:

  .. code-block:: console

     $glite-wms-job-output https://wms2.grid.sara.nl:9000/JIVYfkMxtnRFWweGsx0XAA #replace with your jobID
	
* Alternatively, you can use the jobIDs file:
	
  .. code-block:: console

     $glite-wms-job-output --dir . -i jobIds

where you should substitute ``jobIds`` with the file that you used to store the
job ids.

If you omitted the ``--dir`` option, your output stored on the
``/scratch`` directory on the :abbr:`UI (User Interface)`. Please remove your files from the
``/scratch`` directory when they are no longer necessary. Also keep in
mind that if the ``/scratch`` directory becomes too full, the
administrators remove the older files until enough space is available
again.

Check job output
================

* To check your job output, browse into the downloaded output directory. This includes the ``simple.out``, ``simple.err`` files specified in the ``OutputSandbox`` statement:

  .. code-block:: console

	$ls -l /home/homer/homer_JIVYfkMxtnRFWweGsx0XAA/

	-rw-rw-r-- 1 homer homer  0 Jan  5 18:06 simple.err
	-rw-rw-r-- 1 homer homer 20 Jan  5 18:06 simple.out

	$cat /home/homer/homer_JIVYfkMxtnRFWweGsx0XAA/simple.out # displays the hostname of the Grid worker node where the job landed
	wn01.lsg.bcbr.uu.nl

==================
Recap & Next Steps
==================
        
Congratulations! You have just executed your first job to the Grid!

Let's summarise what we've seen so far.

You interact with the Grid via the :abbr:`UI (User Interface)` machine ``ui.grid.sara.nl``. You describe each job in a JDL (Job Description Language) file where you list which program should be executed and what are the worker node requirements. From the :abbr:`UI (User Interface)`, you create first a proxy of your Grid certificate and submit your job with ``glite-*`` commands. The resource broker, called WMS (short for Workload Management System), accepts your jobs, assigns them to the most appropriate CE (Computing Element), records the jobs statuses and retrieves the output.

This is a short overview of the commands needed to handle simple jobs: 

+---------------------+--------------------------------------------------------+
| startGridSession    | ``startGridSession lsgrid``                            |
+---------------------+--------------------------------------------------------+
| submit job          | ``glite-wms-job-submit -d $USER -o jobIds simple.jdl`` |	    
+---------------------+--------------------------------------------------------+
| job status          | ``glite-wms-job-status -i jobIds``                     |	   
+---------------------+--------------------------------------------------------+
| cancel job          | ``glite-wms-job-cancel -i jobIds``                     |
+---------------------+--------------------------------------------------------+
| retrieve job output | ``glite-wms-job-output --dir . -i jobIds``             |
+---------------------+--------------------------------------------------------+


.. seealso:: Try now to port your own application to the Grid. Check out the :ref:`best-practices` section and run the example that suits your use case. The section :ref:`advanced` will help your understanding for several Grid modules used in the :ref:`best-practices`. 

	Done with the :ref:`basics`, but not sure how to proceed? We can help! Contact us at helpdesk@surfsara.nl.


.. Links:

.. _`Grid WMS animation`: http://web.grid.sara.nl/mooc/animations/wms.html
.. _`Grid job status animation`: http://web.grid.sara.nl/mooc/animations/wms_with_status.html 
