@echo off
where ghcid >nul 2>nul
if %errorlevel% equ 0 (
  echo ghcid is installed
  exit /b 0
) else (
  echo Content-Length: 181
  echo.
  echo {"command":"initialize","success":false,"request_seq":1,"seq":1,"type":"response","message":"ghcid is not found. Please install it using `cabal install ghcid` or `stack install ghcid`."}
  exit /b 1
)
