import { FastifyInstance } from "fastify";
import { createRoomHandler, getPendingOrInProgressRoomsHandler, assignRoomHandler, completeRoomHandler, getRoomByIdHandler, getAllRoomsHandler } from "./room.controller";
import { $ref } from "./room.schema";
import { roleGuard } from "../middleware/roleGuard";
import { Role } from "@prisma/client";

async function roomRoutes(server: FastifyInstance) {
    
    server.get("/", {
        preHandler: [server.authenticate, roleGuard([Role.OPERATOR])],
    }, getPendingOrInProgressRoomsHandler);

    server.get("/:roomId", {
        preHandler: [server.authenticate],
    }, getRoomByIdHandler);

    server.get("/all", {
        preHandler: [server.authenticate, roleGuard([Role.OPERATOR])],
    }, getAllRoomsHandler);
    
    server.post("/", {
        schema: {
            body: $ref("createRoomSchema"),
        },
    }, createRoomHandler);

    server.patch("/assign/:roomId", {
        preHandler: [server.authenticate, roleGuard([Role.OPERATOR])],
    }, assignRoomHandler);

    server.patch("/complete/:roomId", {
        preHandler: [server.authenticate, roleGuard([Role.OPERATOR])],
    }, completeRoomHandler);

}

export default roomRoutes;
