import prisma from "../../utils/prisma";
import { CreateMessageInput, UpdateMessageInput } from "./message.schema";

export async function findMessageByRoomId(roomId: number) {
    return prisma.message.findMany({
        where: {
            roomId: Number(roomId),
        },
        select: {
            id: true,
            content: true,
            createdAt: true,
            roomId: true,
            user: {
                select: {
                    id: true,
                    email: true,
                    username: true,
                }

            }
        }
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
    await prisma.message.delete({
        where: {
            id: Number(messageId),
        }
    })
}