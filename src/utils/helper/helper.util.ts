import {} from '@rifandani/nxact-yutiriti';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ApiResponse, ApiSuccessResponse } from '../../constants/types.constant';

/**
 * Safely access deep values in an object via a string path seperated by `.`
 * This util is largely inspired by [dlv](https://github.com/developit/dlv/blob/master/index.js) and passes all its tests
 *
 * @param obj {Record<string, unknown>} - The object to parse
 * @param path {string} - The path to search in the object
 * @param [defaultValue] {unknown} -  A default value if the path doesn't exist in the object
 *
 * @returns {any} - The value if found, the default provided value if set and not found, undefined otherwise
 *
 * @example
 *
 * ```ts
 * const obj = { a: { b : { c: 'hello' } } };
 *
 * const value = deepReadObject(obj, 'a.b.c');
 * // => 'hello'
 * const notFound = deepReadObject(obj, 'a.b.d');
 * // => undefined
 * const notFound = deepReadObject(obj, 'a.b.d', 'not found');
 * // => 'not found'
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deepReadObject = <T = any>(
  obj: Record<string, unknown>,
  path: string,
  defaultValue?: unknown,
): T => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const value = path
    .trim()
    .split('.')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    .reduce<any>((a, b) => (a ? a[b] : undefined), obj);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return value !== undefined ? value : defaultValue;
};

/**
 * Provided a string template it will replace dynamics parts in place of variables.
 * This util is largely inspired by [templite](https://github.com/lukeed/templite/blob/master/src/index.js)
 *
 * @param str {string} - The string you wish to use as template
 * @param params {Record<string, string>} - The params to inject into the template
 * @param [reg=/{{(.*?)}}/g] {RegExp} - The RegExp used to find and replace
 *
 * @returns {string} - The fully injected template
 *
 * @example
 * ```ts
 * const txt = template('Hello {{ name }}', { name: 'Tom' });
 * // => 'Hello Tom'
 * ```
 */
export const template = (str: string, params: Record<string, string>, reg = /{{(.*?)}}/g): string =>
  str.replace(reg, (_, key: string) => deepReadObject(params, key, ''));

/**
 * Type Guard for typescript assertions
 *
 * @example
 *
 * ```ts
 * isApiSuccessResponse(postDetail.postDetailData) && ...
 * ```
 */
export function isApiSuccessResponse<T>(
  obj: ApiResponse<T> | undefined,
): obj is ApiSuccessResponse<T> {
  return obj ? obj.ok : false;
}

/**
 * Small wrapper around `clsx` and `twMerge` function.
 * `clsx` is for conditional classes.
 * `twMerge` is for resolving class conflicts and useful when we want to override styles for a component.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
