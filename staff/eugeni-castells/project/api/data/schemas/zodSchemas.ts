import { object, z } from "zod";
import { constant } from "com";

const { OBJECT_ID_REGEX } = constant;

const currentYear = new Date().getFullYear();

export const registerUserSchema = object({
  name: z
    .string()
    .min(2, "name must be at least 2 characters")
    .max(25, "name cannot have more than 25 characters"),
  email: z.string().email("invalid email address"),
  password: z
    .string()
    .min(8, "password must be at least 8 characters long")
    .max(50, "password cannot have more than 25 characters"),
  city: z
    .string()
    .min(2, "city must have at least 2 characters")
    .max(30, "city cannot surpass 30 characters")
    .optional(),
  address: z
    .string()
    .min(5, "address must have at least 2 characters")
    .max(30, "address cannot surpasse 30 characters"),
  country: z
    .string()
    .min(3, "region must have at least 2 characters")
    .max(20, "region cannot surpass 20 characters")
    .optional(),
  // point: z.object({
  //   coordinates: z
  //     .array(z.number())
  //     .length(2, "coordinates must be an array of exactly two numbers"),
  // }),
});

export const userAuthSchema = object({
  email: z.string().email("invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password cannot pass from 25 characters"),
});

export const registerVanSchema = z.object({
  model: z.string().min(3).max(30),
  brand: z.string().min(3).max(15),
  year: z.string().refine(
    (val) => {
      const year = new Date(val).getFullYear();
      return year >= 1970 && year <= currentYear;
    },
    {
      message: `Year must be between 1970 and ${currentYear}`,
    }
  ),
  images: z.array(z.string().min(10).max(150)).optional(),
  accessible: z.boolean().optional(),
  price: z.number().min(0).max(1000).optional(),
  reviews: z.array(z.string().regex(OBJECT_ID_REGEX)).optional(),
  location: z.string().regex(OBJECT_ID_REGEX),
  legal: z.array(z.string().regex(OBJECT_ID_REGEX)).optional(),
  trips: z.array(z.string().regex(OBJECT_ID_REGEX)).optional(),
  windows: z.number().min(1).max(10),
  doors: z.number().min(1).max(10),
  heating: z.boolean().optional().default(false),
  airConditioning: z.boolean().optional().default(false),
  bedCount: z.number().min(1).max(5),
  insideKitchen: z.boolean().optional().default(false),
  fridge: z.boolean().optional().default(false),
  toilet: z.enum(["fixed", "portable", "none"]).default("none"),
  shower: z.enum(["inside", "outside", "none"]),
  fuelType: z.enum(["petrol", "diesel", "electric", "hybrid"]),
  storage: z.number().min(0).optional(),
  createdAt: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : new Date())),
  modifiedAt: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val ? new Date(val) : null)),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;

export type AuthenticationUserInput = z.infer<typeof userAuthSchema>;

export type RegisterVanInput = z.infer<typeof registerVanSchema>;
