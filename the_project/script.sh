#!/usr/bin/env bash



curl -H 'Content-Type: application/json' \
      -d '{ "todo":"aaaaaaaaaaa"}' \
      -X POST \
      http://localhost:8081/todos
