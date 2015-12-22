# Documentation HOW-TO

This directory contains the source code of documenation maintained with
the Spinx documentation system. The README you are reading now contains
instructions for setting up your environment for building the
documentation.

When changes are commited using Git and pushed to the correct GitHub repository,
the documentation is automatically rebuild and published by readthedocs.org.

## Overview

The philosophy of Sphinx documentation is that content is stored in files
that can be easily read *and* edited by humans, in a format called
*restructured text*, with the file extension ```.rst```. Using a simple
grammar, text can be styled. The document is structured using special
tags; using these tags, documentation can be split into multiple files,
and you can cross-reference between files, build indexes. 

Because the syntax of the files human readable, you edit the files using
your favourite text editor. Once you are done editing, you can generate
documentation in various formats, such as HTML or epub. To generate HTML
documenation, use the command
```
    make html
```
which will generate static pages in the ```build```-directory using the
software called Sphinx.

### Extensions

To use additional extensions in your ```.rst``` files _e.g. embed youtube videos_, 
you need install the extension from [sphinx-contrib](http://sphinx-doc.org/develop.html) 
repository.  

## Testing / preview

To test/preview your changes, you can build the documentation using 'make html'
as described above. However, to be sure it is processed correctly by
readthedocs.org, or if you do not want to install the necessary tools locally,
you can use their Docker image. The Dockerfile for this image can be found in
their GitHub repository: https://github.com/rtfd/readthedocs-docker-images

I have also added it as a submodule. So to build the image in Linux, run:

```bash
git submodule init
git submodule update
cd readthedocs-docker-images
sudo docker build -t rtfd-build:base base/
```

In Mac OS X (with boot2docker or docker-machine), you can probably use the same
command, except you do not need to prefix the build line with 'sudo'.

Once build, you can use it to build your documentation in the same build
environment as used by their production server:

```bash
./build.sh
```

Optionally you can provide an output location (default: ./build) and the docker
image name (default: rtfd-build:base):

```bash
./build.sh /alternative/output/path/ docker_image_alternative_name
```

For Mac OS X, you can use ./build_mac.sh instead.
