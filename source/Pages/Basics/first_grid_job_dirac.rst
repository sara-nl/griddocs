.. _first-dirac-grid-job:

*************************
First Grid job with Dirac
*************************

Our Grid facility is powered by the `DIRAC`_ service. DIRAC provides the workload management system to submit and manage
user jobs on the Grid. We provide support for the command line tools of DIRAC and access to the DIRAC clients on our Grid :abbr:`UI (User Interface)`.

This section summarises all the steps to submit your first job on the Grid, check its status and retrieve the output:

.. contents::
    :depth: 4

.. warning:: You can continue with this guide *only after* you have completed the :ref:`preparations <preparation>` for Grid. At this point your certificate should be installed on the UI and your VO membership should be approved and registered to the Dirac user group. Still need help with any of these steps? We can help! Contact us at helpdesk@surfsara.nl.

Once you finish with the :ref:`first-dirac-grid-job`, you can continue with more :ref:`advanced topics <advanced>` and also :ref:`best-practices`, the section that contains guidelines for porting real complex simulations on the Grid.


.. _job-lifecycle:

==================
Grid job lifecycle
==================

.. sidebar:: Dirac

                .. seealso:: You can find more general details about various functionalities possible with Dirac in their `project documentation`_

To run your application on the Grid you need to describe its requirements in a specific language called **job description language** (JDL). This is similar to the information that we need to specify when we run jobs using a local batch scheduling system (e.g., with PBS, SLURM), although it is slightly more complex as we are now scheduling jobs across multiple sites.

Except for the application requirements, you also need to specify in the :abbr:`JDL (Job Description Language)` the content of the *input/output sandboxes*. These sandboxes allow you to transfer data to or from the Grid. The input sandbox contains all the files that you want to send with your job to the worker node, like e.g. a script that you want executed. The output sandbox contains all the files that you want to have transferred back to the :abbr:`UI (User Interface)`.

.. note:: The amount of data that you can transfer using the sandboxes is very limited, in the order of a few megabytes (less than **100MB**). This means that you should normally limit the input sandbox to a few script files and the output sandbox to the stderr and stdout files.

Once you have the :abbr:`JDL (Job Description Language)` file ready, you can submit it to multiple clusters with ``dirac-*`` commands. Dirac will schedule your job on a Grid worker node. The purpose of Dirac is to distribute and manage tasks across computing resources. More specifically, Dirac will accept your job, assign it to the most appropriate Computing Element (CE), record the job status and retrieve the output.

.. _dirac_proxy:

================
Dirac proxy creation
================

Before submitting your first Grid job, you need to create a *proxy* from your certificate. This has a short lifetime and prevents you from passing along your personal certificate to the Grid. The job will keep a copy of your proxy and pass it along to the Worker Node.

This section will show you how to create a valid proxy:

* Log in to your :abbr:`UI (User Interface)` account:

  .. code-block:: console

     $ssh homer@ui.grid.surfsara.nl # replace "homer" with your username

* To enable the software environment to use Dirac tools, please run the following command:

  .. code-block:: console

     $source /etc/diracosrc

Please note that you need to run this command every time you login to the :abbr:`UI (User Interface)`. You may also add this command in your configuration file ($HOME/.bashrc).


* Create a proxy with the following command and provide your Grid certificate password when prompted:

  .. code-block:: console

     $dirac-proxy-init -b 2048 -g lsgrid_user -M --valid 168:00

Each VO (e.g., lsgrid in the above example) is mapped to a group in Dirac (lsgrid_user in this case) and may have a different name than the VO itself. Please contact helpdesk@surfsara.nl if you are unsure of the group name to use. The above command creates a local proxy with a validity of maximum 7 days.

  You should see a similar output displayed in your terminal:

  .. code-block:: console


	 Generating proxy...
     Enter Certificate password:
     Added VOMS attribute /lsgrid
     Uploading proxy..
     Proxy generated:
     subject      : /DC=org/DC=terena/DC=tcs/C=NL/O=SURF B.V./CN=homer homer@example.com/...
     issuer       : /DC=org/DC=terena/DC=tcs/C=NL/O=SURF B.V./CN=homer homer@example.com/...
     identity     : /DC=org/DC=terena/DC=tcs/C=NL/O=SURF B.V./CN=homer homer@example.com
     timeleft     : 167:53:58
     DIRAC group  : lsgrid_user
     path         : /tmp/x509up_uxxxx
     username     : homer
     properties   : NormalUser
     VOMS         : True
     VOMS fqan    : [u'/lsgrid']

     Proxies uploaded:
     DN                                                                                   | Group | Until (GMT)
     /DC=org/DC=terena/DC=tcs/C=NL/O=SURF B.V./CN=homer homer@surf.nl |  | 2022/07/31 23:54


.. note:: What does the dirac-proxy-init command actually do?

	* It generates a *local proxy* ``x509up_uXXX`` in the :abbr:`UI (User Interface)` ``/tmp/`` directory
	* It uploads this proxy to Dirac proxy server

And now you are ready to submit jobs to the Grid! Or copy data from and to the Grid.


.. _jdl:

===============================
Describe your job in a JDL file
===============================

To submit a Grid job you must describe this in a plain text file, called :abbr:`JDL (Job Description Language)`. The JDL file will pass the details of your job to Dirac.

.. warning:: Make sure you have started your session and created already a :ref:`valid proxy <dirac_proxy>`.

