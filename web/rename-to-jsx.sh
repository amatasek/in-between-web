#!/bin/bash
# Script to rename all .js files that contain JSX to .jsx and update imports

# Colors for better output
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
BLUE="\033[0;34m"
NC="\033[0m" # No Color

echo -e "${BLUE}=== Converting React components from .js to .jsx ===${NC}"
echo -e "${YELLOW}This is the modern best practice for React applications${NC}"
echo ""

# Create a temporary file to store the list of renamed files
TMP_FILE=$(mktemp)

# Find all .js files in the src directory
echo -e "${YELLOW}Scanning for React components...${NC}"
find src -name "*.js" -type f | while read file; do
  # Check if the file contains JSX syntax with a more comprehensive pattern
  if grep -q -E "<[a-zA-Z][a-zA-Z0-9]*[^>]*>|<\/[a-zA-Z][a-zA-Z0-9]*>|React\.createElement|jsx|import React" "$file"; then
    # Get the new filename with .jsx extension
    newfile="${file%.js}.jsx"
    # Rename the file
    mv "$file" "$newfile"
    echo -e "${GREEN}✓ Renamed:${NC} $file → $newfile"
    
    # Store the old and new filenames for later processing
    echo "$file:$newfile" >> "$TMP_FILE"
  fi
done

# Count how many files were renamed
RENAMED_COUNT=$(wc -l < "$TMP_FILE")

# Update import statements in all JS and JSX files
if [ "$RENAMED_COUNT" -gt 0 ]; then
  echo ""
  echo -e "${YELLOW}Updating import statements in other files...${NC}"
  
  # Process each renamed file and update imports in all js/jsx files
  while IFS=":" read -r oldfile newfile; do
    # Get just the filename without extension for search/replace
    oldbase=$(basename "$oldfile" .js)
    
    # Find all JS and JSX files and update import statements
    find src -name "*.js" -o -name "*.jsx" | xargs grep -l "$oldbase" | while read srcfile; do
      # Skip the file itself
      if [ "$srcfile" != "$newfile" ]; then
        # Replace import statements to use .jsx extension
        sed -i '' "s|from '[./]*$oldbase'|from '&.jsx'|g" "$srcfile"
        sed -i '' "s|from \"[./]*$oldbase\"|from \"&.jsx\"|g" "$srcfile"
        echo -e "${GREEN}✓ Updated imports in:${NC} $srcfile"
      fi
    done
  done < "$TMP_FILE"
fi

# Clean up
rm "$TMP_FILE"

echo ""
echo -e "${GREEN}=== Conversion complete! ===${NC}"
echo -e "${GREEN}$RENAMED_COUNT files converted to .jsx${NC}"
echo -e "${YELLOW}Your React application now follows modern best practices for file extensions.${NC}"
