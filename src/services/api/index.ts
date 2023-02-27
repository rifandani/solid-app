import { mergeQueryKeys } from '@lukemorales/query-key-factory';
import { postsKeys } from './posts';

export const queryKeys = mergeQueryKeys(postsKeys);

export default { queryKeys };
