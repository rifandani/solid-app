import { useNavigate } from '@solidjs/router';
import { createMutation } from '@tanstack/solid-query';
import { Component, Show, createSignal } from 'solid-js';
import { twMerge } from 'tailwind-merge';
import { ApiErrorResponse, ApiSuccessResponse } from '../../../shared/constants/types.constant';
import { useAppStorage } from '../../../shared/hooks/useAppStorage/useAppStorage.hook';
import { login } from '../../../shared/services/api/auth';
import { FormOnSubmit, InputOnKeyUp } from '../../../shared/types/form.type';
import { UserStorageSchema } from '../../../user/api/user.schema';
import { Login, Token } from '../../api/auth.schema';

const formInitialValue: Login = {
  email: '',
  password: '',
};

function useLoginForm() {
  const navigate = useNavigate();
  const [, setApp] = useAppStorage();
  const [form, setForm] = createSignal(formInitialValue);

  const loginMutation = createMutation({
    mutationFn: () => login(form()),
    onSuccess: (resp) => {
      if (!resp.ok) {
        throw new Error((resp as ApiErrorResponse).error.code);
      } else {
        // set user data to local storage and global store
        const user: UserStorageSchema = {
          email: form().email,
          token: (resp as ApiSuccessResponse<Token>).login.token,
        };

        setApp('user', user);
        navigate('/');
      }
    },
    onError: () => {
      setForm(formInitialValue);
    },
  });

  const onKeyUpEmail: InputOnKeyUp = (ev) => {
    setForm((prev) => ({
      ...prev,
      email: ev.currentTarget.value,
    }));
  };

  const onKeyUpPassword: InputOnKeyUp = (ev) => {
    setForm((prev) => ({
      ...prev,
      password: ev.currentTarget.value,
    }));
  };

  const onSubmitForm: FormOnSubmit = (ev) => {
    ev.preventDefault();
    loginMutation.mutate();
  };

  return { form, loginMutation, onKeyUpEmail, onKeyUpPassword, onSubmitForm };
}

const LoginForm: Component = () => {
  const vm = useLoginForm();

  return (
    <form
      data-testid="form"
      class="form-control pt-3 md:pt-8"
      onSubmit={(ev) => vm.onSubmitForm(ev)}
    >
      {/* email */}
      <div class="form-control pt-4">
        <label class="label" for="email">
          <span class="label-text">Email</span>
        </label>

        <input
          data-testid="input-username"
          class={twMerge(
            'input-primary input mt-1 shadow-md',
            // $errors?.email?.length ? 'input-error' : 'input-primary',
          )}
          placeholder="Your email..."
          name="email"
          type="email"
          required
          autofocus
          onKeyUp={vm.onKeyUpEmail}
          value={vm.form().email}
        />
      </div>

      {/* password */}
      <div class="form-control pt-4">
        <label class="label" for="password">
          <span class="label-text">Password</span>
        </label>

        <input
          class={twMerge(
            'input-primary input mt-1 shadow-md',
            // $errors?.password?.length ? 'input-error' : 'input-primary',
          )}
          placeholder="Your password..."
          type="password"
          name="password"
          minlength="8"
          required
          onKeyUp={vm.onKeyUpPassword}
          value={vm.form().password}
        />
      </div>

      <Show when={vm.loginMutation.isError}>
        <div class="alert alert-error mt-3 shadow-lg">
          <div class="flex flex-col items-start">
            <span>❌ {(vm.loginMutation.error as Error).message} </span>
          </div>
        </div>
      </Show>

      <button
        data-testid="button-submit"
        class="btn-primary btn mt-8 normal-case"
        type="submit"
        disabled={vm.loginMutation.isLoading}
      >
        {vm.loginMutation.isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;
