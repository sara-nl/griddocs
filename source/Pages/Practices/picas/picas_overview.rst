.. _picas-overview:

**************
Picas Overview
**************

This page is about the PiCaS pilot framework:

.. contents:: 
    :depth: 4


Let's say that you have a number of *tasks* to be processed on the Grid Worker Nodes. Each task requires a set of parameters to run. The parameters of each task (run id, input files, etc) construct an individual piece of work, called ``token``, which is just a description not the task itself.  

The central repository for the tasks is PiCaS, a Token Pool Server. The pilot jobs request the next free token for processing from PiCaS. As said, the content of the tokens is opaque to PiCaS and can be anything your application needs.

PiCaS works as a queue, providing a mechanism to step through the work one token at a time. It is also a pilot job system, indicating that the client communicates with the PiCaS server to fetch work, instead of having that work specified in a jdl (or similar) file.  

The server is based on `CouchDB`_ (see `CouchDB book`_),a NoSQL database, and the client side is written in Python.  


.. _picas-server:

============
Picas server
============

.. sidebar:: More about Picas Server?

		.. seealso:: Checkout our mooc videos Picas server side :ref:`Part I <mooc-picas-server1>` and :ref:`Part II <mooc-picas-server2>`.

On the server side we have a queue which keeps track of which tokens are available, locked or done. This allows clients to easily retrieve new pieces of work and allows also easy monitoring of the resources. As every application needs different parameters, the framework has a flexible data structure that allows users to save different types of data. PiCaS system is easily accessible from anywhere, as it might not be known beforehand where the resources are located.

PiCaS server is based on CouchDB. CouchDB stores documents which are self-contained pieces of information. These documents support a dynamic data model, so unlike traditional databases, CouchDB allows storing and retrieving any piece of information as long as it can be defined as key-value pairs. This feature is used to store all the information needed to keep track of the job stages and all of the required in- and outputs.

CouchDB also provides a Restful API, which means that we can easily access information with an http client. This can be a browser, a commandline application like curl or a complete client library. It is also possible to interact with PiCaS using the web-interface. 
  

Picas views
===========

CouchDB views are the basic query mechanism in CouchDB and allow you to extract, transform and combine data from different documents stored in the same database. This process is based on the Map/Reduce paradigm. In the case of CouchDB, the Map step takes every document from a database and applies a piece of code. It then sorts the output of that step based on the key that you supply and give it to the reducer. The code you supply for the reducer combines data from the mapper that have the same key. 


.. image:: /Images/picas_views.png
	:align: center

The map code works on a ‘per document’ basis, so every document is run through that code one by one. The emit statement returns the value to the reduce command, again, this is all done for every document. In this case we are only interested in the type of the document, and as we want to count how many of each type there are, we provide the type as the key for the emit statement. 


.. _picas-client:

============
Picas client
============

.. sidebar:: More about Picas Client?

		.. seealso:: Checkout our mooc video :ref:`mooc-picas-client` 
		
The PiCaS client library was created to ease communication with the CouchDB back-end. It allows users to easily fetch, modify and upload tokens. The system has been implemented as a Python Iterator, which basically means that that the application is one large for loop that keeps on running as long as there is work to be done. The client is written in Python and uses the python couchdb module, which requires at least python version 2.6. The  client library is constructed using a number of modules and classes, most important of these are:  

* The *Actors* module contains the RunActor class. This is the class that has to be overwritten to include the code that calls the different applications (tasks) to run.
* The *Clients* module contains a CouchClient class that creates a connection to CouchDB.  
* The *Iterators* module contains classes responsible for working through the available tokens. The BasicViewIterator class assumes that all the token information is encoded directly into the CouchDB documents.  
* The *Modifiers* module is responsible for modification of the PiCaS tokens. It makes sure the tokens are modified in a uniform way.  

=====================
Grant access on Picas
=====================

Any user with a Grid project and allocated :ref:`quotas <quotas>` can get a PiCaS account and also obtain a database on the CouchDB server. If you want access, just contact us at helpdesk@surfsara.nl to discuss your design implementation and provide you with your PiCaS credentials.

..
..

..

.. Links:

.. _`CouchDB`: http://couchdb.apache.org/
.. _`CouchDB book`: http://guide.couchdb.org/

