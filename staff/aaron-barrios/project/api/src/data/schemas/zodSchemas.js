"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUserSchema = exports.registerUserSchema = void 0;
const zod_1 = require("zod");
//DEFAULT LAYER (WORKS IN TIME COMPILATION) THAT
//PREVENTS US TO MAKE AN API CALL IF THROWS AN ERROR
exports.registerUserSchema = (0, zod_1.object)({
    name: zod_1.z
        .string()
        .min(1, 'Name must be at least 1 character')
        .max(20, 'Name must be at last 20 characters'),
    lastName: zod_1.z
        .string()
        .min(3, 'Last Name must be at least 3 characters')
        .max(20, 'Last Name must be at least 20 characters'),
    email: zod_1.z
        .string()
        .email('Invalid email address')
        .max(30, 'Email must be at last 30 characters'),
    alias: zod_1.z
        .string()
        .min(1, 'Alias must be at least 1 character')
        .max(16, 'Alias must be at last 16 characters'),
    password: zod_1.z
        .string()
        .min(3, 'Password must be at least 6 characters')
        .max(30, 'Password must be at last 30 characters')
});
exports.authenticateUserSchema = (0, zod_1.object)({
    alias: zod_1.z
        .string()
        .min(1, 'Alias must be at least 1 character')
        .max(16, 'Alias must be at last 16 characters'),
    password: zod_1.z
        .string()
        .min(3, 'Password must be at least 6 characters')
        .max(30, 'Password must be at last 30 characters')
});
