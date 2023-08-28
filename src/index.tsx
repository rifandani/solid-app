/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* @refresh reload */
import { render } from 'solid-js/web';
import App from './app/App.app';
import './index.css';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  );
}

// ONLY include browser worker on 'development' env
if (import.meta.env.DEV) {
  void import('./mocks/browser.mock')
    .then(({ worker }) => {
      // insert it into global window object, so we can debug the worker in runtime (e.g Chrome DevTools)
      window.msw = { worker };
      // start browser worker
      return worker.start({ onUnhandledRequest: 'bypass' });
    })
    .then(() => render(() => <App />, root!));
} else {
  render(() => <App />, root!);
}
