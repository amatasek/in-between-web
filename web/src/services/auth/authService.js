import { Capacitor } from '@capacitor/core';
import { authService as nativeAuthService } from './authService.native.js';
import { authService as webAuthService } from './authService.web.js';

const isNative = Capacitor.isNativePlatform();

export const authService = isNative ? nativeAuthService : webAuthService;
