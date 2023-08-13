import '@testing-library/jest-dom'; // automatically `expect.extend(matchers)`
import { server } from './mocks/http/server.http';
import './mocks/module.mock';

// Establish API mocking before all tests with MSW
beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'warn',
  });
});

// Reset any request handlers that we may add during the tests, so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  // vi.resetAllMocks();
  // vi.restoreAllMocks();
  // vi.clearAllMocks();
});

// Clean up after the tests are finished.
afterAll(() => {
  server.close();
});
