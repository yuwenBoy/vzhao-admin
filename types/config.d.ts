export interface ProjectConfig {
  // Storage location of permission related information
  permissionCacheType: CacheTypeEnum;
  showDarkModeToggle: boolean;
  ShowSettingButton: boolean;
   // Session timeout processing
   sessionTimeoutProcessing: SessionTimeoutProcessingEnum;
}

export interface GlobConfig {
  apiUrl: string;
   //  Service interface url prefix
   urlPrefix?: string;
}

export interface GlobEnvConfig {
  // site title
  VITE_GLOB_APP_TITLE: string;

  // Service interface url
  VITE_GLOB_API_URL: string;

  // Service interface url prefix
  VITE_GLOB_API_URL_PREFIX?: string;

  // Project abbreviation
  VITE_GLOB_APP_SHORT_NAME: string;

  // Upload url
  VITE_GLOB_UPLOAD_URL?: string;
}