* Log in to your User Interface.
* Create a file with the following content describing the job requirements. Save it as ``simple.jdl``:

  .. code-block:: cfg
	:linenos:

	[
 	 Type = "Job";
         JobName = "my_first_job";
         Type = "Job";
         Executable = "/bin/sh";
         Arguments = "jobscript.sh";
         StdOutput = "simple.out";
         StdError = "simple.err";
         InputSandbox = {"jobscript.sh"};
         OutputSandbox = {"simple.out","simple.err"};
        ]


This job involves no large input or output files. It will copy the ``jobscript.sh`` on the Worker Node that the job will land on and execute it. The Standard output and Standard error will be directed to the files ``simple.out`` and ``simple.err``, respectively, and retrieved when the Job Output is retrieved.

.. _job-submit:

==========================
Submit the job to the Grid
==========================

To submit your first Grid job and get an understanding of the job lifecycle, we will perform these steps:

* :ref:`Job submission <job-submit>`
* :ref:`Status tracking <job-status>`
* :ref:`Output retrieval <job-output>`

You should have your ``simple.jdl`` file ready in your :abbr:`UI (User Interface)` up to this point. When you submit this simple Grid job to the Dirac, a job will be created and sent to a remote Worker Node. There it will execute the script ``jobscript.sh`` and write its standard output and its standard error in the ``simple.out`` and ``simple.err`` respectively.

* Submit the simple job by typing in your :abbr:`UI (User Interface)` terminal this command:

  .. code-block:: console

     $dirac-wms-job-submit simple.jdl -f jobid
     JobID = 314


The option ``-f`` allows you to specify a file (in this case ``jobid``) to store the unique job identifier. Omitting the ``-f`` option means that the jobID is not saved in a file. When you do not save this id you will effectively loose the output of your job!

.. _job-status:

====================
Track the job status
====================

To check the current job status from the command line, apply the following command that queries Dirac for the status of the job.

* After submitting the job, type:

  .. code-block:: console

     $dirac-wms-job-status 314

* Alternatively, if you have saved your jobIds into a file you can use the ``-f`` option and the filename as argument:

  .. code-block:: console

     $dirac-wms-job-status -f jobid

.. * Finally, a third (optional) way to check the job status is with the web browser. The browser you use must have your grid certificate installed. In this browser open the link:

..	https://nl-dirac01.grid.surfsara.nl/DIRAC/

.. You can find the status of your job by clicking on the Job Monitor (in Applications). Note that the URL can only be accessed by you as you are authenticated to  the server with the certificate installed in this browser. If your certificate is not installed in this browser, you will get an authentication error.


.. _job-cancel:

Cancel job
==========

* If you realise that you need to cancel a submitted job, use the following command:

  .. code-block:: console

     $dirac-wms-job-delete 314

* Alternatively, if you have saved your jobIds into a file you can use the ``-f`` option and the filename as argument:

  .. code-block:: console

     $dirac-wms-job-delete -f jobid

.. _job-output:

===================
Retrieve the output
===================

The output consists of the files included in the ``OutputSandbox`` statement. You can
retrieve the job output once it is successfully completed, in other words the
job status has changed from ``Running`` to ``Done``. The files in the
output sandbox can be downloaded for approximately one week after the job finishes.

.. note::
        You can choose the output directory with the ``-D`` option. If you do not use this option then the output will be copied under the :abbr:`UI (User Interface)` in the current working directory with a name based on the ID of the job.

* To get the output, type:

  .. code-block:: console

     $dirac-wms-job-get-output 314

* Alternatively, you can use the jobid file:

  .. code-block:: console

     $dirac-wms-job-get-output -f jobid

where you should substitute ``jobid`` with the file that you used to store the
job ids. Please bear in mind the size of your home directory on the :abbr:`UI (User Interface)` when downloading large output files. When dealing with large input and/or output files it is recommended to download the input data directly to the worker node, and upload the output data to a suitable storage space within the job itself. Please check out the :ref:`grid_storage` section for details on various clients supported on the worker nodes and best practices.


Check job output
================

* To check your job output, browse into the downloaded output directory. This includes the ``simple.out``, ``simple.err`` files specified in the ``OutputSandbox`` statement:

  .. code-block:: console

	$ls -l /home/homer/314

	-rw-rw-r-- 1 homer homer  0 Jan  5 18:06 simple.err
	-rw-rw-r-- 1 homer homer 20 Jan  5 18:06 simple.out

	$cat /home/homer/314/simple.out

==================
Recap & Next Steps
==================

Congratulations! You have just executed your first job to the Grid!

Let's summarise what we've seen so far.

You interact with the Grid via the :abbr:`UI (User Interface)` machine ``ui.grid.surfsara.nl``. You describe each job in a JDL (Job Description Language) file where you list which program should be executed and what are the worker node requirements. From the :abbr:`UI (User Interface)`, you create first a proxy of your Grid certificate and submit your job with ``dirac-*`` commands. The resource broker Dirac accepts your jobs, assigns them to the most appropriate CE (Computing Element), records the jobs statuses and retrieves the output.

.. seealso:: Try now to port your own application to the Grid. Check out the :ref:`best-practices` section and run the example that suits your use case. The section :ref:`advanced` will help your understanding for several Grid modules used in the :ref:`best-practices`.

	Done with the :ref:`basics`, but not sure how to proceed? We can help! Contact us at helpdesk@surfsara.nl.


.. Links:

.. _`project documentation`: https://dirac.readthedocs.io/en/latest/index.html
.. _`DIRAC`: http://diracgrid.org/
