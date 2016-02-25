#!/usr/bin/env python
##!/bin/sh
#python -m  SimpleHTTPServer 8000

import SocketServer
import BaseHTTPServer
import SimpleHTTPServer

class ThreadingHTTPServer(SocketServer.ThreadingMixIn, BaseHTTPServer.HTTPServer):
    pass

s = ThreadingHTTPServer(('',8000), SimpleHTTPServer.SimpleHTTPRequestHandler)
s.serve_forever()
