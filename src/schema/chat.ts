import * as z from 'zod';

export const chatSchema = z.object({
  message: z.string().min(1, { message: "Message is required." }).trim(),
  chatId: z.string().regex(/^[a-f\d]{24}$/i, { message: 'Invalid chat ID' })
});

export type ChatSchemaT = z.infer<typeof chatSchema>