import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../utils/prisma";
import { faker } from "@faker-js/faker";
import { hashPassword } from "../../utils/hash";
import { RoomStatus, Role, RoomType } from "@prisma/client";

async function dataRoutes(server: FastifyInstance) {
    
    server.post('/fill-test-data', async (request: FastifyRequest, reply: FastifyReply ) => {
        try {
            const numberOfUsers = 10;
            const numberOfRooms = 20;
            const numberOfMessages = 50;
    
            const users = [];
            for (let i = 0; i < numberOfUsers; i++) {
                const password = faker.internet.password();
                const { hash, salt } = hashPassword(password);
                users.push({
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    role: i % 2 === 0 ? Role.USER : Role.OPERATOR,
                    password: hash,
                    salt: salt,
                });
            }
            const createdUsers = await prisma.user.createMany({
                data: users,
            });
    
            const rooms = [];
            for (let i = 0; i < numberOfRooms; i++) {
                const randomUser = Math.floor(Math.random() * numberOfUsers) + 1;
                const randomRoom = faker.helpers.arrayElement([RoomType.TEHNIKA, RoomType.POGOVOR, RoomType.STORITVE]);
                rooms.push({
                    userId: randomUser,
                    room: randomRoom,
                    status: RoomStatus.PENDING,
                    operatorId: null,
                });
            }
            const createdRooms = await prisma.room.createMany({
                data: rooms,
            });
    
            const messages = [];
            for (let i = 0; i < numberOfMessages; i++) {
                const randomUser = Math.floor(Math.random() * numberOfUsers) + 1;
                const randomRooms = Math.floor(Math.random() * numberOfRooms) + 1;
                messages.push({
                    content: faker.lorem.sentence(),
                    userId: randomUser,
                    roomId: randomRooms,
                });
            }
            const createdMessages = await prisma.message.createMany({
                data: messages,
            });
    
            return reply.send({
                message: "Test data created successfully",
                usersCreated: createdUsers.count,
                roomsCreated: createdRooms.count,
                messagesCreated: createdMessages.count,
            });
    
        } catch (e) {
            return reply.code(500).send(e);
        }
    });
}

export default dataRoutes;