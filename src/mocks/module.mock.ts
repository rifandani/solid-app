/* eslint-disable import/no-extraneous-dependencies */
import router from '@solidjs/router';
import solid from 'solid-js';
import { vi } from 'vitest';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import matchMediaPolyfill from 'mq-polyfill';

// mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// mock matchMedia
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
matchMediaPolyfill(window);

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
export const mockedRouteData = vi.fn();
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
    useRouteData: mockedRouteData,
  };
});

vi.mock('solid-js', async () => {
  const actual = await vi.importActual<typeof solid>('solid-js');

  return {
    ...actual,
    createResource: mockedCreateResource,
  };
});
