.. toctree::
   :hidden:
   
.. _doc-style:

****************
Style guidelines
****************

This page provides some style guidelines for the grid documentation.


General
=======

* Use simple language. Not "The command results in an effective release of the file", but "The command releases the file".


Use of capitals
===============

* Titles With All Capitals? -> Only the first word.
* The grid or the Grid? -> The Grid.
* Grid Certificate or grid certificate? -> Grid certificate.
* Certificate Authority? -> First time per page "Certificate Authority (CA)", then :abbr:`CA (Certificate Authority)` with :abbr: tag. Same for:

  * First time per page Life Science Grid (LSG), then LSG.
  * Virtual Organisation (VO), then VO.
  * User Interface (UI), then UI.

* GridFTP, gridFTP or gridftp? GSIdCap? -> GridFTP, GSIdCap
* OutputSandbox or output sandbox? -> 

  * OutputSandbox is the statement in the JDL. Better: ``OutputSandbox`` statement.
  * output sandbox is the location where the output files are returned.

* dCache (name), startGridSession (command): no capital, even at start of sentence.


Acronyms
========

* In general: avoid acronyms. When you want to use them, the first occurrance on a page should explain them: Certificate Authority (CA).
* Sphinx supports a :abbr: tag, see http://www.sphinx-doc.org/en/stable/markup/inline.html#other-semantic-markup. Here's a test: :abbr:`CA (Certificate Authority)`


Shell commands
==============

* When you want to display commands and their output, use ``.. code-block:: console``. Prefix each command with a ``$``, without space.

  .. code-block:: console

     $echo 'Hello World!'
     Hello World!

* When you want to display commands and comments, use ``.. code-block:: bash``. Don't prefix commands. Example:

  .. code-block:: bash

     # 1. VOMS server: create a voms proxy with voms extensions that enables you to access the Grid for *12 hours*.
     voms-proxy-init --voms lsgrid  # Replace lsgrid with your VO

* When you want to display commands, output and comments, use ``.. code-block:: console``. Prefix commands with a ``$`` and prefix comments with ``##``, otherwise they are marked up as a command. Example:

  .. code-block:: console

     $echo 'Hello World!'
     Hello World!
     ## Comments should be prefixed with a double ``#``.

* To display the contents of a shell script, use ``.. code-block:: bash``.
* To display perl, use ``.. code-block:: perl``. If a page only displays perl code, you can use ``.. highlight:: perl`` once and then ``::`` for each code block. See :ref:`topos-perl-client` for an example.
* To display configuration files, use ``.. code-block:: cfg``.


Markup
======

* ``literal markup`` for:

  * pieces of code
  * commands
  * arguments
  * file names, hostnames
  * a specific term, when emphasis is on its name:

    * Example: a language called ``job description language``
    * But: a JDL file is written in the job description language.

  * configuration file statements and values

* **Bold** for strong emphasis. Example: "**Only you** are allowed to know the contents of this key."
* *italic* for moderate emphasis. Example: "You can continue only *after you* have completed the preparations."
