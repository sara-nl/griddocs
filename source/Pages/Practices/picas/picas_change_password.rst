.. _picas-change-password:

*********************
Picas Change Password
*********************

You can change your Picas password from command line using your existing
credentials with the following steps:

* Open a terminal

* Request the document details for your account and keep the revision number:

.. code-block:: console

    $curl --user "USERNAME:PASSWORD" -X GET https://picas.surfsara.nl:6984/_users/org.couchdb.user:USERNAME

Replace USERNAME, PASSWORD variables with your own credentials.

* Create a new password:

.. code-block:: console

    $curl --user "USERNAME:PASSWORD" -X PUT https://picas.surfsara.nl:6984/_users/org.couchdb.user:USERNAME -H "Accept: application/json" -H "Content-Type: application/json" -H "If-Match:REVISION" -d '{"name":"USERNAME", "roles":[], "type":"user", "password":"NEW-PASSWORD"}'

Replace USERNAME, PASSWORD variables with your own credentials.
Replace REVISION with the revision number tracked from the previous step.
Replace NEW-PASSWORD with the new password you want to set.

Here is an example for password change of the user 'homer' with password 'topsecret':

.. code-block:: console

    $curl --user "homer:topsecret" -X GET https://picas.surfsara.nl:6984/_users/org.couchdb.user:homer
    {"_id":"org.couchdb.user:homer","_rev":"5-2146df613f001dd856d188370a162ed1","password_scheme":"pbkdf2","iterations":10,"password_scheme":"pbkdf2","iterations":10,"name":"homer","roles":[],"type":"user","derived_key":"be20c46d195331a615d43b02e113ddb71089cfd4","salt":"9dbe626972d7fc45a8925bf68754a7b7"}

    The REVISION is '5-2146df613f001dd856d188370a162ed1'.

    $curl --user "homer:topsecret" -X PUT https://picas.surfsara.nl:6984/_users/org.couchdb.user:homer -H "Accept: application/json" -H "Content-Type: application/json" -H "If-Match:5-2146df613f001dd856d188370a162ed1" -d '{"name":"homer", "roles":[], "type":"user", "password":"topsecret2"}'
    {"ok":true,"id":"org.couchdb.user:homer","rev":"6-89c4f182fe8d88e6e7477585a228gh41"}
