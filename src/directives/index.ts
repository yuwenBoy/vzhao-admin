import type { App } from "vue";
import { setupLoadingDirective } from "./loading";
export function setupLoadingDirectives(app:App){
    setupLoadingDirective(app);
}