import 'dotenv/config'
import { data, Post, User } from '../data/index.js'
import { getPosts } from './getPosts.js'
import { NotFoundError, ValidationError } from 'com/errors.js'
import { expect } from 'chai'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { Types } from 'mongoose'

chai.use(chaiAsPromised)

const { MONGO_URL, MONGO_DB} = process.env 
const { ObjectId } = Types 

describe('getPosts', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB)) // Conectar a la base de datos antes de correr los tests

    beforeEach(() => Promise.all([User.deleteMany({}), Post.deleteMany({})]))

    it('succeeds on existing user', () => {
        let returnedPosts
        let user, user2
        let post, post2

        return Promise.all([
            User.create({
                name: 'Marc',
                email: 'marc@ramos.com',
                username: 'marcramos',
                password: '$2b$10$bGTSeuXIQHOsJK52g9XFQ.FKzDHhThDcxNaePpyceIjQGReFmylnG'
            }),
            User.create({
                name: 'Arnau',
                email: 'arnau@sots.com',
                username: 'sots',
                password: '$2b$10$bGTSeuXIQHOsJK52g9XFQ.FKzDHhThDcxNaePpyceIjQGReFmylnO'
            })
        ])

            .then(([_user, _user2]) => {
                user = _user
                user2 = _user2
            })
            .then(() => Promise.all([
                Post.create({ author: user.id, image: 'http://im'})
            ]))

    })
})