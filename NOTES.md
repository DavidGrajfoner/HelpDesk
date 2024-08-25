# Dependencies
npm install @prisma/client fastify fastify-zod zod zod-to-json-schema fastify-jwt

# Dev Dependencies
npm install ts-node-dev typescript @types/node --save-dev

# Initialise prisma
npx prisma init --datasource-provider postgresql

# Migrate the schema
npx prisma migrate dev --name init