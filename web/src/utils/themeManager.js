// Theme definitions
const themes = {
  default: {
    // Backgrounds
    '--bg-primary': '#1a2a3a',
    '--bg-secondary': '#2c3e50',
    '--bg-card': '#152534',
    '--bg-card-dark': '#1c2a3a',
    '--bg-panel-start': '#1e2a38',
    '--bg-panel-end': '#2980b9',
    '--bg-loading': '#1a1a2e',
    
    // Text colors
    '--text-primary': '#ecf0f1',
    '--text-secondary': '#bdc3c7',
    '--text-dark': '#2c3e50',
    '--text-light': '#ecf0f1',
    '--text-muted': '#7f8c8d',
    '--text-white': '#ffffff',
    '--text-gray': '#666666',
    '--text-error': '#e74c3c',
    '--text-success': '#2ecc71',
    '--text-warning': '#f1c40f',
    '--text-info': '#3498db',
    '--text-faded': 'rgba(255, 255, 255, 0.6)',
    '--text-subtle': 'rgba(255, 255, 255, 0.7)',
    '--text-bright': 'rgba(255, 255, 255, 0.9)',
    
    // Info colors
    '--info': '#3498db',
    '--info-dark': '#2980b9',
    '--info-light': '#5dade2',
    
    // Success colors
    '--success': '#2ecc71',
    '--success-dark': '#27ae60',
    '--success-light': '#58d68d',
    
    // Primary button (green gradient)
    '--btn-primary-start': '#3498db',
    '--btn-primary-end': '#27ae60',
    '--btn-primary-hover-start': '#3fa9e5',
    '--btn-primary-hover-end': '#2ecc71',
    
    // Secondary button (gray)
    '--btn-secondary-start': 'rgba(52, 73, 94, 0.9)',
    '--btn-secondary-end': 'rgba(44, 62, 80, 0.9)',
    '--btn-secondary-hover-start': 'rgba(52, 73, 94, 1)',
    '--btn-secondary-hover-end': 'rgba(44, 62, 80, 1)',
    
    // Tertiary button (blue)
    '--btn-tertiary-start': '#3498db',
    '--btn-tertiary-end': '#2980b9',
    '--btn-tertiary-hover-start': '#5faee3',
    '--btn-tertiary-hover-end': '#3498db',
    '--btn-tertiary-shadow': 'rgba(52, 152, 219, 0.3)',
    
    // Special colors
    '--color-focus': '#00ff88',
    '--color-focus-shadow': 'rgba(0, 255, 136, 0.3)',
    '--color-divider-start': 'rgba(52, 152, 219, 0.2)',
    '--color-divider-middle': 'rgba(52, 152, 219, 0.8)',
    '--color-divider-end': 'rgba(52, 152, 219, 0.2)',
    '--accent': '#f1c40f',
    '--accent-dark': '#d4ac0d',
    '--secondary': '#e74c3c',
    '--secondary-dark': '#c0392b'
  },
  light: {
    // Backgrounds - Cotton candy dreams
    '--bg-primary': '#fef0ff',
    '--bg-secondary': '#fff0f8',
    '--bg-card': '#ffffff',
    '--bg-card-dark': '#ffe8f5',
    '--bg-panel-start': '#e6f2ff',
    '--bg-panel-end': '#ffb3e6',
    '--bg-loading': '#fff5fb',
    
    // Text colors - Deep ocean blues and purples
    '--text-primary': '#2e3f7f',
    '--text-secondary': '#7b68ee',
    '--text-dark': '#1a237e',
    '--text-light': '#2e3f7f',
    '--text-muted': '#9c88ff',
    '--text-white': '#2e3f7f',
    '--text-gray': '#8e7fff',
    '--text-error': '#ff79a8',
    '--text-success': '#4cd964',
    '--text-warning': '#ff9500',
    '--text-info': '#5ac8fa',
    '--text-faded': 'rgba(46, 63, 127, 0.5)',
    '--text-subtle': 'rgba(46, 63, 127, 0.65)',
    '--text-bright': 'rgba(46, 63, 127, 0.85)',
    
    // Info colors - Bright sky blues
    '--info': '#5ac8fa',
    '--info-dark': '#32ade6',
    '--info-light': '#87ceeb',
    
    // Success colors - Spring green
    '--success': '#4cd964',
    '--success-dark': '#3fc550',
    '--success-light': '#76ff7a',
    
    // Primary button (Pink to Orange sunset)
    '--btn-primary-start': '#ff79a8',
    '--btn-primary-end': '#ff9500',
    '--btn-primary-hover-start': '#ff6fa3',
    '--btn-primary-hover-end': '#ff8800',
    
    // Secondary button (Soft lavender)
    '--btn-secondary-start': 'rgba(183, 153, 255, 0.3)',
    '--btn-secondary-end': 'rgba(255, 179, 230, 0.3)',
    '--btn-secondary-hover-start': 'rgba(183, 153, 255, 0.5)',
    '--btn-secondary-hover-end': 'rgba(255, 179, 230, 0.5)',
    
    // Tertiary button (Electric blue)
    '--btn-tertiary-start': '#5ac8fa',
    '--btn-tertiary-end': '#007aff',
    '--btn-tertiary-hover-start': '#32ade6',
    '--btn-tertiary-hover-end': '#0051d5',
    '--btn-tertiary-shadow': 'rgba(90, 200, 250, 0.3)',
    
    // Special colors
    '--color-focus': '#ff79a8',
    '--color-focus-shadow': 'rgba(255, 121, 168, 0.3)',
    '--color-border-light': 'rgba(183, 153, 255, 0.2)',
    '--color-border-lighter': 'rgba(183, 153, 255, 0.3)',
    '--color-divider-start': 'rgba(255, 149, 0, 0.15)',
    '--color-divider-middle': 'rgba(255, 149, 0, 0.5)',
    '--color-divider-end': 'rgba(255, 149, 0, 0.15)',
    '--accent': '#ff9500',
    '--accent-dark': '#ff8800',
    '--secondary': '#ff79a8',
    '--secondary-dark': '#ff6fa3'
  },
  dark: {
    // Backgrounds - deep greys that pop
    '--bg-primary': '#0a0a0a',
    '--bg-secondary': '#161616',
    '--bg-card': '#1a1a1a',
    '--bg-card-dark': '#222222',
    '--bg-panel-start': '#1f1f1f',
    '--bg-panel-end': '#2980b9',
    '--bg-loading': '#0d0d0d',
    
    // Text colors - better contrast
    '--text-primary': '#e8e8e8',
    '--text-secondary': '#a8a8a8',
    '--text-dark': '#ffffff',
    '--text-light': '#e8e8e8',
    '--text-muted': '#888888',
    '--text-white': '#ffffff',
    '--text-gray': '#999999',
    '--text-error': '#ff6b6b',
    '--text-success': '#51cf66',
    '--text-warning': '#ffd43b',
    '--text-info': '#4dabf7',
    '--text-faded': 'rgba(255, 255, 255, 0.45)',
    '--text-subtle': 'rgba(255, 255, 255, 0.6)',
    '--text-bright': 'rgba(255, 255, 255, 0.9)',
    
    // Info colors
    '--info': '#2980b9',
    '--info-dark': '#2471a3',
    '--info-light': '#3498db',
    
    // Success colors
    '--success': '#27ae60',
    '--success-dark': '#1e8449',
    '--success-light': '#2ecc71',
    
    // Primary button (dark theme: blue to accent)
    '--btn-primary-start': '#2980b9',
    '--btn-primary-end': '#f39c12',
    '--btn-primary-hover-start': '#3498db',
    '--btn-primary-hover-end': '#f1c40f',
    
    // Secondary button (dark gray)
    '--btn-secondary-start': 'rgba(33, 37, 41, 0.9)',
    '--btn-secondary-end': 'rgba(23, 25, 28, 0.9)',
    '--btn-secondary-hover-start': 'rgba(52, 58, 64, 1)',
    '--btn-secondary-hover-end': 'rgba(33, 37, 41, 1)',
    
    // Tertiary button (dark blue - matches theme primary)
    '--btn-tertiary-start': '#2980b9',
    '--btn-tertiary-end': '#1f618d',
    '--btn-tertiary-hover-start': '#3498db',
    '--btn-tertiary-hover-end': '#2980b9',
    '--btn-tertiary-shadow': 'rgba(41, 128, 185, 0.4)',
    
    // Special colors
    '--color-focus': '#00ccff',
    '--color-focus-shadow': 'rgba(0, 204, 255, 0.3)',
    '--color-border-light': 'rgba(255, 255, 255, 0.12)',
    '--color-border-lighter': 'rgba(255, 255, 255, 0.18)',
    '--color-divider-start': 'rgba(41, 128, 185, 0.2)',
    '--color-divider-middle': 'rgba(41, 128, 185, 0.8)',
    '--color-divider-end': 'rgba(41, 128, 185, 0.2)',
    '--accent': '#f39c12',
    '--accent-dark': '#d68910',
    '--secondary': '#c0392b',
    '--secondary-dark': '#a93226'
  },
  emerald: {
    // Backgrounds
    '--bg-primary': '#0f2818',
    '--bg-secondary': '#1a3d2e',
    '--bg-card': '#0d2016',
    '--bg-card-dark': '#122a1f',
    '--bg-panel-start': '#0f2818',
    '--bg-panel-end': '#27ae60',
    '--bg-loading': '#0a1f12',
    
    // Text colors
    '--text-primary': '#e8f5e9',
    '--text-secondary': '#a5d6a7',
    '--text-dark': '#1b5e20',
    '--text-light': '#e8f5e9',
    '--text-muted': '#81c784',
    '--text-white': '#ffffff',
    '--text-gray': '#689f38',
    '--text-error': '#f44336',
    '--text-success': '#4caf50',
    '--text-warning': '#ffeb3b',
    '--text-info': '#2ecc71',
    '--text-faded': 'rgba(232, 245, 233, 0.6)',
    '--text-subtle': 'rgba(232, 245, 233, 0.7)',
    '--text-bright': 'rgba(232, 245, 233, 0.9)',
    
    // Info colors (green theme)
    '--info': '#27ae60',
    '--info-dark': '#229954',
    '--info-light': '#2ecc71',
    
    // Success colors
    '--success': '#2ecc71',
    '--success-dark': '#27ae60',
    '--success-light': '#58d68d',
    
    // Primary button (emerald theme: green to yellow accent)
    '--btn-primary-start': '#27ae60',
    '--btn-primary-end': '#f1c40f',
    '--btn-primary-hover-start': '#2ecc71',
    '--btn-primary-hover-end': '#f39c12',
    
    // Secondary button (dark green-gray)
    '--btn-secondary-start': 'rgba(30, 52, 39, 0.9)',
    '--btn-secondary-end': 'rgba(20, 35, 26, 0.9)',
    '--btn-secondary-hover-start': 'rgba(39, 68, 51, 1)',
    '--btn-secondary-hover-end': 'rgba(30, 52, 39, 1)',
    
    // Tertiary button (green - matches emerald primary)
    '--btn-tertiary-start': '#27ae60',
    '--btn-tertiary-end': '#1e8449',
    '--btn-tertiary-hover-start': '#2ecc71',
    '--btn-tertiary-hover-end': '#27ae60',
    '--btn-tertiary-shadow': 'rgba(39, 174, 96, 0.3)',
    
    // Special colors
    '--color-focus': '#00ff88',
    '--color-focus-shadow': 'rgba(0, 255, 136, 0.3)',
    '--color-divider-start': 'rgba(39, 174, 96, 0.2)',
    '--color-divider-middle': 'rgba(39, 174, 96, 0.8)',
    '--color-divider-end': 'rgba(39, 174, 96, 0.2)',
    '--accent': '#f1c40f',
    '--accent-dark': '#d4ac0d',
    '--secondary': '#e67e22',
    '--secondary-dark': '#d35400'
  },
  sunset: {
    // Backgrounds
    '--bg-primary': '#2d1810',
    '--bg-secondary': '#4a2c2a',
    '--bg-card': '#231410',
    '--bg-card-dark': '#2f1a17',
    '--bg-panel-start': '#2d1810',
    '--bg-panel-end': '#e67e22',
    '--bg-loading': '#1a0f08',
    
    // Text colors
    '--text-primary': '#ffe5d9',
    '--text-secondary': '#ffb5a1',
    '--text-dark': '#5d2818',
    '--text-light': '#ffe5d9',
    '--text-muted': '#d4a574',
    '--text-white': '#fff5f0',
    '--text-gray': '#a67c52',
    '--text-error': '#ff6b6b',
    '--text-success': '#f39c12',
    '--text-warning': '#ffeb3b',
    '--text-info': '#ff9f43',
    '--text-faded': 'rgba(255, 229, 217, 0.6)',
    '--text-subtle': 'rgba(255, 229, 217, 0.7)',
    '--text-bright': 'rgba(255, 229, 217, 0.9)',
    
    // Info colors
    '--info': '#e67e22',
    '--info-dark': '#d35400',
    '--info-light': '#f39c12',
    
    // Success colors
    '--success': '#f39c12',
    '--success-dark': '#e67e22',
    '--success-light': '#f5b041',
    
    // Primary button (sunset theme: orange to yellow accent)
    '--btn-primary-start': '#e67e22',
    '--btn-primary-end': '#f1c40f',
    '--btn-primary-hover-start': '#d35400',
    '--btn-primary-hover-end': '#f39c12',
    
    // Secondary button (warm gray)
    '--btn-secondary-start': 'rgba(74, 44, 42, 0.9)',
    '--btn-secondary-end': 'rgba(45, 24, 16, 0.9)',
    '--btn-secondary-hover-start': 'rgba(87, 52, 49, 1)',
    '--btn-secondary-hover-end': 'rgba(74, 44, 42, 1)',
    
    // Tertiary button (orange - matches sunset primary)
    '--btn-tertiary-start': '#e67e22',
    '--btn-tertiary-end': '#ca6f1e',
    '--btn-tertiary-hover-start': '#f39c12',
    '--btn-tertiary-hover-end': '#e67e22',
    '--btn-tertiary-shadow': 'rgba(230, 126, 34, 0.3)',
    
    // Special colors
    '--color-focus': '#ff9944',
    '--color-focus-shadow': 'rgba(255, 153, 68, 0.3)',
    '--color-divider-start': 'rgba(230, 126, 34, 0.2)',
    '--color-divider-middle': 'rgba(230, 126, 34, 0.8)',
    '--color-divider-end': 'rgba(230, 126, 34, 0.2)',
    '--accent': '#f1c40f',
    '--accent-dark': '#d4ac0d',
    '--secondary': '#c0392b',
    '--secondary-dark': '#a93226'
  },
  purple: {
    // Backgrounds
    '--bg-primary': '#1a1a2e',
    '--bg-secondary': '#2d2d44',
    '--bg-card': '#16132d',
    '--bg-card-dark': '#1f1b3a',
    '--bg-panel-start': '#1a1a2e',
    '--bg-panel-end': '#8e44ad',
    '--bg-loading': '#0f0f1a',
    
    // Text colors
    '--text-primary': '#f3e5f5',
    '--text-secondary': '#ce93d8',
    '--text-dark': '#4a148c',
    '--text-light': '#f3e5f5',
    '--text-muted': '#ba68c8',
    '--text-white': '#ffffff',
    '--text-gray': '#9c27b0',
    '--text-error': '#f44336',
    '--text-success': '#ab47bc',
    '--text-warning': '#ffc107',
    '--text-info': '#ba68c8',
    '--text-faded': 'rgba(243, 229, 245, 0.6)',
    '--text-subtle': 'rgba(243, 229, 245, 0.7)',
    '--text-bright': 'rgba(243, 229, 245, 0.9)',
    
    // Info colors
    '--info': '#8e44ad',
    '--info-dark': '#7d3c98',
    '--info-light': '#a569bd',
    
    // Success colors
    '--success': '#a569bd',
    '--success-dark': '#8e44ad',
    '--success-light': '#bb8fce',
    
    // Primary button (purple theme: purple to yellow accent)
    '--btn-primary-start': '#8e44ad',
    '--btn-primary-end': '#f1c40f',
    '--btn-primary-hover-start': '#a569bd',
    '--btn-primary-hover-end': '#f39c12',
    
    // Secondary button (purple-gray)
    '--btn-secondary-start': 'rgba(45, 45, 68, 0.9)',
    '--btn-secondary-end': 'rgba(26, 26, 46, 0.9)',
    '--btn-secondary-hover-start': 'rgba(58, 58, 88, 1)',
    '--btn-secondary-hover-end': 'rgba(45, 45, 68, 1)',
    
    // Tertiary button (purple - matches purple primary)
    '--btn-tertiary-start': '#8e44ad',
    '--btn-tertiary-end': '#6c3483',
    '--btn-tertiary-hover-start': '#a569bd',
    '--btn-tertiary-hover-end': '#8e44ad',
    '--btn-tertiary-shadow': 'rgba(142, 68, 173, 0.3)',
    
    // Special colors
    '--color-focus': '#cc99ff',
    '--color-focus-shadow': 'rgba(204, 153, 255, 0.3)',
    '--color-divider-start': 'rgba(142, 68, 173, 0.2)',
    '--color-divider-middle': 'rgba(142, 68, 173, 0.8)',
    '--color-divider-end': 'rgba(142, 68, 173, 0.2)',
    '--accent': '#f1c40f',
    '--accent-dark': '#d4ac0d',
    '--secondary': '#e74c3c',
    '--secondary-dark': '#c0392b'
  }
};

// Apply theme to the document
export const applyTheme = (themeId) => {
  const theme = themes[themeId] || themes.default;
  const root = document.documentElement;
  
  Object.entries(theme).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
};

// Initialize theme on app load
export const initializeTheme = () => {
  const savedTheme = localStorage.getItem('selectedTheme') || 'default';
  applyTheme(savedTheme);
};

// Get current theme
export const getCurrentTheme = () => {
  return localStorage.getItem('selectedTheme') || 'default';
};

// Set and apply theme
export const setTheme = (themeId) => {
  localStorage.setItem('selectedTheme', themeId);
  applyTheme(themeId);
};