#!/usr/bin/env bash

LOCATION=`curl --silent --location --output /dev/null --write-out "%{url_effective}\n" https://en.wikipedia.org/wiki/Special:Random `
echo "$LOCATION"

curl -H 'Content-Type: application/json' \
      -d '{ "todo":"Read '$LOCATION'"}' \
      -X POST \
      http://backend-svc:7892/todos
