import { mockedLocation, mockedNavigator } from '@mocks/module.mock';
import { renderProviders } from '@shared/utils/test.util';
import { Route } from '@solidjs/router';
import { vi } from 'vitest';
import useAuth from './useAuth.hook';

function TestComponent() {
  useAuth();

  return <div />;
}

describe('useAuth hook', () => {
  // assign the spy instance to a const
  // const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
  // with happy dom we can do:
  const getItemSpy = vi.spyOn(localStorage, 'getItem');

  afterEach(() => {
    getItemSpy.mockClear(); // clear call history
    localStorage.clear();
  });

  it('should be defined', () => {
    // ASSERT
    expect(useAuth).toBeDefined();
  });

  it.todo('should navigate to "/login", when "user" key does not exists in localStorage', () => {
    // ARRANGE
    renderProviders(() => <Route path="/" component={TestComponent} />);

    // ASSERT
    expect(getItemSpy).toHaveBeenCalled();
    expect(mockedNavigator).toHaveBeenCalled();
  });

  it.todo(
    'should navigate to /, when "user" key exists in localStorage && current location pathname includes "/login"',
    () => {
      // ARRANGE
      getItemSpy.mockImplementationOnce(() => '{"email":"my email"}');
      renderProviders(() => <Route path="/" component={TestComponent} />);

      // ASSERT
      expect(getItemSpy).toHaveBeenCalled();
      expect(mockedLocation).toHaveBeenCalled();
      expect(mockedNavigator).toHaveBeenCalled();
    },
  );
});
