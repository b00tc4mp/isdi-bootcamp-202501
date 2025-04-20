import 'dotenv/config'
import { data, User, Recipe } from '../data/index.js'
import { getRecipes } from './getRecipes.js'
import { NotFoundError, ValidationError } from 'com/errors.js'
import { expect } from 'chai'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { Types } from 'mongoose'

chai.use(chaiAsPromised)

const { MONGO_URL, MONGO_DB } = process.env
const { ObjectId } = Types

describe('getRecipes', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => Promise.all([User.deleteMany({}), Recipe.deleteMany({})]))

    it('succeeds on existing user', () => {
        let returnedRecipes
        let user, user2
        let recipe, recipe2

        return Promise.all([
            User.create({
                name: 'Eu Geni',
                email: 'eu@geni.com',
                username: 'eugeni',
                password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
            }),
            User.create({
                name: 'Ar Nau',
                email: 'ar@nau.com',
                username: 'arnau',
                password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
            })
        ])
            .then(([_user, _user2]) => {
                user = _user
                user2 = _user2
            })
            .then(() => Promise.all([
                Recipe.create({
                    author: user.id,
                    title: 'Tortilla',
                    description: 'Deliciosa tortilla española',
                    cookingTime: 30,
                    image: 'https://example.com/tortilla.jpg', // Añadir campo image
                    likes: [user2.id],
                    createdAt: new Date(2025, 1, 10)
                }),
                Recipe.create({
                    author: user2.id,
                    title: 'Gazpacho',
                    description: 'Fresco y sano',
                    cookingTime: 10,
                    image: 'https://example.com/gazpacho.jpg', // Añadir campo image
                    likes: [user.id, user2.id],
                    createdAt: new Date(2025, 1, 11),
                    modifiedAt: new Date(2025, 1, 12)
                })
            ]))
            .then(([_recipe, _recipe2]) => {
                recipe = _recipe
                recipe2 = _recipe2
            })
            .then(() => getRecipes(user.id))
            .then(recipes => returnedRecipes = recipes)
            .finally(() => {
                expect(returnedRecipes).to.be.instanceOf(Array)
                expect(returnedRecipes).to.have.lengthOf(2)

                let returnedRecipe = returnedRecipes[0]
                expect(returnedRecipe.author.id).to.equal(user2.id)
                expect(returnedRecipe.author.username).to.equal(user2.username)
                expect(returnedRecipe.title).to.equal(recipe2.title)
                expect(returnedRecipe.description).to.equal(recipe2.description)
                expect(returnedRecipe.cookingTime).to.equal(recipe2.cookingTime)
                expect(returnedRecipe.createdAt).to.deep.equal(recipe2.createdAt)
                expect(returnedRecipe.modifiedAt).to.deep.equal(recipe2.modifiedAt)
                expect(returnedRecipe.image).to.equal('https://example.com/gazpacho.jpg') // Verifica el campo image
                expect(returnedRecipe.own).to.be.false
                expect(returnedRecipe.liked).to.be.true
                expect(returnedRecipe.likesCount).to.equal(2)

                returnedRecipe = returnedRecipes[1]
                expect(returnedRecipe.author.id).to.equal(user.id)
                expect(returnedRecipe.author.username).to.equal(user.username)
                expect(returnedRecipe.title).to.equal(recipe.title)
                expect(returnedRecipe.description).to.equal(recipe.description)
                expect(returnedRecipe.cookingTime).to.equal(recipe.cookingTime)
                expect(returnedRecipe.createdAt).to.deep.equal(recipe.createdAt)
                expect(returnedRecipe.modifiedAt).to.be.null
                expect(returnedRecipe.image).to.equal('https://example.com/tortilla.jpg') // Verifica el campo image
                expect(returnedRecipe.own).to.be.true
                expect(returnedRecipe.liked).to.be.false
                expect(returnedRecipe.likesCount).to.equal(1)
            })
    })

    it('fails on non-existing user', () => {
        return expect(getRecipes(new ObjectId().toString())).to.be.rejectedWith(NotFoundError, 'user not found')
    })

    it('fails on invalid user id', () => {
        expect(() => getRecipes(123)).to.throw(ValidationError, 'invalid userId type')
        expect(() => getRecipes('123')).to.throw(ValidationError, 'invalid userId length')
        expect(() => getRecipes(' '.repeat(24))).to.throw(ValidationError, 'invalid userId syntax')
    })

    afterEach(() => Promise.all([User.deleteMany({}), Recipe.deleteMany({})]))

    after(() => data.disconnect())
})
