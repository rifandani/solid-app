import { SetupWorker } from 'msw';

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      form: true;
      // model: [() => any, (v: any) => any];
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
