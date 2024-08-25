import { Role } from "@prisma/client";
import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma"
import { CreateUserInput } from "./user.schema"

export async function createUser(input: CreateUserInput) {
    const { password, ...rest } = input;

    const { hash, salt } = hashPassword(password);

    const user = await prisma.user.create({
        data: { ...rest, salt, password: hash, role: "USER" },
    });

    return user;
}

export async function createOperator(input: CreateUserInput) {
    const { password, ...rest } = input;

    const { hash, salt } = hashPassword(password);

    const operator = await prisma.user.create({
        data: { ...rest, salt, password: hash, role: "OPERATOR" },
    });

    return operator;
}

export async function findUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: {
            email,
            deleted: false,
        },
    });
}

export async function findUsers() {
    return prisma.user.findMany({
        where: {
            deleted: false,
        },
        select:{
            id: true,
            email: true,
            username: true,
            role: true,
        }
    });
}

export async function findUser(userId: number) {
    return prisma.user.findUnique({
        where: {
            id: Number(userId),
            deleted: false,
        },
        select: {
            id: true,
            username: true,
            email: true,
            role: true,
        }
    })
}

export async function updateUserRole(userId: number, role: Role) {
    return prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            role: role,
        }
    })
}

export async function deleteUser(userId: number) {
    await prisma.user.update({
        where: {
            id: Number(userId),
        },
        data: {
            deleted: true,
        }
    })
}