import { createForm } from '@felte/solid';
import { validator } from '@felte/validator-zod';
import { toaster } from '@kobalte/core';
import { random } from '@rifandani/nxact-yutiriti';
import { Toaster } from '@shared/components/molecules';
import { useAppStorage } from '@shared/hooks/useAppStorage/useAppStorage.hook';
import { useI18n } from '@shared/hooks/usei18n/usei18n.hook';
import { useBeforeLeave } from '@solidjs/router';
import { useQueryClient } from '@tanstack/solid-query';
import { TodoSchema, todoSchema } from '@todo/api/todo.schema';
import useTodoCreate from '@todo/hooks/useTodoCreate/useTodoCreate.hook';
import { useTodosParams } from '@todo/hooks/useTodos/useTodos.hook';
import { onCleanup } from 'solid-js';

export default function useTodosCreate() {
  const [t] = useI18n();
  const queryClient = useQueryClient();
  const [appStorage] = useAppStorage();
  const { queryKey } = useTodosParams();
  const todoCreateMutation = useTodoCreate();

  let timeoutId: NodeJS.Timeout;

  const felte = createForm<TodoSchema>({
    extend: [validator({ schema: todoSchema })],
    initialValues: {
      id: 1, // doesn't matter, we override it later on `onSubmit` anyway
      todo: '',
      userId: appStorage.user?.id ?? 1,
      completed: false,
    },
    onSubmit: (values, { reset }) => {
      const payload = {
        ...values,
        id: random(11, 999_999),
      };

      todoCreateMutation.mutate(payload, {
        onSettled: (_newTodo, error, _variables, context) => {
          // reset form
          reset();

          toaster.show((props) => (
            <Toaster
              type={error ? 'error' : 'success'}
              toastId={props.toastId}
              title={error ? 'Todo failed to create' : 'Todo successfully created'}
            />
          ));

          // If the mutation fails, use the context returned from `onMutate` to roll back
          if (error) queryClient.setQueryData(queryKey(), context?.previousTodosQueryResponse);
        },
      });
    },
  });

  useBeforeLeave((e) => {
    if (!e.defaultPrevented && !!felte.data().todo) {
      // preventDefault to block immediately and prompt user async
      e.preventDefault();

      timeoutId = setTimeout(() => {
        // eslint-disable-next-line no-alert
        if (window.confirm(t('unsavedChanges'))) {
          // user wants to proceed anyway so retry with force=true
          e.retry(true);
        }
      }, 100);
    }
  });

  onCleanup(() => clearTimeout(timeoutId));

  return { t, ...felte };
}
