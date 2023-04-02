import { deepReadObject } from '@rifandani/nxact-yutiriti';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ApiResponse, ApiSuccessResponse } from '../../constants/types.constant';

/**
 * Provided a string template it will replace dynamics parts in place of variables.
 * This util is largely inspired by [templite](https://github.com/lukeed/templite/blob/master/src/index.js)
 *
 * @param str {string} - The string you wish to use as template
 * @param params {Record<string, string>} - The params to inject into the template
 * @param reg {RegExp} - The RegExp used to find and replace. Default to `/{{(.*?)}}/g`
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
