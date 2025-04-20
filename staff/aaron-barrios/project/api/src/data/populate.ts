import "dotenv/config"
import bcrypt from "bcryptjs"
import { data } from "."
import { User, Workout } from "./models"

const { MONGO_URI, MONGO_DB_NAME } = process.env

let compi: any // para poder usarlo en todos los then

data.connect(MONGO_URI!, MONGO_DB_NAME!)
    .then(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({})
    ]))
    .then(() => bcrypt.hash("mamama", 10))
    .then(hashedPassword => {
        return User.insertMany([
            {
                name: "Aaron",
                lastName: "Barrios",
                email: "aa@ron.com",
                alias: "aaron",
                password: hashedPassword,
                role: "regular",
                level: "intermediate",
                interests: ["strength", "resistance", "calisthenics"],
                createdAt: new Date(),
                modifiedAt: null,
                workouts: [],
                routines: []
            },
            {
                name: "Manu",
                lastName: "Barzi",
                email: "ma@nu.com",
                alias: "manu",
                password: hashedPassword,
                role: "regular",
                level: "beginner",
                interests: ["flexibility", "calisthenics"],
                createdAt: new Date(),
                modifiedAt: null,
                workouts: [],
                routines: []
            },
            {
                name: "Frank",
                lastName: "Pereira",
                email: "fran@kie.com",
                alias: "frankie",
                password: hashedPassword,
                role: "regular",
                level: "intermediate",
                interests: ["strength", "resistance"],
                createdAt: new Date(),
                modifiedAt: null,
                workouts: [],
                routines: []
            },
            {
                alias: "compi",
                email: "mo@derator.com",
                role: "mod",
                password: "123123",
                createdAt: new Date(2023, 8, 17),
            }
        ])
    })
    .then(([aaron, manu, frankie, compi]) => {
        return Workout.insertMany([
            {
                author: compi.id,
                name: "bench press",
                muscleGroup: "chest",
                feedImage: "https://images.ctfassets.net/8urtyqugdt2l/4wPk3KafRwgpwIcJzb0VRX/4894054c6182c62c1d850628935a4b0b/desktop-best-chest-exercises.jpg",
                type: "strength",
                difficulty: "easy",
                description: "best chest exercise to grow the muscle!",
                image: ["url1", "url2"],
                likes: [compi.id],
                saves: [],
                status: "accepted",
                createdAt: new Date(2023, 11, 1),
            },
            {
                author: frankie.id,
                name: "lateral raises",
                muscleGroup: "shoulder",
                feedImage: "https://cdn.shopify.com/s/files/1/0574/1215/7598/files/Blog_Content_-_146-Edit_480x480.jpg?v=1730481657",
                type: "strength",
                difficulty: "medium",
                description: "best shoulder exercise!",
                executionImages: ["url1", "url2"],
                likes: [manu.id],
                saves: [aaron.id],
                status: "accepted",
                createdAt: new Date(2024, 10, 27),
            },
            {
                author: manu.id,
                name: "bulgarian squat",
                muscleGroup: "buttocks",
                feedImage: "https://www.tonal.com/wp-content/uploads/2024/01/Bulgarian-Split-Squat-Hero.jpg",
                type: "strength",
                difficulty: "hard",
                description: "best buttocks exercise!",
                executionImages: ["url1", "url2"],
                likes: [aaron.id, frankie.id, manu.id],
                saves: [manu.id],
                status: "accepted",
                createdAt: new Date(2025, 1, 13),
            }
        ])
    })
    .finally(() => data.disconnect())