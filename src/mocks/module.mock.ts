import router from '@solidjs/router';
import solid from 'solid-js';
// eslint-disable-next-line import/no-extraneous-dependencies
import { vi } from 'vitest';

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
