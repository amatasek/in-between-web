#!/usr/bin/env node
/**
 * Sound Manager Utility
 * 
 * This utility helps manage sound assets for the In-Between card game:
 * - Downloads sounds from free sources
 * - Generates sprite files
 * - Updates sprite configuration
 * 
 * Usage:
 *   node sound-manager.js add-sound <name> <url> [--category=ui]
 *   node sound-manager.js generate-sprites
 *   node sound-manager.js list-sounds
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { exec } = require('child_process');
const readline = require('readline');

// Configuration
const ASSETS_DIR = path.join(__dirname, '../assets');
const AUDIO_DIR = path.join(ASSETS_DIR, 'audio');
const SOUNDS_DIR = path.join(AUDIO_DIR, 'sounds');
const SPRITES_DIR = path.join(AUDIO_DIR, 'sprites');
const CONFIG_FILE = path.join(AUDIO_DIR, 'sound-config.json');

// Default configuration
const DEFAULT_CONFIG = {
  categories: {
    ui: {
      sounds: {
        join: {
          start: 0,
          duration: 1000,
          description: 'Sound played when a player joins a game'
        },
        leave: {
          start: 1500,
          duration: 1000,
          description: 'Sound played when a player leaves a game'
        }
      }
    }
  }
};

// Ensure directories exist
function ensureDirsExist() {
  [ASSETS_DIR, AUDIO_DIR, SOUNDS_DIR, SPRITES_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  });
}

// Load or create config
function loadConfig() {
  if (!fs.existsSync(CONFIG_FILE)) {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(DEFAULT_CONFIG, null, 2));
    console.log(`Created default config at: ${CONFIG_FILE}`);
    return DEFAULT_CONFIG;
  }
  
  try {
    const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    return config;
  } catch (error) {
    console.error('Error loading config:', error);
    process.exit(1);
  }
}

// Save config
function saveConfig(config) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
  console.log(`Updated config at: ${CONFIG_FILE}`);
}

// Download a file from URL
function downloadFile(url, destination) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);
    
    https.get(url, response => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download file: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
      
      file.on('error', err => {
        fs.unlink(destination, () => {});
        reject(err);
      });
    }).on('error', err => {
      fs.unlink(destination, () => {});
      reject(err);
    });
  });
}

// Add a new sound
async function addSound(name, url, category = 'ui') {
  ensureDirsExist();
  const config = loadConfig();
  
  // Validate category exists
  if (!config.categories[category]) {
    console.error(`Category "${category}" does not exist. Available categories: ${Object.keys(config.categories).join(', ')}`);
    process.exit(1);
  }
  
  // Determine file extension from URL
  const urlParts = url.split('.');
  const extension = urlParts[urlParts.length - 1].split('?')[0].toLowerCase();
  
  if (!['mp3', 'wav', 'ogg', 'webm'].includes(extension)) {
    console.error(`Unsupported file extension: ${extension}. Supported extensions: mp3, wav, ogg, webm`);
    process.exit(1);
  }
  
  const soundFile = path.join(SOUNDS_DIR, `${name}.${extension}`);
  
  // Download the sound
  console.log(`Downloading ${url} to ${soundFile}...`);
  try {
    await downloadFile(url, soundFile);
    console.log(`Downloaded sound to: ${soundFile}`);
    
    // Update config if sound doesn't exist
    if (!config.categories[category].sounds[name]) {
      // Calculate next position based on existing sounds
      const sounds = config.categories[category].sounds;
      let maxEnd = 0;
      
      Object.values(sounds).forEach(sound => {
        const end = sound.start + sound.duration;
        if (end > maxEnd) maxEnd = end;
      });
      
      // Add 500ms gap
      const start = maxEnd + 500;
      
      // Add to config with default duration of 1000ms
      config.categories[category].sounds[name] = {
        start,
        duration: 1000,
        description: `Sound for ${name}`
      };
      
      saveConfig(config);
      console.log(`Added sound "${name}" to category "${category}" at position ${start}ms`);
    } else {
      console.log(`Sound "${name}" already exists in config. Use generate-sprites to update the sprite.`);
    }
  } catch (error) {
    console.error('Error downloading sound:', error);
    process.exit(1);
  }
}

// Generate sprite files
function generateSprites() {
  ensureDirsExist();
  const config = loadConfig();
  
  // Check if audiosprite is installed
  exec('audiosprite --version', (error) => {
    if (error) {
      console.error('audiosprite not found. Please install it with: npm install -g audiosprite');
      console.error('You also need ffmpeg installed on your system.');
      process.exit(1);
    }
    
    // Generate sprites for each category
    Object.keys(config.categories).forEach(category => {
      const categoryConfig = config.categories[category];
      const sounds = categoryConfig.sounds;
      
      // Get all sound files
      const soundFiles = [];
      Object.keys(sounds).forEach(soundName => {
        // Find the sound file
        const files = fs.readdirSync(SOUNDS_DIR)
          .filter(file => file.startsWith(`${soundName}.`));
        
        if (files.length === 0) {
          console.warn(`Warning: No sound file found for "${soundName}"`);
        } else {
          soundFiles.push(path.join(SOUNDS_DIR, files[0]));
        }
      });
      
      if (soundFiles.length === 0) {
        console.warn(`Warning: No sound files found for category "${category}"`);
        return;
      }
      
      // Output path for the sprite
      const outputPath = path.join(SPRITES_DIR, `${category}-sounds`);
      
      // Build audiosprite command
      const command = [
        'audiosprite',
        '--output', outputPath,
        '--format', 'howler2',
        '--export', 'mp3,webm',
        '--gap', '1',
        '--log', 'info',
        ...soundFiles
      ].join(' ');
      
      console.log(`Generating sprite for category "${category}"...`);
      console.log(`Command: ${command}`);
      
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error generating sprite for category "${category}":`, error);
          console.error(stderr);
          return;
        }
        
        console.log(stdout);
        console.log(`Generated sprite for category "${category}" at: ${outputPath}`);
        
        // Update the sprite configuration in the web app
        updateSpriteConfig(category, outputPath);
      });
    });
  });
}

// Update sprite configuration in the web app
function updateSpriteConfig(category, spritePath) {
  const config = loadConfig();
  const categoryConfig = config.categories[category];
  
  // Read the generated sprite JSON file
  const spriteJsonPath = `${spritePath}.json`;
  if (!fs.existsSync(spriteJsonPath)) {
    console.error(`Sprite JSON file not found: ${spriteJsonPath}`);
    return;
  }
  
  try {
    const spriteData = JSON.parse(fs.readFileSync(spriteJsonPath, 'utf8'));
    
    // Copy the sprite files to the assets directory
    const targetDir = path.join(AUDIO_DIR);
    
    ['mp3', 'webm'].forEach(ext => {
      const sourceFile = `${spritePath}.${ext}`;
      const targetFile = path.join(targetDir, `${category}-sounds.${ext}`);
      
      if (fs.existsSync(sourceFile)) {
        fs.copyFileSync(sourceFile, targetFile);
        console.log(`Copied ${sourceFile} to ${targetFile}`);
      }
    });
    
    // Update the SoundService.js file
    updateSoundService(category, categoryConfig.sounds);
    
    console.log(`Updated sprite configuration for category "${category}"`);
  } catch (error) {
    console.error(`Error updating sprite configuration:`, error);
  }
}

// Update the SoundService.js file
function updateSoundService(category, sounds) {
  const soundServicePath = path.join(__dirname, '../../web/src/services/SoundService.js');
  
  if (!fs.existsSync(soundServicePath)) {
    console.error(`SoundService.js not found at: ${soundServicePath}`);
    return;
  }
  
  try {
    let content = fs.readFileSync(soundServicePath, 'utf8');
    
    // Find the sprite definition for this category
    const spriteRegex = new RegExp(`sprite:\\s*{([^}]*)}`, 'gs');
    const match = content.match(spriteRegex);
    
    if (!match) {
      console.error(`Could not find sprite definition in SoundService.js`);
      return;
    }
    
    // Build the new sprite definition
    let spriteContent = 'sprite: {\n';
    Object.entries(sounds).forEach(([name, config]) => {
      spriteContent += `        ${name}: [${config.start}, ${config.duration}], // ${config.description}\n`;
    });
    spriteContent += '      },';
    
    // Replace the sprite definition
    const newContent = content.replace(spriteRegex, spriteContent);
    
    fs.writeFileSync(soundServicePath, newContent);
    console.log(`Updated sprite definition in SoundService.js`);
  } catch (error) {
    console.error(`Error updating SoundService.js:`, error);
  }
}

// List all sounds
function listSounds() {
  ensureDirsExist();
  const config = loadConfig();
  
  console.log('Sounds configuration:');
  console.log('=====================');
  
  Object.entries(config.categories).forEach(([category, categoryConfig]) => {
    console.log(`\nCategory: ${category}`);
    console.log('------------------------');
    
    Object.entries(categoryConfig.sounds).forEach(([name, sound]) => {
      console.log(`  ${name}:`);
      console.log(`    Start: ${sound.start}ms`);
      console.log(`    Duration: ${sound.duration}ms`);
      console.log(`    Description: ${sound.description}`);
      
      // Check if sound file exists
      const files = fs.readdirSync(SOUNDS_DIR)
        .filter(file => file.startsWith(`${name}.`));
      
      if (files.length === 0) {
        console.log('    File: NOT FOUND');
      } else {
        console.log(`    File: ${files.join(', ')}`);
      }
    });
  });
  
  console.log('\nSprite files:');
  console.log('-------------');
  
  if (!fs.existsSync(SPRITES_DIR)) {
    console.log('  No sprites generated yet.');
  } else {
    fs.readdirSync(SPRITES_DIR).forEach(file => {
      console.log(`  ${file}`);
    });
  }
}

// Interactive mode
function interactiveMode() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  console.log('\nSound Manager Interactive Mode');
  console.log('============================');
  console.log('1. Add a sound');
  console.log('2. Generate sprites');
  console.log('3. List sounds');
  console.log('4. Exit');
  
  rl.question('\nSelect an option (1-4): ', (answer) => {
    switch (answer) {
      case '1':
        rl.question('Sound name: ', (name) => {
          rl.question('Sound URL: ', (url) => {
            rl.question('Category (default: ui): ', (category) => {
              rl.close();
              addSound(name, url, category || 'ui');
            });
          });
        });
        break;
      case '2':
        rl.close();
        generateSprites();
        break;
      case '3':
        rl.close();
        listSounds();
        break;
      case '4':
        rl.close();
        break;
      default:
        console.log('Invalid option');
        rl.close();
        interactiveMode();
        break;
    }
  });
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    interactiveMode();
    return;
  }
  
  const command = args[0];
  
  switch (command) {
    case 'add-sound':
      if (args.length < 3) {
        console.error('Usage: node sound-manager.js add-sound <name> <url> [--category=ui]');
        process.exit(1);
      }
      
      const name = args[1];
      const url = args[2];
      let category = 'ui';
      
      // Check for category option
      const categoryArg = args.find(arg => arg.startsWith('--category='));
      if (categoryArg) {
        category = categoryArg.split('=')[1];
      }
      
      await addSound(name, url, category);
      break;
    
    case 'generate-sprites':
      generateSprites();
      break;
    
    case 'list-sounds':
      listSounds();
      break;
    
    default:
      console.error(`Unknown command: ${command}`);
      console.error('Available commands: add-sound, generate-sprites, list-sounds');
      process.exit(1);
  }
}

// Run the main function
main();
