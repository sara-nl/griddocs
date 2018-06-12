.. _glitece:

*********************
Grids jobs via direct creamce submission using glite-ce
*********************

The Workload Management System (WMS) is no longer officially supported. It is therefore 
unavoidable that sometime in the near-future the WMS will be decommissioned as the batch
scheduler for the Grid clusters at SURFsara. This will lead to changes for many Grid 
users, in particular in the way that they carry out job submission, monitoring and 
retrieval using the glite-wms commands. 

Here we describe an alternative method for handling Grid jobs by users. This method will
still work even when the WMS is no longer available. We refer to this method as direct 
creame submission and it makes use of glite-ce commands. These commands are similar to 
the glite-wms commands. However, there are a few differences that we will describe here.

We first briefly recap Grid jobs using basic glite-wms commands (1). We then list the 
glite-ce commands corresponding to the the most common glite-wms commands (2). We discuss 
the differences regarding the JDL file setup (3). We end by showing an example Grid job 
submitted with glite-wms and with glite-ce and discuss the differences (4).