
.. _dutchgrid:

*********************
DutchGrid certificate
*********************

This section describes how to obtain and install a DutchGrid Grid certificate. This is a prerequisite to get started on the Grid:

.. contents:: 
    :depth: 4


.. _obtain-dutchgrid:

==============================	
Obtain a DutchGrid certificate
==============================

In case that your institute does not support SURFconext and is not possible to get a :ref:`digicert`, then you can apply for a ``DutchGrid CA`` certificate. You can request a DutchGrid certificate by launching the `JGridstart`_ tool.

Request a DutchGrid certificate
===============================

* Log in to your :ref:`UI account <get-ui-account>` with X forward enabled, e.g.: 

  .. code-block:: console

     $ssh -X homer@ui.grid.sara.nl   # replace "homer" with your username!

* Download the the ``jGridstart`` tool:

  .. code-block:: console

     $wget https://ca.dutchgrid.nl/start/jgridstart-wrapper-1.18.jar

* Run the wizard:

  .. code-block:: console

     $java -jar jgridstart-wrapper-1.18.jar

* Follow the wizard instructions. You will typically go through these steps:

  * Start the Wizard by pressing ``Request new ..`` button
  * Generate request by entering your details (name, surname, email, organisation). At this stage you will provide the password for your Grid certificate - make sure you keep this safe!
  * Submit request. This will create your private ``userkey.pem`` file in your ``~/.globus`` directory.
  * Fill in and print the verification form by pressing the ``display form`` button. Once you fill in the form, save it locally.
  * Close the wizard   
  
* Check your details in the printed form and contact your institution's ``Registration Authority`` (RA) in person. The RA person will check your identity (id or passport or driving license) and sign the printed form.

* Once your form is signed by the :abbr:`RA (Registration Authority)`, send a scanned copy to the DutchGrid CA via email or fax. The contact details can be found in the printed form, but you can contact also helpdesk@surfsara.nl if you are in doubt.  

* The DutchGrid :abbr:`CA (Certificate Authority)` will finally send your certificate via email within ~a week. Once you have a received your certificate you will need to install it both on your :ref:`UI account <get-ui-account>` and your browser (UI or laptop). We'll see this next.

.. note::  If you need help to obtain your DutchGrid certificate, please read the `JGridstart guide`_  or contact us at helpdesk@surfsara.nl. 


.. _retrieve-dutchgrid:
  
Retrieve your DutchGrid certificate
===================================

Once your request is approved, you will receive an email titled *"DutchGrid CA certificate ..."*. Now you need to retrieve the new certificate:

* Log in to your :ref:`UI account <get-ui-account>` with X forwarding enabled, e.g.: 

  .. code-block:: console

     $ssh -X homer@ui.grid.sara.nl # replace "homer" with your username!   


* Run the wizard again: 

  .. code-block:: console

     $java -jar jgridstart-wrapper-1.16.jar

Then a window pops up similar to the following:

.. image:: /Images/dutchgrid_retrieve_cert.png
	:align: center

* Click on **retrieve your certificate**. This will automatically create a file ``usercert.pem`` in your ``~/.globus`` directory (check with ``$ ls ~/.globus``).

* You may skip the step “install in browser” because the X session on the :abbr:`UI (User Interface)` is slow and will probably be interrupted. Just click "Next"

* Close the wizard.

If everything went well, your certificate and key files (``usercert.pem`` and ``userkey.pem``) should be in the ``~/.globus`` directory. 


.. _dutchgrid_ui_install:

=========================================
Install a DutchGrid certificate on the UI
=========================================

If you followed the steps above properly, then your DutchGrid certificate and private key file should now be present in the ``~/.globus`` directory (notice the dot!) on the User Interface machine. All you need to do is to set the proper permissions.

* Log in to your :ref:`UI account <get-ui-account>`: 

  .. code-block:: console

     $ssh homer@ui.grid.sara.nl   # replace "homer" with your username!  

* Set the proper permissions to your certificate files:

  .. code-block:: console

     $cd $HOME/.globus
     $chmod 644 usercert.pem
     $chmod 400 userkey.pem

Note that the private key file should be **read-only** and only readable to you. 

* Verify the correct permissions:

  .. code-block:: console

     $ cd $HOME/.globus
     $ ls -l
     -rw-r--r--      1 homer    homer            4499  May 10 13:47  usercert.pem
     -r--------      1 homer    homer             963  May 10 13:43  userkey.pem
 	

.. _dutchgrid_browser_install:

===============================================
Install a DutchGrid certificate in your browser
===============================================

In order to apply for a :ref:`VO membership <join-vo>` you will have to install your certificate in your browser. Note that you can do this from any browser, however for convenience we will describe the procedure using the :abbr:`UI (User Interface)` browser.

* Log in to your :ref:`UI account <get-ui-account>`: 

  .. code-block:: console

     $ssh -X homer@ui.grid.sara.nl # replace "homer" with your username!  
     $cd $HOME/.globus

.. warning:: You can import a certificate in your browser only when it is in the **PKCS12** format. This means that you need to convert the ``usercert.pem`` and ``userkey.pem`` files to a single  ``.p12`` file. 	


Convert PEM to pkcs12
=====================

* To convert a PEM file to the PKCS12 format, run on the :abbr:`UI (User Interface)`:

  .. code-block:: console

     $openssl pkcs12 -export -inkey userkey.pem -in usercert.pem -out browsercert.p12

This will ask you for a password three times: the first is to unlock your private key stored in the file ``userkey.pem``. The PKCS12-file will be password protected, which needs a new password, and the same password for confirmation. Note that your can use the same password as the password for the private key file, but this is not necessary.


Import the certificate to the browser
=====================================

* To import the ``.p12`` file in your browser, open a Firefox window (``$ firefox &``) on the :abbr:`UI (User Interface)` and apply the following steps (Note that you may have to copy the .p12 file to a directory accessible from your browser):

  * From the Firefox Menu bar select: ``Edit > Preferences > Encryption > View Certificates > Import``
  * Select the ``browsercert.p12`` file from the :abbr:`UI (User Interface)` local directory
  * Give the password you set in the previous step.
  * You should now see the certificate listed. Close the window.
	
.. sidebar:: Problems installing the certificate?

		.. seealso:: Need more details for installing your certificate on the :abbr:`UI (User Interface)` or browser? Check out our mooc video :ref:`mooc-ui`.

* Verify that your certificate is valid and properly installed in your browser by accessing this website: 

	https://voms.grid.sara.nl:8443/vomses/

If you receive an SSL authentication error, then try repeating the steps carefully as they come. If you managed to access the page above, your certificate is successfully installed!
	
.. topic:: See also:
	
    :ref:`key-match`	

    :ref:`expiry-date` 	

    :ref:`cert-subject`


.. Links:

.. _`JGridstart`: http://ca.dutchgrid.nl
.. _`JGridstart guide`: http://wiki.nikhef.nl/grid/JGridstart/Help/Request_new_certificate


