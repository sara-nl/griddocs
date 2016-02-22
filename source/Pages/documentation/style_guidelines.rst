.. toctree::
   :hidden:
   
.. _doc-style:

****************
Style guidelines
****************

This page provides some style guidelines for the grid documentation.


General
=======

* Use simple language. Not ``The command results in an effective release of the file``, but ``The command releases the file``.


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

* Prefix commands with ``$``, to differentiate between commands and their output. Example:

  .. code-block:: bash

     $ echo "Hello World!"
     Hello World!


Markup
======

* ``literal markup`` for:

  * pieces of code
  * commands
  * arguments
  * file names
  * configuration file statements and values
  * hostnames
  * very specific terms.

* **Bold** for strong emphasis. Example: "**Only you** are allowed to know the contents of this key."
* *italic* for moderate emphasis. Example: "You can continue only *after you* have completed the preparations."
