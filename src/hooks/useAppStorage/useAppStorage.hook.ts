import { createStorage } from '@solid-primitives/storage';
import { z } from 'zod';
import { userStorageSchema } from '../../models/User.model';

export type AppStorageSchema = z.infer<typeof appStorageSchema>;
export type AppStorageInterface = ReturnType<typeof useAppStorage>;

type AppStorageKeys = keyof AppStorageSchema;
type AppStorageValues = AppStorageSchema[AppStorageKeys];

type StorageActions<T> = {
  remove: (key: AppStorageKeys) => void;
  clear: () => void;
  error: () => Error | undefined;
  toJSON: () => { [key: string]: T };
};

export const appStorageSchema = z.object({
  user: userStorageSchema.optional(),
});

export const useAppStorage = () =>
  createStorage({
    prefix: 'app',
    serializer: (value) => JSON.stringify(value),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    deserializer: (value) => JSON.parse(value) as AppStorageSchema,
  }) as unknown as [
    store: AppStorageSchema,
    setter: (key: AppStorageKeys, value: AppStorageValues, options?: unknown) => void,
    actions: StorageActions<unknown>,
  ];
