import { queryClient } from '@app/RootProvider.app';
import { ErrorApiResponseSchema } from '@shared/api/api.schema';
import { createMutation } from '@tanstack/solid-query';
import { todoApi } from '@todo/api/todo.api';
import {
  CreateTodoApiResponseSchema,
  CreateTodoSchema,
  TodoListApiResponseSchema,
} from '@todo/api/todo.schema';
import { useTodosParams } from '@todo/hooks/useTodos/useTodos.hook';

/**
 * create todo mutation (optimistic update) based on `useTodosParams`
 */
const useTodoCreate = () => {
  const { params, queryKey } = useTodosParams();

  return createMutation<
    CreateTodoApiResponseSchema,
    ErrorApiResponseSchema,
    CreateTodoSchema,
    { previousTodosQueryResponse: TodoListApiResponseSchema }
  >({
    // Called before `mutationFn`:
    onMutate: async (newTodo) => {
      const emptyResponse: TodoListApiResponseSchema = {
        todos: [],
        limit: params().limit,
        skip: 0,
        total: 0,
      };
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: queryKey() });

      // Snapshot the previous value
      const previousTodosQueryResponse =
        (queryClient.getQueryData(queryKey()) as TodoListApiResponseSchema) ?? emptyResponse;

      // Optimistically update to the new value & delete the last value
      queryClient.setQueryData(queryKey(), {
        ...previousTodosQueryResponse,
        todos: [newTodo, ...previousTodosQueryResponse.todos.slice(0, Number(params().limit - 1))],
      });

      // Return a context object with the snapshotted value
      return { previousTodosQueryResponse };
    },
    mutationFn: (newTodo) => todoApi.create(newTodo),
  });
};

export default useTodoCreate;
