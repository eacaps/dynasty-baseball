FROM node:14-alpine3.13
RUN mkdir /app
WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY snowpack.config.js .
COPY public/ public
COPY server/ server
COPY src/ src

# TODO: Need to precompile snowpack too
RUN npm ci
RUN npm run build

COPY dist/ dist

CMD npm run server