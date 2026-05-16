FROM php:8.4-cli-alpine

RUN apk add --no-cache \
    bash \
    git \
    unzip \
    zip

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/apps/bff

COPY apps/bff/composer.json apps/bff/composer.lock ./
RUN composer install --no-interaction --prefer-dist --no-scripts

EXPOSE 8000
