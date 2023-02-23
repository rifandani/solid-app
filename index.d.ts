import { SetupWorkerApi } from 'msw';

// declare module 'solid-js' {
//   namespace JSX {
//     interface Directives {
//       model: [() => any, (v: any) => any];
//       formSubmit: [any];
//     }
//   }
// }

declare global {
  interface Window {
    msw: {
      worker: SetupWorkerApi;
    };
  }
}
