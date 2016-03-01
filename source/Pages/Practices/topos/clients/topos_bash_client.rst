
.. _topos-bash-client:

*****************
ToPoS Bash client
*****************

This page contains information about ``BashTopos``, a bash client for ToPoS:


.. contents::
    :depth: 4


.. _bash-client-intro:

============
Introduction
============

There is a bash 'library' available to ease the communication with ToPoS. It is written in bash script and requires curl and awk to be present. It has been tested on CentOS 6.7 and Ubuntu 14.04. You can find it :download:`here </Scripts/topos>`.

To use it, you need to make the file executable:

.. code-block:: console

    $chmod +x topos

After that you can call the function:

.. code-block:: text

    USAGE: ./topos [ command ] [ arguments ]

Where the combination command and arguments is one of:

.. code-block:: text

    newPool
    createTokensFromLinesInFile [POOLNAME] [FILENAME]
    uploadFileAsToken [POOLNAME] [FILENAME]
    uploadFilesInDirAsTokens [POOLNAME] [DIRNAME]
    nextToken [POOLNAME]
    nextTokenWithLock [POOLNAME] [TIMEOUT]
    getToken [POOLNAME] [TOKENNAME]
    refreshLock [POOLNAME] [LOCKNAME] [TIMEOUT]
    deleteLock [POOLNAME] [LOCKNAME]
    deleteToken [POOLNAME] [TOKENNAME]


Function description
====================

**newPool**
  | Returns a new, unused pool name.
  | Usage: ``newPool``
  | Returns the unique new pool name

**createTokensFromLinesInFile**
  | Creates a token for each line in a text file.
  | Usage: ``createTokensFromLinesInFile [POOLNAME] [FILENAME]``
  | Returns nothing

**uploadFileAsToken**
  | Creates a token with the contents of a file.
  | Usage: ``uploadFileAsToken [POOLNAME] [FILENAME]``
  | Returns the token name

**uploadFilesInDirAsTokens**
  | Creates tokens for each file in a directory.
  | Usage: ``uploadFilesInDirAsTokens [POOLNAME] [DIRNAME]``
  | Returns nothing

**nextToken**
  | Fetches the next token.
  | Usage: ``nextToken [POOLNAME]``
  | Returns the token name (NOT its contents!)

**nextTokenWithLock**
  | Fetches the next token and puts a lock on it. The lock description is the hostname.
  | Usage: ``nextTokenWithLock [POOLNAME] [TIMEOUT]``
  | Returns the token name (NOT its content!) and on the next line the lock name

**getToken**
  | Fetches the content of a token.
  | Usage: ``getToken [POOLNAME] [TOKENNAME]``
  | Returns the content of the token

**refreshLock**
  | Refreshes a lock so it doesn't time out.
  | Usage: ``refreshLock [POOLNAME] [LOCKNAME] [TIMEOUT]``
  | Returns nothing

**deleteLock**
  | Deletes a lock so the associated token becomes available again.
  | Usage: ``deleteLock [POOLNAME] [LOCKNAME]``
  | Returns nothing

**deleteToken**
  | Deletes a token.
  | Usage: ``deleteToken [POOLNAME] [TOKENNAME]``
  | Returns nothing
