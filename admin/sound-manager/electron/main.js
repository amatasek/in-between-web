const { app, BrowserWindow, ipcMain, dialog, protocol } = require('electron');
const path = require('path');
const fs = require('fs');
const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');
const Store = require('electron-store');

const store = new Store();

// Path to the audio assets directory
const audioAssetsPath = path.resolve(__dirname, '../../../server/assets/audio');

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

app.whenReady().then(() => {
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

ipcMain.handle('save-sound-config', async (event, { soundConfig, uiSounds }) => {
  try {
    const soundConfigPath = path.join(audioAssetsPath, 'sound-config.json');
    const uiSoundsPath = path.join(audioAssetsPath, 'ui-sounds.json');
    
    fs.writeFileSync(soundConfigPath, JSON.stringify(soundConfig, null, 2));
    fs.writeFileSync(uiSoundsPath, JSON.stringify(uiSounds, null, 2));
    
    return { success: true };
  } catch (error) {
    console.error('Error saving sound config:', error);
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
    const uiSoundsPath = path.join(audioAssetsPath, 'ui-sounds.mp3');
    
    // Use ffmpeg to add the new sound to the sprite
    const outputPath = path.join(audioAssetsPath, 'ui-sounds-new.mp3');
    
    execSync(`"${ffmpeg}" -i "${uiSoundsPath}" -i "${targetPath}" -filter_complex "[0:a][1:a]concat=n=2:v=0:a=1" "${outputPath}"`);
    
    // Replace the old sprite with the new one
    fs.renameSync(outputPath, uiSoundsPath);
    
    // Create WebM version
    execSync(`"${ffmpeg}" -i "${uiSoundsPath}" "${path.join(audioAssetsPath, 'ui-sounds.webm')}"`);
    
    // Get the duration of the new sound
    const durationOutput = execSync(`"${ffmpeg}" -i "${targetPath}" 2>&1`).toString();
    const durationMatch = durationOutput.match(/Duration: (\d{2}):(\d{2}):(\d{2}\.\d{2})/);
    let duration = 1.0; // Default duration
    
    if (durationMatch) {
      const hours = parseInt(durationMatch[1]);
      const minutes = parseInt(durationMatch[2]);
      const seconds = parseFloat(durationMatch[3]);
      duration = hours * 3600 + minutes * 60 + seconds;
    }
    
    return { 
      success: true, 
      soundName,
      startTime,
      duration
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
    
    // Use the child_process to play the sound using ffplay (comes with ffmpeg)
    const mp3Path = path.join(audioAssetsPath, 'ui-sounds.mp3');
    const startTime = sprite.start; // Already in seconds
    const duration = sprite.end - sprite.start; // Calculate duration in seconds
    
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
