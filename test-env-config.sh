#!/bin/bash
# Test script to verify environment configuration

echo "🧪 Testing Environment Configuration..."
echo ""

# Test Frontend
echo "📱 Frontend Configuration:"
echo "  .env.development exists: $([ -f project/.env.development ] && echo '✅' || echo '❌')"
echo "  .env.production exists: $([ -f project/.env.production ] && echo '✅' || echo '❌')"
echo "  src/config/env.ts exists: $([ -f project/src/config/env.ts ] && echo '✅' || echo '❌')"
echo ""

# Test Backend
echo "🔧 Backend Configuration:"
echo "  .env.development exists: $([ -f backend/.env.development ] && echo '✅' || echo '❌')"
echo "  .env.production exists: $([ -f backend/.env.production ] && echo '✅' || echo '❌')"
echo "  run-dev.sh exists: $([ -f backend/run-dev.sh ] && echo '✅' || echo '❌')"
echo "  run-prod.sh exists: $([ -f backend/run-prod.sh ] && echo '✅' || echo '❌')"
echo "  run-dev.sh executable: $([ -x backend/run-dev.sh ] && echo '✅' || echo '❌')"
echo "  run-prod.sh executable: $([ -x backend/run-prod.sh ] && echo '✅' || echo '❌')"
echo ""

# Check environment variables in files
echo "📋 Environment Variables Check:"
echo ""
echo "Frontend Development (.env.development):"
cat project/.env.development | grep -v '^#' | grep -v '^$'
echo ""
echo "Frontend Production (.env.production):"
cat project/.env.production | grep -v '^#' | grep -v '^$'
echo ""
echo "Backend Development (.env.development):"
cat backend/.env.development | grep -v '^#' | grep -v '^$' | head -5
echo "  ..."
echo ""
echo "Backend Production (.env.production):"
cat backend/.env.production | grep -v '^#' | grep -v '^$' | head -5
echo "  ..."
echo ""

echo "✅ Configuration check complete!"
echo ""
echo "To test the application:"
echo "  Development: cd backend && ./run-dev.sh"
echo "  Production:  cd backend && ./run-prod.sh"
