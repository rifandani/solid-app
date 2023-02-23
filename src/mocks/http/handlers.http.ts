// eslint-disable-next-line import/no-extraneous-dependencies
import { RequestHandler } from 'msw';
import { authHandlers } from './endpoints/auth.endpoint';
import { postHandlers } from './endpoints/post.endpoint';
import { todoHandlers } from './endpoints/todo.endpoint';

export const handlers: Array<RequestHandler> = [...authHandlers, ...postHandlers, ...todoHandlers];

export default { handlers };
