
.. _access:

.. contents::
    :depth: 2

*************
Access method
*************

Access to `loui` will be provided via SSH (Secure Shell) Public key
authentication only. For the highest security of your data and the platform, we
won't not allow username/password authentication from *January 7th, 2019*.

To use this method you will need first to configure your SSH public key on a
portal provided by SURFsara. Then you can connect and authenticate to `loui` 
with your SSH keys without supplying your username or password at
each visit.

*NB: If you have already configured your ssh key on the portal and used it previously to access 
other SURFsara systems (e.g. Softdrive), you don't need to do anything. The ssh key on the portal 
allows you access most of the SURFsara User Interface machines, including `loui`: you install 
the key once and use it to authenticate to multiple SURFsara systems.*

.. _access-prerequisites:

=============
Prerequisites
=============

* A SURFsara user account
* An SSH key-pair on your laptop (or other machine you connect from)

As a user of `loui` you shall have received a SURFsara user account.
This account is required to access the SURFsara portal in the step below. 

If you already have an ssh key-pair on your laptop please proceed to the next section to
upload it. Else you have to generate a key-pair by using the following command:

.. code-block:: console

   $laptop$ ssh-keygen # This will create a key-pair in $HOME/.ssh directory


.. _upload-key:

===============
Upload your key
===============

Follow these steps to upload your key to our SURFsara portal. Note that this is
*one time* task:

* **Step1**: Login to the `SURFsara portal`_ with your SURFsara user account
* **Step2**: Click on the tab "Public ssh keys" on the left pane
* **Step3**: Add your public key by copying the contents of your file ``id_rsa.pub`` as shown below:

  .. image:: /Images/cua-portal-addssh.png
	   :align: center

* **Step4**: Type your SURFsara user account password next to the field ``CUA password``. (CUA stands for Central User Administration, in other words your SURFsara account)  
* **Step5**: Submit your changes with a click on the ``Add sshkey`` button  

From now on you can login to `loui` with your SSH keys from your laptop
(or other computer where your SSH key was generated/transferred) with: 

.. code-block:: console

      $ssh username@loui.grid.surfsara.nl

You have now logged in to `loui` without typing your password!

.. note:: In case that you have multiple keys in your ``.ssh/`` folder, you would need to specify the key that matches the .pub file that you uploaded on the SURFsara portal, i.e. ``ssh -i ~/.ssh/surfsarakey username@loui.grid.surfsara.nl``


.. seealso:: Still need help? Contact us at helpdesk@surfsara.nl

.. Links:

.. _`SURFsara portal`: https://portal.surfsara.nl/
