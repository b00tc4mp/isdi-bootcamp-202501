import 'dotenv/config'
import { data, Post } from '../data/index.js'
import { createPost } from './createPost.js'
import { expect } from 'chai'
import { DuplicityError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('createPost', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => Posts.deleteMany({}))

    it('succeeds on new post', () => {
        let result2
        
        return createPost('67ea41a6f5c0a74a7605a206', 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExc254aTVqbmlobHU4YWl1aGxiMnpudGs1ZTNoeHFvZTF2OTY3dGs5aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/shkh5vfrJ56BAoeWqt/giphy.gif', 'alo alo')
            .then(result => result2 = result)
            .finally(() => expect(result2).to.be.undefined)
            .then(() => Post.findOne({ text: 'alo alo' }).lean())
            .then(post => {
                expect(post.userId).to.equal('67ea41a6f5c0a74a7605a206')
                expect(post.image).to.equal('https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExc254aTVqbmlobHU4YWl1aGxiMnpudGs1ZTNoeHFvZTF2OTY3dGs5aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/shkh5vfrJ56BAoeWqt/giphy.gif')
                expect(post.text).to.equal('alo alo')
            })
            .then(match => expect(match).to.be.true)
    })

    it('fails on existing post', () => {
        let catchedError

        return Post.create({
            userName
        })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})