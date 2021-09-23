# Install dependencies only when needed
FROM node:alpine AS frontend-deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY ./frontend/package.json ./frontend/yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:alpine AS frontend-builder
WORKDIR /app
COPY ./frontend/ .
# Build vars
ARG NEXT_PUBLIC_API_BASE="http://localhost:3000"
ARG NEXT_PUBLIC_GITHUB="marnixah"
ARG NEXT_PUBLIC_NAME="Marnix Hage"
ARG NEXT_PUBLIC_EMAIL="business@marnixah.com"
ENV NEXT_PUBLIC_API_BASE ${NEXT_PUBLIC_API_BASE}
ENV NEXT_PUBLIC_GITHUB ${NEXT_PUBLIC_GITHUB}
ENV NEXT_PUBLIC_NAME ${NEXT_PUBLIC_NAME}
ENV NEXT_PUBLIC_EMAIL ${NEXT_PUBLIC_EMAIL}

COPY --from=frontend-deps /app/node_modules ./node_modules
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline
# Creates /app/out folder with static html
RUN npx next export

FROM node:latest AS laravel-node-builder
WORKDIR /app
COPY ./backend/laravel/ .
RUN npm install
RUN npm run production

FROM composer:latest AS laravel-composer-builder
WORKDIR /app
# TODO Need to find a better way of doing this...
COPY --from=laravel-node-builder /app/ /app/
RUN composer i --optimize-autoloader --no-dev
RUN php artisan config:cache
RUN php artisan route:cache
RUN php artisan view:cache
RUN php artisan optimize

FROM webdevops/php-apache:8.0-alpine AS laravel-runner
WORKDIR /app
COPY --from=laravel-composer-builder /app/ /app/
COPY --from=frontend-builder /app/out/ /app/public/
RUN chmod 0777 -R /app/storage/
ENV WEB_DOCUMENT_ROOT /app/public/