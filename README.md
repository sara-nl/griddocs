# Documentation HOW-TO

This directory contains the source code of documenation maintained with
the Sphinx documentation system. The README you are reading now explains 
how to install the software, how to build the documentation and generate 
HTML documentation from the source. The information here applies to 
members of the github group `sara-nl`.

* The Grid documentation page is: http://doc.grid.surfsara.nl/
* The source code of documenation is here: https://github.com/sara-nl/griddocs/tree/master/source/
* The readthedocs overview page is: https://readthedocs.org/projects/grid-documentation/

When changes are commited using Git and pushed to the correct GitHub repository,
the documentation is automatically rebuild and published by readthedocs.org.


## Overview

The philosophy of Sphinx documentation is that content is stored in files
that can be easily read *and* edited by humans, in a format called
*restructured text*, with the file extension ```.rst```. Using a simple
grammar, text can be styled. The document is structured using special
tags; using these tags, documentation can be split into multiple files,
and you can cross-reference between files, build indexes. 


## Editing / preview

Because the syntax of the files human readable, you edit the files using
your favourite text editor. Once you are done editing, you can generate
documentation in various formats, such as HTML or epub. 

There are different was to generate the HTML documentation from source and apply your changes:

* Sphinx local installation
* Docker image
* Github edit/preview

### Sphinx local installation

For the Sphinx documentation setup locally you will need to:

* Install Sphinx to your laptop. The instructions for different OS are [here](https://github.com/sara-nl/griddocs/blob/master/sphinx-install.md)
* `Clone` the current repo locally if to fetch the source code or `pull` to incorporates changes.
* To generate HTML documenation, use the command:

```
    make html
```
which will generate static pages in the ```build```-directory as long as you have the
software Sphinx installed locally.

### Docker image

To test/preview your changes, you can build the documentation using 'make html'
as described above. However, to be sure it is processed correctly by
readthedocs.org, or if you do not want to install the necessary tools locally,
you can use their Docker image. 

* Setup the Docker image. The instructions for different OS are [here](https://github.com/sara-nl/griddocs/blob/master/readdocs-docker-install.md)
* Once build, you can use it to build your documentation in the same build
environment as used by their production server:

```bash
./build.sh
```

> Note:  For Mac OS X, please use `./build_mac.sh` instead.

Optionally you can provide an output location (default: ./build) and the docker
image name (default: rtfd-build:base):

```bash
./build.sh /alternative/output/path/ docker_image_alternative_name
```

### Github edit/preview

For small changes you can edit a page directly from the Github repo. The `preview` button 
does not give a fully compatible `rst` overview, but is sufficient for text changes.

## Publish changes

When you are done with your changes, commit and push to this repo. Is automatically published 
by readthedocs.org on the production server.




