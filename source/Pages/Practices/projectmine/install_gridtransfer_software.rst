.. _projectmine-overview:

*******************************************
ProjectMine: Install software to copy files 
*******************************************


This page is about ProjectMine:

.. contents::
    :depth: 4


.. _about-projectmine:

====================================
Install the gridFTP software stack
====================================



.. Links:

-------
Network
-------


Our storage servers are located at ip 145.100.32.0/22 and needs for gridftp port 2811 and the port range 20000-25000 and for SRM protocol port 8443

--------
Software
--------

The software stack used for gridftp and all it's necessary dependencies are developed to work with CentOS or Scientific Linux. Most stable resuts can be expected with these software distributions. However, this software can also be run on Debian(ubuntu), MacOS and all other distributions. Keep that the experience might be sub optimal.


^^^^^^^^^^^^^^^
CentOS specific
^^^^^^^^^^^^^^^

  .. code-block:: bash

	sudo yum install epel-release

	sudo wget -O /etc/yum.repos.d/EGI-trustanchors.repo http://repository.egi.eu/sw/production/cas/1/current/repo-files/EGI-trustanchors.repo

	sudo yum update

	sudo yum install globus-gass-copy-progs voms-clients uberftp fetch-crl

	//All EGI root certificates

	sudo yum install ca-policy-egi-core

	// or only the specific needed certs (which can be troublesum)

	yum install ca_TERENA-eScience-SSL-CA-2.noarch  ca-terena-escience-ssl-ca-3 ca_NIKHEF



Installing the SRM client

  .. code-block:: bash

	wget https://www.dcache.org/downloads/1.9/repo/2.10/dcache-srmclient-2.10.7-1.noarch.rpm

	yum install dcache-srmclient-2.10.7-1.noarch.rpm


After installing continue with `Install VOMS locations`_




^^^^^^^^^^^^^^^
Ubuntu specific
^^^^^^^^^^^^^^^
  .. code-block:: bash

	curl https://dist.eugridpma.info/distribution/igtf/current/GPG-KEY-EUGridPMA-RPM-3 | sudo apt-key add -
	sudo su

	wget http://www.globus.org/ftppub/gt6/installers/repo/globus-toolkit-repo_latest_all.deb

	sudo dpkg -i globus-toolkit-repo_latest_all.deb

	echo "deb http://repository.egi.eu/sw/production/cas/1/current egi-igtf core" >>/etc/apt/sources.list

	sudo apt-get update

	sudo mkdir -p /etc/grid-security/certificates/

	sudo apt-get install ca-policy-egi-core globus-gass-copy-progs voms-clients fetch-crl



Please also install the SRM client software 


^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Install on Linux without administative rights
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

prerequisites: 

- 64 bit Linux on a x86 architecture
- Java 7 or 8 

Install globus-url-copy

.. code-block:: bash

	wget -O globus_tookit.tar.gz  http://toolkit.globus.org/ftppub/gt6/installers/linux/globus_toolkit-6.0.1452806916-x86_64-unknown-linux-gnu-Build-164.tar.gz 
	tar --strip-components=1  -xvf globus_tookit.tar.gz
	export PATH=$(pwd)/globus/bin:$PATH

Install srm-client	

.. code-block:: bash

	wget -O srm-client.tar.gz  https://www.dcache.org/downloads/1.9/repo/2.10/srm-client-2.10.7.tar.gz
	tar -xvf srm-client.tar.gz
	export PATH=$PATH:$(pwd)/srm-client-2.10.7/bin/



For installing the voms-clients, you need to install the java build tool maven (you can skip this when the command mvn is installed)

.. code-block:: bash

	wget -O maven.tar.gz http://apache.mirror.triple-it.nl/maven/maven-3/3.3.9/binaries/apache-maven-3.3.9-bin.tar.gz
	tar -xf maven.tar.gz
	export PATH=$PATH:$(pwd)/apache-maven-3.3.9/bin/

Install voms-client itself


