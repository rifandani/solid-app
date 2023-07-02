import { toaster } from '@kobalte/core';
import { createMutation, useQueryClient } from '@tanstack/solid-query';
import { ErrorApiResponseSchema } from '../../../shared/api/api.schema';
import { Toaster } from '../../../shared/components/molecules';
import { useI18n } from '../../../shared/hooks/usei18n/usei18n.hook';
import { todoApi, todoKeys } from '../../api/todo.api';
import {
  TodoListApiResponseSchema,
  UpdateTodoApiResponseSchema,
  UpdateTodoSchema,
} from '../../api/todo.schema';
import { useTodosParams } from '../useTodos/useTodos.hook';

const useTodoUpdate = () => {
  const queryClient = useQueryClient();
  const params = useTodosParams();
  const [t] = useI18n();

  return createMutation<
    UpdateTodoApiResponseSchema,
    ErrorApiResponseSchema,
    UpdateTodoSchema,
    { previousTodosQueryResponse: TodoListApiResponseSchema }
  >({
    // Called before `mutationFn`:
    onMutate: async ({ id, ...body }) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: todoKeys.list(params()) });

      // Snapshot the previous value
      const previousTodosQueryResponse = (queryClient.getQueryData(todoKeys.list(params())) ??
        []) as TodoListApiResponseSchema;

      // Optimistically update to the new value
      queryClient.setQueryData(todoKeys.list(params()), {
        ...previousTodosQueryResponse,
        todos: previousTodosQueryResponse.todos?.map((_todo) =>
          _todo.id === id ? { ..._todo, ...body } : _todo,
        ),
      });

      // Return a context object with the snapshotted value
      return { previousTodosQueryResponse };
    },
    mutationKey: todoKeys.list(params()),
    mutationFn: (updateTodo) => todoApi.update(updateTodo),
    onSettled: (_updateTodo, error, _variables, context) => {
      toaster.show((props) => (
        <Toaster
          toastId={props.toastId}
          type={error ? 'error' : 'success'}
          title={
            error
              ? t('xUpdateError', { feature: 'Todo' })
              : t('xUpdateSuccess', { feature: 'Todo' })
          }
        />
      ));

      // If the mutation fails, use the context returned from `onMutate` to roll back
      if (error)
        queryClient.setQueryData(todoKeys.list(params()), context?.previousTodosQueryResponse);

      // if we want to refetch after error or success:
      // await queryClient.invalidateQueries({ queryKey: todoKeys.list(params()) });
    },
  });
};

export default useTodoUpdate;
