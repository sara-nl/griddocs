#!/bin/bash

cat /proc/self/status | grep 'Cpus_allowed_list:'
echo
/usr/bin/nvidia-smi

pwd

hostname

/cvmfs/oasis.opensciencegrid.org/mis/apptainer/bin/apptainer run --nv /cvmfs/softdrive.nl/lodewijkn/cuda_example_unpacked.sif
