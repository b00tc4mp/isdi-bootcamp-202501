import 'dotenv/config'
import { Couple, User, DiaryEntry, CalendarEvent, List, ListItem, Emotion, InviteCode, data } from './../data/index.js'
import bcrypt from 'bcryptjs'

const { MONGO_URL, MONGO_DB } = process.env

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        return Promise.all([
            CalendarEvent.deleteMany({}),
            Couple.deleteMany({}),
            DiaryEntry.deleteMany({}),
            Emotion.deleteMany({}),
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
                { couple: couple3._id, text: "We reminisced about the first time we met and made new memories to cherish.", author: couple3.members[1]._id }
            ]),
            CalendarEvent.insertMany([
                { couple: couple1._id, title: "Anniversary Celebration", description: "Anniversary celebration at our favorite restaurant.", author: couple1.members[0]._id, eventDate: new Date('2025-05-15T19:00:00') },
                { couple: couple1._id, title: "Weekend Trip", description: "A weekend getaway to the countryside for a peaceful retreat.", author: couple1.members[1]._id, eventDate: new Date('2025-06-01T09:00:00') },
                { couple: couple2._id, title: "Birthday Surprise", description: "Special birthday plan, including a spa day and a romantic dinner.", author: couple2.members[0]._id, eventDate: new Date('2025-04-19T10:00:00') },
                { couple: couple2._id, title: "Cooking Class", description: "We will take a cooking class together to learn Italian cuisine.", author: couple2.members[1]._id, eventDate: new Date('2025-07-10T17:30:00') },
                { couple: couple3._id, title: "Anniversary Dinner", description: "Anniversary celebration with a private dinner at home.", author: couple3.members[0]._id, eventDate: new Date('2025-05-05T20:00:00') },
                { couple: couple3._id, title: "Weekend Getaway", description: "A weekend getaway to the beach.", author: couple3.members[1]._id, eventDate: new Date('2025-06-15T08:00:00') }
            ]),
            Emotion.insertMany([
                { couple: couple1._id, author: couple1.members[0]._id, emotion: 0 },
                { couple: couple1._id, author: couple1.members[1]._id, emotion: 1 },
                { couple: couple2._id, author: couple2.members[0]._id, emotion: 2 },
                { couple: couple3._id, author: couple3.members[0]._id, emotion: 4 },
                { couple: couple3._id, author: couple3.members[1]._id, emotion: 6 }
            ])
        ])
            .then(() => {
                return ListItem.insertMany([
                    { text: "Sunscreen" },
                    { text: "Camera" },
                    { text: "New furniture" },
                    { text: "Paint walls" },
                    { text: "Visit a museum" },
                    { text: "Have a picnic" },
                    { text: "Paris" },
                    { text: "Tokyo" },
                    { text: "Buy a gift" },
                    { text: "Make a special dinner" },
                    { text: "Big garden" },
                    { text: "Open kitchen" }
                ])
                    .then(listItems => {
                        return List.insertMany([
                            { couple: couple1._id, title: "Weekend Getaway Packing List", author: couple1.members[0]._id, items: [listItems[0]._id, listItems[1]._id], color: "#ff0a0a" },
                            { couple: couple1._id, title: "Home Renovation Ideas", author: couple1.members[1]._id, items: [listItems[2]._id, listItems[3]._id], color: "#43d313" },
                            { couple: couple2._id, title: "Things To Do Together", author: couple2.members[0]._id, items: [listItems[4]._id, listItems[5]._id], color: "#41dae2" },
                            { couple: couple2._id, title: "Vacation Wishlist", author: couple2.members[1]._id, items: [listItems[6]._id, listItems[7]._id], color: "#d6cd68" },
                            { couple: couple3._id, title: "Anniversary Plans", author: couple3.members[0]._id, items: [listItems[8]._id, listItems[9]._id], color: "#de6bff" },
                            { couple: couple3._id, title: "Dream House", author: couple3.members[1]._id, items: [listItems[10]._id, listItems[11]._id], color: "#ff0a0a" }
                        ])
                            .then(lists => {
                                // Asignar el id de la lista a cada ítem
                                const updates = [
                                    { _id: listItems[0]._id, list: lists[0]._id },
                                    { _id: listItems[1]._id, list: lists[0]._id },
                                    { _id: listItems[2]._id, list: lists[1]._id },
                                    { _id: listItems[3]._id, list: lists[1]._id },
                                    { _id: listItems[4]._id, list: lists[2]._id },
                                    { _id: listItems[5]._id, list: lists[2]._id },
                                    { _id: listItems[6]._id, list: lists[3]._id },
                                    { _id: listItems[7]._id, list: lists[3]._id },
                                    { _id: listItems[8]._id, list: lists[4]._id },
                                    { _id: listItems[9]._id, list: lists[4]._id },
                                    { _id: listItems[10]._id, list: lists[5]._id },
                                    { _id: listItems[11]._id, list: lists[5]._id }
                                ]

                                return Promise.all(
                                    updates.map(update =>
                                        ListItem.updateOne({ _id: update._id }, { $set: { list: update.list } })
                                    )
                                )
                            })
                    })
            })
    })
    .then(() => {
        console.log('populate.js ejecutado');
    })
    .finally(() => data.disconnect());
