import { useNavigate, useParams, useRouteData } from '@solidjs/router';
import { createMutation, createQuery, useQueryClient } from '@tanstack/solid-query';
import { z } from 'zod';
import { queryKeys } from '../../../shared/services/api';
import { deletePostById, fetchPostDetailById } from '../../../shared/services/api/posts';
import { ButtonOnClick } from '../../../shared/types/form.type';
import { GetPostResponse } from '../../api/post.schema';

const usePostQuery = (id: number) => {
  const initialData = useRouteData<GetPostResponse | undefined>();
  const { queryKey } = queryKeys.posts.detailById(id);

  const postQuery = createQuery({
    initialData,
    queryKey: () => queryKey,
    queryFn: () => fetchPostDetailById(id),
  });

  return postQuery;
};

const usePostMutation = (id: number) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const postDeleteMutation = createMutation({
    mutationFn: () => deletePostById(id),
    onSuccess: async (resp) => {
      if (!resp.ok) {
        throw new Error(resp.error.code);
      } else {
        // NOTE: the order of function call MATTERS
        navigate('/posts');
        await queryClient.invalidateQueries({ queryKey: queryKeys.posts.list.queryKey });
        await queryClient.invalidateQueries({ queryKey: queryKeys.posts.detailById(id).queryKey });
      }
    },
  });

  return postDeleteMutation;
};

const usePostPageVM = () => {
  const params = useParams();
  const id = z.coerce.number().parse(params.id);

  const postQuery = usePostQuery(id);
  const postDeleteMutation = usePostMutation(id);

  const onDeletePost: ButtonOnClick = (e) => {
    e.preventDefault();
    postDeleteMutation.mutate();
  };

  return { postQuery, postDeleteMutation, onDeletePost };
};

export default usePostPageVM;
