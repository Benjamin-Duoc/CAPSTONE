#!/bin/bash
# Script to run the backend in production mode

echo "🚀 Starting CIPRESS Backend in PRODUCTION mode..."

# Set environment variable
export FLASK_ENV=production

# Run the application
cd "$(dirname "$0")"
python run.py
