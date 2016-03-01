.. _docker-install:

******************************
Setup readthedocs Docker image
******************************

===========
Preparation
===========

Before you start with the Docker image, make sure that:

* You have `Docker Engine installed <https://docs.docker.com/engine/installation/>`_ 
* Docker is running on your host
* You have cloned the ``griddocs`` repository

===========
Build image
===========

The Dockerfile for this image can be found in ReadTheDoc's GitHub repository: https://github.com/rtfd/readthedocs-docker-images It is also added as a submodule. 

To build the image in Linux, run:

.. code-block:: console
   :linenos:
  
   $git submodule init
   $git submodule update
   $cd readthedocs-docker-images
   $sudo docker build -t rtfd-build:base base/

.. note:: In Mac OS X (with boot2docker or docker-machine), you can use the same command (``docker build``), except you do not need to prefix the build line with ``sudo``.
