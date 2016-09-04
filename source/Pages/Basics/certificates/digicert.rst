.. _digicert:

********************
DigiCert certificate
********************

This section describes how to obtain and install a DigiCert Grid certificate. This is a prerequisite to get started on the Grid.

.. note::  If you need help to obtain your DigiCert certificate, please have a look to this `User Guide`_  or contact us at helpdesk@surfsara.nl.  

Obtain a *DigiCert* certificate
===============================

DigiCert CA allows you to get your Grid certificate *instantly* from the GEANT Trusted Certificate Service (former was the Terena portal), by using your institutional login and SURFconext. 

* Open a Firefox browser in your :ref:`UI account <get-ui-account>`. To do so, open a terminal and first connect to the UI with the following command
 
   .. code-block:: console
 
      $ssh -X homer@ui.grid.sara.nl # replace "homer" with your username! 
      $firefox &

* Access the `DigiCert portal`_
* Select your institution from the list and login with your account
* Request a so called Grid certificate. Select: **Product:** ``Grid Premium``
* If everything went well, after a while you should see this window:

.. image:: /Images/digicert_install_cert.png
	:align: center

Once finished, you will have a Grid certificate automatically stored in your browser.


.. _digicert_ui_install:

Install a *DigiCert* certificate on the UI
==========================================
Certificates can be stored in different formats for different systems. The two important formats are:

    *PEM: stores keys and certificates in separate ascii-files; this format is used by the Grid middleware and storage programs;
    
    *PKCS12: stores keys and certificates in one binary file; this format is used by browsers.
    
DigiCert creates PKCS12 files. In order to install the *DigiCert* certificate on the :abbr:`UI (User Interface)` (which the Grid middleware can identify), you need to export it first from your browser, store it locally and convert it to .pem format. This section shows you how to do this.

Export certificate from browser
===============================

You can export the certificate from the browser that you stored your certificate in the previous step:

* Open the Firefox browser where the certificate is stored. This is the browser you used to access the `DigiCert portal`_
* Select: ``Preferences -> Advanced (left pane) -> Certificates (tab) -> View Certificates (button)``
* Select the certificate (.p12 file) that you stored in the previous step
* Press ``Backup``
* Give it a name, e.g. ``browsercert`` and select the location to store it
* Give a safe password and press ``Ok``
  
The file ``browsercert.p12`` is now stored locally. 

Store the certificate on the UI
==============================

* Create a ``$HOME/.globus`` directory in your :abbr:`UI (User Interface)` account:

  .. code-block:: console

     $mkdir $HOME/.globus
     $cp browsercert.p12 $HOME/.globus

Convert pkcs12 to PEM
=====================
    
* For this you need *two* commands; a) one to extract the key, and b) one to extract your certificate.

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

Store the certificate on your laptop
====================================
The certificate can also be locally stored on your laptop. Open a new terminal on the laptop and give the following command:

.. code-block:: console

     [homer@localmachine]$mkdir $HOME/.globus
     [homer@localmachine]$scp homer@ui.grid.sara.nl:~/.globus/browsercert.p12  $HOME/.globus  # replace "homer" with your username!
     
Repeat the same steps from "Convert pkcs12 to PEM" you performed on the User Interface on the laptop. Note that you should use the same password as the one used to protect the key on the UI.

Install the DutchGrid certificate
======================
In order to apply for a :ref:`VO membership <join-vo>` you should have installed your UI certificate in your browser. If everything worked gracefully when you :ref:`obtained the DigiCert certificate <digicert>` then your certificate was *automatically* stored in your browser.

To access the VO membership website with a secured connection, you may install the DutchGrid CA trust anchor in your browser. For this, you need to visit the website `Dutchgrid cert`_ and click on the "Install the DutchGrid CA" (the link present on the right side of the webpage under "Trust this site ..."). A window will pop up where you should select “Trust this CA to identify websites” in the window click OK as shown in the image below:

.. image:: /Images/dutch-grid-cert
	:align: center
	
Refresh the browser (or open a new one).

* Verify that your certificate is valid and properly installed in your browser by accessing this website from the browser that you have your certificate installed: 

	https://voms.grid.sara.nl:8443/vomses/

If you receive an SSL authentication error, then try repeating the steps carefully as they come. If you managed to access the page above, your certificate is successfully installed! You may now proceed to apply for a VO membership.

	
.. topic:: See also:
	
    :ref:`key-match`	

    :ref:`expiry-date` 	

    :ref:`cert-subject`


.. Links:

.. _`User Guide`: https://ca.dutchgrid.nl/tcs/TCS2015help.pdf
.. _`DigiCert portal`: https://digicert.com/sso
.. _`Dutchgrid cert`: https://ca.dutchgrid.nl/
 

