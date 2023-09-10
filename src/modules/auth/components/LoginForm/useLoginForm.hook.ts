import { authApi } from '@auth/api/auth.api';
import { LoginApiResponseSchema, LoginSchema, loginSchema } from '@auth/api/auth.schema';
import { createForm } from '@felte/solid';
import { validator } from '@felte/validator-zod';
import { ErrorApiResponseSchema } from '@shared/api/api.schema';
import { useAppStorage } from '@shared/hooks/useAppStorage/useAppStorage.hook';
import { useI18n } from '@shared/hooks/usei18n/usei18n.hook';
import { useNavigate } from '@solidjs/router';
import { createMutation } from '@tanstack/solid-query';

export default function useLoginForm() {
  const navigate = useNavigate();
  const [, setApp] = useAppStorage();
  const [t] = useI18n();

  const loginMutation = createMutation<LoginApiResponseSchema, ErrorApiResponseSchema, LoginSchema>(
    {
      mutationFn: (creds) => authApi.login(creds),
      onSuccess: (resp) => {
        // set user data to local storage and global store
        setApp('user', resp);
        navigate('/');
      },
    },
  );

  const felte = createForm<LoginSchema>({
    extend: [validator({ schema: loginSchema })],
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values, { reset }) => {
      loginMutation.mutate(values, {
        onError: () => {
          // reset form
          reset();
        },
      });
    },
  });

  return { t, loginMutation, ...felte };
}
