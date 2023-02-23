/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { handlers } from './handlers.http';

// This configures a request mocking server with the given request handlers.
const server = setupServer(...handlers);

export { server, rest };
