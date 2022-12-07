const projectName = import.meta.env.VIFT_GLOB_APP_TITLE;

export function warn(message: string) {
  console.warn(`[${projectName} warn]:${message}`);
}

export function error(message: string) {
  throw new Error(`[${projectName} warn]:${message}`);
}
