#!/bin/sh
CABAL_PATH=`which cabal`
 
if [ "X" != "X$CABAL_PATH" ]; then
  echo "cabal found at: $CABAL_PATH"
  exit 0
else
  echo -e "Content-Length: 184\r\n\r"
  echo '{"command":"initialize","success":false,"request_seq":1,"seq":1,"type":"response","message":"cabal is not found. Please install it using `ghcup install cabal` or your package manager."}'
  exit 1
fi
 
 