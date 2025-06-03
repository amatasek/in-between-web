const { app, BrowserWindow, ipcMain, dialog, protocol } = require('electron');
const path = require('path');
const fs = require('fs');
const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');
const Store = require('electron-store');

const store = new Store();

// Path to the audio assets directory
const audioAssetsPath = path.join(app.getAppPath(), '../../server/assets/audio');
const soundsDir = path.join(audioAssetsPath, 'sounds');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  // In development, load from Vite dev server
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    // In production, load from the dist directory
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Function to standardize units in sound configuration files
const standardizeConfigUnits = () => {
  try {
    const soundConfigPath = path.join(audioAssetsPath, 'sound-config.json');
    const uiSoundsPath = path.join(audioAssetsPath, 'ui-sounds.json');
    
    if (fs.existsSync(soundConfigPath) && fs.existsSync(uiSoundsPath)) {
      // Read the configuration files
      const soundConfig = JSON.parse(fs.readFileSync(soundConfigPath, 'utf8'));
      const uiSounds = JSON.parse(fs.readFileSync(uiSoundsPath, 'utf8'));
      
      let updated = false;
      
      // Check and convert units in sound-config.json
      if (soundConfig.categories && soundConfig.categories.ui && soundConfig.categories.ui.sounds) {
        const sounds = soundConfig.categories.ui.sounds;
        
        Object.keys(sounds).forEach(soundId => {
          const sound = sounds[soundId];
          
          // Check if start or duration might be in seconds (values < 100 are likely seconds)
          if (sound.start < 100 && sound.start > 0 && !Number.isInteger(sound.start)) {
            sound.start = Math.round(sound.start * 1000); // Convert seconds to ms
            updated = true;
          }
          
          if (sound.duration < 100 && sound.duration > 0 && !Number.isInteger(sound.duration)) {
            sound.duration = Math.round(sound.duration * 1000); // Convert seconds to ms
            updated = true;
          }
        });
      }
      
      // If any values were updated, save the files
      if (updated) {
        fs.writeFileSync(soundConfigPath, JSON.stringify(soundConfig, null, 2));
        console.log('Standardized units in sound-config.json to milliseconds');
      }
    }
  } catch (error) {
    console.error('Error standardizing config units:', error);
  }
};

