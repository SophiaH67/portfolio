FROM node:latest AS node-builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run production

FROM composer:latest AS composer-builder
WORKDIR /app
# TODO Need to find a better way of doing this...
COPY --from=node-builder /app/ /app/
RUN composer i --optimize-autoloader --no-dev
RUN php artisan config:cache
RUN php artisan route:cache
RUN php artisan view:cache
RUN php artisan optimize

FROM webdevops/php-apache:8.0-alpine AS runner
WORKDIR /app
COPY --from=composer-builder /app/ /app/
RUN chmod 0777 -R /app/storage/
ENV WEB_DOCUMENT_ROOT /app/public/