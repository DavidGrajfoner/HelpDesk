import { FastifyReply, FastifyRequest } from "fastify";
import { createRoom, findPendingOrInProgressRooms, assignRoom, completeRoom, findRoomById, getRoomStatus, findAllRooms } from "./room.service";
import { CreateRoomInput } from "./room.schema";

export async function createRoomHandler(
    request: FastifyRequest<{ Body: CreateRoomInput }>,
    reply: FastifyReply
) {
    const body = request.body;
    try {
        const room = await createRoom(body);
        return reply.code(201).send(room);
    } catch (e) {
        return reply.code(500).send(e);
    }
}

export async function getPendingOrInProgressRoomsHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
        const rooms = await findPendingOrInProgressRooms();
        return reply.send(rooms);
    } catch (e) {
        return reply.code(500).send(e);
    }
}

export async function assignRoomHandler(
    request: FastifyRequest<{ Params: { roomId: number }}>,
    reply: FastifyReply
) {
    try {
        const { roomId } = request.params;
        const { id, role } = request.user;

        if (role !== "OPERATOR") {
            return reply.code(403).send({ message: "User not authorized."});
        }

        const roomStatus = await getRoomStatus(roomId);

        if (roomStatus !== "IN_PROGRESS"  && roomStatus !== "COMPLETED" && roomStatus !== null) {
            const room = await assignRoom(roomId, id);
            return reply.send(room);
        } else {
            return reply.code(400).send({ message: "Room is already in progress."});
        }
    } catch (e) {
        return reply.code(500).send(e);
    }
}

export async function completeRoomHandler(
    request: FastifyRequest<{ Params: { roomId: number } }>,
    reply: FastifyReply
) {
    const { roomId } = request.params;
    try {
        const room = await completeRoom(roomId);
        return reply.send(room);
    } catch (e) {
        return reply.code(500).send(e);
    }
}

export async function getRoomByIdHandler(
    request: FastifyRequest<{ Params: { roomId: number } }>,
    reply: FastifyReply
) {
    const { roomId } = request.params;
    try {
        const room = await findRoomById(roomId);
        return reply.send(room);
    } catch (e) {
        return reply.code(500).send(e);
    }
}

export async function getAllRoomsHandler(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const allRooms = await findAllRooms();
        return reply.send(allRooms);
    } catch (e) {
        return reply.code(500).send(e);
    }
}
