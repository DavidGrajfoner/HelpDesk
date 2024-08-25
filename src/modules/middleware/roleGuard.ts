import { Role } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

export function roleGuard(roles: Role[]) {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        const user = request.user as { role: Role }; 
        
        if (!user || !roles.includes(user.role)) {
            return reply.code(403).send({ message: "Forbidden: Insufficient permissions" });
        }
    };
}
