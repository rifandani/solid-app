import { z } from 'zod';

// #region SCHEMA
export const settingSchema = z.object({
  showNotification: z.boolean(),
});
// #endregion

export type SettingSchema = z.infer<typeof settingSchema>;
