# In-Between Sound Manager

A desktop application for managing sound effect sprites for the In-Between card game.

## Features

- View and manage existing sound effects
- Add new sound effects to the sprite
- Preview sounds directly in the application
- Edit sound metadata
- Automatically generates both MP3 and WebM formats

## Development

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Running in Development Mode

```bash
# Start the Electron app in development mode
npm run electron:dev
```

### Building for Production

```bash
# Build the application for production
npm run electron:build
```

## How It Works

The Sound Manager helps maintain sound sprites for the In-Between card game. Sound sprites combine multiple individual sound effects into a single audio file, with metadata that defines the start and end times for each sound.

### Sound Sprite Structure

The application manages two key configuration files:

1. `sound-config.json` - Contains metadata about each sound, including descriptions
2. `ui-sounds.json` - Contains the sprite mapping with start/end times for each sound

When adding a new sound, the application:

1. Copies the sound file to the sounds directory
2. Uses ffmpeg to append the new sound to the existing sprite
3. Updates the configuration files with the new sound's metadata
4. Generates both MP3 and WebM versions for cross-browser compatibility

## Project Structure

- `/electron` - Electron main process code
- `/src` - React application code
  - `/components` - UI components
  - `/contexts` - React context providers
- `/dist` - Built application (after running build command)
