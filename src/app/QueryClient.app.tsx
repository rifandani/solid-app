import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';
import { ParentComponent } from 'solid-js';

export const queryClient = new QueryClient();

const QueryProvider: ParentComponent = (props) => (
  <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
);

export default QueryProvider;
