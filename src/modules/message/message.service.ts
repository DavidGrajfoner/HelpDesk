import prisma from "../../utils/prisma";
import { CreateMessageInput, UpdateMessageInput } from "./message.schema";

export async function findMessageByRoomId(roomId: number) {
    return prisma.message.findMany({
        where: {
            roomId: Number(roomId),
        },
    });
}

export async function createMessage(input: CreateMessageInput) {
    return prisma.message.create({
        data: {
            content: input.content,
            userId: input.userId,
            roomId: input.roomId
        },
    });
}

export async function updateMessage(input: UpdateMessageInput) {
    return prisma.message.update({
        where: {
            id: input.id,
        },
        data: {
            content: input.content
        },
    });
}

export async function deleteMessage(messageId: number) {
    prisma.message.delete({
        where: {
            id: messageId,
        }
    })
}