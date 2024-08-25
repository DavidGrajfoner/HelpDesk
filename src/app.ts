import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fjwt from "@fastify/jwt";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { withRefResolver } from "fastify-zod";
import { version } from '../package.json';
import userRoutes from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";
import messageRoutes from "./modules/message/message.route";
import conversationRoutes from "./modules/room/room.route";
import { roomSchemas } from "./modules/room/room.schema";
import { messageSchemas } from "./modules/message/message.schema";
import dataRoutes from "./modules/data/data.route";

export const server = Fastify();

server.register(fjwt, {
    secret: "dbnaioudbnw9iudghbwe789adfhq98d3gh19",
})

server.decorate(
    "authenticate", 
    async (request: FastifyRequest,  reply: FastifyReply) => {
        try {
            await request.jwtVerify();
        } catch (e) {
            return reply.send(e);
        }
})

server.get('/healthcheck', async function() {
    return {status: "OK"};
})

async function main() {

    console.log("Registering user schemas...");
    for (const schema of userSchemas) {
        server.addSchema(schema);
    }
    
    console.log("Registering room schemas...");
    for (const schema of roomSchemas) {
        server.addSchema(schema);
    }

    console.log("Registering message schemas...");
    for (const schema of messageSchemas) {
        server.addSchema(schema);
    }

    server.register(swagger, withRefResolver({
        openapi: {
            info: {
                title: 'Fastify API',
                description: 'API for help desk',
                version: version,
            },
            servers: [
                {
                    url: 'http://localhost:3000',
                    description: 'Local server'
                }
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    },
                },
            },
            security: [{ bearerAuth: [] }],
            tags: [
                { name: 'user', description: 'User related end-points' },
                { name: 'conversation', description: 'Conversation related end-points' },
                { name: 'message', description: 'Message related end-points' },
            ],
        },
    }));

    server.register(swaggerUi, {
        routePrefix: '/docs',
        uiConfig: {
            docExpansion: 'none',
            deepLinking: false,
        },
        uiHooks: {
            onRequest: async (request, reply) => { /* Custom logic */ },
            preHandler: async (request, reply) => { /* Custom logic */ },
        },
        staticCSP: true, 
        transformStaticCSP: (header) => header,
    });
    
    server.register(messageRoutes, {prefix: 'api/messages'})
    server.register(userRoutes, {prefix: 'api/users'})
    server.register(conversationRoutes, {prefix: 'api/rooms'})
    server.register(dataRoutes, {prefix: 'api/data'})

    server.listen({ port: 3000 }, function (err, address){
        if (err) {
            server.log.error(err);
            process.exit(1);
        }

        console.log(`Server is now listening on ${address}`);
    })
}

main()