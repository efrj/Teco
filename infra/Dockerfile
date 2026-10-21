FROM php:8.4-apache

# Update and install packages in one step
RUN apt-get update && \
    apt-get install -y \
    zip \
    libzip-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions (simplificado)
RUN docker-php-ext-install zip pdo pdo_mysql

# Enable mod_rewrite
RUN a2enmod rewrite

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy application
COPY ../www /var/www/html

WORKDIR /var/www/html

EXPOSE 80