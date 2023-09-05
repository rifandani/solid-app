import { renderProviders } from '@shared/utils/test.util';
import { Route } from '@solidjs/router';
import { fireEvent, screen } from '@solidjs/testing-library';
import { vi } from 'vitest';
import LoginForm from './LoginForm.component';

describe('LoginForm', () => {
  const validUsernameValue = 'kminchelle';
  const validPasswordValue = '0lelplR';
  const mockSubmitFn = vi.fn();

  it('should render properly', () => {
    const view = renderProviders(() => <Route path="/" component={LoginForm} />);
    expect(() => view).not.toThrow();
  });

  it('should be able to type the inputs and submit the login form', () => {
    // ARRANGE
    renderProviders(() => <Route path="/" component={LoginForm} />);
    const formLogin: HTMLFormElement = screen.getByRole('form', { name: /login/i });
    const inputUsername: HTMLInputElement = screen.getByPlaceholderText(/username/i);
    const inputPassword: HTMLInputElement = screen.getByPlaceholderText(/password/i);
    const buttonSubmit: HTMLButtonElement = screen.getByRole('button', { name: /login/i });
    formLogin.addEventListener('submit', mockSubmitFn);

    // ACT & ASSERT
    expect(formLogin).toBeInTheDocument();
    expect(inputUsername).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    fireEvent.change(inputUsername, { target: { value: validUsernameValue } });
    fireEvent.change(inputPassword, { target: { value: validPasswordValue } });
    expect(inputUsername).toHaveValue(validUsernameValue);
    expect(inputPassword).toHaveValue(validPasswordValue);
    fireEvent.click(buttonSubmit);
    expect(mockSubmitFn).toHaveBeenCalled();
  });
});
