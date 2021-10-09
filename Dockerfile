# Install dependencies only when needed
FROM node:alpine AS frontend-deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY ./frontend/package.json ./frontend/yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:alpine AS frontend-builder
ENV NODE_ENV production
WORKDIR /app
COPY ./frontend/ .
COPY --from=frontend-deps /app/node_modules ./node_modules
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline
# Creates /app/out folder with static html
RUN npx next export

FROM node:latest AS laravel-node-builder
WORKDIR /app
COPY ./backend/ .
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
RUN mkdir resources/views/errors
COPY --from=frontend-builder /app/out/404.html /app/resources/views/errors/404.blade.php
RUN chmod 0777 -R /app/storage/
ENV WEB_DOCUMENT_ROOT /app/public/
# This is stupid, I know this stupid, but I have to do this
# because this garbage framework loads environment variables at
# build time instead of at runtime like ANY properly written software
# or framework. If you have a better solution, please make a PR.
CMD ["bash", "-c", "php artisan config:cache && /usr/bin/python3 /usr/bin/supervisord -c /opt/docker/etc/supervisor.conf --logfile /dev/null --pidfile /dev/null --user root"]