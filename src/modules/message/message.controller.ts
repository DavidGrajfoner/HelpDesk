import { FastifyReply, FastifyRequest } from "fastify";
import { createMessage, deleteMessage, findMessageByRoomId, updateMessage } from "./message.service";
import { CreateMessageInput, UpdateMessageInput } from "./message.schema";

export async function getMessagesByRoomIdHandler(
    request: FastifyRequest<{ Params: { roomId: number }}>,
    reply: FastifyReply
) {
    try {
        const messages = await findMessageByRoomId(request.params.roomId);
        return reply.send(messages);
    } catch (e) {
        return reply.code(500).send(e);
    }
}

export async function createMessageHandler(
    request: FastifyRequest<{ Body: CreateMessageInput }>,
    reply: FastifyReply
) {
    const body = request.body;

    try {
        const message = await createMessage(body);
        return reply.send(message);
    } catch (e) {
        return reply.code(500).send(e);
    }
}

export async function updateMessageHandler(
    request: FastifyRequest<{ Body: UpdateMessageInput }>,
    reply: FastifyReply
) {
    const body = request.body;

    try {
        const message = await updateMessage(body);
        return reply.send(message);
    } catch (e) {
        return reply.code(500).send(e);
    }
}

export async function deleteMessageHandler(
    request: FastifyRequest<{ Params: { messageId: number } }>,
    reply: FastifyReply
){
    const messageId = request.params.messageId;

    try {
        await deleteMessage(messageId);
        return reply.code(201).send({ message: "Message deleted."});
    } catch (e) {
        return reply.code(500).send(e);
    }
}