app.whenReady().then(() => {
  // Standardize units in configuration files
  standardizeConfigUnits();
  
  // Register custom protocol
  protocol.registerFileProtocol('asset', (request, callback) => {
    try {
      const url = new URL(request.url);
      const filePath = decodeURIComponent(url.pathname);
      callback({ path: filePath });
    } catch (error) {
      console.error('Failed to register protocol', error);
      callback({ error: -2 }); // Failed to load
    }
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// IPC handlers
ipcMain.handle('get-audio-paths', () => {
  return {
    mp3: `asset://${path.join(audioAssetsPath, 'ui-sounds.mp3')}`,
    webm: `asset://${path.join(audioAssetsPath, 'ui-sounds.webm')}`
  };
});

ipcMain.handle('get-sound-config', async () => {
  try {
    const soundConfigPath = path.join(audioAssetsPath, 'sound-config.json');
    const uiSoundsPath = path.join(audioAssetsPath, 'ui-sounds.json');
    
    const soundConfig = JSON.parse(fs.readFileSync(soundConfigPath, 'utf8'));
    const uiSounds = JSON.parse(fs.readFileSync(uiSoundsPath, 'utf8'));
    
    return { soundConfig, uiSounds };
  } catch (error) {
    console.error('Error reading sound config:', error);
    return { error: error.message };
  }
});

ipcMain.handle('save-sound-config', async (event, config) => {
  try {
    const soundConfigPath = path.join(audioAssetsPath, 'sound-config.json');
    fs.writeFileSync(soundConfigPath, JSON.stringify(config, null, 2));
    return { success: true };
  } catch (error) {
    console.error('Error saving sound config:', error);
    return { error: error.message };
  }
});

ipcMain.handle('regenerate-sound-sprite', async () => {
  try {
    // Ensure sounds directory exists
    if (!fs.existsSync(soundsDir)) {
      fs.mkdirSync(soundsDir, { recursive: true });
    }
    
    // Get all individual sound files
    const soundFiles = fs.readdirSync(soundsDir)
      .filter(file => file.endsWith('.mp3'))
      .map(file => ({
        name: path.basename(file, '.mp3'),
        path: path.join(soundsDir, file)
      }));
    
    if (soundFiles.length === 0) {
      return { error: 'No sound files found in sounds directory' };
    }
    
    // Read existing configuration files
    const soundConfigPath = path.join(audioAssetsPath, 'sound-config.json');
    const uiSoundsPath = path.join(audioAssetsPath, 'ui-sounds.json');
    const soundConfig = JSON.parse(fs.readFileSync(soundConfigPath, 'utf8'));
    const uiSounds = JSON.parse(fs.readFileSync(uiSoundsPath, 'utf8'));
    
    // Save existing descriptions before resetting
    const existingDescriptions = {};
    if (soundConfig.categories && soundConfig.categories.ui && soundConfig.categories.ui.sounds) {
      Object.keys(soundConfig.categories.ui.sounds).forEach(soundId => {
        if (soundConfig.categories.ui.sounds[soundId].description) {
          existingDescriptions[soundId] = soundConfig.categories.ui.sounds[soundId].description;
        }
      });
    }
    
    // Reset spritemap and sounds
    uiSounds.spritemap = {};
    soundConfig.categories.ui.sounds = {};
    
    // Create a temporary directory for processing
    const tempDir = app.getPath('temp');
    const tempOutputPath = path.join(tempDir, 'combined-sounds.mp3');
    
    // Build the ffmpeg command to concatenate all sound files
    let currentPosition = 0; // Track position in seconds
    const silenceDuration = 0.5; // Half a second of silence between sounds
    const silenceFile = path.join(tempDir, 'silence.mp3');
    
    // Create a short silence file
    execSync(`"${ffmpeg}" -y -f lavfi -i anullsrc=r=44100:cl=mono -t ${silenceDuration} "${silenceFile}"`);
    
    // Process each sound file
    for (let i = 0; i < soundFiles.length; i++) {
      const soundFile = soundFiles[i];
      
      // Get duration of the sound file
      let duration = 0;
      try {
        const ffprobe = ffmpeg.replace('ffmpeg', 'ffprobe');
        if (fs.existsSync(ffprobe)) {
          const probeCommand = `"${ffprobe}" -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${soundFile.path}"`;
          const durationStr = execSync(probeCommand, { encoding: 'utf8' }).trim();
          duration = parseFloat(durationStr);
        } else {
          // Fallback
          const durationOutput = execSync(`"${ffmpeg}" -i "${soundFile.path}" 2>&1`, { encoding: 'utf8' });
          const durationMatch = durationOutput.match(/Duration: (\d{2}):(\d{2}):(\d{2}\.\d{2})/);
          if (durationMatch) {
            const hours = parseInt(durationMatch[1]);
            const minutes = parseInt(durationMatch[2]);
            const seconds = parseFloat(durationMatch[3]);
            duration = hours * 3600 + minutes * 60 + seconds;
          }
        }
      } catch (error) {
        console.error(`Error getting duration for ${soundFile.name}:`, error);
        duration = 1.0; // Default
      }
      
      if (isNaN(duration) || duration <= 0) {
        duration = 1.0; // Fallback
      }
      
      // Add to spritemap and config
      uiSounds.spritemap[soundFile.name] = {
        start: currentPosition, // Always in seconds
        end: currentPosition + duration, // Always in seconds
        loop: false
      };
      
      // Use saved description if available, otherwise use a default
      const description = existingDescriptions[soundFile.name] || `Sound effect for ${soundFile.name}`;
        
      soundConfig.categories.ui.sounds[soundFile.name] = {
        start: Math.round(currentPosition * 1000), // Convert to milliseconds for sound-config.json
        duration: Math.round(duration * 1000), // Convert to milliseconds for sound-config.json
        description: description
      };
      
      // Update position for next sound
      currentPosition += duration + silenceDuration;
    }
    
    // Build the input files list for ffmpeg
    const inputFiles = [];
    soundFiles.forEach((soundFile, index) => {
      inputFiles.push(soundFile.path);
      if (index < soundFiles.length - 1) {
        inputFiles.push(silenceFile); // Add silence between sounds
      }
    });
    
    // Create the filter complex string for concatenation
    const filterComplex = inputFiles.map((_, i) => `[${i}:a]`).join('') + 
                          `concat=n=${inputFiles.length}:v=0:a=1[out]`;
    
    // Build the ffmpeg command
    let ffmpegCommand = `"${ffmpeg}" -y `;
    inputFiles.forEach(file => {
      ffmpegCommand += `-i "${file}" `;
    });
    ffmpegCommand += `-filter_complex "${filterComplex}" -map "[out]" "${tempOutputPath}"`;
    
    // Execute the command to create the combined file
    execSync(ffmpegCommand, { stdio: 'ignore' });
    
    // Copy the combined file to the final location
    const finalMp3Path = path.join(audioAssetsPath, 'ui-sounds.mp3');
    fs.copyFileSync(tempOutputPath, finalMp3Path);
    
    // Create WebM version
    execSync(`"${ffmpeg}" -y -i "${finalMp3Path}" "${path.join(audioAssetsPath, 'ui-sounds.webm')}"`);  
    
    // Save updated configuration files
    fs.writeFileSync(soundConfigPath, JSON.stringify(soundConfig, null, 2));
    fs.writeFileSync(uiSoundsPath, JSON.stringify(uiSounds, null, 2));
    
    // Clean up temporary files
    try {
      fs.unlinkSync(tempOutputPath);
      fs.unlinkSync(silenceFile);
    } catch (cleanupError) {
      console.error('Error cleaning up temp files:', cleanupError);
    }
    
    return { 
      success: true, 
      message: 'Sound sprite regenerated successfully',
      soundCount: soundFiles.length,
      totalDuration: currentPosition
    };
  } catch (error) {
    console.error('Error regenerating sound sprite:', error);
    return { error: error.message };
  }
});

ipcMain.handle('select-audio-file', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'Audio Files', extensions: ['mp3', 'wav', 'ogg'] }
    ]
  });
  
  if (result.canceled) {
    return { canceled: true };
  }
  
  return { filePath: result.filePaths[0] };
});

