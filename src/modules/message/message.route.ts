import { FastifyInstance } from "fastify";
import { createMessageHandler, deleteMessageHandler, getMessagesByRoomIdHandler, updateMessageHandler } from "./message.controller";
import { $ref } from "./message.schema";

async function messageRoutes(server: FastifyInstance) {

    server.get("/:roomId", {
        preHandler: [server.authenticate],
    }, getMessagesByRoomIdHandler);

    server.post("/", {
        schema: {
            body: $ref("createMessageSchema"),
        }
    }, createMessageHandler);

    server.patch("/", {
        preHandler: [server.authenticate],
        schema: {
            body: $ref("updateMessageSchema")
        }
    }, updateMessageHandler)

    server.delete("/:messageId", {
        preHandler: [server.authenticate]
    }, deleteMessageHandler)
}

export default messageRoutes;