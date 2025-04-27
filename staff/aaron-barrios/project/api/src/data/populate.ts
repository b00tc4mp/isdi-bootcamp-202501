import "dotenv/config"
import bcrypt from "bcryptjs"
import { data } from "."
import { Routine, User, Workout } from "./models"
import { UserDocType } from "./types"

const { MONGO_URI, MONGO_DB_NAME } = process.env

let masha: UserDocType
let frankie: UserDocType
let manu: UserDocType
let compi: Partial<UserDocType>

data.connect(MONGO_URI!, MONGO_DB_NAME!)
    .then(() => Promise.all([
        User.deleteMany({}),
        Workout.deleteMany({}),
        Routine.deleteMany({}),
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
    .then(([mashaResult, manuResult, frankieResult, compiResult]) => {
        masha = mashaResult
        manu = manuResult
        frankie = frankieResult
        compi = compiResult
    })
    .then(() => {
        return Workout.insertMany([
            {
                author: masha._id,
                name: "bench press",
                muscleGroup: "chest",
                feedImage: "https://images.ctfassets.net/8urtyqugdt2l/4wPk3KafRwgpwIcJzb0VRX/4894054c6182c62c1d850628935a4b0b/desktop-best-chest-exercises.jpg",
                type: "strength",
                difficulty: "easy",
                description: "best chest exercise to grow the muscle!",
                executionImages: ["url1", "url2"],
                likes: [compi._id],
                saves: [masha._id],
                status: "accepted",
                createdAt: new Date(2023, 11, 1),
                modifiedAt: new Date()
            },
            {
                author: frankie._id,
                name: "lateral raises",
                muscleGroup: "shoulders",
                feedImage: "https://cdn.shopify.com/s/files/1/0574/1215/7598/files/Blog_Content_-_146-Edit_480x480.jpg?v=1730481657",
                type: "strength",
                difficulty: "medium",
                description: "best shoulders exercise!",
                executionImages: ["url1", "url2"],
                likes: [manu._id],
                saves: [masha._id],
                status: "accepted",
                createdAt: new Date(2024, 10, 27),
                modifiedAt: new Date()
            },
            {
                author: manu._id,
                name: "bulgarian squat",
                muscleGroup: "legs",
                feedImage: "https://www.tonal.com/wp-content/uploads/2024/01/Bulgarian-Split-Squat-Hero.jpg",
                type: "strength",
                difficulty: "hard",
                description: "best legs exercise!",
                executionImages: ["url1", "url2"],
                likes: [masha._id, frankie._id, manu._id],
                saves: [manu._id, masha._id],
                status: "accepted",
                createdAt: new Date(2025, 1, 13),
                modifiedAt: new Date()
            },
            {
                author: frankie._id,
                name: "hammer curl",
                muscleGroup: "biceps",
                feedImage: "https://www.trainheroic.com/wp-content/uploads/2023/02/AdobeStock_417412809-TH-jpg.webp",
                type: "strength",
                difficulty: "medium",
                description: "best biceps exercise!",
                executionImages: ["url1", "url2"],
                likes: [manu._id],
                saves: [masha._id],
                status: "accepted",
                createdAt: new Date(2024, 10, 27),
                modifiedAt: new Date()
            },
            {
                author: frankie._id,
                name: "rowing",
                muscleGroup: "back",
                feedImage: "https://static01.nyt.com/images/2022/11/08/multimedia/26WNT-ROWING-WORKOUT5-1-310a/26WNT-ROWING-WORKOUT5-1-310a-videoSixteenByNineJumbo1600.jpg",
                type: "strength",
                difficulty: "easy",
                description: "best back exercise!",
                executionImages: ["url1", "url2"],
                likes: [manu._id],
                saves: [masha._id],
                status: "accepted",
                createdAt: new Date(2024, 10, 28),
                modifiedAt: new Date()
            },
            {
                author: frankie._id,
                name: "hip thrust",
                muscleGroup: "buttocks",
                feedImage: "https://www.mgc.es/wp-content/uploads/2023/05/como-hacer-hip-thrust-para-los-gluteos-880x660.jpg",
                type: "strength",
                difficulty: "medium",
                description: "best buttocks exercise!",
                executionImages: ["url1", "url2"],
                likes: [],
                saves: [],
                status: "pending",
                createdAt: new Date(2024, 10, 29),
                modifiedAt: new Date()
            },
        ])
    })
    .then(([benchPress, lateralRaises, bulgarianSquat, hipThrust]) => {
        return Routine.insertMany([
            {
                author: frankie._id,
                name: "Lower Body Blast",
                goal: "strength",
                muscleGroup: "legs",
                locationType: "gym",
                difficulty: "hard",
                description: "A tough routine for your lower half.",
                feedImage: "https://www.barbellmedicine.com/wp-content/uploads/2024/03/Back-Squat.jpg",
                duration: 60,
                status: "accepted",
                frequencySuggestion: "2x per week",
                likes: [masha._id],
                saves: [manu._id],
                createdAt: new Date(),
                workouts: [
                    {
                        workout: bulgarianSquat._id,
                        sets: 4,
                        reps: 8,
                        restTime: 90,
                        order: 1
                    },
                    {
                        workout: hipThrust._id,
                        sets: 4,
                        reps: 10,
                        restTime: 60,
                        order: 2
                    }
                ]
            },
            {
                author: frankie._id,
                name: "Chest and Shoulders Blast",
                goal: "strength",
                muscleGroup: "chest",
                locationType: "gym",
                difficulty: "medium",
                description: "Perfect routine to build your chest and shoulders!",
                feedImage: "https://www.gymreapers.com/cdn/shop/articles/header-image-01_Cable-chest-workout---maximizing-your-muscle-growth.jpg?v=1721671171&width=1024",
                duration: 45,
                status: "accepted",
                frequencySuggestion: "2-3 times per week",
                likes: [manu._id],
                saves: [masha._id],
                createdAt: new Date(),
                workouts: [
                    {
                        workout: benchPress._id,
                        sets: 4,
                        reps: 10,
                        restTime: 90,
                        order: 1
                    },
                    {
                        workout: lateralRaises._id,
                        sets: 3,
                        reps: 12,
                        restTime: 60,
                        order: 2
                    }
                ]
            },
            {
                author: frankie._id,
                name: "Chest Blast",
                goal: "strength",
                muscleGroup: "chest",
                locationType: "gym",
                difficulty: "medium",
                description: "Perfect routine to build your chest!",
                feedImage: "https://content.health.harvard.edu/wp-content/uploads/2024/04/351b1be8-532c-4e59-903b-c756a70ac11e.jpg",
                duration: 45,
                status: "pending",
                frequencySuggestion: "2-3 times per week",
                likes: [manu._id],
                saves: [masha._id],
                createdAt: new Date(),
                workouts: [
                    {
                        workout: benchPress._id,
                        sets: 4,
                        reps: 10,
                        restTime: 90,
                        order: 1
                    },
                    {
                        workout: lateralRaises._id,
                        sets: 3,
                        reps: 12,
                        restTime: 60,
                        order: 2
                    }
                ]
            }
        ])
    })
    .finally(() => data.disconnect());
