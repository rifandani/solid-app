import router from '@solidjs/router';
import solid from 'solid-js';
import { vi } from 'vitest';

// mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// mock window matchMedia
window.matchMedia = function matchMedia(query) {
  return {
    media: query,
    matches: false,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  };
};

// implementation of window.resizeTo for dispatching event
window.resizeTo = function resizeTo(width, height) {
  Object.assign(this, {
    innerWidth: width,
    innerHeight: height,
    outerWidth: width,
    outerHeight: height,
  }).dispatchEvent(new this.Event('resize'));
};

export const mockedNavigator = vi.fn(() => (path: string) => path);
export const mockedLocation = vi.fn(() => ({ pathname: '/login' }));
export const mockedCreateResource = vi.fn(() => [
  () => ({
    id: 1,
  }),
  { refetch: () => {} },
]);

vi.mock('@solidjs/router', async () => {
  const actual = await vi.importActual<typeof router>('@solidjs/router');

  return {
    ...actual,
    useNavigate: mockedNavigator,
    useLocation: mockedLocation,
  };
});

vi.mock('solid-js', async () => {
  const actual = await vi.importActual<typeof solid>('solid-js');

  return {
    ...actual,
    createResource: mockedCreateResource,
  };
});

vi.mock('@solid-primitives/event-listener');
