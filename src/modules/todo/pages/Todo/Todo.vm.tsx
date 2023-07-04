import { createForm } from '@felte/solid';
import { toaster } from '@kobalte/core';
import { useNavigate, useParams, useRouteData } from '@solidjs/router';
import { createMutation, createQuery, useQueryClient } from '@tanstack/solid-query';
import { z } from 'zod';
import { ErrorApiResponseSchema } from '../../../shared/api/api.schema';
import { Toaster } from '../../../shared/components/molecules';
import { useI18n } from '../../../shared/hooks/usei18n/usei18n.hook';
import { todoApi, todoKeys } from '../../api/todo.api';
import {
  TodoDetailApiResponseSchema,
  UpdateTodoApiResponseSchema,
  UpdateTodoSchema,
} from '../../api/todo.schema';

const useInitialTodo = (id: number) => {
  const initialData = useRouteData<TodoDetailApiResponseSchema>();
  const queryKey = () => todoKeys.detail(id);
  const queryFn = () => todoApi.detail(id);

  // pass `initialData` that we get from route data
  return createQuery({
    initialData,
    queryKey,
    queryFn,
  });
};

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
  // will throw error if `params.id` is not a number
  const id = z.coerce.number().parse(params.id);
  const todoQuery = useInitialTodo(id);
  const todoUpdateMutation = useTodoUpdate();

  const felte = createForm<Pick<UpdateTodoSchema, 'todo'>>({
    onSubmit: (values) => {
      const payload: UpdateTodoSchema = {
        ...values,
        id: todoQuery.data?.id,
        completed: todoQuery.data?.completed,
      };

      todoUpdateMutation.mutate(payload);
    },
  });

  return { t, todoQuery, todoUpdateMutation, ...felte };
};

export default useTodoPageVM;
