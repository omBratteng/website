# image used for the healthcheck binary
FROM golang:1.15.2-alpine AS gobuilder
COPY healthcheck/ /go/src/healthcheck/
RUN CGO_ENABLED=0 go build -ldflags '-w -s -extldflags "-static"' -o /healthcheck /go/src/healthcheck/

# -- BASE STAGE --------------------------------

FROM node:14-alpine AS base

ARG NPM_TOKEN
ARG FONTAWESOME_TOKEN

WORKDIR /src

COPY package.json ./
COPY yarn.lock ./
COPY .npmrc ./
RUN yarn install --frozen-lockfile

# # -- CHECK STAGE --------------------------------

FROM base AS check

ARG CI
ENV CI $CI

COPY . .
RUN yarn lint
# RUN npm test

# -- BUILD STAGE --------------------------------

FROM base AS build

# Define build arguments & map them to environment variables
# ARG GTM_CONTAINER_ID
# ARG SITE_URL
# ENV GTM_CONTAINER_ID $GTM_CONTAINER_ID
# ENV SITE_URL $SITE_URL
ARG NPM_TOKEN
ARG FONTAWESOME_TOKEN

# Build the project and then dispose files not necessary to run the project
# This will make the runtime image as small as possible
COPY . .
RUN npx next telemetry disable > /dev/null
RUN yarn build
RUN yarn install --production
RUN rm -rf .next/cache

# -- RUNTIME STAGE --------------------------------

FROM node:14-alpine AS runtime

WORKDIR /usr/app

COPY --from=build /src/package.json /usr/app/package.json
COPY --from=build /src/node_modules /usr/app/node_modules
COPY --from=build /src/.next /usr/app/.next
COPY --from=build /src/public /usr/app/public
COPY --from=build /src/content /usr/app/content
COPY --from=build /src/next.config.js /usr/app/next.config.js

HEALTHCHECK --interval=5s --timeout=10s --retries=3 CMD [ "/healthcheck", "3000" ]

ENV PORT 3000
EXPOSE $PORT
CMD yarn start -p $PORT
