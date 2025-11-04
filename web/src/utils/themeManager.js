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
    '--accent2': '#3498db',
    '--accent3': '#00ff88',
    '--secondary': '#e74c3c',
    '--secondary-dark': '#c0392b',
    
    '--input-bg': 'rgba(0, 0, 0, 0.3)',
    '--input-bg-hover': 'rgba(0, 0, 0, 0.4)',
    '--input-bg-focus': 'rgba(0, 0, 0, 0.45)',
    '--input-text-color': '#ecf0f1',
    '--input-border-color': 'rgba(255, 255, 255, 0.1)',
    
    // Glass colors for panel-alt - dark glass like it's always been
    '--color-glass-dark': 'rgba(0, 0, 0, 0.3)',
    '--color-glass-light': 'rgba(0, 0, 0, 0.1)'
  },
  'blue-steel': {
    // Backgrounds - Graphite greys with sky blue accents
    '--bg-primary': '#2a2e35',
    '--bg-secondary': '#35393f',
    '--bg-card': '#2f3339',
    '--bg-card-dark': '#23262b',
    '--bg-panel-start': '#393d44',
    '--bg-panel-end': '#4a7c9e',
    '--bg-loading': '#1f2226',

    // Text colors - Clean whites and light greys
    '--text-primary': '#e8eef2',
    '--text-secondary': '#b8c5d0',
    '--text-dark': '#354a5f',
    '--text-light': '#e8eef2',
    '--text-muted': '#8a98a8',
    '--text-white': '#ffffff',
    '--text-gray': '#9ca8b5',
    '--text-error': '#ff6b7a',
    '--text-success': '#2ecc71',
    '--text-warning': '#ffd966',
    '--text-info': '#87ceeb',
    '--text-faded': 'rgba(232, 238, 242, 0.6)',
    '--text-subtle': 'rgba(232, 238, 242, 0.75)',
    '--text-bright': 'rgba(232, 238, 242, 0.95)',

    // Info colors - Sky blue
    '--info': '#87ceeb',
    '--info-dark': '#5dade2',
    '--info-light': '#a8d8f0',

    // Glass colors for panel-alt - subtle graphite overlays
    '--color-glass-dark': 'rgba(35, 38, 43, 0.6)',
    '--color-glass-light': 'rgba(135, 206, 235, 0.08)',

    // Success colors - Green for ante button
    '--success': '#2ecc71',
    '--success-dark': '#27ae60',
    '--success-light': '#58d68d',

    // Primary button (Sky blue gradient)
    '--btn-primary-start': '#5dade2',
    '--btn-primary-end': '#3498db',
    '--btn-primary-hover-start': '#7dbfe8',
    '--btn-primary-hover-end': '#5dade2',

    // Secondary button (Steel grey)
    '--btn-secondary-start': 'rgba(60, 72, 88, 0.9)',
    '--btn-secondary-end': 'rgba(42, 54, 69, 0.9)',
    '--btn-secondary-hover-start': 'rgba(74, 86, 102, 1)',
    '--btn-secondary-hover-end': 'rgba(60, 72, 88, 1)',

    // Tertiary button (Dark steel blue)
    '--btn-tertiary-start': '#4a7c9e',
    '--btn-tertiary-end': '#3a6480',
    '--btn-tertiary-hover-start': '#5a8cae',
    '--btn-tertiary-hover-end': '#4a7c9e',
    '--btn-tertiary-shadow': 'rgba(74, 124, 158, 0.4)',

    // Special colors
    '--color-focus': '#87ceeb',
    '--color-focus-shadow': 'rgba(135, 206, 235, 0.4)',
    '--color-border-light': 'rgba(135, 206, 235, 0.2)',
    '--color-border-lighter': 'rgba(135, 206, 235, 0.15)',
    '--color-divider-start': 'rgba(135, 206, 235, 0.2)',
    '--color-divider-middle': 'rgba(135, 206, 235, 0.7)',
    '--color-divider-end': 'rgba(135, 206, 235, 0.2)',
    '--accent': '#87ceeb',
    '--accent-dark': '#5dade2',
    '--accent2': '#a8d8f0',
    '--accent3': '#4a9bca',
    '--secondary': '#6c7d8f',
    '--secondary-dark': '#5a6979',

    // Input overrides for Blue Steel theme
    '--input-bg': 'rgba(31, 34, 38, 0.7)',
    '--input-bg-hover': 'rgba(31, 34, 38, 0.85)',
    '--input-bg-focus': 'rgba(31, 34, 38, 0.95)',
    '--input-text-color': '#e8eef2',
    '--input-border-color': 'rgba(135, 206, 235, 0.25)'
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
    '--accent2': '#00ccff',
    '--accent3': '#ff6b6b',
    '--secondary': '#c0392b',
    '--secondary-dark': '#a93226',
    
    // Input overrides for dark theme
    '--input-bg': 'rgba(255, 255, 255, 0.08)',
    '--input-bg-hover': 'rgba(255, 255, 255, 0.1)',
    '--input-bg-focus': 'rgba(255, 255, 255, 0.12)',
    '--input-text-color': 'var(--text-primary)',
    '--input-border-color': 'var(--color-border-light)',
    
    // Glass colors for panel-alt
    '--color-glass-dark': 'rgba(41, 128, 185, 0.08)',
    '--color-glass-light': 'rgba(243, 156, 18, 0.08)'
  },
  'lambeau': {
    // Backgrounds - Dark Packers green
    '--bg-primary': '#0A1713',
    '--bg-secondary': '#154734',
    '--bg-card': '#0D1F1A',
    '--bg-card-dark': '#122A1F',
    '--bg-panel-start': '#154734',
    '--bg-panel-end': '#203731',
    '--bg-loading': '#061109',
    
    // Text colors - white and gold
    '--text-primary': '#FFFFFF',
    '--text-secondary': '#FFB612',
    '--text-dark': '#FFB612',
    '--text-light': '#FFFFFF',
    '--text-muted': '#C9B896',
    '--text-white': '#FFFFFF',
    '--text-gray': '#B5A482',
    '--text-error': '#FF6B6B',
    '--text-success': '#FFB612',
    '--text-warning': '#FFC42E',
    '--text-info': '#FFB612',
    '--text-faded': 'rgba(255, 255, 255, 0.6)',
    '--text-subtle': 'rgba(255, 255, 255, 0.7)',
    '--text-bright': 'rgba(255, 255, 255, 0.9)',
    
    // Info colors (Packers yellow)
    '--info': '#FFB612',
    '--info-dark': '#FFA300',
    '--info-light': '#FFC42E',
    
    // Success colors (Packers green)
    '--success': '#203731',
    '--success-dark': '#154734',
    '--success-light': '#2F5645',
    
    // Primary button (Packers green to gold)
    '--btn-primary-start': '#203731',
    '--btn-primary-end': '#154734',
    '--btn-primary-hover-start': '#2F5645',
    '--btn-primary-hover-end': '#203731',
    
    // Secondary button (gold/yellow)
    '--btn-secondary-start': '#FFB612',
    '--btn-secondary-end': '#FFA300',
    '--btn-secondary-hover-start': '#FFC42E',
    '--btn-secondary-hover-end': '#FFB612',
    
    // Tertiary button (gold/yellow)
    '--btn-tertiary-start': '#FFB612',
    '--btn-tertiary-end': '#FFA300',
    '--btn-tertiary-hover-start': '#FFC42E',
    '--btn-tertiary-hover-end': '#FFB612',
    '--btn-tertiary-shadow': 'rgba(255, 182, 18, 0.3)',
    
    // Special colors - beige and white accents
    '--color-focus': '#FFB612',
    '--color-focus-shadow': 'rgba(255, 182, 18, 0.3)',
    '--color-divider-start': 'rgba(32, 55, 49, 0.2)',
    '--color-divider-middle': 'rgba(255, 182, 18, 0.8)',
    '--color-divider-end': 'rgba(32, 55, 49, 0.2)',
    '--accent': '#FFB612',
    '--accent-dark': '#FFA300',
    '--accent2': '#C9B896',
    '--accent3': '#FFFFFF',
    '--secondary': '#C9B896',
    '--secondary-dark': '#B5A482',
    
    // Input overrides for Lambeau theme
    '--input-bg': 'rgba(21, 71, 52, 0.3)',
    '--input-bg-hover': 'rgba(21, 71, 52, 0.4)',
    '--input-bg-focus': 'rgba(21, 71, 52, 0.5)',
    '--input-text-color': '#FFFFFF',
    '--input-placeholder-color': 'rgba(255, 255, 255, 0.5)',
    '--input-border-color': 'rgba(255, 182, 18, 0.4)',
    '--input-border-hover': 'rgba(255, 182, 18, 0.6)',
    '--input-border-focus': '#FFB612',
    '--input-border-width': '2px',
    '--input-padding': '12px 16px',
    '--input-font-size': '16px',
    '--input-line-height': '1.5',
    '--input-shadow-focus': '0 0 0 3px rgba(255, 182, 18, 0.25)',
    
    // Glass colors for panel-alt - green and gold
    '--color-glass-dark': 'rgba(32, 55, 49, 0.08)',
    '--color-glass-light': 'rgba(255, 182, 18, 0.05)'
  },
  sunset: {
    // Backgrounds - deep midnight blue like twilight
    '--bg-primary': '#0c1929',
    '--bg-secondary': '#162544',
    '--bg-card': '#0a1520',
    '--bg-card-dark': '#111f35',
    '--bg-panel-start': '#162544',
    '--bg-panel-end': '#ff6b6b',
    '--bg-loading': '#060d17',
    
    // Text colors - warm romantic tones
    '--text-primary': '#ffd6a5',
    '--text-secondary': '#ffb088',
    '--text-dark': '#8b5a3c',
    '--text-light': '#ffd6a5',
    '--text-muted': '#daa49a',
    '--text-white': '#fff5f0',
    '--text-gray': '#c9a882',
    '--text-error': '#ff6b6b',
    '--text-success': '#ff9a76',
    '--text-warning': '#ffc93c',
    '--text-info': '#ff8e71',
    '--text-faded': 'rgba(255, 214, 165, 0.6)',
    '--text-subtle': 'rgba(255, 214, 165, 0.7)',
    '--text-bright': 'rgba(255, 214, 165, 0.9)',
    
    // Info colors - warm coral
    '--info': '#ff8e71',
    '--info-dark': '#ff7657',
    '--info-light': '#ffa589',
    
    // Success colors - golden sunset
    '--success': '#ff9a76',
    '--success-dark': '#ff8561',
    '--success-light': '#ffb088',
    
    // Primary button (romantic sunset: deep red to orange)
    '--btn-primary-start': '#c44569',
    '--btn-primary-end': '#f8961e',
    '--btn-primary-hover-start': '#d65577',
    '--btn-primary-hover-end': '#f9a73e',
    
    // Secondary button (deep midnight blue)
    '--btn-secondary-start': 'rgba(22, 37, 68, 0.9)',
    '--btn-secondary-end': 'rgba(12, 25, 41, 0.9)',
    '--btn-secondary-hover-start': 'rgba(28, 46, 78, 1)',
    '--btn-secondary-hover-end': 'rgba(22, 37, 68, 1)',
    
    // Tertiary button (warm coral)
    '--btn-tertiary-start': '#ff6b6b',
    '--btn-tertiary-end': '#ee5a52',
    '--btn-tertiary-hover-start': '#ff8080',
    '--btn-tertiary-hover-end': '#ff6b6b',
    '--btn-tertiary-shadow': 'rgba(255, 107, 107, 0.3)',
    
    // Special colors
    '--color-focus': '#ff8e71',
    '--color-focus-shadow': 'rgba(255, 142, 113, 0.3)',
    '--color-divider-start': 'rgba(196, 69, 105, 0.2)',
    '--color-divider-middle': 'rgba(248, 150, 30, 0.8)',
    '--color-divider-end': 'rgba(196, 69, 105, 0.2)',
    '--accent': '#f8961e',
    '--accent-dark': '#f37121',
    '--accent2': '#ff6b6b',
    '--accent3': '#c44569',
    '--secondary': '#ff6b6b',
    '--secondary-dark': '#ee5a52',
    
    // Input overrides for romantic sunset theme
    '--input-bg': 'rgba(12, 25, 41, 0.95)',
    '--input-bg-hover': 'rgba(18, 35, 51, 0.98)',
    '--input-bg-focus': 'rgba(22, 37, 68, 1)',
    '--input-text-color': 'var(--text-primary)',
    '--input-border-color': 'rgba(255, 142, 113, 0.3)',
    
    // Glass colors for panel-alt - warm red and orange
    '--color-glass-dark': 'rgba(196, 69, 105, 0.08)',
    '--color-glass-light': 'rgba(248, 150, 30, 0.05)'
  },
  'miami-vice': {
    // Backgrounds - deep purples and blues like dusk
    '--bg-primary': '#1a0f2e',
    '--bg-secondary': '#2d1844',
    '--bg-card': '#160d28',
    '--bg-card-dark': '#231432',
    '--bg-panel-start': '#2d1844',
    '--bg-panel-end': '#ff6b9d',
    '--bg-loading': '#0f0820',
    
    // Text colors - warm sunset tones with cyan accents
    '--text-primary': '#ffeaa7',
    '--text-secondary': '#fab1a0',
    '--text-dark': '#74526c',
    '--text-light': '#ffeaa7',
    '--text-muted': '#dfe6e9',
    '--text-white': '#fff5f0',
    '--text-gray': '#b2bec3',
    '--text-error': '#ff7675',
    '--text-success': '#fdcb6e',
    '--text-warning': '#ffeb3b',
    '--text-info': '#00d2d3',
    '--text-faded': 'rgba(255, 234, 167, 0.6)',
    '--text-subtle': 'rgba(255, 234, 167, 0.7)',
    '--text-bright': 'rgba(255, 234, 167, 0.9)',
    
    // Info colors - neon cyan
    '--info': '#00d2d3',
    '--info-dark': '#00b8b8',
    '--info-light': '#01e5e5',
    
    // Success colors - golden hour
    '--success': '#fdcb6e',
    '--success-dark': '#f9b747',
    '--success-light': '#ffeaa7',
    
    // Primary button (Miami gradient: pink to cyan)
    '--btn-primary-start': '#ff6b9d',
    '--btn-primary-end': '#00d2d3',
    '--btn-primary-hover-start': '#ee5a6f',
    '--btn-primary-hover-end': '#01e5e5',
    
    // Secondary button (deep purple dusk)
    '--btn-secondary-start': 'rgba(45, 24, 68, 0.9)',
    '--btn-secondary-end': 'rgba(26, 15, 46, 0.9)',
    '--btn-secondary-hover-start': 'rgba(55, 34, 78, 1)',
    '--btn-secondary-hover-end': 'rgba(45, 24, 68, 1)',
    
    // Tertiary button (neon cyan)
    '--btn-tertiary-start': '#00d2d3',
    '--btn-tertiary-end': '#00b8b8',
    '--btn-tertiary-hover-start': '#01e5e5',
    '--btn-tertiary-hover-end': '#00d2d3',
    '--btn-tertiary-shadow': 'rgba(0, 210, 211, 0.3)',
    
    // Special colors
    '--color-focus': '#00d2d3',
    '--color-focus-shadow': 'rgba(0, 210, 211, 0.3)',
    '--color-divider-start': 'rgba(255, 107, 157, 0.2)',
    '--color-divider-middle': 'rgba(0, 210, 211, 0.8)',
    '--color-divider-end': 'rgba(255, 107, 157, 0.2)',
    '--accent': '#feca57',
    '--accent-dark': '#f9b747',
    '--accent2': '#00d2d3',
    '--accent3': '#ff6b9d',
    '--secondary': '#ff7979',
    '--secondary-dark': '#ff6348',
    
    // Input overrides for Miami Vice theme
    '--input-bg': 'rgba(26, 15, 46, 0.95)',
    '--input-bg-hover': 'rgba(35, 20, 56, 0.98)',
    '--input-bg-focus': 'rgba(45, 24, 68, 1)',
    '--input-text-color': 'var(--text-primary)',
    '--input-border-color': 'rgba(0, 210, 211, 0.3)',
    
    // Glass colors for panel-alt - pink and cyan
    '--color-glass-dark': 'rgba(255, 107, 157, 0.08)',
    '--color-glass-light': 'rgba(0, 210, 211, 0.05)'
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
    '--accent2': '#ab47bc',
    '--accent3': '#ba68c8',
    '--secondary': '#e74c3c',
    '--secondary-dark': '#c0392b',
    
    // Input overrides for purple theme
    '--input-bg': 'rgba(26, 26, 46, 0.95)',
    '--input-bg-hover': 'rgba(35, 35, 55, 0.98)',
    '--input-bg-focus': 'rgba(45, 45, 68, 1)',
    '--input-text-color': 'var(--text-primary)',
    '--input-border-color': 'rgba(142, 68, 173, 0.3)',
    
    // Glass colors for panel-alt
    '--color-glass-dark': 'rgba(142, 68, 173, 0.08)',
    '--color-glass-light': 'rgba(241, 196, 15, 0.08)'
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