import {z} from 'zod';
import { buildJsonSchemas } from "fastify-zod";


const userCore = {
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email(),
      username: z.string(),
  };

  const createUserSchema = z.object({
    ...userCore,
    password: z.string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    }),
  });

  const createUserResponseSchema = z.object({
    id: z.number(),
    ...userCore,
  });

  const loginSchema = z.object({
    email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
    password: z.string(),
  })

  const loginResponseSchema = z.object({
    accessToken: z.string(),
  })

  const updateUserRoleSchema = z.object({
    id: z.number(),
    role: z.string(),
  })

export type CreateUserInput = z.infer<typeof createUserSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
    createUserSchema,
    createUserResponseSchema,
    loginSchema,
    loginResponseSchema,
    updateUserRoleSchema,
  }, { $id: "UserSchema" });