# -- BUILD STAGE --------------------------------

FROM node:18.14.0-bullseye-slim AS build
WORKDIR /src

# Define build arguments & map them to environment variables
ARG NPM_TOKEN
ARG FONTAWESOME_TOKEN
ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json ./
COPY yarn.lock ./
COPY .npmrc ./
RUN yarn install --frozen-lockfile

# Build the project and then dispose files not necessary to run the project
# This will make the runtime image as small as possible
COPY next-env.d.ts ./
COPY tsconfig.json ./
COPY .eslintrc.json ./
COPY next.config.js ./
COPY src ./src/
COPY public ./public/

RUN npx next telemetry disable > /dev/null

ARG APP_ENV=production
RUN yarn build

# -- RUNTIME STAGE --------------------------------
FROM gcr.io/distroless/nodejs18-debian11:nonroot
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

COPY --from=build /src/.next/standalone /app/
COPY --from=build /src/.next/static /app/.next/static
COPY --chown=nonroot --from=build /src/public /app/public

# run as an unprivileged user
USER nonroot

# default next.js port
EXPOSE 3000

CMD ["/app/server.js"]
