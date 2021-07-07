#!/bin/bash
TAG=${TAG:-latest}
PORT=${PORT:-8080}

docker run -p $PORT:8080 eacaps/dynasty-baseball:$TAG