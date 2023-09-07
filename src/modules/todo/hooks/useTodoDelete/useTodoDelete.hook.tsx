import { toaster } from '@kobalte/core';
import { ErrorApiResponseSchema } from '@shared/api/api.schema';
import { Toaster } from '@shared/components/molecules';
import { useI18n } from '@shared/hooks/usei18n/usei18n.hook';
import { createMutation, useQueryClient } from '@tanstack/solid-query';
import { todoApi } from '@todo/api/todo.api';
import {
  DeleteTodoApiResponseSchema,
  DeleteTodoSchema,
  TodoListApiResponseSchema,
} from '@todo/api/todo.schema';
import { useTodosParams } from '@todo/hooks/useTodos/useTodos.hook';

/**
 * delete todo mutation based on `useTodosParams` and show toast
 */
const useTodoDelete = () => {
  const queryClient = useQueryClient();
  const { queryKey } = useTodosParams();
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
      await queryClient.cancelQueries({ queryKey: queryKey() });

      // Snapshot the previous value
      const previousTodosQueryResponse = (queryClient.getQueryData(queryKey()) ??
        []) as TodoListApiResponseSchema;

      // Optimistically update to the new value
      queryClient.setQueryData(queryKey(), {
        ...previousTodosQueryResponse,
        todos: previousTodosQueryResponse.todos?.filter((_todo) => _todo.id !== id),
      });

      // Return a context object with the snapshotted value
      return { previousTodosQueryResponse };
    },
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
      if (error) queryClient.setQueryData(queryKey(), context?.previousTodosQueryResponse);

      // if we want to refetch after error or success:
      // await queryClient.invalidateQueries({ queryKey: queryKey() });
    },
  });
};

export default useTodoDelete;
