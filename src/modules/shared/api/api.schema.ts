import { z } from 'zod';

// #region schemas
export const apiErrorSchema = z.object({
  ok: z.literal(false),
  error: z.object({ code: z.string() }),
});
export const apiSuccessSchema = <T extends z.ZodRawShape>(rawShape: T) =>
  z.object({ ok: z.literal(true) }).extend(rawShape);
export const apiResponseSchema = <T extends z.AnyZodObject>(schema: T) =>
  z.discriminatedUnion('ok', [apiErrorSchema, z.object({ ok: z.literal(true) }).merge(schema)]);

export const apiSuccessUnionSchema = z.object({ ok: z.literal(true) });
export const apiResponseUnionSchema = apiErrorSchema.or(apiSuccessUnionSchema);
// #endregion

// #region types
export type ApiErrorResponse = z.infer<typeof apiErrorSchema>;
export type ApiSuccessResponse = z.infer<ReturnType<typeof apiSuccessSchema>>;
export type ApiResponse = z.infer<ReturnType<typeof apiResponseSchema>>;

export type ApiSuccessResponseUnion = z.infer<typeof apiSuccessUnionSchema>;
export type ApiResponseUnion = z.infer<typeof apiResponseUnionSchema>;
// #endregion
