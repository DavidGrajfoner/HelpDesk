import { FastifyReply, FastifyRequest } from "fastify";
import { createOperator, createUser, deleteUser, findUser, findUserByEmail, findUsers, updateUserRole } from "./user.service";
import { CreateUserInput, LoginInput, UpdateUserRoleInput } from "./user.schema";
import { verifyPassword } from "../../utils/hash";
import { server } from "../../app";
import { Role } from "@prisma/client";

export async function createUserHandler(
    request: FastifyRequest<{
        Body: CreateUserInput;
    }>,
    reply: FastifyReply) {
        const body = request.body;

        try {
            const user = await createUser(body);

            return reply.code(201).send(user);
        } catch (e) {
            return reply.code(500).send(e);
        }
}

export async function createOperatorHandler(
    request: FastifyRequest<{
        Body: CreateUserInput;
    }>,
    reply: FastifyReply) {
        const body = request.body;

        try {
            const operator = await createOperator(body);

            return reply.code(201).send(operator)
        } catch (e) {
            return  reply.code(500).send(e);
        }
}

export async function loginHandler(request: FastifyRequest<{
    Body: LoginInput
}>, reply: FastifyReply) {

    const body = request.body;

    // find a user by email
    const user = await findUserByEmail(body.email)

    if(!user) {
        return reply.code(401).send({
            message: 'Invalid email or password',
        })
    }

    // verify password
    const correctPassword = verifyPassword({
        candidatePassword: body.password,
        salt: user.salt,
        hash: user.password
    })

    // generate access token
    if(correctPassword) {
        const {password, salt, ...rest} = user
        return {accessToken: server.jwt.sign(rest)}
    }

    // respond
    return reply.code(401).send({
        message: "Invalid email or password",
    })
}

export async function getUsersHandler() {
    const users = await findUsers();
    return users
}

export async function getUserByIdHandler(
    request: FastifyRequest<{ Params: { userId: number }}>,
    reply: FastifyReply
) {
    const userId = request.params.userId;
    try {
        const user = await findUser(userId);
        return user;
    } catch (e) {
        return reply.code(500).send(e);
    }
}

export async function updateUserRoleHandler(
    request: FastifyRequest<{ Body: UpdateUserRoleInput }>,
    reply: FastifyReply
) {
    const { id, role } = request.body;

    if(!Object.values(Role).includes(role as Role)) {
        return reply.code(400).send({ message: 'Invalid role' });
    }

    try {
        const user = await updateUserRole(id, role as Role);
        return reply.code(200).send(user);
    } catch (e) {
        return reply.code(500).send(e);
    }

}

export async function deleteUserHandler(
    request: FastifyRequest<{ Params: { userId: number }}>,
    reply: FastifyReply,
) {
    const { userId } = request.params;
    try {
        await deleteUser(userId);
        return reply.code(200).send({ message: "User deleted succesfully."});
    } catch (e) {
        return reply.code(500).send(e);
    }
}