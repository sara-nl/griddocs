
.. _grid-certificates:

*****************
Grid certificates
*****************

In this section we discuss Grid user certificates in more detail; how to
convert certificates, and how to find out the details of your Grid
certificate.

.. contents:: 
    :depth: 4



Once you have obtained and installed a :ref:`legacy certificate <get-grid-certificate>` there are some ``openssl`` commands that can help you inspect the information stored in your certificate. This section will show you how to do this.


.. _grid-certificate-inspection:

===================================
Certificate and key file inspection
===================================

Sometimes you want to view the details of your key and/or your certificate
file. Details like:

* do the key and the certificate file go together?
* when does the certificate expire?
* what is the subject or DN (Distinguished Name) of the certificate?

Using the ``openssl`` command, you can find out the details of your
certificates and keys.


Using the modulus to see whether a key and a certificate match
==============================================================

The modulus is a short message that can be used to identify if a private
key and certificate match. If they do not match, the private key and
certificate are useless.

To find the modulus of your key, use::

  openssl rsa -in userkey.pem -noout -modulus | openssl md5

You will be asked to provide the password you used to protect your key file.
To find the modulus of your certificate, use::

  openssl x509 -in usercert.pem -noout -modulus | openssl md5

If the md5 sum of the moduli of the key file and the certificate file do not match, you
cannot use that combination to identify yourself.


Finding the expiry date of your certificate
===========================================

To find out when your certificate is valid, use::

  openssl x509 -in usercert.pem -noout -dates

This will tell you when your certificate is valid.

Note that a key does not have a validity period.


Finding the subject of your certificate
=======================================

The subject or :abbr:`DN (Distinguished Name)` of a certificate is the human-readable identification of who
the certificate belongs to. It usually contains your name, country,
organisation and your e-mail address.

To find out who the certificate belongs to, use::

  openssl x509 -in usercert.pem -noout -subject


.. _certificate-file-conversion:

=========================================
Conversion of key and certificate formats
=========================================

Private keys and certificates can be stored in different formats.
Different systems use different formats. The two important formats are:

* PEM: stores keys and certificates in separate ascii-files; this
  format is used by the Grid middleware and storage programs;

* PKCS12: stores keys and certificates in one binary file; this
  format is used by browsers.

:ref:`DigiCert <digicert>` creates PKCS12 files, whereas :ref:`DutchGrid <dutchgrid>` creates PEM files.


Converting from PKCS12 to PEM
=============================

To convert a PKCS12 file to the PEM format, you need two commands; one to
extract the key, and one to extract your certificate.

To extract your key, run::

  openssl pkcs12 -in browsercert.p12 -out userkey.pem -nocerts

Note that you will first need to enter the password that was used to
*create* the PKCS12 file. Next, you need to enter a password to protect
the exported key. Enter that password again to verify. Note that you must
enter a password and the password must be at least 12 characters and include non-alphanumerics; if the password is too short, ``openssl`` will fail without error. You can use the same password as for the PKCS12 file.

To extract your certificate, run::

  openssl pkcs12 -in browsercert.p12 -out usercert.pem -nokeys -clcerts


Converting from PEM to PKCS12
=============================

To convert your certificate in PEM format to the PKCS12-format, use::

  openssl pkcs12 -export -inkey userkey.pem -in usercert.pem -out browsercert.p12

This will ask you for a password three times: the first is to unlock your
private key stored in the file ``userkey.pem``. The PKCS12-file
will be password protected, which needs a new password, and the same
password for confirmation. Note that you can use the same password
as for the private key, but this is not required.

When you import the PKCS12-file into your browser or keychain, you need
to enter the password you used to protect the PKCS12-file.



.. vim: set wm=7 sw=2 ts=2 expandtab :
