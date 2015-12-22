# Documentation HOW-TO

This directory contains the source code of documenation maintained with
the Spinx documentation system. The README you are reading now contains
instructions for setting up your environment for building the
documentation.


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