ipcMain.handle('add-sound-to-sprite', async (event, { soundName, filePath, startTime }) => {
  try {
    // Create sounds directory if it doesn't exist
    const soundsDir = path.join(audioAssetsPath, 'sounds');
    if (!fs.existsSync(soundsDir)) {
      fs.mkdirSync(soundsDir);
    }
    
    // Copy the sound file to the sounds directory
    const soundFileName = `${soundName}.mp3`;
    const targetPath = path.join(soundsDir, soundFileName);
    fs.copyFileSync(filePath, targetPath);
    
    // Get existing sprite file
    const uiSoundsMp3Path = path.join(audioAssetsPath, 'ui-sounds.mp3');
    
    // Use ffmpeg to add the new sound to the sprite
    const outputPath = path.join(audioAssetsPath, 'ui-sounds-new.mp3');
    
    execSync(`"${ffmpeg}" -y -i "${uiSoundsMp3Path}" -i "${targetPath}" -filter_complex "[0:a][1:a]concat=n=2:v=0:a=1" "${outputPath}"`);
    
    // Replace the old sprite with the new one
    fs.renameSync(outputPath, uiSoundsMp3Path);
    
    // Create WebM version (with -y flag to force overwrite)
    execSync(`"${ffmpeg}" -y -i "${uiSoundsMp3Path}" "${path.join(audioAssetsPath, 'ui-sounds.webm')}"`);
    
    // Get the duration of the new sound using a safer approach
    let duration = 1.0; // Default duration
    try {
      // Use ffprobe instead of ffmpeg for getting media information
      const ffprobe = ffmpeg.replace('ffmpeg', 'ffprobe');
      // Check if ffprobe exists
      if (fs.existsSync(ffprobe)) {
        const probeCommand = `"${ffprobe}" -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${targetPath}"`;
        const durationStr = execSync(probeCommand, { encoding: 'utf8' }).trim();
        const parsedDuration = parseFloat(durationStr);
        if (!isNaN(parsedDuration)) {
          duration = parsedDuration;
        }
      } else {
        // Fallback to ffmpeg if ffprobe is not available
        const durationCommand = `"${ffmpeg}" -i "${targetPath}" 2>&1`;
        const durationOutput = execSync(durationCommand, { encoding: 'utf8' });
        const durationMatch = durationOutput.match(/Duration: (\d{2}):(\d{2}):(\d{2}\.\d{2})/);
        
        if (durationMatch) {
          const hours = parseInt(durationMatch[1]);
          const minutes = parseInt(durationMatch[2]);
          const seconds = parseFloat(durationMatch[3]);
          duration = hours * 3600 + minutes * 60 + seconds;
        }
      }
      console.log(`Detected duration for ${soundName}: ${duration} seconds`);
    } catch (durationError) {
      console.error('Error detecting duration:', durationError.message);
      // Continue with default duration
    }
    
    // Calculate the end time for the new sound
    const endTime = startTime + duration;
    
    // Update the sound configuration files
    const soundConfigPath = path.join(audioAssetsPath, 'sound-config.json');
    const uiSoundsPath = path.join(audioAssetsPath, 'ui-sounds.json');
    
    // Read the existing configuration files
    const soundConfig = JSON.parse(fs.readFileSync(soundConfigPath, 'utf8'));
    const uiSounds = JSON.parse(fs.readFileSync(uiSoundsPath, 'utf8'));
    
    // Add the new sound to the sound config
    if (!soundConfig.categories.ui.sounds[soundName]) {
      soundConfig.categories.ui.sounds[soundName] = {
        start: Math.round(startTime * 1000), // Convert to milliseconds for sound-config.json
        duration: Math.round(duration * 1000), // Convert to milliseconds for sound-config.json
        description: `Sound effect for ${soundName}`
      };
    }
    
    // Add the new sound to the UI sounds spritemap
    if (!uiSounds.spritemap[soundName]) {
      uiSounds.spritemap[soundName] = {
        start: startTime,
        end: endTime,
        loop: false
      };
    }
    
    // Write the updated configuration files
    fs.writeFileSync(soundConfigPath, JSON.stringify(soundConfig, null, 2));
    fs.writeFileSync(uiSoundsPath, JSON.stringify(uiSounds, null, 2));
    
    return { 
      success: true, 
      soundName,
      spriteInfo: {
        startTime: startTime,
        endTime: endTime
      }
    };
  } catch (error) {
    console.error('Error adding sound to sprite:', error);
    return { error: error.message };
  }
});

