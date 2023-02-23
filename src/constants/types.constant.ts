/**
 * Add your app wide typings here
 */

declare const emptyObjectSymbol: unique symbol;

type IsEqual<T, U> = (<G>() => G extends T ? 1 : 2) extends <G>() => G extends U
  ? 1
  : 2
  ? true
  : false;
type Filter<KeyType, ExcludeType> = IsEqual<KeyType, ExcludeType> extends true
  ? never
  : KeyType extends ExcludeType
  ? never
  : KeyType;
type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };
type Numeric = number | bigint;
type Zero = 0 | 0n;

/**
 * Represents a strictly empty plain object, the `{}` value.
 * When you annotate something as the type `{}`, it can be anything except `null` and `undefined`. This means that you cannot use `{}` to represent an empty plain object
 *
 * @example
 *
 * ```ts
 * // The following illustrates the problem with `{}`.
 * const foo1: {} = {}; // Pass
 * const foo2: {} = []; // Pass
 * const foo3: {} = 42; // Pass
 * const foo4: {} = {a: 1}; // Pass
 *
 * // With `EmptyObject` only the first case is valid.
 * const bar1: EmptyObject = {}; // Pass
 * const bar2: EmptyObject = 42; // Fail
 * const bar3: EmptyObject = []; // Fail
 * const bar4: EmptyObject = {a: 1}; // Fail
 * ```
 */
export type EmptyObject = { [emptyObjectSymbol]?: never };

/**
 * Create a type from an object type without certain keys. This type is a stricter version of `Omit`
 *
 * @example
 *
 * ```ts
 * type Foo = {
 * 	a: number;
 * 	b: string;
 * 	c: boolean;
 * };
 *
 * type FooWithoutA = Except<Foo, 'a' | 'c'>; // typeof {b: string};
 * ```
 */
export type Except<ObjectType, KeysType extends keyof ObjectType> = {
  [KeyType in keyof ObjectType as Filter<
    KeyType,
    KeysType
  >]: ObjectType[KeyType];
};

/**
 * Create a type that requires at least one of the given keys. The remaining keys are kept as is.
 *
 * @example
 *
 * ```ts
 * type Responder = {
 *   text?: () => string;
 *   json?: () => string;
 *   secure?: boolean;
 * };
 *
 * const responder: RequireAtLeastOne<Responder, 'text' | 'json'> = {
 *   json: () => '{"message": "ok"}',
 *   secure: true
 * };
 * ```
 */
export type RequireAtLeastOne<
  ObjectType,
  KeysType extends keyof ObjectType = keyof ObjectType,
> = {
  [Key in KeysType]-?: Required<Pick<ObjectType, Key>> &
    Partial<Pick<ObjectType, Exclude<KeysType, Key>>>;
}[KeysType] &
  Except<ObjectType, KeysType>;

/**
 * Create a type that requires exactly one of the given keys and disallows more. The remaining keys are kept as is.
 *
 * @example
 *
 * ```ts
 * type Responder = {
 *   text: () => string;
 *   json: () => string;
 *   secure: boolean;
 * };
 *
 * const responder: RequireAtLeastOne<Responder, 'text' | 'json'> = {
 *   // Adding a `text` key here would cause a compile error.
 *   json: () => '{"message": "ok"}',
 *   secure: true
 * };
 * ```
 */
export type RequireExactlyOne<
  ObjectType,
  KeysType extends keyof ObjectType = keyof ObjectType,
> = {
  [Key in KeysType]: Required<Pick<ObjectType, Key>> &
    Partial<Record<Exclude<KeysType, Key>, never>>;
}[KeysType] &
  Omit<ObjectType, KeysType>;

/**
 * Create a type that requires all of the given keys or none of the given keys. The remaining keys are kept as is.
 *
 * @example
 *
 * ```ts
 * type Responder = {
 *   text?: () => string;
 *   json?: () => string;
 *   secure: boolean;
 * };
 *
 * const responder1: RequireAllOrNone<Responder, 'text' | 'json'> = {
 *   secure: true
 * };
 *
 * const responder2: RequireAllOrNone<Responder, 'text' | 'json'> = {
 *   text: () => '{"message": "hi"}',
 *   json: () => '{"message": "ok"}',
 *   secure: true
 * };
 * ```
 */
export type RequireAllOrNone<
  ObjectType,
  KeysType extends keyof ObjectType = never,
> = (Required<Pick<ObjectType, KeysType>> | Partial<Record<KeysType, never>>) &
  Omit<ObjectType, KeysType>;

/**
 * Create a type that makes the given keys required. The remaining keys are kept as is.
 *
 * @example
 *
 * ```ts
 * type Foo = {
 *   a?: number;
 *   b: string;
 *   c?: boolean;
 * }
 *
 * type SomeRequired = SetRequired<Foo, 'b' | 'c'>;
 * // type SomeRequired = {
 * //   a?: number;
 * //   b: string; // Was already required and still is.
 * //   c: boolean; // Is now required.
 * // }
 * ```
 */
