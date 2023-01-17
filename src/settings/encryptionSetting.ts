import { isDevMode } from '/@/utils/env';
// system default cache time ,in seconds 7天
export const DEFAULT_CACHE_TIME = 5*60//60 * 60 * 24 * 7; // 1*60 (1秒)
// aes encryption key
export const cacheCipher = {
  key: '_11111000001111@',
  iv: '@11111000001111_',
};
// Whether the system cache is encrypted using aes
export const enableStorageEncryption = !isDevMode();
