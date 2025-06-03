# Game Sound Assets

This directory contains sound assets for the In-Between card game.

## Sound Configuration Files

Two important configuration files manage the sound assets:

1. **sound-config.json** - Contains metadata for each sound effect:
   - Uses **milliseconds** for timing values (start, duration)
   - Includes user-defined descriptions for each sound
   - Used by the game application for sound management

2. **ui-sounds.json** - Contains the sprite mapping for Howler.js:
   - Uses **seconds** for timing values (start, end)
   - Defines loop settings for each sound
   - References the audio files (MP3 and WebM formats)

## Current Sound Effects

- `ui-sounds.mp3` / `ui-sounds.webm` - UI sound sprite containing:
  - `join`: Sound played when a player joins a game
  - `leave`: Sound played when a player leaves a game
  - `my-turn`: Sound played when it's the player's turn

## Adding New Sound Effects

The recommended way to add or modify sounds is to use the Sound Manager application:

1. Place individual sound files in the `sounds` directory
2. Use the Sound Manager to add them to the sprite
3. The Sound Manager will automatically:
   - Calculate accurate durations
   - Update both configuration files with correct timing values
   - Generate both MP3 and WebM versions of the sprite
   - Preserve existing sound descriptions

## Manual Sound Management (Advanced)

If you need to manually manage sounds:

1. **Add Individual Sounds**:
   ```bash
   # Add sound files to the sounds directory
   cp your-sound.mp3 ./sounds/new-sound.mp3
   ```

2. **Update Configuration Files**:
   - Add to `sound-config.json` using **milliseconds** for start and duration
   - Add to `ui-sounds.json` using **seconds** for start and end

3. **Regenerate Sprite**:
   ```bash
   # Use ffmpeg to concatenate sounds with silence between them
   ffmpeg -i sound1.mp3 -i silence.mp3 -i sound2.mp3 -filter_complex \
     "[0:a][1:a][2:a]concat=n=3:v=0:a=1" ui-sounds.mp3
   
   # Create WebM version
   ffmpeg -i ui-sounds.mp3 ui-sounds.webm
   ```

## Using the Sound Manager

For easier sound management, use the Electron Sound Manager application:

```bash
# Navigate to the sound manager directory
cd admin/sound-manager

# Start the application
node start-dev.js
```
