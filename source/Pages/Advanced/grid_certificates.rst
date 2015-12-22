.. warning:: Page under construction

.. _grid-certificates:

*****************
Grid Certificates
*****************

This pages describes obtaining a grid certificate in more detail, how to
convert certificates, and to find out the details of your grid
certificate.

.. contents:: 
    :depth: 4



Obtaining a legacy certificate
==============================

<TODO: add more documentation>


.. _grid-certificate-inspection:

Certificate and key file inspection
===================================

Sometimes you want to know the details of your key, your certificate
file; like:

* do the key file and the certificate file belong to eachother?
* when does the certificate expire?
* what is the DN of the certificate?

Using the ``openssl`` command, you can find out the details of your
certificates and keys.


Using the modulus to see whether a key and a certificate match
--------------------------------------------------------------

The modulus is a short message which can be used to identify a private
key and the key which was signed with the certificate. If they match, the
certificate signs that private key. If not, you may have mixed up
different key or certificate files.

To find the modulus of your key, use::

  openssl rsa -in userkey.pem -noout -modulus

which requires the key which you used to protect your key file.
To find the modulus of your certificate, use::

  openssl x509 -in usercert.pem -noout -modulus

If the moduli of the key file and the certificate file do not match, you
cannot use that combination to identify yourself.


Finding the expiry date of your certificate
-------------------------------------------

To find out when your certificate is valid, use::

  openssl x509 -in usercert.pem -noout -dates

This will tell you when your certificate is valid.

Note that a key does not have a validity period.


Finding the subject of your certificate
---------------------------------------

The subject of a certificate is the human-readable identification of who
the certificate belongs to. It usually contains your name, country,
organization and your e-mail address.

To find out who the certificate belongs to, use::

  openssl x509 -in usercert.pem -noout -subject


.. _certificate-file-conversion:

Conversion of key and certificate formats
=========================================

Secret keys and certificates can be stored in different formats, and
different systems use different formats. The two important formats are:

* PEM, which stores keys and certificates in separate ascii-files; this
  format is used by the grid middleware and storage programs;

* pkcs12, which stores keys and certificates in one binary file; this
  format is used by browsers.

TERENA creates pkcs12 files, whereas Dutchgrid creates PEM files.


Converting from pkcs12 to PEM
-----------------------------

To convert a pkcs12 file to the PEM format, you need two commands; one to
extract the key, and one to extract your certificate.

To extract your key, run::

  openssl pkcs12 -in user.p12 -out userkey.pem -nocerts

Note that you will first need to enter the password that was used to
*create* the pkcs12 file. Next, you need to enter a password to protect
the exported key. Enter that password again to verify. Note that you must
enter a password and the password must be at least N characters; if the
password is too short, ``openssl`` will fail without error. Using the same
password as for the pkcs12 file is fine. 

To extract your certificate, run::

  openssl pkcs12 -in user.p12 -out usercert.pem -nokeys


Converting from PEM to pkcs12
-----------------------------

To convert your certificate in PEM format to the PKCS12-format, use::

  openssl pkcs12 -export -inkey userkey.pem -in usercert.pem -out user.p12

This will ask you for a password three times: the first is to unlock your
private key stored in the file ``userkey.pem``. The pkcs12-file
will be password protected, which needs a new password, and the same
password for confirmation. Note that your can use the same password
as the password for the private key file, but this is not necessary.

When you import the PKCS12-file into your browser or keychain, you need
to enter the password you used to protect the PKCS12-file.



.. vim: set wm=7 sw=2 ts=2 expandtab :
