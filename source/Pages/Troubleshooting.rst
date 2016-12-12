.. _Troubleshooting:

***************
Troubleshooting
***************

.. contents:: 
    :depth: 4  

.. _general-troubleshooting-steps:

General troubleshooting steps
=============================

*Don't hesitate to contact us when things go wrong!* We're happy to help you overcome the difficulties that every Grid user faces.

In order to assist you better, we have a few troubleshooting steps that may already get you going and otherwise may help us to help you.

* Check the output of ``voms-proxy-info -all``. Is your proxy still valid? Does it have the correct attributes for the work you're doing?
* Try running your command with higher debugging level or verbosity.

  .. code-block:: console

     $glite-wms-job-submit --debug ...
     $srmcp -debug ...
     $gfal-copy --verbose ...
     $globus-url-copy -debugftp -verbose-perf -verbose ...
     $curl --verbose ...
  
* Is the resource you're using in :ref:`downtime <notifications>`?

* Can you connect to the service?

  .. code-block:: console

     ## A basic firewall check: can you connect to the port?
     $telnet srm.grid.sara.nl 8443

     ## Testing the SSL layer of a connection to the dCache SRM door
     $echo 'QUIT' | openssl s_client -connect srm.grid.sara.nl:8443 \
                         -CApath /etc/grid-security/certificates
     ## One of the last lines should be: 'Verify return code: 0 (ok)'

     ## Testing a gridFTP door, control channel
     $telnet rabbit1.grid.sara.nl 2811

     ## GridFTP data channels are more difficult to test, because the port opens only after a transfer is initiated.
     ## But after we start an iperf service, you can try to telnet to it.
     $telnet rabbit1.grid.sara.nl 24000
     
     ## Or just test with iperf:
     $iperf3 -c rabbit1.grid.sara.nl -p 24000
     $iperf3 -c rabbit1.grid.sara.nl -p 24000 --reverse
     ## Keep in mind that we have to start iperf first!


.. _get-log:

How can I get more logging info for my job?
===========================================

To find out more info about the status of your job, use:
 
.. code-block:: console

   $glite-wms-job-logging-info -v 2 https://wms2.grid.sara.nl:9000/PHyeyedC1EYBjP9l_Xq9mQ # replace with your job URL
	
And if you use a file to store your jobs, run:

.. code-block:: console

   $glite-wms-job-logging-info -v 2 -i jobIds # replace jobIds with your file


.. _stalling-transfers:

File transfers are stuck
========================

Occasionally, transfers are stuck when 0 bytes have been transferred. There are some common causes for stalled transfers.

* A firewall blocks the ports for the data channel. If you use ``srmcp``, specify ``--server_mode=passive``. If that doesn't help, check whether your firewall allows outgoing traffic to ports 20000 to 25000 (GridFTP data channel range).

* You've reached the maximum number of transfers for the storage pools that have been allocated to you. All transfers beyond the maximum will be queued, until previous transfers finish to make 'transfer slots' available, or until they time out. Besides the failing transfers, there is another downside: some of your jobs might be wasting CPU time while they wait for input files. This is not efficient. It's better to reduce the number of concurrent transfers so that you don't reach the maximum, or ask us whether the maximum can be increased.

  You can see whether this happens at `these graphs <http://web.grid.sara.nl/dcache.php?r=hour#transfers>`_. A red color ('Movers queued') means that there are stalling transfers.

* You're transferring files from/to outside SURFsara, and your endpoint support a MTU (network packet) size of 9000, but the network path doesn't. Control traffic passes through because it consists of small packets. But data traffic consists of large packets and these are blocked. The image below illustrates this:

  .. image:: /Images/Black_hole_connection.png

  .. comment: Image source is at https://www.websequencediagrams.com/?lz=dGl0bGUgQmxhY2sgaG9sZSBjb25uZWN0aW9uCgpwYXJ0aWNpcGFudCBjbGllbnQABg1yb3V0ZXIxAAETMgAuDXNlcnZlcgoKAD0GIC0-AAsHOiBzbWFsbCByZXF1ZXN0IHBhY2tldAoAKQYgLT4AbQcAHQpwbHkAHQgAQgsAbAc6IGxhcmdlIGRhdGEAQwhub3RlIG92ZXIAGwp0b28AIwYKAIEkBwA5CjE6IElDTVAgZXJyb3IgdG8AgWwIADYQMTogYmxvY2tpbmcALAUK&s=roundgreen

  Some tools to test this:

  .. code-block:: bash

     # Run this from your endpoint of the transfer; adjust the value to find the limit.
     # Check first whether your system supports a MTU of 9000.
     ping -M do -s 8972 gridftp.grid.sara.nl
     
     # This command tells you what the supported MTU value is.
     tracepath gridftp.grid.sara.nl

  Another good tool for testing the network is ``iperf``. We'll start an ``iperf`` server at your request so that you can test against it.
  
  .. code-block:: bash
  
     # Using iperf3 to test upload speed
     iperf3 -c rabbit1.grid.sara.nl --port 24000 --parallel 4

     # Same but for download speed
     iperf3 -c rabbit1.grid.sara.nl --port 24000 --parallel 4 --reverse

     # Using the older iperf to test upload and download speed simultaneously, with 4 streams
     iperf -c rabbit1.grid.sara.nl --port 24001 --parallel 4 --dualtest

  A fix for Linux servers is to enable ``tcp_mtu_probing`` in ``sysctl.conf``. This enables the Linux kernel to select the best MTU value for a certain network route.
