#!/usr/bin/env bash

#supervisor ./server/server.js
supervisor -w server -e js -x node server/server.js

