import { object, z } from "zod";

export const registerUserSchema = object({
  name: z
    .string()
    .min(2, "name must be at least 2 characters")
    .max(25, "name cannot have more than 25 characters"),
  username: z
    .string()
    .min(2, "username must be at least 2 characters long")
    .max(25, "name cannot have more than 25 characters"),
  email: z.string().email("invalid email address"),
  password: z
    .string()
    .min(8, "password must be at least 8 characters long")
    .max(50, "password cannot have more than 25 characters"),
});

export const userAuthSchema = object({
  email: z.string().email("invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password cannot pass from 25 characters"),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;

export type AuthenticationUserInput = z.infer<typeof userAuthSchema>;
