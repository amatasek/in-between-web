# Game Sound Assets

This directory contains sound assets for the In-Between card game.

## Current Sound Effects

- `ui-sounds.mp3` / `ui-sounds.webm` - UI sound sprite containing:
  - `join`: 0-1000ms - Sound played when a player joins a game
  - `leave`: 1500-2500ms - Sound played when a player leaves a game

## Adding New Sound Effects

1. **Add Individual Sounds**:
   ```bash
   # Download or add sound files to the sounds directory
   cp your-sound.mp3 ./sounds/new-sound.mp3
   ```

2. **Add to Sprite**:
   ```bash
   # Use ffmpeg to add the new sound to the sprite
   ffmpeg -i ui-sounds.mp3 -i ./sounds/new-sound.mp3 -filter_complex \
     "[0:a][1:a]concat=n=2:v=0:a=1" ui-sounds-new.mp3
   mv ui-sounds-new.mp3 ui-sounds.mp3
   
   # Create WebM version
   ffmpeg -i ui-sounds.mp3 ui-sounds.webm
   ```

3. **Update Sound Service**:
   - Add the new sound to the sprite definition in `SoundService.js`
   - Use `soundService.play('ui.new-sound')` in your code

## Sound Categories

Organize sounds by category for better management:

- `ui-sounds.mp3` - Interface sounds (join, leave, button clicks)
- `game-sounds.mp3` - Game action sounds (starting game, dealing cards)
- `cards-sounds.mp3` - Card-specific sounds (flipping, shuffling)
- `betting-sounds.mp3` - Betting-related sounds (win, lose, ante)

## Using the Sound Manager

For easier sound management, use the included sound manager tool:

```bash
# Add a new sound
node server/scripts/sound-manager.js add-sound sound-name sound-url

# Generate sprites
node server/scripts/sound-manager.js generate-sprites
```
