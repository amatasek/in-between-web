#!/bin/bash
# Script to fix the import statements that were incorrectly updated

# Colors for better output
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
BLUE="\033[0;34m"
NC="\033[0m" # No Color

echo -e "${BLUE}=== Fixing import statements in JSX files ===${NC}"

# Find all JSX files
find src -name "*.jsx" -type f | while read file; do
  # Fix the incorrect import statements
  # Replace 'from './Component'.jsx' with './Component.jsx'
  sed -i '' "s|from 'from '\(.*\)'.jsx'|from '\1.jsx'|g" "$file"
  sed -i '' "s|from \"from \"\(.*\)\".jsx\"|from \"\1.jsx\"|g" "$file"
  
  echo -e "${GREEN}✓ Fixed imports in:${NC} $file"
done

echo ""
echo -e "${GREEN}=== Import fixes complete! ===${NC}"
echo -e "${YELLOW}Your React application is now ready to be built with Vite.${NC}"
