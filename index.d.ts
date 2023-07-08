import { SetupWorker } from 'msw';
import 'solid-js';
import { MyCounterProps } from './src/lib/wc/MyCounter.constant';
import { ClickOutsideDirectiveParams } from './src/modules/shared/directives/clickOutside.directive';

declare global {
  interface Window {
    msw: {
      worker: SetupWorker;
    };
  }

  interface HTMLElementTagNameMap {
    'my-counter': MyCounterProps;
  }
}

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      form: true;
      clickOutside: ClickOutsideDirectiveParams;
      // autoAnimate: Partial<AutoAnimateOptions> | AutoAnimationPlugin | true;
    }

    // add custom element to global elements list
    // interface IntrinsicElements {
    //   'my-counter': HTMLAttributes<HTMLDivElement> & {
    //     'initial-count': string;
    //   };
    // }

    // Prefixes all properties with `attr:` to match Solid's property setting syntax
    type Props<T> = {
      [K in keyof T as `attr:${string & K}`]?: T[K];
    };
    type ElementProps<T> = {
      // Add both the element's prefixed properties and the attributes
      [K in keyof T]: Props<T[K]> & HTMLAttributes<T[K]>;
    };
    interface IntrinsicElements extends ElementProps<HTMLElementTagNameMap> {}
  }
}
