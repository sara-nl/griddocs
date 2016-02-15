.. toctree::
   :hidden:
   
   sphinx_cheatsheet
   docker_install
   sphinx_install

.. _doc-howto:

********************
Documentation how-to
********************

This page explains how you can edit the documentation, how to generate HTML documentation from the source and how to install the software needed for this. Some handy links:

* The Grid documentation page is: http://doc.grid.surfsara.nl/
* The source code of documentation is in GitHub: https://github.com/sara-nl/griddocs/tree/master/source/
* The readthedocs overview page is: https://readthedocs.org/projects/grid-documentation/

When changes are committed using Git and pushed to the SURFsara GitHub repository, the documentation is automatically rebuild and published by readthedocs.org.

We have some :ref:`style guidelines <doc-style>` to encourage a consistent style. But don't worry too much about that: any contribution is welcome.


.. _contribute-github:

===========================
Contributing through GitHub
===========================

You are welcome to add and improve the documentation directly to the repository. For this, you’ll need a GitHub account and a little knowledge of git:

1. `Fork <https://help.github.com/articles/fork-a-repo/>`_ our repository
2. Git pull your fork
3. Make your changes, commit and push them back to GitHub
4. Create a `pull request <https://help.github.com/articles/proposing-changes-to-a-project-with-pull-requests/>`_ to inform us of your changes
5. After we’ve reviewed and accepted your work, we will merge your commits and the documentation will be updated automatically

All documentation is written in Sphinx *restructed text*. Behind the scenes we use ReadTheDocs.org to automatically publish the documentation. Below are some useful links to documentation on these techniques and systems:

 * A simple Sphinx cheatsheet: :ref:`cheatsheet`
 * `GitHub’s git cheat sheet <https://help.github.com/articles/git-cheatsheet/>`_

However, don’t worry too much about all this new information. You’ll see that Sphinx is quite intuitive. Besides, we will check your changes too. If you find it all too overwhelming anyway, or if you just don’t feel like going through all this hustle, you are always free to just send us an e-mail with your remarks and we will change the documentation ourselves: helpdesk@surfsara.nl

.. _overview:

========
Overview
========

The philosophy of Sphinx documentation is that content is stored in files that can be easily read *and* edited by humans, in a format called *restructured text*, with the file extension ``.rst``. Using a simple grammar, text can be styled. The document is structured using special tags; using these tags, documentation can be split into multiple files, and you can cross-reference between files and build indexes.

.. _editing:

=================
Editing / preview
=================

Because the syntax of the files is human readable, you can edit the files using your favorite text editor. Once you are done editing, you can generate documentation in various formats, such as HTML or epub. While you can edit the pages on virtually any system, it is recommended to preview your changes before publishing them.

There are different ways to generate the HTML documentation from source and review your changes:

* Docker image
* Sphinx local installation
* GitHub edit/preview

Note that you only need to use one of the options mentioned above. Using Docker is the preferred way, as this mimics the ReadTheDocs build system closest. GitHub edit/preview on the other hand is good enough for minor, textual changes, but is otherwise the least preferred option.

.. _test-on-docker:

Docker image
============

This is the preferred option to build and test your changes. It tries to build the documentation the same way as readthedocs.org.

* Setup the Docker image. The instructions for different OS are :ref:`here <docker-install>`
* Once build, you can use it to build your documentation in the same build environment as used by their production server::

    ./build.sh

.. note:: For Mac OS X, please use ``./build_mac.sh`` instead.

Optionally you can provide an output location (default: ./build) and the docker image name (default: rtfd-build:base)::

    ./build.sh /alternative/output/path/ docker_image_alternative_name

.. _test-on-sphinx:

Sphinx local installation
=========================

For the Sphinx documentation setup locally you will need to:

* Install Sphinx to your computer. The instructions for different OS are :ref:`here <sphinx-install>`
* ``Clone`` the current repo locally to fetch the source code or ``pull`` to update your local copy with the latest changes.
* To generate HTML documentation, use the command::

    make html

which will generate static pages in the ``build``-directory as long as you have the software Sphinx installed locally.

.. _test-on-github:

Github edit/preview
===================

For small changes you can edit a page directly from the GitHub repo. The `preview` button does not give a fully compatible *rst* overview, but is sufficient for textual changes.

.. _publish:

===============
Publish changes
===============

When you are done with your changes, commit and push to GitHub. See :ref:`contribute-github` on how to push your changes to our documentation.
