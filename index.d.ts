import { SetupWorker } from 'msw';
import 'solid-js';
import { ClickOutsideDirectiveParams } from './src/modules/shared/directives/clickOutside.directive';

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      form: true;
      clickOutside: ClickOutsideDirectiveParams;
      // autoAnimate: Partial<AutoAnimateOptions> | AutoAnimationPlugin | true;
    }
  }
}

declare global {
  interface Window {
    msw: {
      worker: SetupWorker;
    };
  }
}
