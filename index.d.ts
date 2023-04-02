import { SetupWorker } from 'msw';

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      // model: [() => any, (v: any) => any];
      // formSubmit: [any];
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
