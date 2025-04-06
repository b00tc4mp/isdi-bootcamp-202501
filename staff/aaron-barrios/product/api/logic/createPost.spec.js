import 'dotenv/config'
import { data, User, Post } from '../data/index.js'
import { createPost } from './createPost.js'
import { expect } from 'chai'
import { NotFoundError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('createPost', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => Post.deleteMany({}))

    // debugger
    it('succeds on createPost', () => {
        return createPost('67eac3e1cb202d76cec69964', 'https://media.giphy.com/media/tqj4m9BRURayxQAIW9/giphy.gif?cid=790b7611hqe6rpquy1lo6acfy5cbmnkfaqmu4pn7mc77m2py&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'monday mood')
            .then(() => Post.find({ author: '67eaaf5f4e0ec2a2d5693373' }).lean())
            .then(post => {
                expect(post).not.to.be.undefined
                expect(post[0].text).to.equal('monday mood')
            })
    })

    it('fails on existingUser', () => {
        // debugger
        let catchedError

        return createPost('67eaaf5f4e0ec2a2d569336d', 'https://media.giphy.com/media/tqj4m9BRURayxQAIW9/giphy.gif?cid=790b7611hqe6rpquy1lo6acfy5cbmnkfaqmu4pn7mc77m2py&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'monday mood')
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('User not found!')
            })
    })

    afterEach(() => Post.deleteMany({}))

    after(() => data.disconnect())
})