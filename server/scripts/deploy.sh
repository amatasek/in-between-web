#!/bin/bash

# Production deployment script for In-Between server
# This script should be run on the production server

# Stop on errors
set -e

echo "Starting In-Between server deployment..."

# Navigate to the application directory
cd /opt/in-between

# Pull latest changes from git
echo "Pulling latest changes from git..."
git pull

# Install dependencies
echo "Installing dependencies..."
npm ci --production

# Create database directory if it doesn't exist
echo "Setting up database directory..."
mkdir -p /opt/in-between/db
chmod 755 /opt/in-between/db

# Set environment variables
export NODE_ENV=production
export JWT_SECRET=your-production-jwt-secret
export PORT=3002
export CORS_ORIGIN=https://in-between.live

# Restart the application using PM2
echo "Restarting application..."
pm2 restart in-between-server || pm2 start server/src/index.js --name in-between-server

echo "Deployment completed successfully!"
