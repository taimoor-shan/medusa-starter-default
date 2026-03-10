#!/bin/sh

set -e

# Build the application
echo "Building Medusa..."
yarn build

# Run database migrations
echo "Running database migrations..."
yarn medusa db:migrate

echo "Starting Medusa server..."
yarn start
