import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { loginHandler, createUserHandler, getUsersHandler, createOperatorHandler, getUserByIdHandler, updateUserRoleHandler, deleteUserHandler } from "./user.controller";
import { $ref } from "./user.schema";
import { roleGuard } from "../middleware/roleGuard";
import { Role } from "@prisma/client";

async function userRoutes(server: FastifyInstance) {

    server.post('/createUser', {
        schema:{
            body: $ref('createUserSchema'),
            response:{
                201: $ref('createUserResponseSchema')
            },
        }}, createUserHandler)

    server.post('/createOperator', {
        schema:{
            body: $ref('createUserSchema'),
            response:{
                201: $ref('createUserResponseSchema')
            },
        }}, createOperatorHandler)

    server.post('/login', {
        schema:{
            body: $ref('loginSchema'),
            response: {
                200: $ref('loginResponseSchema')
            }
        }
    }, loginHandler)

    server.get('/', {
        preHandler: [server.authenticate],
    }, getUsersHandler)

    server.get('/:userId', {
        preHandler: [server.authenticate],
    }, getUserByIdHandler)

    server.patch('/', {
        preHandler: [server.authenticate, roleGuard([Role.OPERATOR])],
        schema: {
            body: $ref('updateUserRoleSchema')
        }
    }, updateUserRoleHandler);

    server.delete('/:userId', {
        preHandler: [server.authenticate, roleGuard([Role.OPERATOR])]
    }, deleteUserHandler)
}

export default userRoutes;