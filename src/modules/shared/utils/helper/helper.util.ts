import { deepReadObject } from '@rifandani/nxact-yutiriti';
import { extendTailwindMerge } from 'tailwind-merge';

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

export const clamp = ({ value, min, max }: { value: number; min: number; max: number }) =>
  Math.min(Math.max(value, min), max);

/**
 * Check if we are in browser, not server
 */
export const isBrowser = () => typeof window !== 'undefined';

/**
 * Format phone number based on mockup, currently only covered minimum 11 characters and max 15 characters include +62
 * e.g +62-812-7363-6365
 *
 * @param phoneNumber
 */
export const indonesianPhoneNumberFormat = (phoneNumber?: string) => {
  if (!phoneNumber) return '';
  // e.g: +62
  const code = phoneNumber.slice(0, 3);
  const numbers = phoneNumber.slice(3);
  // e.g 812, 852
  const ndc = numbers.slice(0, 3);
  // e.g the rest of the numbers
  const uniqNumber = numbers.slice(3);
  let regexp: RegExp;

  if (uniqNumber.length <= 6) {
    regexp = /(\d{3})(\d{1,})/;
  } else if (uniqNumber.length === 7) {
    regexp = /(\d{3})(\d{4})/;
  } else if (uniqNumber.length === 8) {
    regexp = /(\d{4})(\d{4})/;
  } else {
    regexp = /(\d{4})(\d{5,})/;
  }

  const matches = uniqNumber.replace(regexp, '$1-$2');

  return [code, ndc, matches].join('-');
};

/**
 * convert deep nested object keys to camelCase.
 */
export const toCamelCase = <T>(object: unknown): T => {
  let transformedObject = object as Record<string, unknown>;
  if (typeof object === 'object' && object !== null) {
    if (object instanceof Array) {
      transformedObject = object.map(toCamelCase) as unknown as Record<string, unknown>;
    } else {
      transformedObject = {};
      Object.keys(object).forEach((key) => {
        if ((object as Record<string, unknown>)[key] !== undefined) {
          const firstUnderscore = key.replace(/^_/, '');
          const newKey = firstUnderscore.replace(/(_\w)|(-\w)/g, (k) => k[1].toUpperCase());
          transformedObject[newKey] = toCamelCase((object as Record<string, unknown>)[key]);
        }
      });
    }
  }
  return transformedObject as T;
};

/**
 * convert deep nested object keys to snake_case.
 */
export const toSnakeCase = <T>(object: unknown): T => {
  let transformedObject = object as Record<string, unknown>;
  if (typeof object === 'object' && object !== null) {
    if (object instanceof Array) {
      transformedObject = object.map(toSnakeCase) as unknown as Record<string, unknown>;
    } else {
      transformedObject = {};
      Object.keys(object).forEach((key) => {
        if ((object as Record<string, unknown>)[key] !== undefined) {
          const newKey = key
            .replace(/\.?([A-Z]+)/g, (_, y) => `_${y ? (y as string).toLowerCase() : ''}`)
            .replace(/^_/, '');
          transformedObject[newKey] = toSnakeCase((object as Record<string, unknown>)[key]);
        }
      });
    }
  }
  return transformedObject as T;
};

/**
 * Remove leading zero
 */
export const removeLeadingZeros = (value: string) => {
  if (/^([0]{1,})([1-9]{1,})/i.test(value)) {
    return value.replace(/^(0)/i, '');
  }

  return value.replace(/^[0]{2,}/i, '0');
};

/**
 * Remove leading whitespaces
 */
export const removeLeadingWhitespace = (value?: string) => {
  if (!value) return '';
  if (/^[\s]*$/i.test(value)) {
    return value.replace(/^[\s]*/i, '');
  }

  return value;
};

/**
 * This will works with some rules:
 * 1. If the file source located in the same origin as the application.
 * 2. If the file source is on different location e.g s3 bucket, etc. Set the response headers `Content-Disposition: attachment`.
 * Otherwise it only view on new tab.
 */
export const doDownload = (url: string) => {
  if (!url) return;
  const link = document.createElement('a');
  link.href = url;
  link.download = url;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * create merge function with custom config which extends the default config.
 * Use this if you use the default Tailwind config and just extend it in some places.
 */
export const tw = extendTailwindMerge({
  classGroups: {
    // ↓ The `foo` key here is the class group ID
    //   ↓ Creates group of classes which have conflicting styles
    //     Classes here: 'alert-info', 'alert-success', 'alert-warning', 'alert-error'
    alert: ['alert-info', 'alert-success', 'alert-warning', 'alert-error'],
  },
  // ↓ Here you can define additional conflicts across different groups
  conflictingClassGroups: {
    // ↓ ID of class group which creates a conflict with…
    //     ↓ …classes from groups with these IDs
    // In this case `tw('alert-success alert-error') → 'alert-error'`
    alert: ['alert'],
  },
});

/**
 * create `URLSearchParams` from object query params
 *
 * @example
 *
 * ```ts
 * createSearchParamsFromObject({ limit: '10', skip: 2 }).toString() // -> 'limit=10&skip=2'
 * createSearchParamsFromObject({ limit: ['10', '20], skip: 2 }).toString() // -> 'limit=10&limit=20&skip=2'
 * ```
 */
export const createSearchParamsFromObject = (obj: Record<string, unknown>) =>
  new URLSearchParams(
    Object.entries(obj).flatMap(([key, values]) =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      Array.isArray(values) ? values.map((value) => [key, value]) : [[key, values]],
    ),
  );
