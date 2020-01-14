.. _digicert:

********************
DigiCert certificate
********************

This section describes how to obtain and install a DigiCert Grid certificate. This is a prerequisite to get started on the Grid.

.. contents::
    :depth: 4

.. _obtain_digicert:

===============================
Obtain a *DigiCert* certificate
===============================

DigiCert CA allows you to get your Grid certificate *instantly* from the GEANT Trusted Certificate Service (former was the Terena portal), by using your institutional login and SURFconext.

* Open a Firefox browser in your laptop or in your :ref:`UI account <get-ui-account>`
* Access the `DigiCert portal`_
* Select your institution from the list and login with your account
* Request a so called Grid certificate. Select: **Product:** ``Grid Premium``
* In the past, you could leave the CSR empty and your browser would generate one. This no longer works. You will have to paste your own CSR. Open a terminal on your laptop or from the :abbr:`UI (User Interface)` generate the CSR with the following commands:

 .. code-block:: console
 
    $openssl genrsa -aes256 -out userkey.pem 2048
    
    Generating RSA private key, 2048 bit long modulus
    ................................................+++++
    .......................................................+++++
    e is 65537 (0x10001)
    Enter pass phrase for userkey.pem:
    Verifying - Enter pass phrase for userkey.pem:
 
 Please choose a strong pass phrase. This is the pass phrase you will be asked in some of the steps below as well as when creating grid proxies so remember it well.
 
.. code-block:: console
     
    $openssl req -new -key userkey.pem -out grid.csr
    
    Enter pass phrase for userkey.pem:         
    
    You are about to be asked to enter information that will be incorporated into your certificate request.
    What you are about to enter is what is called a Distinguished Name or a DN.
    There are quite a few fields but you can leave some blank
    For some fields there will be a default value,
    If you enter '.', the field will be left blank.
    -----
    Country Name (2 letter code) []:NL
    State or Province Name (full name) []:
    Locality Name (eg, city) []:Amsterdam
    Organization Name (eg, company) []:
    Organizational Unit Name (eg, section) []:
    Common Name (eg, fully qualified host name) []:
    Email Address []:

    Please enter the following 'extra' attributes
    to be sent with your certificate request
    A challenge password []:

Please enter your own full name as 'Common Name' and the institutional email address. The rest of the fields can be left empty. 

* The above step will create the grid.csr file. You need to copy the contents of this file in the CSR field in the Digicert portal in your browser. You can display its contents with the following command:

  .. code-block:: console

     $cat grid.csr

* After you fill in the CSR and click on *request certificate*, the certificate will be sent to you by email and it can also be dowloaded from the DigiCert portal.

.. note::  If you cannot access the `DigiCert portal`_ with your institutional account, please have a look to the section "No access to the TCS service in NL" in the `TCS document`_ or contact us at helpdesk@surfsara.nl.

.. _digicert_convert:

===============================
Change the certificate formats
===============================

Certificates can be stored in different formats. Different systems use different formats. The two important formats are:

* PEM: stores keys and certificates in separate ascii-files; this format is used by the Grid middleware and storage programs;
* PKCS12: stores keys and certificates in one binary file; this format is used by browsers.

DigiCert creates the certificates in .crt format. Below are the instructions on how to convert it into PEM and PKCS12 format.

.. _convert_crt_to_pem:

Convert crt to PEM
=====================

* Download the certificate file and unzip it. Open a terminal and go to the directory where the .crt files are available.
* The following command will convert the certificate in the PEM format

.. code-block:: console

   $cat yournamefile.crt > usercert.pem   #replace the yournamefile.crt file with your certificate file 
   
   
* Set the proper permissions to your certificate files:

.. code-block:: console

   $chmod 644 usercert.pem
   $chmod 400 userkey.pem

.. _convert_pem_to_pkcs12:

Convert PEM to pkcs12
=====================

* To convert a PEM file to the PKCS12 format, run on the UI:

.. code-block:: console

   openssl pkcs12 -export -inkey userkey.pem -in usercert.pem -out browsercert.p12

Note that you will first need to enter the password that was used when converting the grid.key file to userkey.pem. Next, you need to enter a password to protect the exported key. Enter that password again to verify. Note that you must enter a password and the password must be at least 12 characters; if the password is too short, openssl will fail without error.

.. _digicert_ui_install:

==========================================
Install a *DigiCert* certificate on the UI
==========================================

* Open a terminal and connect to the User Interface with your personal :ref:`UI account <get-ui-account>`:

.. code-block:: console

   $ssh homer@ui.grid.sara.nl # replace "homer" with your username! For LSG users, also replace the host with your local ui.

* Create a ``$HOME/.globus`` directory in your :abbr:`UI (User Interface)` account:

.. code-block:: console

   $mkdir $HOME/.globus

* If you saved the certificate files on your laptop, copy it from your local machine to your ``.globus`` directory on the :abbr:`UI (User Interface)`.

.. code-block:: console

   [homer@localmachine]$scp /PATH-TO-P12-FILE/browsercert.p12 homer@ui.grid.sara.nl:~/.globus  # replace "homer" with your username!
   [homer@localmachine]$scp /PATH-TO-P12-FILE/usercert.key homer@ui.grid.sara.nl:~/.globus  # replace "homer" with your username!
   [homer@localmachine]$scp /PATH-TO-P12-FILE/usercert.pem homer@ui.grid.sara.nl:~/.globus  # replace "homer" with your username!

The certificate and private key file should now be present in the ``.globus`` directory (notice the dot!) on the User Interface. Note that the private key file should be **read-only** and only readable to you.

* Set the proper permissions to your certificate files on the :abbr:`UI (User Interface)`:

.. code-block:: console

   $cd $HOME/.globus
   $chmod 644 usercert.pem
   $chmod 400 userkey.pem
   
* You may now delete the grid.csr and grid.key files from your laptop.

.. _digicert_browser_install:

================================================
Install a *DigiCert* certificate in your browser
================================================

In order to apply for a :ref:`VO membership <join-vo>` you will have to install your certificate in your browser. This can also be done from your laptop, but we will show instructions for the :abbr:`UI (User Interface)`.

* To import the ``.p12`` file in your browser, open a Firefox window (``$ firefox &``) on the :abbr:`UI (User Interface)` and apply the following steps (Note that you may have to copy the .p12 file to a directory accessible from your browser):
   * From the Firefox Menu bar select:
    * For Firefox versions older than v57.0: ``Edit > Preferences > Advanced > View Certificates > Import``
    * For Firefox versions higher than v57.0: ``Firefox > Preferences > Privacy & Security > scroll to the bottom "Security" section > View Certificates > Import``
   * Select the ``browsercert.p12`` file from the :abbr:`UI (User Interface)` local directory
   * Give the password you set in the previous step.
   * You should now see the certificate listed. Close the window.

.. sidebar:: Problems installing the certificate?

		.. seealso:: Need more details for installing your certificate on the :abbr:`UI (User Interface)` or browser? Check out our mooc video :ref:`mooc-ui`.

* Verify that your certificate is valid and properly installed in your browser by accessing this website from the browser that you have your certificate installed:

	https://voms.grid.sara.nl:8443/vomses/

If you receive an SSL authentication error, then try repeating the steps carefully as they come. If you managed to access the page above, your certificate is successfully installed!

.. topic:: See also:

    :ref:`key-match`

    :ref:`expiry-date`

    :ref:`cert-subject`


.. Links:

.. _`TCS document`: https://ca.dutchgrid.nl/tcs/TCS2015help.pdf
.. _`DigiCert portal`: https://digicert.com/sso
