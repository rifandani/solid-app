import { createMutation } from '@tanstack/solid-query';
import { queryClient } from '../../../../app/Store.app';
import { ErrorApiResponseSchema } from '../../../shared/api/api.schema';
import { todoApi, todoKeys } from '../../api/todo.api';
import {
  CreateTodoApiResponseSchema,
  CreateTodoSchema,
  TodoListApiResponseSchema,
} from '../../api/todo.schema';
import { useTodosParams } from '../useTodos/useTodos.hook';

/**
 * create todo mutation (optimistic update) based on `useTodosParams`
 */
const useTodoCreate = () => {
  const params = useTodosParams();

  return createMutation<
    CreateTodoApiResponseSchema,
    ErrorApiResponseSchema,
    CreateTodoSchema,
    { previousTodosQueryResponse: TodoListApiResponseSchema }
  >({
    // Called before `mutationFn`:
    onMutate: async (newTodo) => {
      const queryKey = todoKeys.list(params());

      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey });

      // Snapshot the previous value
      const previousTodosQueryResponse = (queryClient.getQueryData(queryKey) ??
        []) as TodoListApiResponseSchema;

      // Optimistically update to the new value & delete the last value
      queryClient.setQueryData(queryKey, {
        ...previousTodosQueryResponse,
        todos: [
          newTodo,
          ...previousTodosQueryResponse.todos.slice(
            0,
            Number(params().limit - 1),
          ),
        ],
      });

      // Return a context object with the snapshotted value
      return { previousTodosQueryResponse };
    },
    mutationFn: (newTodo) => todoApi.create(newTodo),
  });
};

export default useTodoCreate;