.. code-block:: bash

	wget  -O voms-clients.tar.gz https://github.com/italiangrid/voms-clients/archive/v3.0.6.tar.gz
	tar -xf voms-clients.tar.gz
	cd voms-clients-3.0.6
	mvn package
	mv target/voms-clients.tar.gz ../.
	cd ..
	rm -rf voms-clients-3.0.6
	tar -xvf voms-clients.tar.gz
	export PATH=$PATH:$(pwd)/voms-clients/bin/






^^^^^^^^^^^^^^^^

MacOS X specific
^^^^^^^^^^^^^^^^

Installing the software is done via Homebrew, a software manager for MacOS X. More information on homebrew can be found at http://brew.sh/

.. code-block:: bash

	ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
	brew install uberftp voms globus-toolkit wget 




^^^^^^^^^^^^^^^
SRM tools
^^^^^^^^^^^^^^^



The SRM tools are needed to communicate with the storage management system and used for querying information about files and bring files online from the tape archive.


* Admin rights

	.. code-block:: bash

		wget -O srm-client.tar.gz  https://www.dcache.org/downloads/1.9/repo/2.10/srm-client-2.10.7.tar.gz
		tar --strip-components=1  -xvf srm-client.tar.gz
		cp bin/* /usr/bin/.
		cp -r share/srm /usr/share/.
		


* User rights


	.. code-block:: bash

		wget -O srm-client.tar.gz  https://www.dcache.org/downloads/1.9/repo/2.10/srm-client-2.10.7.tar.gz
		tar -xvf srm-client.tar.gz
		export PATH=$PATH:$(pwd)/srm-client-2.10.7/bin/


^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Install Certificates
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

These instructions are **not** necessary if you installed with the CentOS and Ubuntu method.

.. code-block:: bash

	export X509_CERT_DIR=$(pwd)/grid-security/certificates
	mkdir -p $X509_CERT_DIR
	cd $X509_CERT_DIR
	wget -r -l1 --no-parent -nd --accept=.tar.gz "http://repository.egi.eu/sw/production/cas/1/current/tgz/"
	for i in `ls *.tar.gz`; do tar xzf $i --strip-components=1; done
	rm -vf robots.txt *.tar.gz
	cd ../..

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
_`Install VOMS locations`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
These files are needed to find the VOMS server when you create a vomsified proxy. When installing VOMS locations without admin rights a warning will be shown when creating a vomsified because no lsc file is set: this give no functional limitations

* User rights
	.. code-block:: bash

		mkdir -p $HOME/.voms/vomses/
		echo '"lsgrid" "voms.grid.sara.nl" "30018" "/O=dutchgrid/O=hosts/OU=sara.nl/CN=voms.grid.sara.nl" "lsgrid"'> $HOME/.voms/vomses/lsgrid


* Admin rights

	.. code-block:: bash

		mkdir /etc/vomses
		echo '"lsgrid" "voms.grid.sara.nl" "30018" "/O=dutchgrid/O=hosts/OU=sara.nl/CN=voms.grid.sara.nl" "lsgrid"'> /etc/vomses/lsgrid

		mkdir -p /etc/grid-security/vomsdir/lsgrid
		echo "/O=dutchgrid/O=hosts/OU=sara.nl/CN=voms.grid.sara.nl\n/C=NL/O=NIKHEF/CN=NIKHEF medium-security certification auth" >/etc/grid-security/vomsdir/lsgrid/voms.grid.sara.nl.lsc







^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
create a vomsified proxy
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^



After installing your personal grid certificate you cat create a vomsiefied proxy :

.. code-block:: bash

	voms-proxy-init --voms lsgrid:/lsgrid/Project_MinE --valid 168:00

	Enter GRID pass phrase for this identity:
	Contacting voms.grid.sara.nl:30018 [/O=dutchgrid/O=hosts/OU=sara.nl/CN=voms.grid.sara.nl] "lsgrid"...
	Remote VOMS server contacted succesfully.


	WARNING: VOMS AC validation for VO lsgrid failed for the following reasons:
         LSC validation failed: LSC file matching VOMS attributes not found in store.
        AC signature verification failure: no valid VOMS server credential found.

	Created proxy in /tmp/x509up_u1001.

	Your proxy is valid until Fri Jun 10 14:10:24 CEST 2016



.. _`ProjectMine`: https://www.projectmine.com/
