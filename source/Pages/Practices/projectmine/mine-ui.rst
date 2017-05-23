.. _projectmine-ui:

******************************
Project_MinE User Interface
******************************

===============
Additional features on Mine user interface
===============

So why the switch from the grid user interface to the Mine user interface? Mine user interface has additional features:

1. An NFS (Network File System) mount: An NFS mount is present on the Mine user interface which allows the users read-only access to the ProjectMine data without a grid certificate! You can list the files with the following commands:

.. code-block:: console
   
   $ls /projectmine-nfs/
   Disk/   illumina_upload/  Tape/   upload/   

But commands such as:

.. code-block:: console
   
   $cp test /projectmine-nfs/
   cp: cannot create regular file `/projectmine-nfs/test': Read-only file system

will fail. You can copy data from the NFS mount to your home directory, but as you will have limited space on your home directory we recommend caution. Please note that you still need a grid certificate to run the analyses and write files to the grid storage. You can find the information on interacting with grid here http://doc.grid.surfsara.nl/en/latest/index.html. Tips specific to Project_MinE can be found here https://bitbucket.org/JokevanVugt/projectmine_surfsaragrid_example_script

2. Additional /scratch space: For the users who wish to upload data to the project but do not have access to a certificate can upload the data to /scratch. The Project_Mine data managers will co-ordinate with those users and transfer the data to the grid storage which can then be accessed via the NFS mount. Please note that the data on /scratch space cannot be directly used for analysis, but needs to be uploaded to the grid storage first. 

3. Access to the Mine user interface is ssh key authentication based instead of username/password. This reduces the system vulnerability to unwanted users due to weak passwords or shared passwords. 

==================
Migration from grid-ui to mine-ui
==================
		
If you were accessing the Grid facility at SURFsara via the grid user interface (ui.grid.sara.nl), you should follow the procedure below to migrate to the Project_MinE user interface.

1. As you have access to the grid-ui, the same credentials also provide you access to the SURFsara user portal https://portal.surfsara.nl/home/. On this page, proceed to the tab 'Public ssh keys' and add your public key here. If you are unfamiliar with ssh keys, you can find some basic information here https://doc.hpccloud.surfsara.nl/SSHkey. Please choose a passphrase to protect your public key.

2. The MinE user interface can be accessed once the above step is complete. The public key is injected into the MinE user interface and matched with your local private key when you login to the interface

.. code-block:: console

   $ssh user@mine-ui.grid.sara.nl  # replace user with your username 
   
3. To migrate the contents of your home folder from ui.grid.sara.nl to the Project_MinE user interface, you may use the following command from the MinE user interface:

.. code-block:: console

   $rsync -a user@ui.grid.sara.nl:/home/user/ /home/user/   # replace user with your username 

This will replicate all your files in the home folder on the Mine user interface. 

4. The software environment set-up on the Project_MinE user interface and ui.grid.sara.nl are similar. Access to Softdrive is also availabe from the MinE user interface through the same path viz. /cvmfs/softdrive.nl/. Grid tools that were available on the ui.grid.sara.nl (e.g., glite-* tools, storage clients, etc.) are also availabe on the Mine user interface. 


==============
Guidelines for Mine user interface:
==============

Security of the data is of utmost importance, so of course only the users we provide access to for specific countries will be able to access that data. However, the responsibility also lies with the user to not share their private ssh key and the passphrase with anyone. Violation of this will lead to revocation of the user's access to the Mine user interface.

