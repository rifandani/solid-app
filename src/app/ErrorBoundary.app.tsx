import { Component, ErrorBoundary, onMount, ParentComponent } from 'solid-js';

const Fallback: Component<{ err: unknown; reset: () => void }> = (props) => {
  onMount(() => {
    // TODO: Log Error to Sentry or other error monitoring service
  });

  return (
    <main class="flex min-h-screen flex-col items-center justify-center">
      <h1 class="mb-3">Something went wrong.</h1>

      <button type="button" onClick={() => props.reset()}>
        Reload Page
      </button>

      <pre>{JSON.stringify(props.err, null, 2)}</pre>
    </main>
  );
};

const AppErrorBoundary: ParentComponent = (props) => (
  <ErrorBoundary fallback={(err, reset) => <Fallback err={err as unknown} reset={reset} />}>
    {props.children}
  </ErrorBoundary>
);

export default AppErrorBoundary;