ipcMain.handle('play-sound', async (event, params) => {
  try {
    const { soundId } = params;
    const soundConfigPath = path.join(audioAssetsPath, 'sound-config.json');
    const uiSoundsPath = path.join(audioAssetsPath, 'ui-sounds.json');
    
    // Read the sound configuration files
    const soundConfig = JSON.parse(fs.readFileSync(soundConfigPath, 'utf8'));
    const uiSounds = JSON.parse(fs.readFileSync(uiSoundsPath, 'utf8'));
    
    // Find the sound in the spritemap
    const sprite = uiSounds.spritemap[soundId];
    if (!sprite) {
      return { error: `Sound ${soundId} not found in spritemap` };
    }
    
    // Validate sprite data
    if (sprite.start === undefined || sprite.start === null || isNaN(sprite.start)) {
      return { error: `Invalid start time for sound ${soundId}` };
    }
    
    if (sprite.end === undefined || sprite.end === null || isNaN(sprite.end)) {
      return { error: `Invalid end time for sound ${soundId}` };
    }
    
    // Use the child_process to play the sound using ffplay (comes with ffmpeg)
    const mp3Path = path.join(audioAssetsPath, 'ui-sounds.mp3');
    const startTime = sprite.start; // Already in seconds
    const duration = sprite.end - sprite.start; // Calculate duration in seconds
    
    // Additional validation for calculated duration
    if (duration <= 0 || isNaN(duration)) {
      return { error: `Invalid duration for sound ${soundId}: ${duration}` };
    }
    
    // On macOS, we can use the built-in afplay command
    // Create a temporary file with the extracted audio segment
    const tempDir = app.getPath('temp');
    const tempFile = path.join(tempDir, `sound-${soundId}-${Date.now()}.mp3`);
    
    // Extract the audio segment using ffmpeg
    const extractCommand = `"${ffmpeg}" -ss ${startTime} -t ${duration} -i "${mp3Path}" -acodec copy "${tempFile}"`;
    execSync(extractCommand, { stdio: 'ignore' });
    
    // Play the extracted audio segment
    const playCommand = `afplay "${tempFile}"`;
    execSync(playCommand, { stdio: 'ignore' });
    
    // Delete the temporary file
    fs.unlinkSync(tempFile);
    
    return { success: true };
  } catch (error) {
    console.error('Error playing sound:', error);
    return { error: error.message };
  }
});
