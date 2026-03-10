#!/bin/sh

set -e

# Increase Node.js heap size to avoid OOM during admin dashboard compilation
export NODE_OPTIONS="--max-old-space-size=4096"

# Build the application
echo "Building Medusa..."
yarn build

# Run database migrations
echo "Running database migrations..."
yarn medusa db:migrate

echo "Starting Medusa server..."
yarn start
