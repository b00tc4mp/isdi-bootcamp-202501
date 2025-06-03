import { MongoClient, ObjectId } from 'mongodb'
import { errors } from 'com'

const { SystemError } = errors

let client

export const data = {
    users: null,
    posts: null,

    connect(url, dbName) {
        return (client = new MongoClient(url)).connect()
            .catch(error => new SystemError(error.message))
            .then(client => {
                const db = client.db(dbName)

                data.users = db.collection('users')
                data.posts = db.collection('posts')
            })
    },

    disconnect() {
        return client.close()
    },

    ObjectId
}