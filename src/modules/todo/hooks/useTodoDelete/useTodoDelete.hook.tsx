import { toaster } from '@kobalte/core';
import { createMutation, useQueryClient } from '@tanstack/solid-query';
import { ErrorApiResponseSchema } from '../../../shared/api/api.schema';
import { Toaster } from '../../../shared/components/molecules';
import { useI18n } from '../../../shared/hooks/usei18n/usei18n.hook';
import { todoApi, todoKeys } from '../../api/todo.api';
import {
  DeleteTodoApiResponseSchema,
  DeleteTodoSchema,
  TodoListApiResponseSchema,
} from '../../api/todo.schema';
import { useTodosParams } from '../useTodos/useTodos.hook';

const useTodoDelete = () => {
  const queryClient = useQueryClient();
  const params = useTodosParams();
  const [t] = useI18n();

  return createMutation<
    DeleteTodoApiResponseSchema,
    ErrorApiResponseSchema,
    DeleteTodoSchema['id'],
    { previousTodosQueryResponse: TodoListApiResponseSchema }
  >({
    // Called before `mutationFn`:
    onMutate: async (id) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: todoKeys.list(params()) });

      // Snapshot the previous value
      const previousTodosQueryResponse = (queryClient.getQueryData(todoKeys.list(params())) ??
        []) as TodoListApiResponseSchema;

      // Optimistically update to the new value
      queryClient.setQueryData(todoKeys.list(params()), {
        ...previousTodosQueryResponse,
        todos: previousTodosQueryResponse.todos?.filter((_todo) => _todo.id !== id),
      });

      // Return a context object with the snapshotted value
      return { previousTodosQueryResponse };
    },
    mutationKey: todoKeys.list(params()),
    mutationFn: (id) => todoApi.delete(id),
    onSettled: (_id, error, _variables, context) => {
      toaster.show((props) => (
        <Toaster
          toastId={props.toastId}
          type={error ? 'error' : 'success'}
          title={
            error
              ? t('xDeleteError', { feature: 'Todo' })
              : t('xDeleteSuccess', { feature: 'Todo' })
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

export default useTodoDelete;
