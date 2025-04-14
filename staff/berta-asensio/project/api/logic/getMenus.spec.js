import 'dotenv/config'
import { data, Menu } from '../data/index.js'
import { getMenus } from './getMenus.js'
import { expect } from 'chai'
import { NotFoundError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('getMenus', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => Menu.deleteMany({}))

    it ('succeeds in returning menus', () => {
        let returnedMenus

        return Promise.all([
            Menu.create({
                    ordinal: 7,
                    name: 'Vegetal con frutos secos',
                    description: 'Bocadillo de verdura con queso y nueces',
                    allergens: ['lactosa', 'frutos de cáscara'],
                    categories: ['regular', 'vegetariano', 'halal'],
                    breadOptions: ['gluten', 'sin gluten', 'integral'],
                    price: 2.5
                }),
                Menu.create({
                    ordinal: 8,
                    name: 'Vegetal con aguacate',
                    description: 'Bocadillo de aguacate, tomate y limón',
                    allergens: [],
                    categories: ['regular', 'vegetariano', 'halal'],
                    breadOptions: ['gluten', 'sin gluten', 'integral'],
                    price: 2.5
                })
            ])
            .then(() => getMenus())
            .then(menus => returnedMenus = menus)
            .finally(() => {
                expect(returnedMenus).to.be.instanceOf(Array)
                expect(returnedMenus).to.have.lengthOf(2)

                let returnedMenu = returnedMenus[0]
                expect(returnedMenu.name).to.equal('Vegetal con frutos secos')
                expect(returnedMenu.description).to.equal('Bocadillo de verdura con queso y nueces')
                expect(returnedMenu.allergens).to.have.members(['lactosa', 'frutos de cáscara'])
                expect(returnedMenu.categories).to.have.members(['regular', 'vegetariano', 'halal'])
                expect(returnedMenu.breadOptions).to.have.members(['gluten', 'sin gluten', 'integral'])
                expect(returnedMenu.price).to.equal(2.5)

                returnedMenu = returnedMenus[1]
                expect(returnedMenu.name).to.equal('Vegetal con aguacate')
                expect(returnedMenu.description).to.equal('Bocadillo de aguacate, tomate y limón')
                expect(returnedMenu.allergens).to.have.members([])
                expect(returnedMenu.categories).to.have.members(['regular', 'vegetariano', 'halal'])
                expect(returnedMenu.breadOptions).to.have.members(['gluten', 'sin gluten', 'integral'])
                expect(returnedMenu.price).to.equal(2.5)
            })
    })

    it('fails when no menus exist', () => {
        let catchedError

        return getMenus()
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.be.equal('menus not found')
            })
    })

    afterEach(() => Menu.deleteMany({}))

    after(() => data.disconnect())

})
        