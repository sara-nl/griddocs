.. _sphinx-install:

**************
Sphinx-install
**************

============
Introduction
============

The Grid documentation itself is written in *restructured text*. The HTML documentation is generated using *Sphinx*.  This page explains how to install the Sphinx software.

=================
Installing Sphinx
=================

Linux
=====

On recent CentOS distributions, *Sphinx* is included in `epel <https://fedoraproject.org/wiki/EPEL>`_. Fedora has it included in the standard distribution. Install *sphinx* with::

    sudo yum install python-sphinx

On Ubuntu, install with::

    sudo apt-get install python-sphinx

Mac OS X
========

On Mac OS X, you will need `macports <https://www.macports.org>`_, so get that if you have not done so.

Next, follow the instructions on the `sphinx installation page <http://sphinx-doc.org/install.html>`_.

.. warning:: the standard terminal in Mac OS X has locale settings incompatible with sphinx; to change it once for a terminal session, type::

    export -n LC_CTYPE

  To change it permanently:

  1. open the terminal preferences
  2. go to the tab 'advanced'
  3. uncheck "Set locale environment variables on startup"
