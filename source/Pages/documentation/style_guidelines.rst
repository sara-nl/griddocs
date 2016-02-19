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

* Titles With All Capitals? -> Alleen het eerste woord. 
* The grid or the Grid? -> Grid
* Grid Certificate or grid certificate? Grid certificate
* Certificate Authority? -> De eerste keer "Certificate Authority (CA)" daarna CA (op elke bladzijde)
* Life Science Grid? -> De eerste keer "Life Science Grid (LSG)" daarna LSG (op elke bladzijde)
* Virtual Organisations? -> De eerste keer "Virtual Organisation (VO)" daarna VO (op elke bladzijde)
* GridFTP, gridFTP or gridftp? GSIdCap?  -> GridFTP, GSIdCap
* OutputSandbox or output sandbox? -> 

  * OutputSandbox is the statement in the JDL. Better: ``OutputSandbox`` statement.
  * output sandbox is the location where the output files are returned.

* dCache (name), startGridSession (command): no capital even at start of sentence?


Acronyms
========

* In general: avoid acronyms. When you want to use them, the first occurrance on a page explain them: ``CA (Certificate Authority)``.
* Sphinx supports a :abbr: tag, see http://www.sphinx-doc.org/en/stable/markup/inline.html#other-semantic-markup. Here's a test: :abbr:`CA (Certificate Authority)`
* LSG or Life Science Grid? Eerste keer voluit +(afkorting) daarna afkorting + hovering text
* UI or User Interface? Eerste keer voluit +(afkorting) daarna afkorting + hovering text


Shell commands
==============

* Prefixing commands with ``$`` or not? Advantage: differentiate between commands and their output. -> Yes


Markup
======

* When to use ``literal markup``? -> stukjes code, (delen van) commando's, hele specifieke termen
* When to use **bold**? Example: "**Only you** are allowed to know the contents of this key." -> veel nadruk
* When to use *italic*? Example: "You can continue only *after you* have completed the preparations." -> minder nadruk
