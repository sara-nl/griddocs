.. _picas-change-password:

*********************
Picas Change Password
*********************

You can change your Picas password from command line using your existing
credentials with the following steps:

* Open a terminal in your local machine

* Provide your current username, password and the new password as variables and run the command below:

.. code-block:: shell

    username=USERNAME
    password=PASSWORD
    newpassword=NEWPASSWORD
    curl --silent --user "$username:$password" -X GET https://picas.surfsara.nl:6984/_users/org.couchdb.user:$username | jq '._rev' |  curl --user "$username:$password" -X PUT https://picas.surfsara.nl:6984/_users/org.couchdb.user:$username -H "Accept: application/json" -H "Content-Type: application/json" -H "If-Match:$(</dev/stdin)" -d '{"name":"'$username'", "roles":[], "type":"user", "password":"'$newpassword'"}'

Upon success you should receive an output like the following:

.. code-block:: shell

    {"ok":true,"id":"org.couchdb.user:USERNAME","rev":"2-5a3c7133701e51sfgh32cb0b3761483d"}
