import { JWT } from '@fastify/jwt';

declare module "fastify" {
    export interface FastifyInstance {
        authenticate: any;
    }
}

declare module "@fastify/jwt" {
    interface FastifyJWT {
        user: {
            "id": number,
            "email": string,
            "username": string,
            "role": string,
        }
    }
}

export interface JWTUser {
    id: number;
    email: string;
    username: string;
    role: string;
    iat?: number; 
}