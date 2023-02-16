import router from '@solidjs/router';
import solid from 'solid-js';
import { vi } from 'vitest';

export const mockedNavigator = vi.fn();
export const mockedRouteData = vi.fn();
export const mockedCreateResource = vi.fn();

vi.mock('@solidjs/router', async () => {
  const actual = await vi.importActual<typeof router>('@solidjs/router');

  return {
    ...actual,
    useNavigate: mockedNavigator,
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
