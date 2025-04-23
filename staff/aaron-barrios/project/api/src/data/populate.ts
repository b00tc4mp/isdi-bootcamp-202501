import "dotenv/config"
import bcrypt from "bcryptjs"
import { data } from "."
import { User, Workout } from "./models"

const { MONGO_URI, MONGO_DB_NAME } = process.env


data.connect(MONGO_URI!, MONGO_DB_NAME!)
    .then(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({})
    ]))
    .then(() => bcrypt.hash("mamama", 10))
    .then(hashedPassword => {
        return User.insertMany([
            {
                name: "Masha",
                lastName: "Stepanova",
                email: "ma@sha.com",
                alias: "ma",
                password: hashedPassword,
                role: "default",
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
                role: "default",
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
                password: hashedPassword,
                createdAt: new Date(2023, 8, 17),
            }
        ])
    })
    .then(([masha, manu, frankie, compi]) => {
        return Workout.insertMany([
            {
                author: masha.id,
                name: "bench press",
                muscleGroup: "chest",
                feedImage: "https://images.ctfassets.net/8urtyqugdt2l/4wPk3KafRwgpwIcJzb0VRX/4894054c6182c62c1d850628935a4b0b/desktop-best-chest-exercises.jpg",
                type: "strength",
                difficulty: "easy",
                description: "best chest exercise to grow the muscle!",
                image: ["url1", "url2"],
                likes: [compi.id],
                saves: [masha.id],
                status: "accepted",
                createdAt: new Date(2023, 11, 1),
            },
            {
                author: frankie.id,
                name: "lateral raises",
                muscleGroup: "shoulders",
                feedImage: "https://cdn.shopify.com/s/files/1/0574/1215/7598/files/Blog_Content_-_146-Edit_480x480.jpg?v=1730481657",
                type: "strength",
                difficulty: "medium",
                description: "best shoulders exercise!",
                executionImages: ["url1", "url2"],
                likes: [manu.id],
                saves: [masha.id],
                status: "accepted",
                createdAt: new Date(2024, 10, 27),
            },
            {
                author: manu.id,
                name: "bulgarian squat",
                muscleGroup: "legs",
                feedImage: "https://www.tonal.com/wp-content/uploads/2024/01/Bulgarian-Split-Squat-Hero.jpg",
                type: "strength",
                difficulty: "hard",
                description: "best legs exercise!",
                executionImages: ["url1", "url2"],
                likes: [masha.id, frankie.id, manu.id],
                saves: [manu.id, masha.id],
                status: "accepted",
                createdAt: new Date(2025, 1, 13),
            },
            {
                author: frankie.id,
                name: "hip thrust",
                muscleGroup: "buttocks",
                feedImage: "https://www.mgc.es/wp-content/uploads/2023/05/como-hacer-hip-thrust-para-los-gluteos-880x660.jpg",
                type: "strength",
                difficulty: "medium",
                description: "best buttocks exercise!",
                executionImages: ["url1", "url2"],
                likes: [manu.id],
                saves: [masha.id],
                status: "pending",
                createdAt: new Date(2024, 10, 27),
            },
            {
                author: frankie.id,
                name: "hammer curl",
                muscleGroup: "biceps",
                feedImage: "https://www.trainheroic.com/wp-content/uploads/2023/02/AdobeStock_417412809-TH-jpg.webp",
                type: "strength",
                difficulty: "medium",
                description: "best biceps exercise!",
                executionImages: ["url1", "url2"],
                likes: [manu.id],
                saves: [masha.id],
                status: "accepted",
                createdAt: new Date(2024, 10, 27),
            },
            {
                author: frankie.id,
                name: "rowing",
                muscleGroup: "back",
                feedImage: "https://static01.nyt.com/images/2022/11/08/multimedia/26WNT-ROWING-WORKOUT5-1-310a/26WNT-ROWING-WORKOUT5-1-310a-videoSixteenByNineJumbo1600.jpg",
                type: "strength",
                difficulty: "easy",
                description: "best back exercise!",
                executionImages: ["url1", "url2"],
                likes: [manu.id],
                saves: [masha.id],
                status: "accepted",
                createdAt: new Date(2024, 10, 27),
            }
        ])
    })
    .finally(() => data.disconnect())