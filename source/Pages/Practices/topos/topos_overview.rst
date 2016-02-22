
.. _topos-overview:

**************
ToPoS Overview
**************

This page is about the ToPoS pilot framework:

.. contents::
    :depth: 4


.. _about-topos:

===========
About ToPoS
===========

ToPoS is a system that implements :ref:`pilot jobs <pilot-jobs>`. It is a very simple system, which can be very effective. The name of ToPoS refers to Token Pools. The idea is that all a task server needs to provide to pilot jobs is a token which uniquely identifies a task. This token can be as simple as a unique number. All the Pilot job has to do is to map the token to a task, execute it and report back to the token pool server. Then Grid computing comes down to creating lists of tasks, and present them as tokens in a pool.

The user has to create tokens and to submit pilot jobs. The pilot jobs will contact the Token Pool Server and request for a token. The Token Pool Server will hand out a unique token to each requesting job. Of course a pilot job will have to know what to do with the token. The simplest form a token can take is a number. In that case, the pilot job will have to map the number to a specific task it has to compute. When it finishes this task it will delete the token from the Token Pool on the server.

The idea of tokens in a pool can be extended in several ways. Tokens can be files, parameters, numbers etc. What is important about the concept of a token, is that it somehow identifies a unique task to be computed. For example, consider a researcher who wants to align 100 genome sequences against a database using a certain program P. ToPoS can be used as follows. The 100 genome sequences are not very large in size and can be uploaded as tokens in ToPoS. The user can do this with an Internet browser. The database can be expected to be large and it is usually recommended to upload this to a Storage Element and then replicate it several times. He then submits about a hundred or more pilot jobs, each containing the program P and a reference to the database. The job will also contain a command to request a token from ToPoS. ToPoS will get requests from running jobs for tokens (in this case genome sequences). It deals these out uniquely. When a job finishes its computation it will tell ToPoS to delete the token and it will then request a new one. ToPoS will deal out tokens as longs as there are tokens in the pool. In this scenario, it is possible for jobs to receive the same token and that a computation is performed more than once. In general, this is not a problem. However, it is possible to "lock" tokens. When tokens are locked, they will only be dealt out once. Each lock comes with a timeout which means that before the expiration of this timeout a job should confirm possession of the token. If the timeout expires the lock will be removed and the token will be free for distribution.

You can have a peek at ToPoS here: http://topos.grid.sara.nl/4.1/ or here: http://purl.org/sara/topos/latest/


.. _topos-security:

Security
========

A short note about ToPoS and security:

Please be aware that the topos.grid.sara.nl is a public service that on purpose employs a security through obscurity model. Private and sensitive data shouldn't be put in your pools.

Anyone knowing the random urls can read and modify your tokens.


.. _topos-token-size:

File size limitations for Tokens
================================

Although it is possible to upload small files as tokens, be aware that ToPoS is made to process 100's of request per second; big tokens can be a bottleneck for this performance. Many large files should be put at Grid storage or at a storage location of your choice; putting only filenames in ToPoS can be a helpful approach.

Critical token size is between 100KB and 10MB.

==========
An example
==========

We have an example available on this page :ref:`topos-example`

.. _topos-source:

===========
Source Code
===========

The source code of ToPoS is on `GitHub ToPos`_.


.. _topos-clients:

=============
ToPoS clients
=============

.. toctree::
   :hidden:
   
   clients/topos_bash_client
   clients/topos_perl_client

* Bash wrapper: :ref:`topos-bash-client`

* Perl client: :ref:`PerlToPoS <topos-perl-client>`

Besides these, 'wget' and 'curl' can be used in shell scripts or even other languages, to send 'raw' HTTP-commands. However, this can get tedious and is error-prone. Client libraries have been written which make accessing ToPoS easier. If possible, we advise you to use one of the above client libraries.


..

..

.. Links:

.. _`GitHub ToPoS`: https://github.com/sara-nl/ToPoS
