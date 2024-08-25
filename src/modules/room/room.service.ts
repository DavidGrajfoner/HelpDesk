import prisma from "../../utils/prisma";
import { CreateRoomInput } from "./room.schema";

export async function createRoom(input: CreateRoomInput) {
    const room = prisma.room.create({
        data: {
            userId: input.userId,
            room: input.room,
            status: "PENDING",
        },
    });

    const roomId = (await room).id
    return prisma.message.create({
        data: {
            content: input.content,
            userId: input.userId,
            roomId: roomId
        },
    });
}

export async function findPendingOrInProgressRooms() {
    return prisma.room.findMany({
        where: {
            status: {
                in: ["PENDING", "IN_PROGRESS"],
            },
        },
        select: {
            id: true,
            room: true,
            operatorId: true,
            status: true,
            createdAt: true,
            completedAt: true,
            user: {
                select: {
                    id: true,
                    username: true
                }
            }
        }
    });
}

export async function getRoomStatus(roomId: number) {
    const room = await prisma.room.findUnique({
        where: { id: Number(roomId) },
        select: { status: true }, 
    })

    return room?.status;
}

export async function assignRoom(roomId: number, operatorId: number) {
    return prisma.room.update({
        where: { id: Number(roomId) },
        data: {
            operatorId,
            status: "IN_PROGRESS",
        },
    });
}

export async function completeRoom(roomId: number) {
    return prisma.room.update({
        where: { id: Number(roomId) },
        data: {
            status: "COMPLETED",
            completedAt: new Date()
        },
    });
}

export async function findRoomById(id: number) {
    return prisma.room.findUnique({
        where: { id: Number(id) },
        select: { 
            id: true,
            room: true,
            status: true,
            createdAt: true,
            completedAt: true,
            user: {
                select: {
                    id: true,
                    email: true,
                    username: true,
                },
            },
            messages: true,
        },
    });
}

export async function findAllRooms() {
    return prisma.room.findMany({
        select: {
            id: true,
            room: true,
            operatorId: true,
            status: true,
            createdAt: true,
            completedAt: true,
            user: {
                select: {
                    id: true,
                    username: true
                }
            }
        }
    })
}
