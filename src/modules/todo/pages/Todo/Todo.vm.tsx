import { createForm } from '@felte/solid';
import { toaster } from '@kobalte/core';
import { ErrorApiResponseSchema } from '@shared/api/api.schema';
import { Toaster } from '@shared/components/molecules';
import { useAppStorage } from '@shared/hooks/useAppStorage/useAppStorage.hook';
import { useI18n } from '@shared/hooks/usei18n/usei18n.hook';
import { useNavigate, useParams, useRouteData } from '@solidjs/router';
import { createMutation, useQueryClient } from '@tanstack/solid-query';
import { todoApi, todoKeys } from '@todo/api/todo.api';
import {
  TodoDetailApiResponseSchema,
  UpdateTodoApiResponseSchema,
  UpdateTodoSchema,
} from '@todo/api/todo.schema';
import useTodo from '@todo/hooks/useTodo/useTodo.hook';

const useTodoUpdate = () => {
  const [t] = useI18n();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return createMutation<UpdateTodoApiResponseSchema, ErrorApiResponseSchema, UpdateTodoSchema>({
    mutationFn: (updateTodo) => todoApi.update(updateTodo),
    onSuccess: async (updatedTodo) => {
      // NOTE: the order of function call MATTERS
      navigate('/todos');
      queryClient.removeQueries({ queryKey: todoKeys.detail(updatedTodo.id) }); // delete the query cache
      await queryClient.invalidateQueries({ queryKey: todoKeys.lists() });
    },
    onSettled: (_updateTodo, error) => {
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
    },
  });
};

const useTodoPageVM = () => {
  const [t] = useI18n();
  const params = useParams();
  const [appStorage] = useAppStorage();
  const initialData = useRouteData<TodoDetailApiResponseSchema>();
  const todoQuery = useTodo(Number(params?.id), { initialData });
  const todoUpdateMutation = useTodoUpdate();

  const felte = createForm<Pick<UpdateTodoSchema, 'todo'>>({
    onSubmit: (values) => {
      const payload: UpdateTodoSchema = {
        ...values,
        id: todoQuery.data?.id ?? 1,
        completed: todoQuery.data?.completed ?? false,
      };

      todoUpdateMutation.mutate(payload);
    },
  });

  return { t, appStorage, todoQuery, todoUpdateMutation, ...felte };
};

export default useTodoPageVM;
