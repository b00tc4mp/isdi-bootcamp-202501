"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthSchema = exports.registerUserSchema = void 0;
const zod_1 = require("zod");
exports.registerUserSchema = (0, zod_1.object)({
    name: zod_1.z
        .string()
        .min(2, "name must be at least 2 characters")
        .max(25, "name cannot have more than 25 characters"),
    username: zod_1.z
        .string()
        .min(2, "username must be at least 2 characters long")
        .max(25, "name cannot have more than 25 characters"),
    email: zod_1.z.string().email("invalid email address"),
    password: zod_1.z
        .string()
        .min(8, "password must be at least 8 characters long")
        .max(50, "password cannot have more than 25 characters"),
});
exports.userAuthSchema = (0, zod_1.object)({
    email: zod_1.z.string().email("invalid email address"),
    password: zod_1.z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(50, "Password cannot pass from 25 characters"),
});
