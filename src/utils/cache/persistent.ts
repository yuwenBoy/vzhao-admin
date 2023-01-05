import { AsyncLocalStorage } from 'async_hooks';
import { ProjectConfig } from '/#/config';
import {
  TOKEN_KEY,
  USER_INFO_KEY,
  ROLES_KEY,
  LOCK_INFO_KEY,
  PROJ_ZJ_KEY,
  APP_LOCAL_CACHE_KEY,
  APP_SESSION_CACHE_KEY,
  MULTIPLE_TABS_KEY,
} from '/@/enums/cacheEnum';

import type { UserInfo } from '/#/store';


import { createLocalStorage, createSessionStorage } from '/@/utils/cache';
import { Memory } from './memory';

import { DEFAULT_CACHE_TIME } from '/@/settings/encryptionSetting';

import { toRaw } from 'vue';

interface BasicStore {
  [TOKEN_KEY]: string | number | null | undefined;
  [USER_INFO_KEY]: UserInfo;
  [ROLES_KEY]: string[];
  [PROJ_ZJ_KEY]: ProjectConfig;
}
type LocalStore = BasicStore;

type SessionStore = BasicStore;

export type BasicKeys = keyof BasicStore;
type LocalKeys = keyof LocalStore;
type SessionKeys = keyof SessionStore;

const ls = createLocalStorage();
const ss = createSessionStorage();

const localMemory = new Memory(DEFAULT_CACHE_TIME);
const sessionMemory = new Memory(DEFAULT_CACHE_TIME);
export class Persistent {
  static getLocal<T>(key: LocalKeys) {
    return localMemory.get(key)?.value as Nullable<T>;
  }

  static setLocal(key: LocalKeys, value: LocalStore[LocalKeys], immediate = false): void {
    localMemory.set(key, toRaw(value));
    immediate && ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache);
  }

  static clearLocal(immediate = false): void {
    localMemory.clear();
    immediate && ls.clear();
  }

  static getSession<T>(key: SessionKeys) {
    return sessionMemory.get(key)?.value as Nullable<T>;
  }

  static setSession(key: SessionKeys,value: SessionStore[SessionKeys],immediate = false): void {
    sessionMemory.set(key,toRaw(value));
    immediate && ss.set(APP_SESSION_CACHE_KEY,sessionMemory.getCache);
  }

  static clearSession(immediate = false): void {
    sessionMemory.clear();
    immediate && ss.clear();
  }
}
