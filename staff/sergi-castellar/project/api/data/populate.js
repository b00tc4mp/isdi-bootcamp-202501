import 'dotenv/config'
import { Couple, User, DiaryEntry, CalendarEvent, List, ListItem, Feelings, data, InviteCode } from './../data/index.js'
import bcrypt from 'bcryptjs'

const { MONGO_URL, MONGO_DB } = process.env

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        return Promise.all([
            CalendarEvent.deleteMany({}),
            Couple.deleteMany({}),
            DiaryEntry.deleteMany({}),
            Feelings.deleteMany({}),
            InviteCode.deleteMany({}),
            ListItem.deleteMany({}),
            List.deleteMany({}),
            User.deleteMany({}),
        ])
    })
    .then(() => {
        return bcrypt.hash('12345678', 10)
    })
    .then(hash => {
        return User.insertMany([
            { name: "John Doe", email: "johndoe@gmail.com", username: "johndoe", password: hash },
            { name: "Mary Doe", email: "marydoe@gmail.com", username: "marydoe", password: hash },
            { name: "Pepi To", email: "pepito@gmail.com", username: "pepito", password: hash },
            { name: "Pepi Ta", email: "pepita@gmail.com", username: "pepita", password: hash },
            { name: "Macare Na", email: "macarena@gmail.com", username: "macarena", password: hash },
            { name: "Macare No", email: "macareno@gmail.com", username: "macareno", password: hash },
            { name: "Sergi", email: "sergi@gmail.com", username: "sergi", password: hash },
            { name: "Olga", email: "olga@gmail.com", username: "olga", password: hash }
        ])
    })
    .then(() => {
        return Promise.all([
            User.findOne({ username: 'johndoe' }).lean(),
            User.findOne({ username: 'marydoe' }).lean(),
            User.findOne({ username: 'pepito' }).lean(),
            User.findOne({ username: 'pepita' }).lean(),
            User.findOne({ username: 'macarena' }).lean(),
            User.findOne({ username: 'macareno' }).lean()
        ])
    })
    .then(([user1, user2, user3, user4, user5, user6]) => {
        return Promise.all([
            Couple.insertOne({ members: [user1._id, user2._id], dateStart: new Date('2023-04-14') }),
            Couple.insertOne({ members: [user3._id, user4._id], dateStart: new Date('2024-04-14') }),
            Couple.insertOne({ members: [user5._id, user6._id], dateStart: new Date('2025-04-14') })
        ])
            .then(() => {
                return Promise.all([
                    Couple.findOne({ members: { $all: [user1._id, user2._id] } }).lean(),
                    Couple.findOne({ members: { $all: [user3._id, user4._id] } }).lean(),
                    Couple.findOne({ members: { $all: [user5._id, user6._id] } }).lean()
                ])
            })
    })
    .then(([couple1, couple2, couple3]) => {
        return Promise.all([
            DiaryEntry.insertMany([
                { couple: couple1._id, text: "Today we had a lovely dinner together, full of laughter and meaningful conversation.", author: couple1.members[0]._id },
                { couple: couple1._id, text: "After dinner, we watched our favorite movie and relaxed.", author: couple1.members[1]._id },
                { couple: couple2._id, text: "Today we had a quiet afternoon in the park, just enjoying each other's company.", author: couple2.members[0]._id },
                { couple: couple2._id, text: "We shared stories and plans for the future while walking hand-in-hand.", author: couple2.members[1]._id },
                { couple: couple3._id, text: "This week we celebrated our anniversary with a surprise dinner date.", author: couple3.members[0]._id },
                { couple: couple3._id, text: "We reminisced about the first time we met and made new memories to cherish.", author: couple3.members[1]._id },
            ]),
            CalendarEvent.insertMany([
                { couple: couple1._id, title: "Anniversary Celebration", description: "Anniversary celebration at our favorite restaurant.", author: couple1.members[0]._id, eventDate: new Date('2025-05-15T19:00:00') },
                { couple: couple1._id, title: "Weekend Trip", description: "A weekend getaway to the countryside for a peaceful retreat.", author: couple1.members[1]._id, eventDate: new Date('2025-06-01T09:00:00') },
                { couple: couple2._id, title: "Birthday Surprise", description: "Special birthday plan, including a spa day and a romantic dinner.", author: couple2.members[0]._id, eventDate: new Date('2025-04-20T10:00:00') },
                { couple: couple2._id, title: "Cooking Class", description: "We will take a cooking class together to learn Italian cuisine.", author: couple2.members[1]._id, eventDate: new Date('2025-07-10T17:30:00') },
                { couple: couple3._id, title: "Anniversary Dinner", description: "Anniversary celebration with a private dinner at home.", author: couple3.members[0]._id, eventDate: new Date('2025-05-05T20:00:00') },
                { couple: couple3._id, title: "Weekend Getaway", description: "A weekend getaway to the beach.", author: couple3.members[1]._id, eventDate: new Date('2025-06-15T08:00:00') },
            ]),
            List.insertMany([
                { couple: couple1._id, title: "Weekend Getaway Packing List", author: couple1.members[0]._id, items: [{ text: "Sunscreen" }, { text: "Camera" }], color: "blue" },
                { couple: couple1._id, title: "Home Renovation Ideas", author: couple1.members[1]._id, items: [{ text: "New furniture" }, { text: "Paint walls" }], color: "red" },
                { couple: couple2._id, title: "Things To Do Together", author: couple2.members[0]._id, items: [{ text: "Visit a museum" }, { text: "Have a picnic" }], color: "blue" },
                { couple: couple2._id, title: "Vacation Wishlist", author: couple2.members[1]._id, items: [{ text: "Paris" }, { text: "Tokyo" }], color: "pink" },
                { couple: couple3._id, title: "Anniversary Plans", author: couple3.members[0]._id, items: [{ text: "Buy a gift" }, { text: "Make a special dinner" }], color: "orange" },
                { couple: couple3._id, title: "Dream House", author: couple3.members[1]._id, items: [{ text: "Big garden" }, { text: "Open kitchen" }], color: "red" },
            ]),
            Feelings.insertMany([
                { couple: couple1._id, author: couple1.members[0]._id, emotion: "Love" },
                { couple: couple1._id, author: couple1.members[1]._id, emotion: "Happiness" },
                { couple: couple2._id, author: couple2.members[0]._id, emotion: "Excitement" },
                { couple: couple2._id, author: couple2.members[1]._id, emotion: "Contentment" },
                { couple: couple3._id, author: couple3.members[0]._id, emotion: "Gratitude" },
                { couple: couple3._id, author: couple3.members[1]._id, emotion: "Affection" }
            ])
        ])
    })
    .then(() => {
        console.log('populate.js executed')
    })
    .finally(() => data.disconnect())
