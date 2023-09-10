import { Component, Show } from 'solid-js';
import { twJoin } from 'tailwind-merge';
import useLoginForm from './useLoginForm.hook';

const LoginForm: Component = () => {
  const { t, loginMutation, form, errors } = useLoginForm();

  return (
    <form use:form aria-label="form-login" class="form-control pt-3 md:pt-8">
      {/* username */}
      <fieldset class="form-control pt-4">
        <label class="label" for="username">
          <span class="label-text">{t('username')}</span>
        </label>

        <input
          id="username"
          name="username"
          type="text"
          aria-label="textbox-username"
          aria-labelledby="#username"
          aria-invalid={!!errors()?.username?.length}
          required
          placeholder={t('usernamePlaceholder')}
          class={twJoin(
            'input mt-1 shadow-md',
            errors()?.username?.length ? 'input-error' : 'input-primary',
          )}
        />

        <Show when={errors()?.username?.length}>
          <p class="pl-5 pt-1 text-error">
            {t('errorMinLength', { field: 'username', length: '3' })}
          </p>
        </Show>
      </fieldset>

      {/* password */}
      <fieldset class="form-control pt-4">
        <label class="label" for="password">
          <span class="label-text">{t('password')}</span>
        </label>

        <input
          id="password"
          name="password"
          type="password"
          aria-label="textbox-password"
          aria-labelledby="#password"
          aria-invalid={!!errors()?.password?.length}
          required
          placeholder={t('passwordPlaceholder')}
          class={twJoin(
            'input input-primary mt-1 shadow-md',
            errors()?.password?.length ? 'input-error' : 'input-primary',
          )}
        />

        <Show when={errors()?.password?.length}>
          <p role="alert" class="pl-5 pt-1 text-error">
            {t('errorMinLength', { field: 'password', length: '3' })}
          </p>
        </Show>
      </fieldset>

      <Show when={loginMutation.isError}>
        <div class="alert alert-error mt-3 shadow-lg">
          <p>❌ {(loginMutation.error as Error).message} </p>
        </div>
      </Show>

      <button
        type="submit"
        class="btn btn-primary mt-8 normal-case disabled:btn-disabled"
        disabled={loginMutation.isLoading}
      >
        {loginMutation.isLoading ? t('loginLoading') : t('login')}
      </button>
    </form>
  );
};

export default LoginForm;
