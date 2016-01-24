
.. _topos-overview:

**************
Topos Overview
**************

This page is about the ToPoS pilot framework:

.. contents:: 
    :depth: 4


.. _about-topos:

===========
About Topos
===========

ToPoS is a system tha implements ref:`pilot jobs <pilot-jobs>. It is a very simple system, which can be very effective. The name of ToPoS refers to Token Pools. The idea is that all a task server needs to provide to pilot jobs is a token which uniquely identifies a task. This token can be as simple as a unique number. All the Pilot job has to do is to map the token to a task, execute it and report back to the token pool server. Then grid computing comes down to creating lists of tasks, and present them as tokens in a pool. 

The user has to create tokens and to submit pilot jobs. The pilot jobs will contact the Token Pool Server and request for a token. The Token Pool Server will hand out a unique token to each requesting job. Of course a pilot job will have to know what to do with the token. The simplest form a token can take is a number. In that case, the pilot job will have to map the number to a specific task it has to compute. When it finishes this task it will delete the token from the Token Pool on the server.

The idea of tokens in a pool can be extended in several ways. Tokens can be files, parameters, numbers etc. What is important about the concept of a token is that it somehow identifies a unique task to be computed. For example, consider a researcher who wants to align 100 genome sequences against a database using a certain program P. ToPoS can be used as follows. The 100 genome sequences are not very large in size and can be uploaded as tokens in ToPoS. The user can do this with an Internet browser. The database can be expected to be large and it usually recommended to upload this to a Storage Element and then replicate it several times. He then submits about a hundred or more pilot jobs, each containing the program P and a reference to the database. The job will contain also a command to request a token from ToPoS. ToPoS will get requests from running jobs for tokens (in this case genome sequences). It deals these out uniquely. When a job finishes its computation it will tell ToPoS to delete the token and it will then request for a new one. ToPoS will just deal out tokens as longs as there tokens in the pool. In this scenario, it is possible for jobs to receive the same token and that a computation is performed more than once. In general, this is not a problem. However, it is possible to "lock" tokens. when tokens are locked, they will only be dealt out once. Each lock comes with a timeout which means that before the expiration of this timeout a job should confirm posession of the token. If the timeout expires the lock will be removed and the token will be free for distribution. 

You can have a peek at topos here: http://topos.grid.sara.nl/4.1/ or here: http://purl.org/sara/topos/latest/


.. _topos-security:

Security
========

A short note about TOPOS and security:

Please be aware that the topos.grid.sara.nl is a public service that on purpose employs a security through obscurity model. Private and sensitive data shouldn't be put in your pools.

Anyone knowing the random urls can read and modify your tokens. 


.. _topos-token-size:

File size limitations for Tokens
================================

Max token size is set at 128 MB, be aware that topos is made to process 100's of request per second; big tokens can be a bottleneck for this performance. Many large files should be put at grid storage or at a storage location of your choice; putting only filenames in topos can be a helpful approach.

Critical token size is between 100k and 10MB. 


.. _topos-source:

===========
Source Code
===========

The source code of Topos is on `Github Topos`_.


.. _topos-clients:

=============
Topos clients
=============

* You can use cURL.

While 'wget' and 'curl' can be used in shell scripts or even other languages, sending 'raw' HTTP-commands can get tedious and error-prone. Client libraries have been written which make accessing ToPoS easier. Client libraries are: 

* Bash wrapper: :ref:`ToposHiAll <topos-bash-client>`

* Perl client: :ref:`PerlToPoS <topos-perl-client>`
 

..

..

.. Links:

.. _`Github Topos`: https://github.com/sara-nl/ToPoS
