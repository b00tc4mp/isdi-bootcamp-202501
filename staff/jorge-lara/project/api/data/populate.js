import 'dotenv/config'
import { data, Exercise, Routine, User } from "./index.js";
import bcrypt from 'bcryptjs';

const { MONGO_URL, MONGO_DB } = process.env;

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        return Promise.all([
            User.deleteMany({}),
            Exercise.deleteMany({}),
            Routine.deleteMany({})
        ])
            .then(() => bcrypt.hash('123123123', 10))
            .then(hash => {
                return User.insertMany([
                    {
                        email: 'admin@admin.com',
                        username: 'admin',
                        password: hash
                    },
                    {
                        email: 'admin2@gmail.com',
                        username: 'admin2',
                        password: hash
                    }
                ])
                    .then(([admin, admin2]) => {
                        return Exercise.insertMany([
                            {
                                user: admin.id,
                                name: 'biceps curl',
                                muscleCategory: 'biceps',
                                sets: 3,
                                reps: 8,
                                restTime: 90
                            },
                            {
                                user: admin.id,
                                name: 'triceps dip',
                                muscleCategory: 'triceps',
                                sets: 4,
                                reps: 10,
                                restTime: 60
                            },
                            {
                                user: admin2.id,
                                name: 'leg extension',
                                muscleCategory: 'quadriceps',
                                sets: 3,
                                reps: 6,
                                restTime: 90
                            }
                        ]).then(([bicepsCurl, tricepsDip, legExtension]) => ({ admin, admin2, bicepsCurl, tricepsDip, legExtension }))
                    })
                    .then(({ admin, admin2, bicepsCurl, tricepsDip, legExtension }) => {
                        debugger;
                        return Routine.insertMany([
                            {
                                user: admin.id,
                                title: 'Arm Strength Builder',
                                description: 'A test description',
                                duration: 30,
                                difficulty: 'intermediate',
                                category: 'strength',
                                type: 'supersets',
                                exercises: [bicepsCurl.id, legExtension.id],
                                startDate: new Date('2025-05-10'),
                                endDate: new Date('2025-05-22')
                            },
                            {
                                user: admin.id,
                                title: 'Full Body Blast',
                                description: 'A comprehensive workout for overall strength.',
                                duration: 40,
                                difficulty: 'advanced',
                                category: 'hypertrophy',
                                type: 'circuit',
                                exercises: [bicepsCurl.id, legExtension.id, tricepsDip.id],
                                startDate: new Date('2025-05-10'),
                                endDate: new Date('2025-06-03')
                            },
                            {
                                user: admin2.id,
                                title: 'Leg Day Blast',
                                description: 'An intense leg routine to sculpt your quads.',
                                duration: 45,
                                difficulty: 'advanced',
                                category: 'hypertrophy',
                                type: 'straight',
                                exercises: [legExtension.id],
                                startDate: new Date('2025-05-10'),
                                endDate: new Date('2025-05-29')
                            }
                        ])
                    })
            })
    })
    .finally(() => data.disconnect())