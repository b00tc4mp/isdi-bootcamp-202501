import "dotenv/config"
import bcrypt from "bcryptjs"
import { data } from "."
import { Routine, User, Workout } from "./models"
import { UserDocType } from "./types"
import { late } from "zod"

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
                author: masha._id,
                name: "dips",
                muscleGroup: "chest",
                feedImage: "https://cdn.muscleandstrength.com/sites/default/files/chest-dip.jpg",
                type: "endurance",
                difficulty: "difficult",
                description: "best chest exercise to grow the muscle!",
                executionImages: ["url1", "url2"],
                likes: [compi._id],
                saves: [frankie._id],
                status: "accepted",
                createdAt: new Date(2023, 11, 5),
                modifiedAt: new Date()
            },
            {
                author: frankie._id,
                name: "lateral raises",
                muscleGroup: "shoulders",
                feedImage: "https://cdn.shopify.com/s/files/1/0574/1215/7598/files/Blog_Content_-_146-Edit_480x480.jpg?v=1730481657",
                type: "cardio",
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
                author: frankie._id,
                name: "military press",
                muscleGroup: "shoulders",
                feedImage: "https://rogersathletic.com/wp-content/uploads/2023/04/overhead_press_001.jpg",
                type: "strength",
                difficulty: "medium",
                description: "best shoulders exercise!",
                executionImages: ["url1", "url2"],
                likes: [manu._id],
                saves: [frankie._id],
                status: "accepted",
                createdAt: new Date(2024, 10, 30),
                modifiedAt: new Date()
            },
            {
                author: manu._id,
                name: "bulgarian squat",
                muscleGroup: "legs",
                feedImage: "https://www.tonal.com/wp-content/uploads/2024/01/Bulgarian-Split-Squat-Hero.jpg",
                type: "endurance",
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
                author: manu._id,
                name: "walking lunges",
                muscleGroup: "legs",
                feedImage: "https://hips.hearstapps.com/hmg-prod/images/walking-lunges-667e8add0acad.jpg?crop=0.598xw:0.895xh;0.324xw,0.0800xh&resize=640:*",
                type: "mobility",
                difficulty: "hard",
                description: "best legs exercise!",
                executionImages: ["url1", "url2"],
                likes: [masha._id, frankie._id, manu._id],
                saves: [manu._id, masha._id, frankie._id],
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
                name: "biceps curl",
                muscleGroup: "biceps",
                feedImage: "https://blogscdn.thehut.net/wp-content/uploads/sites/450/2018/08/17134425/curl-de-b%C3%ADceps_1200x672_acf_cropped.jpg",
                type: "strength",
                difficulty: "easy",
                description: "best biceps exercise!",
                executionImages: ["url1", "url2"],
                likes: [manu._id],
                saves: [masha._id],
                status: "accepted",
                createdAt: new Date(2024, 8, 17),
                modifiedAt: new Date()
            },
            {
                author: frankie._id,
                name: "rowing",
                muscleGroup: "back",
                feedImage: "https://static01.nyt.com/images/2022/11/08/multimedia/26WNT-ROWING-WORKOUT5-1-310a/26WNT-ROWING-WORKOUT5-1-310a-videoSixteenByNineJumbo1600.jpg",
                type: "endurance",
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
                name: "pull-ups",
                muscleGroup: "back",
                feedImage: "https://images.ctfassets.net/0k812o62ndtw/5NuCplQIQtWN7cQMgoEtXf/0ab832bf7faf755ef47fc9e413300db3/2023.11.17_SWEAT_LAURA05320-1024x683-27c3a53.jpg",
                type: "cardio",
                difficulty: "easy",
                description: "best back exercise!",
                executionImages: ["url1", "url2"],
                likes: [manu._id],
                saves: [masha._id, frankie._id],
                status: "accepted",
                createdAt: new Date(2024, 11, 3),
                modifiedAt: new Date()
            },
            {
                author: frankie._id,
                name: "hip thrust",
                muscleGroup: "buttocks",
                feedImage: "https://www.mgc.es/wp-content/uploads/2023/05/como-hacer-hip-thrust-para-los-gluteos-880x660.jpg",
                type: "endurance",
                difficulty: "medium",
                description: "best buttocks exercise!",
                executionImages: ["url1", "url2"],
                likes: [],
                saves: [frankie._id],
                status: "accepted",
                createdAt: new Date(2024, 10, 29),
                modifiedAt: new Date()
            },
            {
                author: frankie._id,
                name: "glute kickbacks",
                muscleGroup: "buttocks",
                feedImage: "https://www.shape.com/thmb/XnPlKD-V34i5-WP1A0BWpFGcqLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Cable-Kickback-47f64e410484455eb9edb863625da9df.jpg",
                type: "strength",
                difficulty: "medium",
                description: "buttocks exercise!",
                executionImages: ["url1", "url2"],
                likes: [],
                saves: [],
                status: "pending",
                createdAt: new Date(2024, 10, 30),
                modifiedAt: new Date()
            },
            {
                author: manu._id,
                name: "triceps pushdown",
                muscleGroup: "triceps",
                feedImage: "https://www.puregym.com/media/0kujs5ev/tricep-pushdowns.jpg?quality=80",
                type: "strength",
                difficulty: "easy",
                description: "triceps exercise!",
                executionImages: ["url1", "url2"],
                likes: [],
                saves: [frankie._id],
                status: "accepted",
                createdAt: new Date(2024, 9, 21),
                modifiedAt: new Date()
            },
            {
                author: frankie._id,
                name: "triceps dips on bench",
                muscleGroup: "triceps",
                feedImage: "https://hips.hearstapps.com/hmg-prod/images/img-2220-jpg-1571859261.jpg",
                type: "strength",
                difficulty: "easy",
                description: "triceps exercise!",
                executionImages: ["url1", "url2"],
                likes: [],
                saves: [],
                status: "pending",
                createdAt: new Date(2024, 9, 21),
                modifiedAt: new Date()
            },
        ])
    })
    .then(([benchPress, dips, militaryPress, lateralRaises, walkingLunges, bulgarianSquat, hipThrust, gluteKickacks, bicepsCurl, hammerCurl, pullUps, rowing, tricepsPushdown, tricepsDips]) => {
        return Routine.insertMany([
            {
                author: frankie._id,
                name: "Chest and biceps Blast",
                goal: "endurance",
                muscleGroup: "chest",
                locationType: "gym",
                difficulty: "medium",
                description: "Perfect routine to build your chest and shoulders!",
                feedImage: "https://www.gymreapers.com/cdn/shop/articles/header-image-01_Cable-chest-workout---maximizing-your-muscle-growth.jpg?v=1721671171&width=1024",
                duration: 45,
                status: "accepted",
                frequencySuggestion: "2-3 times per week",
                likes: [manu._id, masha._id, frankie._id],
                saves: [masha._id],
                createdAt: new Date(2024, 8, 30),
                workouts: [
                    {
                        workout: benchPress._id,
                        sets: 4,
                        reps: 10,
                        restTime: 90,
                        order: 1
                    },
                    {
                        workout: hammerCurl._id,
                        sets: 3,
                        reps: 12,
                        restTime: 60,
                        order: 2
                    }, {
                        workout: dips._id,
                        sets: 4,
                        reps: 10,
                        restTime: 90,
                        order: 1
                    },
                    {
                        workout: bicepsCurl._id,
                        sets: 3,
                        reps: 12,
                        restTime: 60,
                        order: 2
                    },
                ]
            },
            {
                author: masha._id,
                name: "shoulders and legs Blast",
                goal: "endurance",
                muscleGroup: "shoulders",
                locationType: "gym",
                difficulty: "medium",
                description: "Perfect routine to build your shoulders!",
                feedImage: "https://cdn.prod.website-files.com/65d1e20566ce88e043a1157d/6626917d5e3aa7dd77a929bc_6501c9c5a1cffd9eb9c42c59_imgonline-com-ua-converthdq1hpNgpS8x.webp",
                duration: 45,
                status: "accepted",
                frequencySuggestion: "2-3 times per week",
                likes: [manu._id],
                saves: [manu._id, masha._id, frankie._id],
                createdAt: new Date(2024, 3, 30),
                workouts: [
                    {
                        workout: lateralRaises._id,
                        sets: 4,
                        reps: 10,
                        restTime: 90,
                        order: 1
                    },
                    {
                        workout: militaryPress._id,
                        sets: 3,
                        reps: 12,
                        restTime: 60,
                        order: 2
                    },
                    {
                        workout: bulgarianSquat._id,
                        sets: 4,
                        reps: 10,
                        restTime: 90,
                        order: 1
                    },
                    {
                        workout: walkingLunges._id,
                        sets: 3,
                        reps: 12,
                        restTime: 60,
                        order: 2
                    }
                ]
            },
            {
                author: frankie._id,
                name: "back and triceps Blast",
                goal: "cardio",
                muscleGroup: "back",
                locationType: "gym",
                difficulty: "medium",
                description: "Perfect routine to build your back!",
                feedImage: "https://shop.bodybuilding.com/cdn/shop/articles/6-back-workouts-to-get-a-bigger-stronger-back-619181.jpg?v=1731882638",
                duration: 45,
                status: "accepted",
                frequencySuggestion: "2-3 times per week",
                likes: [],
                saves: [],
                createdAt: new Date(2024, 11, 30),
                workouts: [
                    {
                        workout: dips._id,
                        sets: 4,
                        reps: 10,
                        restTime: 90,
                        order: 1
                    },
                    {
                        workout: pullUps._id,
                        sets: 3,
                        reps: 12,
                        restTime: 60,
                        order: 2
                    },
                    {
                        workout: tricepsDips._id,
                        sets: 4,
                        reps: 10,
                        restTime: 90,
                        order: 1
                    },
                    {
                        workout: tricepsPushdown._id,
                        sets: 3,
                        reps: 12,
                        restTime: 60,
                        order: 2
                    }
                ]
            },
            {
                author: frankie._id,
                name: "Lower Body Blast",
                goal: "mobility",
                muscleGroup: "legs",
                locationType: "gym",
                difficulty: "hard",
                description: "A tough routine for your lower half.",
                feedImage: "https://www.barbellmedicine.com/wp-content/uploads/2024/03/Back-Squat.jpg",
                duration: 60,
                status: "pending",
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
                author: manu._id,
                name: "Legs Blast",
                goal: "strength",
                muscleGroup: "legs",
                locationType: "gym",
                difficulty: "hard",
                description: "A tough routine for your legs.",
                feedImage: "https://uk.gymshark.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F8urtyqugdt2l%2F7DjCv2aBaPIABZ9wosGvJk%2F0d693d9d04fae848feac8779289e2d3c%2Fmobile-leg-exercises.jpg&w=3840&q=85",
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
                        workout: walkingLunges._id,
                        sets: 4,
                        reps: 10,
                        restTime: 60,
                        order: 2
                    }
                ]
            },
            {
                author: masha._id,
                name: "Buttocks Blast",
                goal: "strength",
                muscleGroup: "buttocks",
                locationType: "gym",
                difficulty: "medium",
                description: "A tough routine for your buttocks.",
                feedImage: "https://workoutlabs.com/fit/wp-content/uploads/2017/03/pure-abs-attack-and-booty-blast-gym-workout.jpg",
                duration: 60,
                status: "accepted",
                frequencySuggestion: "2x per week",
                likes: [masha._id],
                saves: [manu._id],
                createdAt: new Date(),
                workouts: [
                    {
                        workout: gluteKickacks._id,
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
                name: "Biceps Blast",
                goal: "strength",
                muscleGroup: "biceps",
                locationType: "gym",
                difficulty: "medium",
                description: "A tough routine for your biceps.",
                feedImage: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/b3/fb/f4/b3fbf42d-a356-f4ec-251e-f5deded3ca9d/artwork.jpg/1200x1200bb.jpg",
                duration: 60,
                status: "accepted",
                frequencySuggestion: "2x per week",
                likes: [masha._id],
                saves: [],
                createdAt: new Date(),
                workouts: [
                    {
                        workout: bicepsCurl._id,
                        sets: 4,
                        reps: 8,
                        restTime: 90,
                        order: 1
                    },
                    {
                        workout: hammerCurl._id,
                        sets: 4,
                        reps: 10,
                        restTime: 60,
                        order: 2
                    }
                ]
            },
            {
                author: manu._id,
                name: "Triceps Blast",
                goal: "strength",
                muscleGroup: "triceps",
                locationType: "gym",
                difficulty: "medium",
                description: "A tough routine for your triceps.",
                feedImage: "https://shop.bodybuilding.com/cdn/shop/articles/the-ultimate-shoulders-and-triceps-blast-428183.jpg?v=1731882815",
                duration: 60,
                status: "accepted",
                frequencySuggestion: "2x per week",
                likes: [masha._id],
                saves: [],
                createdAt: new Date(),
                workouts: [
                    {
                        workout: tricepsDips._id,
                        sets: 4,
                        reps: 8,
                        restTime: 90,
                        order: 1
                    },
                    {
                        workout: tricepsPushdown._id,
                        sets: 4,
                        reps: 10,
                        restTime: 60,
                        order: 2
                    }
                ]
            },
            {
                author: manu._id,
                name: "Shoulders Blast",
                goal: "strength",
                muscleGroup: "shoulders",
                locationType: "gym",
                difficulty: "medium",
                description: "A tough routine for your shoulders.",
                feedImage: "https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2017/08/erik-fankhouser-shoulders-delts-front-raises.jpg?quality=86&strip=all",
                duration: 60,
                status: "accepted",
                frequencySuggestion: "2x per week",
                likes: [masha._id],
                saves: [],
                createdAt: new Date(),
                workouts: [
                    {
                        workout: militaryPress._id,
                        sets: 4,
                        reps: 8,
                        restTime: 90,
                        order: 1
                    },
                    {
                        workout: lateralRaises._id,
                        sets: 4,
                        reps: 10,
                        restTime: 60,
                        order: 2
                    }
                ]
            },
            {
                author: manu._id,
                name: "Back Blast",
                goal: "strength",
                muscleGroup: "back",
                locationType: "gym",
                difficulty: "medium",
                description: "A tough routine for your back.",
                feedImage: "https://images-prod.healthline.com/hlcmsresource/images/topic_centers/2018-6/Back_Dumbbell_Workout_Weights-1296x728-Header.jpg",
                duration: 60,
                status: "accepted",
                frequencySuggestion: "2x per week",
                likes: [masha._id],
                saves: [],
                createdAt: new Date(),
                workouts: [
                    {
                        workout: pullUps._id,
                        sets: 4,
                        reps: 8,
                        restTime: 90,
                        order: 1
                    },
                    {
                        workout: rowing._id,
                        sets: 4,
                        reps: 10,
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
                description: "A tough routine for your chest.",
                feedImage: "https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2015/01/cable-flye-chest-workout-jared-groff-promo.jpg?quality=86&strip=all",
                duration: 60,
                status: "accepted",
                frequencySuggestion: "2x per week",
                likes: [frankie._id],
                saves: [],
                createdAt: new Date(),
                workouts: [
                    {
                        workout: benchPress._id,
                        sets: 4,
                        reps: 8,
                        restTime: 90,
                        order: 1
                    },
                    {
                        workout: dips._id,
                        sets: 4,
                        reps: 10,
                        restTime: 60,
                        order: 2
                    }
                ]
            },
        ])
    })
    .finally(() => data.disconnect());
