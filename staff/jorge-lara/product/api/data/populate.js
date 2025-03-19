import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient('mongodb://localhost:27017');

client.connect()
    .then(() => {
        const db = client.db('test');

        const users = db.collection('users');
        const posts = db.collection('posts');

        //READ

        //Its like a findAll
        //return users.find();

        //setAll???
        //return users.find().toArray();

        //return users.findOne({ _id: new ObjectId('67db41e531f7e978d5eb92ca') });

        //INSERT

        // return posts.insertOne({
        //     author: 'p1ferh4x30w',
        //     image: 'https://preview.redd.it/i-gtg-take-a-piss-can-you-look-after-my-pet-for-a-sec-v0-8e7uecsmusde1.png?auto=webp&s=0c584ee7041bb6629e95434fbd2103f49dd8fce0',
        //     text: 'Lmao',
        //     createdAt: new Date,
        //     modifiedAt: null,
        //     likes: []
        // })


        //UPDATE

        //Add like (Use addToSet to avoid duplicates)
        //return posts.updateOne({ _id: new ObjectId('67db4fa481e1fba2ec9d543f') }, { $addToSet: { likes: { _id: new ObjectId('67db4fa481e1fba2ec9d543f') } } })

        //Remove like
        //return posts.updateOne({ _id: new ObjectId('67db4fa481e1fba2ec9d543f') }, { $pull: { likes: { _id: new ObjectId('67db4fa481e1fba2ec9d543f') } } })

        //update text 
        //return posts.updateOne({ _id: new ObjectId('67db4fa481e1fba2ec9d543f') }, { '$set': { text: 'lmaoooo', modifiedAt: new Date() } })

        //DELETE

        //return posts.deleteOne({ _id: new ObjectId('67db4a71bd54095f6ceff539') })
    })
    .then(result => {
        console.log(result)
    })
    .finally(() => client.close())