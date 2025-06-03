# In-Between Sound Manager

A desktop application for managing sound effect sprites for the In-Between card game.

## Features

- View and manage existing sound effects
- Add new sound effects to the sprite
- Preview sounds directly in the application
- Edit sound metadata and descriptions
- Regenerate sound sprites with accurate timing
- Automatically generates both MP3 and WebM formats

## Development

### Prerequisites

- Node.js (v14+)
- npm or yarn
- ffmpeg (included via ffmpeg-static package)

### Installation

```bash
# Install dependencies
npm install
```

### Running in Development Mode

```bash
# Start the Electron app in development mode
node start-dev.js
```

### Building for Production

```bash
# Build the application for production
npm run electron:build
```

## How It Works

The Sound Manager helps maintain sound sprites for the In-Between card game. Sound sprites combine multiple individual sound effects into a single audio file, with metadata that defines the timing for each sound.

### Sound Configuration Files

The application manages two key configuration files with different unit standards:

1. **sound-config.json**:
   - Contains metadata about each sound, including descriptions
   - Uses **milliseconds** for timing values (start, duration)
   - Example: `"start": 1500, "duration": 1000`
   - Used by the game application for sound management

2. **ui-sounds.json**:
   - Contains the sprite mapping for Howler.js
   - Uses **seconds** for timing values (start, end)
   - Example: `"start": 1.5, "end": 2.5`
   - References the audio files (MP3 and WebM formats)

### Key Features

#### Adding New Sounds

When adding a new sound, the application:

1. Copies the sound file to the sounds directory
2. Calculates accurate duration using ffprobe
3. Updates both configuration files with correct timing units:
   - Milliseconds in sound-config.json
   - Seconds in ui-sounds.json
4. Preserves existing sound descriptions

#### Regenerating Sound Sprites

The regenerate feature:

1. Collects all individual sound files from the sounds directory
2. Calculates accurate durations for each sound
3. Concatenates sounds with short silence gaps between them
4. Generates both MP3 and WebM versions of the sprite
5. Updates both configuration files with accurate timing values
6. Preserves existing sound descriptions

#### Sound Playback

The application plays sounds using:

1. ffmpeg to extract the specific segment from the sprite
2. macOS native afplay command for reliable playback

## Project Structure

- `/electron` - Electron main process code
  - `main.js` - Main process with IPC handlers
  - `preload.js` - Exposes API to renderer process
- `/src` - React application code
  - `/components` - UI components (SoundList, SoundForm, etc.)
  - `/contexts` - React context providers (SoundContext)
- `/sounds` - Individual sound files before being combined into sprites
