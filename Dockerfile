FROM node:current-alpine3.12 AS builder

ARG NPM_TOKEN
ARG FONTAWESOME_TOKEN

COPY .npmrc.default /src/
COPY package.json /src/
COPY yarn.lock /src/

RUN set -xe \
	&& cd /src \
	&& mv .npmrc.default .npmrc \
	&& yarn install

COPY . /src

RUN set -xe \
	&& cd /src \
	&& yarn build \
	&& rm -rf .npmrc node_modules

FROM node:current-alpine3.12

ARG NPM_TOKEN
ARG FONTAWESOME_TOKEN

COPY --from=builder /src/.next /app/.next
COPY .npmrc.default /app/
COPY package.json /app/

WORKDIR /app

RUN set -xe \
	&& mv .npmrc.default .npmrc \
	&& yarn install --production=true

RUN rm -rf .npmrc

CMD [ "yarn", "start" ]
