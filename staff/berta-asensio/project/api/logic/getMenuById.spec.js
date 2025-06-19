import 'dotenv/config'
import { data, Menu } from '../data/index.js'
import { getMenuById } from './getMenuById.js'
import { expect } from 'chai'
import { NotFoundError } from 'com/errors.js'
import { Types } from 'mongoose'

const { MONGO_URL, MONGO_DB } = process.env
const { ObjectId } = Types


describe('getMenuById', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => Menu.deleteMany({}))

    it('succeeds when returns menu by its id', () => {
    
        let returnedMenu

        return Menu.create({
            ordinal: 1,
            name: 'Jamón dulce',
            description: 'Bocadillo de jamón dulce',
            allergens: [],
            categories: ['regular'],
            breadOptions: ['gluten', 'sin gluten', 'integral'],
            price: 2.50
        })
        .then(menu => getMenuById(menu._id))
        .then(menu => returnedMenu = menu)
        .finally(() => {
            expect(returnedMenu).to.be.instanceOf(Object)
            expect(returnedMenu.name).to.be.equal('Jamón dulce')
            expect(returnedMenu.description).to.be.equal('Bocadillo de jamón dulce')
            expect(returnedMenu.allergens).to.be.instanceOf(Array)
            expect(returnedMenu.categories).to.include('regular')
            expect(returnedMenu.breadOptions).to.have.members(['gluten', 'sin gluten', 'integral'])
            expect(returnedMenu.price).to.equal(2.5)
        })
     })

    it('fails when menu id no exist', () => {
        const menuId = new ObjectId().toString()
        let catchedError

        return getMenuById(menuId)
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal(`Menu with ${menuId} id not found`)
            })
    })

    afterEach(() => Menu.deleteMany({}))

    after(() => data.disconnect())
})