.. toctree::
   :hidden:
   
.. _doc-style:

****************
Style guidelines
****************

This page will give some style guidelines for the grid documentation.

.. warning:: This page is still under construction and currently mentions a few ideas for subjects we can discuss.


General
=======

* Use simple language. Not ``The command results in an effective release of the file``, but ``The command releases the file``.


Use of capitals
===============

* Titles With All Capitals?
* The grid or the Grid?
* Grid Certificate or grid certificate?
* Certificate Authority?
* Life Science Grid?
* Virtual Organisations?
* GridFTP, gridFTP or gridftp? GSIdCap?
* OutputSandbox or output sandbox?

  * OutputSandbox is the statement in the JDL. Better: ``OutputSandbox`` statement.
  * output sandbox is the location where the output files are returned.

* dCache (name), startGridSession (command): no capital even at start of sentence?


Acronyms
========

* In general: avoid acronyms. When you want to use them, the first occurrance on a page explain them: ``CA (Certificate Authority)``.
* Sphinx supports a :abbr: tag, see http://www.sphinx-doc.org/en/stable/markup/inline.html#other-semantic-markup. Here's a test: :abbr:`CA (Certificate Authority)`
* LSG or Life Science Grid?
* UI or User Interface?


Shell commands
==============

* Prefixing commands with ``$`` or not? Advantage: differentiate between commands and their output.


Markup
======

* When to use ``literal markup``?
* When to use **bold**? Example: "**Only you** are allowed to know the contents of this key."
* When to use *italic*?
