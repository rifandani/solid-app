import { Route } from '@solidjs/router';
import { vi } from 'vitest';
import { appStore, setAppStore } from '../../app/Store.app';
import { mockedLocation, mockedNavigator } from '../../mocks/module.mock';
import { renderProviders } from '../../utils/test.util';
import useAuth from './useAuth.hook';

function TestComponent() {
  useAuth();

  return <div />;
}

describe('useAuth hook', () => {
  // assign the spy instance to a const
  const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
  // with happy dom we can do:
  // const getItemSpy = vi.spyOn(localStorage, 'getItem')

  afterEach(() => {
    getItemSpy.mockClear(); // clear call history
    localStorage.clear();
  });

  it('should be defined', () => {
    // ASSERT
    expect(useAuth).toBeDefined();
  });

  it('should navigate to "/login", when "user" key does not exists in localStorage', () => {
    // ARRANGE
    renderProviders(() => <Route path="/" component={TestComponent} />);

    // ASSERT
    expect(getItemSpy).toHaveBeenCalled();
    expect(mockedNavigator).toHaveBeenCalled();
  });

  it('should populate appStore, when "user" key exists in localStorage && "user" key equals to null in appStore', () => {
    // ARRANGE
    getItemSpy.mockImplementationOnce(() => '{"email":"my email"}');
    renderProviders(() => <Route path="/" component={TestComponent} />);

    // ASSERT
    expect(getItemSpy).toHaveBeenCalled();
    expect(appStore.user).not.toBeNull();
  });

  it('should navigate to /, when "user" key exists in localStorage && "user" key and value exists in appStore && current location pathname includes "/login"', () => {
    // ARRANGE
    getItemSpy.mockImplementationOnce(() => '{"email":"my email"}');
    setAppStore('user', { email: 'my email' });
    renderProviders(() => <Route path="/" component={TestComponent} />);

    // ASSERT
    expect(getItemSpy).toHaveBeenCalled();
    expect(appStore.user).not.toBeNull();
    expect(mockedLocation).toHaveBeenCalled();
    expect(mockedNavigator).toHaveBeenCalled();
  });
});
