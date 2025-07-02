#!/bin/sh
GHCID_PATH=`which ghcid`

if [ "X" != "X$GHCID_PATH" ]; then
  echo "ghcid found at: $GHCID_PATH"
  exit 0
else
  echo -e "Content-Length: 181\r\n\r"
  echo '{"command":"initialize","success":false,"request_seq":1,"seq":1,"type":"response","message":"ghcid is not found. Please install it using `cabal install ghcid` or `stack install ghcid`."}'
  exit 1
fi
