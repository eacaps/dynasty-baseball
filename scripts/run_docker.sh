#!/bin/bash
TAG=${TAG:-latest}
PORT=${PORT:-3001}

docker run -p $PORT:3000 eacaps/dynasty-baseball:$TAG