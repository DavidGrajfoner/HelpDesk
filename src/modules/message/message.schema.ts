import{ z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const createMessageSchema = z.object({
    roomId: z.number(),
    content: z.string(),
    userId: z.number(),
})

const updateMessageSchema = z.object({
    id: z.number(),
    content: z.string(),
})

export type CreateMessageInput = z.infer<typeof createMessageSchema>;
export type UpdateMessageInput = z.infer<typeof updateMessageSchema>;

export const { schemas: messageSchemas, $ref } = buildJsonSchemas({
    createMessageSchema,
    updateMessageSchema,
}, { $id: "MessageSchema" });