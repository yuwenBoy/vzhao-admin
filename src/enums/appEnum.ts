// menu theme enum
export enum ThemeEnum {
  DARK = 'dark',
  LIGHT = 'light',
}

export enum ContentEnum {
  // auto width
  FULL = 'full',
  // fixed width
  FIXED = 'fixed',
}

export enum SettingButtonPositionEnum {
  AUTO = 'auto',
  HEADER = 'header',
  FIXED = 'fixed',
}

export enum SessionTimeoutProcessingEnum {
  ROUTE_JUMP,
  PAGE_COVERAGE,
}

// route switching animation
export enum RouterTransitionEnum {
    ZOOM_FADE = 'zoom-fade',
    ZOOM_OUT = 'zoom-out',
    FADE_SLIDE = 'fade-slide',
    FADE = 'fade',
    FADE_BOTTOM = 'fade-bottom',
    FADE_SCALE= 'fade-scale'
}