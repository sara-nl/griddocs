#!/usr/bin/env bash

# Usage: build.sh [output_directory [docker_image_name]]
set -e
# Parse the parameters
if [[ "xx" != "x${1}x" ]]; then
  OUTPUT_DIR="${1}"
else
  OUTPUT_DIR="./build"
fi

if [[ "xx" != "x${2}x" ]]; then
  DOCKER_IMAGE="${2}"
else
  DOCKER_IMAGE="rtfd-build:base"
fi

# Create the output directory
if [[ -e ${OUTPUT_DIR} ]]; then
  echo "Output directory already exists. Doing nothing. Supplied output directory: ${OUTPUT_DIR}"
  exit 1
fi
mkdir -p "${OUTPUT_DIR}"
rmdir "${OUTPUT_DIR}" # This seems odd, but makes sure all parent directories exist and that I can copy the temporary output directory to this location under the specified name

# Create a temporary directory for the output which is world writable
TEMP_BUILD_DIR=$(mktemp --tmpdir --directory rtfd_build_tempdir_XXXXXXXXXX)
trap "rm -rf ${TEMP_BUILD_DIR}" ERR
chmod 2777 ${TEMP_BUILD_DIR}

# Build the documentation in a docker container
SCRIPT=$(cat <<EOF
umask 0002
virtualenv ~/venv
source ~/venv/bin/activate
pip install sphinx
sphinx-build -b html /source/source/ /target/
EOF
)
pushd "$( dirname "${BASH_SOURCE[0]}" )"
sudo docker run --rm --volume "${PWD}:/source" --volume "${TEMP_BUILD_DIR}:/target" "${DOCKER_IMAGE}" /bin/bash -c "${SCRIPT}"
popd

# Copy the output to the final output directory and remove the temporary one. This ensures that the files are owned by the correct user
cp -r "${TEMP_BUILD_DIR}" "${OUTPUT_DIR}"
rm -rf "${TEMP_BUILD_DIR}"

exit 0
