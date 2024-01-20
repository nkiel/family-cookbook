@echo off
:PARSE
IF "%~1"=="" GOTO START
IF "%~1"=="start" GOTO START
IF "%~1"=="stop" GOTO STOP
SHIFT
GOTO PARSE
:END_PARSE
:START
docker compose -f %~dp0\docker-compose.yml -p family-cookbook_devcontainer up -d db
GOTO END
:STOP
docker compose -f %~dp0\docker-compose.yml -p family-cookbook_devcontainer stop db
:END