import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Availability } from '../../configs/locale/locale.type';
import { ApiResponse, ApiSuccessResponse } from '../../constants/types.constant';

/**
 * Generates a random number between min and max
 *
 * @example
 *
 * ```ts
 * generateRandomNumber(1, 10)
 * ```
 */
export function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Get the default language from navigator.language
 *
 * @example
 *
 * ```ts
 * getDefaultLang()
 * ```
 */
export function getDefaultLang(): Availability {
  const localeString = navigator.language;

  const languageString = localeString.split(/[_-]/)[0].toLowerCase();

  const checkLang = Object.values(Availability).findIndex((lang) => lang === languageString);

  return checkLang > 0 ? (languageString as Availability) : Availability.en;
}

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
 * Emulates a long running async task to debug/test your functions.
 * Useful to simulate a slow API response, and what to do with the UI when that happens.
 *
 * @example
 *
 * ```ts
 * await sleep(4000)
 * ```
 */
export function sleep(ms = 2500) {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Small wrapper around `clsx` and `twMerge` function.
 * `clsx` is for conditional classes.
 * `twMerge` is for resolving class conflicts and useful when we want to override styles for a component.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
