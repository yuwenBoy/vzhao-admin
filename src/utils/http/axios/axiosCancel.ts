import type { AxiosRequestConfig, Canceler } from 'axios';

import axios from 'axios';

import { isFunction } from '/@/utils/is';

let pendingMap = new Map<string, Canceler>();

export const getPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url].join('&');

export class AxiosCanceler {
  /**
   * Add request
   *
   */
  addPending(config: AxiosRequestConfig) {
    this.removePending(config);
    const url = getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          pendingMap.set(url, cancel);
        }
      });
  }

  /**
   * @description: Clear all pending
   */
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel();
    });
    pendingMap.clear();
  }

  /**
   * Remove request
   * @param {Object} config
   */
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config);

    if (pendingMap.has(url)) {
      const cancel = pendingMap.get(url);

      cancel && cancel(url);
      pendingMap.delete(url);
    }
  }

  reset(): void {
    pendingMap = new Map<string, Canceler>();
  }
}
