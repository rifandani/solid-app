import { useNavigate, useParams, useRouteData } from '@solidjs/router';
import { createMutation, createQuery, useQueryClient } from '@tanstack/solid-query';
import { z } from 'zod';
import { GetPostResponse } from '../../models/Post.model';
import { queryKeys } from '../../services/api';
import { deletePostById, fetchPostDetailById } from '../../services/api/posts';
import { ButtonOnClick } from '../../types';

const usePostQuery = (id: number) => {
  const initialData = useRouteData<GetPostResponse | undefined>();
  const { queryKey } = queryKeys.posts.detailById(id);

  const postQuery = createQuery({
    queryKey: () => queryKey,
    queryFn: () => fetchPostDetailById(id),
    initialData,
  });

  return postQuery;
};

const usePostMutation = (id: number) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const postDeleteMutation = createMutation({
    mutationFn: () => deletePostById(id),
    onSuccess: async () => {
      // NOTE: the order of function call MATTERS
      navigate('/posts');
      await queryClient.invalidateQueries({ queryKey: queryKeys.posts.list.queryKey });
      await queryClient.invalidateQueries({ queryKey: queryKeys.posts.detailById(id).queryKey });
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
