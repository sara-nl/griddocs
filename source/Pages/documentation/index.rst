.. _doc-howto:

********************
Documentation how-to
********************

.. Tip:: Do you have ideas for corrections and improvements of our user documentation? In this page you will learn how to:

     * contribute to our documentation
     * edit the docs with Sphinx language
     * build the docs on your laptop

Our documentation is hosted on Github and is written in `Sphinx`_ *restructured text*.
Behind the scenes we use `ReadTheDocs`_ to publish it automatically. You can contribute
either directly to our `Grid Github repo`_ or send an email to
:ref:`our helpdesk <helpdesk>` with your remarks and we will change the documentation
ourselves. Any contribution is welcome!

The rest of this page explains how to to submit your changes directly through Github.

.. _contribute-github:

=========================
Contribute through GitHub
=========================

In case that you have a GitHub account and a little knowledge of git (see
`GitHub’s git cheat sheet <https://help.github.com/articles/git-cheatsheet/>`_),
you can try submitting your changes directly to our repository. Here is what you
have to do:

1. `Fork <https://help.github.com/articles/fork-a-repo/>`_ our `Grid Github repo`_
2. Git pull your fork
3. :ref:`edit-with-sphinx` the files with your changes
4. :ref:`preview-changes` to preview the changes
5. Commit and push your changes back to your fork
6. Create a `pull request <https://help.github.com/en/articles/creating-a-pull-request-from-a-fork>`_ to inform us of your changes
7. After we’ve reviewed and accepted your work, we will merge your commits and the documentation will be updated automatically


.. _edit-with-sphinx:

=========================
Edit with Sphinx language
=========================

When you contribute directly to our Github repo we ask you to write the changes
in Sphinx language. The philosophy of Sphinx documentation is that content is
stored in files that can be easily read *and* edited by humans, in a format called
*restructured text*, with the file extension ``.rst``. Using a simple grammar,
text can be styled. The document is structured using special tags; using these
tags, documentation can be split into multiple files, and you can cross-reference
between files and build indexes.

Although Sphinx is quite intuitive, we have created a simple Sphinx cheatsheet
to help you use the Sphinx syntax:

* :ref:`Sphinx cheatsheet <cheatsheet>`


.. _preview-changes:

===============================
Build the documentation locally
===============================

Because the syntax of the files is human readable, you can edit the files using
your favourite text editor. Once you are done editing, you can generate
documentation in various formats, such as HTML or epub. While you can edit the
pages on virtually any system, it is recommended to preview your changes before
publishing them.

There are different ways to generate the HTML documentation from source and
review your changes:

* :ref:`Docker image <test-on-docker>`
* :ref:`Sphinx local installation <sphinx-install>`
* :ref:`GitHub edit/preview <test-on-github>`

Note that you only need to use one of the options mentioned above. Using Docker
is the preferred way, as this mimics the ReadTheDocs build system closest.
GitHub edit/preview on the other hand is good enough for minor, textual changes,
but is otherwise the least preferred option.

Below you will find information for each of the methods.


.. _test-on-docker:

Docker image
============

This is the preferred option to build and test your changes. It tries to build
the documentation the same way as readthedocs.org.

* :ref:`Install Docker image <docker-install>`

* Once the Docker image is ready, find the following script inside your Github fork and run it to build your documentation. Provide an output location (default: ./build) and the Docker image name (default: readthedocs/build)::

    ./build.sh

Optionally you can provide an output location (default: ./build) and the Docker
image name (default: readthedocs/build)::

    ./build.sh /alternative/output/path/ docker_image_alternative_name

Example::

    ./build.sh mybuild readthedocs/build:latest

.. note:: For Mac OS X, use ``./build_mac.sh`` instead.


.. _test-on-sphinx:

Sphinx local installation
=========================

For the Sphinx documentation setup locally you will need to:

* :ref:`Install Sphinx <sphinx_install>` sphinx_install

* To generate HTML documentation, use the command::

    make html

which will generate static pages in the ``build``-directory as long as you have the software Sphinx installed locally.


.. _test-on-github:

Github edit/preview
===================

For small changes you can edit a page directly from your GitHub fork webview.
The `preview` button does not give a fully compatible *rst* overview, but is
sufficient for textual changes.


.. _`Grid Github repo`: https://github.com/sara-nl/griddocs
.. _`Sphinx`: http://www.sphinx-doc.org
.. _`ReadTheDocs`: https://readthedocs.org/
