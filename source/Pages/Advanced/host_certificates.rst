.. _host-certificates:

.. contents:: 
    :depth: 4

**********************
Grid host certificates
**********************

Apart from Grid user certificates, there are also Grid host certificates. Host certificates are used to establish trust between hosts on the grid. If you use our user interfaces or Grid compute clusters, you don't have to worry about these; we'll make sure they contain the right host certificates and their dependencies.

If you configure your own user interface, or if you intend to run GridFTP or Webdav clients on your own machines, you will need to install the Grid Certificate Authrority (CA) root certificates. Your client software needs CA root certificates to know whether to trust the host certificate of the server they're talking to.

If you want to install the Grid CA root certificates, please follow the instructions here: https://wiki.egi.eu/wiki/EGI_IGTF_Release

After installation, you will find the Grid CA root certificates in ``/etc/grid-security/certificates/``. You can point clients like ``curl`` there:

.. code-block:: console

   $curl --capath /etc/grid-security/certificates/ ....

.. note:: Many clients allow you to bypass verification of host certificates. This may seem like an easy solution, but it bypasses a security layer. We recommend that you don't bypass host certificate checking but install the Grid CA root certificates.

============================
Certificate Revocation Lists
============================

Certificate Revocation Lists or CRLs declare which host certificates have been revoked, for instance because they have been compromised. A utility called ``fetch-crl`` downloads these CRLs. It's good practice to set up ``fetch-crl`` as a cron job. You can find more information about this at https://wiki.nikhef.nl/grid/FetchCRL3.

.. _root-CA-certificates:

===============================================
Telling your browser to trust host certificates
===============================================

Not every browser trusts Grid host certificates. You might see the error `SEC_ERROR_UNKNOWN_ISSUER` in Firefox. This means, that Firefox does not have the root CA certificate that was used to sign a specific host certificate. The solution is, to import the root CA certificate into the browser. But which one? Here are some tips to help you.

The eugridpma.org website has a map that helps you to find relevant Certificate Authorities and their root CA certificates: https://www.eugridpma.org/members/worldmap/

In Firefox, you can view the certificate information of a website. Very often, this information includes a link to the issuing CA root certificate you need to trust this certificate. See this image:

.. image:: /Images/Firefox-find-certificate-issuer.png
   :width: 400px

Here is a command to get the issuer of a host certificate, in this example of webdav.grid.surfsara.nl:

.. code-block:: console

   $echo | openssl s_client -connect webdav.grid.surfsara.nl:443 -CApath /etc/grid-security/certificates/ 2>/dev/null \
   $| openssl x509 -noout -text \
   $| egrep -o 'https{0,1}://.*\.(pem|crt|der)'

This will show:

.. code-block:: console

   http://cacerts.digicert.com/TERENAeScienceSSLCA3.crt
   
You can copy this link and paste it in the URL field to import the root certificate into Firefox. After that, Firefox will trust all sites with host certificates signed by this root certificate.
