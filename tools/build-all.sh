#!/bin/bash

nx build shell &
nx build login &
nx build navigation-bar &
nx build feed &
nx build user &
wait
