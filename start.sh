#!/bin/sh

set -e

# Run database migrations
echo "Running database migrations..."
yarn medusa db:migrate

echo "Starting Medusa production server..."
yarn start