export type SetRequired<BaseType, Keys extends keyof BaseType> = Simplify<
  Except<BaseType, Keys> & Required<Pick<BaseType, Keys>>
>;

/**
 * Create a type that makes the given keys optional. The remaining keys are kept as is.
 *
 * @example
 *
 * ```ts
 * type Foo = {
 *   a: number;
 *   b?: string;
 *   c: boolean;
 * }
 *
 * type SomeOptional = SetOptional<Foo, 'b' | 'c'>;
 * // type SomeOptional = {
 * //   a: number;
 * //   b?: string; // Was already optional and still is.
 * //   c?: boolean; // Is now optional.
 * // }
 * ```
 */
export type SetOptional<BaseType, Keys extends keyof BaseType> = Simplify<
  Except<BaseType, Keys> & Partial<Pick<BaseType, Keys>>
>;

/**
 * Create a type that makes the given keys non-nullable, where the remaining keys are kept as is.
 * If no keys are given, all keys will be made non-nullable.
 *
 * @example
 *
 * ```ts
 * type Foo = {
 *   a: number;
 *   b?: string;
 *   c: boolean;
 * }
 *
 * type Foo = {
 *   a: number | null;
 *   b: string | undefined;
 *   c?: boolean | null;
 * }
 *
 * type SomeNonNullable = SetNonNullable<Foo, 'b' | 'c'>;
 * // type SomeNonNullable = {
 * //   a: number | null;
 * //   b: string; // Can no longer be undefined.
 * //   c?: boolean; // Can no longer be null, but is still optional.
 * // }
 * type AllNonNullable = SetNonNullable<Foo>;
 * // type AllNonNullable = {
 * //   a: number; // Can no longer be null.
 * //   b: string; // Can no longer be undefined.
 * //   c?: boolean; // Can no longer be null, but is still optional.
 * // }
 * ```
 */
export type SetNonNullable<
  BaseType,
  Keys extends keyof BaseType = keyof BaseType,
> = {
  [Key in keyof BaseType]: Key extends Keys
    ? NonNullable<BaseType[Key]>
    : BaseType[Key];
};

/**
 * Unwrap the return type of a function that returns a `Promise`.
 *
 * @example
 *
 * ```ts
 * import {asyncFunction} from 'api';
 *
 * // This type resolves to the unwrapped return type of `asyncFunction`.
 * type Value = AsyncReturnType<typeof asyncFunction>;
 *
 * async function doSomething(value: Value) {}
 * asyncFunction().then(value => doSomething(value));
 * ```
 */
export type AsyncReturnType<T> = T extends Promise<infer U> ? U : T;

/**
 * A `number` that is an integer.
 * You can't pass a `bigint` as they are already guaranteed to be integers.
 * Use-case: Validating and documenting parameters.
 *
 * @example
 *
 * ```
 * declare function setYear<T extends number>(length: Integer<T>): void;
 * ```
 */
export type Integer<T extends number> = `${T}` extends `${bigint}` ? T : never;

/**
 * A `number` that is not an integer.
 * You can't pass a `bigint` as they are already guaranteed to be integers.
 * Use-case: Validating and documenting parameters.
 *
 * @example
 *
 * ```
 * declare function setPercentage<T extends number>(length: Float<T>): void;
 * ```
 */
export type Float<T extends number> = T extends Integer<T> ? never : T;

/**
 * A negative `number`/`bigint` (`-∞ < x < 0`)
 * Use-case: Validating and documenting parameters.
 */
export type Negative<T extends Numeric> = T extends Zero
  ? never
  : `${T}` extends `-${string}`
  ? T
  : never;

/**
 * A negative (`-∞ < x < 0`) `number` that is an integer.
 * Equivalent to `Negative<Integer<T>>`.
 * You can't pass a `bigint` as they are already guaranteed to be integers, instead use `Negative<T>`.
 * Use-case: Validating and documenting parameters.
 */
export type NegativeInteger<T extends number> = Negative<Integer<T>>;

/**
 * A negative (`-∞ < x < 0`) `number` that is not an integer.
 * Equivalent to `Negative<Float<T>>`.
 * Use-case: Validating and documenting parameters.
 */
export type NegativeFloat<T extends number> = Negative<Float<T>>;

/**
 * A non-negative `number`/`bigint` (`0 <= x < ∞`).
 * Use-case: Validating and documenting parameters.
 *
 * @example
 *
 * ```
 * declare function setLength<T extends number>(length: NonNegative<T>): void;
 * ```
 */
export type NonNegative<T extends Numeric> = T extends Zero
  ? T
  : Negative<T> extends never
  ? T
  : never;

export type ApiSuccessResponse<T> = {
  ok: true;
} & T;

export type ApiErrorResponse = {
  ok: false;
  error: {
    code: string;
  };
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
