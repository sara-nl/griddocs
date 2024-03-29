#!/usr/bin/env python

# Authors:
#    Written by Ron Trompert.
#    Some small modifications by Onno Zweers, inspired by https://gitlab.cern.ch/dmc/gfal2-bindings/tree/develop/example/python.
#    Modifictions to accept any SURL, catch empty tokens and Python3 support by Natalie Danezi.
# Support:
#    Contact <helpdesk@surfsara.nl>

import gfal2
import errno
import sys
import time
import argparse
import textwrap

parser=argparse.ArgumentParser(
    formatter_class=argparse.RawDescriptionHelpFormatter,
    description=textwrap.dedent('''\

        This script will stage (bring online) all files listed
        in the file specified with '--file'. The paths should be
        listed with the following format:
        srm://...

        Usage:
        $ python stage.py --file [srmlist] [--pintime pintime]

        Script output:
        "Got token [token_id]" ==>
        A token [token_id] is returned when at least one of the [srmlist]
        files is on tape.
        When all files are online, no token is returned.
        '''))

parser.add_argument('--file', action="store", dest="file", required=True,
    help='File containing file names to be staged starting with: srm://...')
parser.add_argument('--pintime', action="store", dest="pintime", required=False,
    type=int, default=1209600,
    help='Pintime in seconds (how long should the file stay pinned), default 1209600 (= two weeks)')

args=parser.parse_args()

surls=[]
f=open(args.file,'r')
surls=f.read().splitlines()
f.close()

context = gfal2.creat_context()

try:
    # bring_online(surls, pintime, timeout, async)
    # Parameters:
    #   surls is the given [srmlist] argument
    #   pintime in seconds (how long should the file stay PINNED), e.g. value 1209600 will pin files for two weeks
    #   timeout of request in seconds, e.g. value 604800 will timeout the requests after a week
    #   async is asynchronous request (does not block if != 0)
    (status, token) = context.bring_online(surls, args.pintime, 604800, True)
    if token:
        print(("Got token %s" % token))
    else:
        print("No token was returned. Are all files online? Check with state.py")
except gfal2.GError as e:
    print("Could not bring the files online:")
    print(("\t", e.message))
    print(("\t Code", e.code))
    sys.exit(1)
