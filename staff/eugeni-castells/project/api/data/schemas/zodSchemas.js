"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerVanSchema = exports.userAuthSchema = exports.registerUserSchema = void 0;
const zod_1 = require("zod");
const com_1 = require("com");
const { OBJECT_ID_REGEX } = com_1.constant;
const currentYear = new Date().getFullYear();
exports.registerUserSchema = (0, zod_1.object)({
    name: zod_1.z
        .string()
        .min(2, "name must be at least 2 characters")
        .max(25, "name cannot have more than 25 characters"),
    email: zod_1.z.string().email("invalid email address"),
    password: zod_1.z
        .string()
        .min(8, "password must be at least 8 characters long")
        .max(50, "password cannot have more than 25 characters"),
    city: zod_1.z
        .string()
        .min(2, "city must have at least 2 characters")
        .max(30, "city cannot surpass 30 characters"),
    address: zod_1.z
        .string()
        .min(5, "address must have at least 2 characters")
        .max(30, "address cannot surpasse 30 characters"),
    country: zod_1.z
        .string()
        .min(3, "region must have at least 2 characters")
        .max(20, "region cannot surpass 20 characters"),
    // point: z.object({
    //   coordinates: z
    //     .array(z.number())
    //     .length(2, "coordinates must be an array of exactly two numbers"),
    // }),
});
exports.userAuthSchema = (0, zod_1.object)({
    email: zod_1.z.string().email("invalid email address"),
    password: zod_1.z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(50, "Password cannot pass from 25 characters"),
});
exports.registerVanSchema = zod_1.z.object({
    model: zod_1.z.string().min(3).max(30),
    brand: zod_1.z.string().min(3).max(15),
    year: zod_1.z.string().refine((val) => {
        const year = new Date(val).getFullYear();
        return year >= 1970 && year <= currentYear;
    }, {
        message: `Year must be between 1970 and ${currentYear}`,
    }),
    images: zod_1.z.array(zod_1.z.string().min(10).max(150)).optional(),
    accessible: zod_1.z.boolean().optional(),
    price: zod_1.z.number().min(0).max(1000).optional(),
    reviews: zod_1.z.array(zod_1.z.string().regex(OBJECT_ID_REGEX)).optional(),
    location: zod_1.z.string().regex(OBJECT_ID_REGEX),
    legal: zod_1.z.array(zod_1.z.string().regex(OBJECT_ID_REGEX)).optional(),
    trips: zod_1.z.array(zod_1.z.string().regex(OBJECT_ID_REGEX)).optional(),
    windows: zod_1.z.number().min(1).max(10),
    doors: zod_1.z.number().min(1).max(10),
    heating: zod_1.z.boolean().optional().default(false),
    airConditioning: zod_1.z.boolean().optional().default(false),
    bedCount: zod_1.z.number().min(1).max(5),
    insideKitchen: zod_1.z.boolean().optional().default(false),
    fridge: zod_1.z.boolean().optional().default(false),
    toilet: zod_1.z.enum(["fixed", "portable", "none"]).default("none"),
    shower: zod_1.z.enum(["inside", "outside", "none"]),
    fuelType: zod_1.z.enum(["petrol", "diesel", "electric", "hybrid"]),
    storage: zod_1.z.number().min(0).optional(),
    createdAt: zod_1.z
        .string()
        .optional()
        .transform((val) => (val ? new Date(val) : new Date())),
    modifiedAt: zod_1.z
        .string()
        .nullable()
        .optional()
        .transform((val) => (val ? new Date(val) : null)),
});
