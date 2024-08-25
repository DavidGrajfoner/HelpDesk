import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const createRoomSchema = z.object({
    room: z.string(),
    userId: z.number(),
    content: z.string(),
});


export type CreateRoomInput = z.infer<typeof createRoomSchema>;

export const { schemas: roomSchemas, $ref } = buildJsonSchemas({
    createRoomSchema,
}, { $id: "RoomSchema" });
