FROM alpine:latest

RUN /sbin/apk update --no-cache \
    && /sbin/apk upgrade --no-cache \
    && /bin/rm -rf /var/cache/apk/*

RUN apk add --no-cache nodejs npm bash

WORKDIR /var/www/

# COPY package.json /var/www/hortmann-cars/package.json

RUN npm init -y

RUN npm install

RUN npm install -g typescript

RUN chown -R root:root /var/www

COPY . /var/www/