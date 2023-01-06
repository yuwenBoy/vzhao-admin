import type { App } from 'vue';
// import { Button } from './Button';
import {
  // Need
  Button,
  Input,
  Layout,
} from 'ant-design-vue';

const compList = [Button.Group];

export function registerGlobComp(app: App) {
  compList.forEach((comp) => {
    app.component(comp.name || comp.displayName, comp);
  });

  app.use(Input).use(Button).use(Layout);
}
