.. _digicert:

********************
DigiCert certificate
********************

This section describes how to obtain a DigiCert Grid certificate. This is a prerequisite to get started on the Grid.

.. contents:: 
    :depth: 4


===============================
Obtain a *DigiCert* certificate
===============================


Requesting a certificate
========================

DigiCert CA allows you to get your Grid certificate *instantly* from the GEANT Trusted Certificate Service (former was the Terena portal), by using your institutional login and SURFconext. 

* Open a Firefox browser in your laptop or in your :ref:`UI account <get-ui-account>`
* Access the `DigiCert portal`_
* Select your institution from the list and login with your account
* Request a so called Grid certificate. Select: **Product:** ``Grid Premium``
* In the past, you could leave the CSR empty and your browser would generate one. This no longer works. You will have to paste your own CSR. This page will be updated soon to include instructions how to do that.
* If everything went well, after a while you should see this window:

.. image:: /Images/digicert_install_cert.png
 :align: center

.. note::  If you cannot access the `DigiCert portal`_ with your institutional account, please have a look to the section "No access to the TCS service in NL" in the `TCS document`_ or contact us at helpdesk@surfsara.nl.  


Converting your certificate
===========================

Once finished, you will receive an e-mail from DigiCert with an attached a .zip file that contains a .crt file

Certificates can be stored in different formats. Different systems use different formats. The two important formats are:
 
* PEM: stores keys and certificates in separate ascii-files; this format is used by the Grid middleware and storage programs;
* PKCS12: stores keys and certificates in one binary file; this format is used by browsers.

Begin converting the certificate to a more usable format on your PC

* In terminal start by generating a private key

    .. code-block:: console

     $ openssl genrsa -out grid.key 2048 
      

* Create a CSR:

    .. code-block:: console

     $ openssl req -new -key grid.key -out grid.csr  
 


* Take the downloaded zip file, extract it and copy the .crt to the directory holding the private key file.


* Combine the key and certificate:

    .. code-block:: console

     $ cat grid.key grid.crt > grid.pem

* Generate the .p12

    .. code-block:: console

     $ openssl pkcs12 -export -in grid.pem -out grid.p12

The resulting .p12 file will be used to authenticate you on the UI and in your browser.

.. _digicert_ui_install:

==========================================
Install a *DigiCert* certificate
==========================================


On your browser
===============

In order to apply for a VO membership you will have to install your certificate in your browser.

-------
Firefox
-------

* Open firefox and select the menu in the top right corner
* Select Preferences or Options
* Select the Privacy and Security tab
* Scroll to the bottom of the page and select 'View Certificates'
* Within the certificate manager select import
* Choose the .p12 file you created earlier to import the certificate into your browser
* Verify that your by accessing the `VOMS portal`_

If you receive an SSL authentication error, then try repeating the steps above. If you managed to access the page above, your certificate is successfully installed!


On the UI
==========


--------------------------------------
Copy certificate *.p12* file to the UI
--------------------------------------

* Open a terminal and connect to the User Interface with your personal :ref:`UI account <get-ui-account>`:

    .. code-block:: console

     $ssh homer@ui.grid.sara.nl # replace "homer" with your username! For LSG users, also replace the host with your local ui.   

* Create a ``$HOME/.globus`` directory in your :abbr:`UI (User Interface)` account:

    .. code-block:: console

     $mkdir $HOME/.globus

* If you exported the certificate to your laptop, copy it from your local machine to your ``.globus`` directory on the :abbr:`UI (User Interface)`. If you exported your certificate from the :abbr:`UI (User Interface)` browser, you can skip this step: 

    .. code-block:: console

     [homer@localmachine]$scp /PATH-TO-P12-FILE/browsercert.p12 homer@ui.grid.sara.nl:~/.globus  # replace "homer" with your username!

.. _convert-pkcs12-to-pem:

---------------------
Convert pkcs12 to PEM
---------------------
    
* Convert the ``.p12`` file to the PEM format. For this you need *two* commands; a) one to extract the key, and b) one to extract your certificate.

a) Extract your key, run on the :abbr:`UI (User Interface)`:

     .. code-block:: console

      $cd $HOME/.globus   
      $openssl pkcs12 -in browsercert.p12 -out userkey.pem -nocerts

Note that you will first need to enter the password that was used to *create* the ``browsercert.p12`` file. Next, you need to enter a password to protect the exported key. Enter that password again to verify. Note that you must enter a password and the password must be at least 12 characters; if the password is too short, ``openssl`` will fail without error. Using the same password as for the p12 file is fine.

b) Extract your certificate, run on the :abbr:`UI (User Interface)`:

     .. code-block:: console

      $cd $HOME/.globus 
      $openssl pkcs12 -in browsercert.p12 -out usercert.pem -nokeys -clcerts


* Set the proper permissions to your certificate files:

    .. code-block:: console

     $chmod 644 usercert.pem
     $chmod 400 userkey.pem
	
The certificate and private key file should now be present in the ``.globus`` directory (notice the dot!) on the User Interface. Note that the private key file should be **read-only** and only readable to you.

* Verify key permissions:

    .. code-block:: console

     $cd $HOME/.globus
     $ls -l

     -rw-r--r--      1 homer    homer     4499  May 10 13:47  usercert.pem
     -r--------      1 homer    homer      963  May 10 13:43  userkey.pem


.. _digicert_browser_install:

.. topic:: See also:
	
    :ref:`key-match`	

    :ref:`expiry-date` 	

    :ref:`cert-subject`


.. Links:

.. _`TCS document`: https://ca.dutchgrid.nl/tcs/TCS2015help.pdf
.. _`DigiCert portal`: https://digicert.com/sso
.. _`VOMS portal`: https://voms.grid.sara.nl:8443/vomses/
