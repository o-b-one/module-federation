#!/bin/bash
cd dist/apps

http-server shell --port 4200 &
http-server feed --port 4201 &
http-server user --port 4202 &
http-server login --port 4203 &
http-server navigation-bar --port 4204 &
wait
