#!/usr/bin/env python

import pythonpath
import gfal
import time
import re
import sys
from string import strip

m=re.compile('/pnfs')

f=open('files','r')
urls=f.readlines()
f.close()

surls=[]
for u in urls:
    surls.append(m.sub('srm://srm.grid.sara.nl:8443/srm/managerv2?SFN=/pnfs',strip(u)))


req={}

# Set the timeout to 24 hours
# gfal_set_timeout_srm  Sets  the  SRM  timeout, used when doing an asyn-
# chronous SRM request. The request will be aborted if it is still queued
# after 24 hours.
gfal.gfal_set_timeout_srm(86400)

req.update({'surls':surls})
req.update({'setype':'srmv2'})
req.update({'no_bdii_check':1})
req.update({'protocols':['gsiftp']})

#Set the time that the file stays pinned on disk for a week (604800 sec)
req.update({'srmv2_desiredpintime':604800})

returncode,object,err=gfal.gfal_init(req)
if returncode != 0:
        sys.stderr.write(err+'\n')
        sys.exit(1)

returncode,object,err=gfal.gfal_prestage(object)
if returncode != 0:
    sys.stderr.write(err+'\n')
    sys.exit(1)
del req

