const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getAudioPaths: () => ipcRenderer.invoke('get-audio-paths'),
  getSoundConfig: () => ipcRenderer.invoke('get-sound-config'),
  saveSoundConfig: (config) => ipcRenderer.invoke('save-sound-config', config),
  selectAudioFile: () => ipcRenderer.invoke('select-audio-file'),
  addSoundToSprite: (params) => ipcRenderer.invoke('add-sound-to-sprite', params),
  playSound: (params) => ipcRenderer.invoke('play-sound', params),
  regenerateSoundSprite: () => ipcRenderer.invoke('regenerate-sound-sprite')
});
