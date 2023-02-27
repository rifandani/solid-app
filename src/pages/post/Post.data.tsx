import { RouteDataFuncArgs } from '@solidjs/router';
import { z } from 'zod';
import { queryClient } from '../../app/QueryClient.app';
import { queryKeys } from '../../services/api';

const routeDataPost =
  (_queryClient: typeof queryClient) =>
  async ({ params }: RouteDataFuncArgs) => {
    // original implementation using `createResource`
    // return createResource(params.id, (postId) =>
    //   http.get(`posts/${postId}`).then((res) => res.data as GetPostResponse),
    // );

    const id = z.coerce.number().parse(params.id);
    const { queryKey, queryFn } = queryKeys.posts.detailById(id);

    // or we can use `_queryClient.ensureQueryData`
    return (
      _queryClient.getQueryData(queryKey) ??
      (await _queryClient.fetchQuery({
        queryKey,
        queryFn,
        staleTime: 1000 * 60 * 1, // 1 min
      }))
    );
  };

export default routeDataPost;
