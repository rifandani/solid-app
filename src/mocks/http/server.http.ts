import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { handlers } from './handlers.http';

// This configures a request mocking server with the given request handlers.
const server = setupServer(...handlers);

export { rest, server };
