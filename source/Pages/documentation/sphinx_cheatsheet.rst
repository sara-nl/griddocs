.. _cheatsheet:

**********
Cheatsheet
**********

Look at the raw version of this file to compare the source and build version: :download:`sphinx_cheatsheet.rst`

The first lines of this page will also be explained later on in this document (see *Links* and *Titles*)

.. this is a comment, it will not be displayed

.. See also the online editor: http://rst.ninjs.org/


.. ============ Text fonts ===============

*italic word*  

**bold word**

``This is text in Courier``

This is plain text.


.. ============= Bullets =================

* This is a bulleted list.
* ...

1. This is a numbered list.
2. It has two items.

* this is
* a list

  * with a nested list
  * and some subitems

* and here the parent list continues


.. ============ Links ===============

`Python <http://www.python.org/>`_

or

`SURFsara website`_ (see bottom of the document; that is were we tell Sphinx were SURFsara website should point to)

This is an implicit link to title:

`Sample H2`_

Internal wiki link:

Reference tag: place above a title: .. _my-reference-label:

Then refer to it from another page as. For example, for this cheatsheet: :ref:`cheatsheet` or ref:`other label <cheatsheet>`



.. ============ Commands ===============

This is a command::

  openssl pkcs12 -in user.p12 -out userkey.pem -nocerts

And this is a code block:

.. code-block:: console
	:linenos:

	$openssl pkcs12 -in user.p12 -out userkey.pem -nocerts



.. ============ Titles ===============

******************
H1: document title
******************

=========
Sample H2
=========

Sample H3
=========

Sample H4
---------

Sample H5
`````````

Sample H6
.........

And some text.


.. ============ Tables ===============

+------------+------------+-----------+
| Header 1   | Header 2   | Header 3  |
+============+============+===========+
| body row 1 | column 2   | column 3  |
+------------+------------+-----------+
| body row 2 | Cells may span columns.|
+------------+------------+-----------+
| body row 3 | Cells may  | - Cells   |
+------------+ span rows. | - contain |
| body row 4 |            | - blocks. |
+------------+------------+-----------+

or

==================   ============
Column1              Column2
==================   ============
value1               40
value2               41
value3               42
==================   ============



.. ============ Note boxes ===============

.. note::  This is a **note** box.

.. warning:: This is a **warning** box.

.. seealso:: This is a simple **seealso** note.

.. topic:: Your Topic Title

    Subsequent indented lines comprise
    the body of the topic, and are
    interpreted as body elements.

.. sidebar:: Sidebar Title
    :subtitle: Optional Sidebar Subtitle

    Subsequent indented lines comprise
    the body of the sidebar, and are
    interpreted as body elements.


.. ============== Files ====================

:file:`path/to/myfile.txt`

:download:`A file for download <sphinx_cheatsheet.rst>`
 
.. image:: /Images/logo.png
    :width: 200px
    :align: center
    :height: 100px

.. figure:: /Images/logo.png
    :width: 200px
    :align: center
    :height: 100px


.. _`SURFsara website`: https://surfsara.nl/
