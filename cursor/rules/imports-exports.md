# Import and Export Rules

## Import Order
Organize imports in the following order, separated by a blank line between groups:
1. Built-in Node.js modules
2. External packages/libraries
3. Internal modules/components from other directories
4. Local modules/components from the same directory
5. CSS/SCSS imports

## Import Style
- Use named imports for specific functions/components
- Use default imports for main module exports
- Avoid `import *` syntax when possible

## Export Style
- Prefer named exports for utility functions and smaller components
- Use default exports for main components and class definitions
- Export types and interfaces separately from implementations

## Example

```javascript
// Built-in Node.js modules
import path from 'path';
import fs from 'fs';

// External packages
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

// Internal modules
import { useAuth } from '@/contexts/auth';
import Button from '@/components/Button';

// Local modules
import { formatCard } from './utils';
import CardStyles from './CardStyles';

// Styles
import './Card.css';
``` 