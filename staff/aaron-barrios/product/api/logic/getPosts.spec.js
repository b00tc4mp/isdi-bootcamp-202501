import 'dotenv/config'
import {data, User, Post} from '../data/index.js'
import {getPosts} from './getPosts.js'
import {expect} from 'chai'
import {NotFoundError} from 'com/errors.js'

const {MONGO_URL , MONGO_DB } = process.env

describe('getPosts', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    debugger

    beforeEach(() => {
        return Promise.all([
            User.deleteMany({}),
            Post.deleteMany({})
        ])
    })

    it.only('succeds on getPosts', () => {
        return User.insertMany([
            { name: 'Diver Tido', email: 'diver@tido.com', username: 'diver', password: 'dididi' },
            { name: 'John Doe', email: 'john@doe.com', username: 'john', password: 'jojojo' }
        ])
            .then(users => {
                return Post.insertMany([
                        { author: users[0].id, image: 'https://media.giphy.com/media/tqj4m9BRURayxQAIW9/giphy.gif?cid=790b7611hqe6rpquy1lo6acfy5cbmnkfaqmu4pn7mc77m2py&ep=v1_gifs_trending&rid=giphy.gif&ct=g', text: 'test'},
                        { author: users[1].id, image: 'https://media.giphy.com/media/tqj4m9BRURayxQAIW9/giphy.gif?cid=790b7611hqe6rpquy1lo6acfy5cbmnkfaqmu4pn7mc77m2py&ep=v1_gifs_trending&rid=giphy.gif&ct=g', text: 'test2'},
                    ])
            })
            .then(() => {
                return Post.find().populate('author', 'id').lean()
            })
            .then(posts => {
                expect(posts).not.to.be.undefined
            })
    })

    it('fails on existingUser', () => {
        // debugger
        let catchedError

        return getPosts('67eaaf5f4e0ec2a2d569336d')
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('User not found!')
            })
    })

    afterEach(() => {
        User.deleteMany({})
        Post.deleteMany({})
    })

    after(() => data.disconnect())
})