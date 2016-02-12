.. _digicert:

********************
Digicert certificate
********************

This section describes how to obtain and install a Digicert Grid certificate. This is a prerequisite to get started on the Grid:

.. contents:: 
    :depth: 4
    
===============================
Obtain a *Digicert* certificate
===============================

DigiCert CA allows you to get your Grid certificate *instantly* from the GEANT Trusted Certificate Service (former was the Terena portal), by using your institutional login and SURFconext. 

* Open a Firefox browser in your laptop or in your :ref:`UI account <get-ui-account>` 
* Access the `DigiCert portal`_
* Select your institution from the list and login with your account
* Request a so called a Grid certificate. Select: **Product:** ``Grid Premium``
* If everything went well, after a while you should see this window:

.. image:: /Images/digicert_install_cert.png
	:align: center

.. note::  If you need help to obtain your Digicert certificate, please have a look to this `User Guide`_  or contact us at helpdesk@surfsara.nl.  
	
Once finished, you will have a Grid certificate automatically stored in your browser.
	

.. _digicert_ui_install:

==========================================
Install a *Digicert* certificate on the UI
==========================================

In order to install the *Digicert* certificate on the UI, you need to export it first from your browser, copy it to your :ref:`UI account <get-ui-account>` and convert it to .pem format. This section shows you how to do this.

Export certificate from browser
===============================

You can export the certificate from the browser that you stored your certificate in the previous step:

* Open the Firefox browser where the certificate is stored. This is the browser you used to access the `DigiCert portal`_
* Select: ``Preferences -> Advanced (left pane) -> Certificates (tab) -> View Certificates (button)``
* Select the certificate (.p12 file) that you stored in the previous step
* Press ``Backup``
* Give it a name, e.g. ``browsercert`` and select the location to store it
* Give a safe password and press ``Ok``
  
The file ``browsercert.p12`` is now stored locally. Next, we will store it on the UI.

Copy certificate *.p12* file to the UI
======================================

* Open a terminal and connect to the UI machine with your personal :ref:`UI account <get-ui-account>`:

.. code-block:: bash

	ssh homer@ui.grid.sara.nl # replace "homer" with your username!
 
* Create a ``$HOME/.globus`` directory in your UI account:


.. code-block:: bash

 	mkdir $HOME/.globus
 
* If you exported the certificate to your laptop, copy it from your local machine to your ``.globus`` ui directory. If you exported your certificate from the UI browser, you can skip this step: 
 
.. code-block:: bash

    laptop$ scp /PATH-TO-P12-FILE/browsercert.p12 homer@ui.grid.sara.nl:~/.globus  # replace "homer" with your username!


Convert pkcs12 to PEM
=====================
    
* Convert the ``.p12`` file to the PEM format. For this you need *two* commands; a) one to extract the key, and b) one to extract your certificate.

a) Extract your key, run on the UI:

.. code-block:: bash

    cd $HOME/.globus   
    openssl pkcs12 -in browsercert.p12 -out userkey.pem -nocerts

Note that you will first need to enter the password that was used to *create* the browsercert.p12 file. Next, you need to enter a password to protect the exported key. Enter that password again to verify. Note that you must enter a password and the password must be at least 12 characters; if the password is too short, ``openssl`` will fail without error. Using the same password as for the p12 file is fine. 

b) Extract your certificate, run on the UI:

.. code-block:: bash

    cd $HOME/.globus 
    openssl pkcs12 -in browsercert.p12 -out usercert.pem -nokeys -clcerts


* Set the proper permissions to your certificate files:

.. code-block:: bash

	chmod 644 usercert.pem
	chmod 400 userkey.pem
	
The certificate and private key file should now be present in the .globus directory (notice the dot!) on the User Interface machine. Note that the private key file should be **read-only** and only readable to you. 

* Verify key permissions:

.. code-block:: bash

	cd $HOME/.globus
	ls -l
	
	# -rw-r--r--      1 homer    homer            4499  May 10 13:47  usercert.pem
 	# -r--------      1 homer    homer             963  May 10 13:43  userkey.pem


.. _digicert_browser_install:

================================================
Install a *Digicert* certificate in your browser
================================================
In order to apply for a :ref:`VO membership <join-vo>` you will have to install your certificate in your browser. If everything worked gracefully when you :ref:`obtained the Digicert certificate <digicert>` then your certificate was *automatically* stored in your browser.

* Verify that your certificate is valid and properly installed in your browser by accessing this website from the browser that you have your certificate installed: 

	https://voms.grid.sara.nl:8443/vomses/

If you receive an SSL authentication error, then try repeating the steps carefully as they come. If you managed to access the page above, your certificate is successfully installed!
	
.. topic:: See also:
	
    :ref:`key-match`	

    :ref:`expiry-date` 	

    :ref:`cert-subject`


..

..

..

.. Links:

.. _`User Guide`: https://ca.dutchgrid.nl/tcs/TCS2015help.pdf
.. _`DigiCert portal`: https://digicert.com/sso
