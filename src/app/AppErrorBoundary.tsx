import { Component, ErrorBoundary, JSX, onMount } from 'solid-js';

const Fallback: Component<{ err: any; reset: () => void }> = (props) => {
  onMount(() => {
    // TODO: Log Error to Sentry or other error monitoring service
  });

  return (
    // TODO: Update styling based on UI/UX design
    <div>
      <h1>Something went wrong.</h1>
      <button type="button" onClick={props.reset}>
        Reload Page
      </button>
      <pre>{JSON.stringify(props.err, null, 2)}</pre>
    </div>
  );
};

const AppErrorBoundary: Component<{ children: JSX.Element }> = (props) => {
  return (
    <ErrorBoundary
      fallback={(err, reset) => <Fallback err={err} reset={reset} />}
    >
      {props.children}
    </ErrorBoundary>
  );
};

export default AppErrorBoundary;
