
const uuid = () => (Date.now() + Math.random()).toString(36).replace('.', '')

class Collection {
    constructor(name) {
        this.name = name;
    }

    getAll() {
        const collection = JSON.parse(localStorage[this.name] || '[]');

        return collection;
    }

    setAll(collection) {
        const json = JSON.stringify(collection);

        localStorage[this.name] = json;
    }

    getById(id) {
        const collection = JSON.parse(localStorage[this.name] || '[]');

        const document = collection.find(document => document.id === id) || null;

        return document;
    }

    insertOne(document) {
        const collection = JSON.parse(localStorage[this.name] || '[]');

        document.id = uuid();

        collection.push(document);

        const json = JSON.stringify(collection);

        localStorage[this.name] = json;
    }

    findOne(condition) {
        const collection = JSON.parse(localStorage[this.name] || '[]');

        for (let i = 0; i < collection.length; i++) {
            const document = collection[i];

            const matches = condition(document);

            if (matches) return document;
        }

        return null;
    }

    updateOne(document) {
        const collection = JSON.parse(localStorage[this.name] || '[]');

        const index = collection.findIndex(doc => doc.id === document.id);

        collection[index] = document;

        const json = JSON.stringify(collection);

        localStorage[this.name] = json;
    }

    deleteOne(condition) {
        const collection = JSON.parse(localStorage[this.name] || '[]');

        const index = collection.findIndex(condition);

        if (index > -1)
            collection.splice(index, 1);

        const json = JSON.stringify(collection);

        localStorage[this.name] = json;
    }
}

const data = {
    storeUsers: new Collection('storeUsers'),
    // products: new Collection('products'),

    get userId() {
        const id = JSON.parse(sessionStorage.userId || 'null')

        return id
    },
    set userId(id) {
        const json = JSON.stringify(id)

        sessionStorage.userId = json
    },
    cart: [],
    receipt: [],
    productId: null,
    productQuantity: null,
    products: [
        {
            id: 'gr-ap-1',
            name: 'Green apples "Golden", 1 kg',
            type: 'apples',
            price: 2.5,
            quantity: 10,
            image: 'https://images.squarespace-cdn.com/content/v1/5a8d04ec4c0dbfcf5f37aa83/1530549561267-EB9AZHTWDYOYMGUGKXI5/greenapple.886511184.1200x1200.jpg',
            liked: [],
            likes: []

        },
        {
            id: 're-ap-1',
            name: 'Red apples "Fuji", 1 kg',
            type: 'apples',
            price: 3.5,
            quantity: 10,
            image: 'https://www.creedfoodservice.co.uk/media/catalog/product/cache/935f6cdd49b787f7edd26d0d606f282f/a/d/ad93d0396e728217304312e50d747df4.jpg',
            liked: [],
            likes: []
        },
        {
            id: 'ca-ba-1',
            name: 'Canarian bananas, 1 kg',
            type: 'bananas',
            price: 3,
            quantity: 10,
            image: 'https://www.dia.es/product_images/42070/42070_ISO_0_ES.jpg',
            liked: [],
            likes: []
        },
    ]

}

// products: [
//     {
//         id: 'gr-ap-1',
//         name: 'Green apples "Golden", 1 kg',
//         type: 'apples',
//         price: 2.5,
//         stock: 10
//     },
//     {
//         id: 're-ap-1',
//         name: 'Red apples "Fuji", 1 kg',
//         type: 'apples',
//         price: 3.5,
//         stock: 10
//     },
//     {
//         id: 'ca-ba-1',
//         name: 'Canarian bananas, 1 kg',
//         type: 'bananas',
//         price: 3,
//         stock: 10
//     },
//     {
//         id: 'si-or-1',
//         name: 'Sicilian oranges, 1 kg',
//         type: 'oranges',
//         price: 2.5,
//         stock: 10
//     },
//     {
//         id: 'st-1',
//         name: 'Strawberries, 1 kg',
//         type: 'productNameawberries',
//         price: 7,
//         stock: 10
//     },
//     {
//         id: 'st-500',
//         name: 'Strawberries, 500 gr',
//         type: 'productNameawberries',
//         price: 4,
//         stock: 10
//     },
//     {
//         id: 'bl-300',
//         name: 'Blueberies, 300 gr',
//         type: 'blueberries',
//         price: 3,
//         stock: 10
//     },
//     {
//         id: 'ki-1',
//         name: 'Kiwi, 1kg',
//         type: 'productNameawberries',
//         price: 5,
//         stock: 10
//     },
//     {
//         id: 'po-5',
//         name: 'Potatoes, 5kg',
//         type: 'potatoes',
//         price: 5.5,
//         stock: 10
//     },
//     {
//         id: 'ca-1',
//         name: 'Carrots, 1kg',
//         type: 'carrots',
//         price: 1.5,
//         stock: 10
//     },
//     {
//         id: 'to-2',
//         name: 'Tomatoes, 2kg',
//         type: 'tomatoes',
//         price: 3.5,
//         stock: 10
//     },
//     {
//         id: 'cab-1',
//         name: 'Cabbage, 1 item',
//         type: 'cabbages',
//         price: 2,
//         stock: 10
//     },
//     {
//         id: 'egp-1',
//         name: 'Eggplants, 2 items',
//         type: 'eggplants',
//         price: 4,
//         stock: 10
//     },
//     {
//         id: 'on-3',
//         name: 'Onions, 3kg',
//         type: 'onions',
//         price: 3,
//         stock: 10
//     },
// ],
