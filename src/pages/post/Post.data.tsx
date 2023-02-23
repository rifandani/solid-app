import { RouteDataFuncArgs } from '@solidjs/router';
import { createResource } from 'solid-js';
import { GetPostResponse } from '../../models/Post.model';
import { http } from '../../services/http';

const routeDataPost = ({ params }: RouteDataFuncArgs) =>
  createResource(params.id, (postId) =>
    http.get(`posts/${postId}`).then((res) => res.data as GetPostResponse),
  );

export default routeDataPost;
