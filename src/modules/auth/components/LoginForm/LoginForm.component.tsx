import { Component, Show } from 'solid-js';
import { twMerge } from 'tailwind-merge';
import useLoginForm from './useLoginForm.hook';

const LoginForm: Component = () => {
  const { t, loginMutation, form, errors } = useLoginForm();

  return (
    <form use:form data-testid="form" class="form-control pt-3 md:pt-8">
      {/* username */}
      <div class="form-control pt-4">
        <label class="label" for="username">
          <span class="label-text">{t('username')}</span>
        </label>

        <input
          data-testid="input-username"
          class={twMerge(
            'input mt-1 shadow-md',
            errors()?.username?.length ? 'input-error' : 'input-primary',
          )}
          placeholder={t('usernamePlaceholder')}
          id="username"
          name="username"
          type="text"
          required
        />

        <Show when={errors()?.username?.length}>
          <p class="pl-5 pt-1 text-error">
            {t('errorMinLength', { field: 'username', length: '3' })}
          </p>
        </Show>
      </div>

      {/* password */}
      <div class="form-control pt-4">
        <label class="label" for="password">
          <span class="label-text">{t('password')}</span>
        </label>

        <input
          class={twMerge(
            'input-primary input mt-1 shadow-md',
            errors()?.password?.length ? 'input-error' : 'input-primary',
          )}
          placeholder={t('passwordPlaceholder')}
          type="password"
          name="password"
          required
        />

        <Show when={errors()?.password?.length}>
          <p class="pl-5 pt-1 text-error">
            {t('errorMinLength', { field: 'password', length: '3' })}
          </p>
        </Show>
      </div>

      <Show when={loginMutation.isError}>
        <div class="alert alert-error mt-3 shadow-lg">
          <div class="flex flex-col items-start">
            <span>❌ {(loginMutation.error as Error).message} </span>
          </div>
        </div>
      </Show>

      <button
        data-testid="button-submit"
        class="btn-primary btn mt-8 normal-case"
        type="submit"
        disabled={loginMutation.isLoading}
      >
        {loginMutation.isLoading ? t('loginLoading') : t('login')}
      </button>
    </form>
  );
};

export default LoginForm;
