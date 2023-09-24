FROM node:18.18.0-alpine

RUN apk add --no-cache bash

# remove existing user
RUN deluser --remove-home node

ARG PUID=1000
ENV PUID ${PUID}
ARG PGID=1000
ENV PGID ${PGID}

RUN addgroup -g ${PGID} docker && \
    adduser --uid ${PUID} --disabled-password --shell /bin/bash --ingroup docker docker

RUN mkdir /home/docker/.ssh

USER docker

WORKDIR /app
