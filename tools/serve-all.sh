#!/bin/bash
cd dist/apps

cd shell
http-server-spa . ./index.html 4200 &

cd ../
http-server feed --port 4201 &
http-server user --port 4202 &
http-server login --port 4203 &
http-server navigation-bar --port 4204 &
wait
