import { AsyncLocalStorage } from 'async_hooks';
import { ProjectConfig } from '/#/config';
import {
  TOKEN_KEY,
  USER_INFO_KEY,
  // ROLES_KEY,
  LOCK_INFO_KEY,
  PROJ_ZJ_KEY,
  APP_LOCAL_CACHE_KEY,
  APP_SESSION_CACHE_KEY,
  MULTIPLE_TABS_KEY,
} from '/@/enums/cacheEnum';

import { Memory } from './memory';

import { DEFAULT_CACHE_TIME } from '/@/settings/encryptionSetting';

interface BasicStore {
  [TOKEN_KEY]: string | number | null | undefined;
  [USER_INFO_KEY]: null;
  [PROJ_ZJ_KEY]: ProjectConfig;
}
type LocalStore = BasicStore;

type SessionStore = BasicStore;
export type BasicKeys = keyof BasicStore;

type LocalKeys = keyof LocalStore;
// type SessionKeys = keyof SessionKeys;

const localMemory = new Memory(DEFAULT_CACHE_TIME);
const sessionMemory = new Memory(DEFAULT_CACHE_TIME);
export class Persistent {
  static getLocal<T>(key: LocalKeys) {
    return localMemory.get(key)?.value as Nullable<T>;
  }
}
