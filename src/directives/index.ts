import type { App } from "vue";
import { setupLoadingDirective } from "./loading";
export function setupGlobDirdctives(app:App){
    setupLoadingDirective(app);
}