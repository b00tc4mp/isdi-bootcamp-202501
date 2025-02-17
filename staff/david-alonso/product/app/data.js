// DATA
const data = {

    //  Creamos una Id de usuario aleatoria
    uuid: function () {
        return (Date.now() + Math.random()).toString(36).replace('.', '')
    },

    //  Guardamos los datos de los usuarios
    users: [
        {
            id: 'm7313t7yhcl',
            name: 'david',
            email: 'david@31.com',
            username: 'dallen',
            password: '123456789',
            createdAt: new Date(2024, 1, 23),
            modifiedAt: null
        }
    ],

    posts: [
        {
            id: 'm73e37hz47',
            userName: 'dallen',
            author: 'm7313t7yhcl',
            image: 'https://cdn2.yamaha-motor.eu/prod/product-assets/2025/YZ85LW/2025-Yamaha-YZ85LW-EU-Detail-001-03_Mobile.jpg',
            text: 'Yamaha YZ 85',
            createdAt: new Date(2024, 3, 2),
            modifiedAt: null
        },
        {
            id: 'm73e32tkajd',
            userName: 'dallen',
            author: 'm7313t7yhcl',
            image: 'https://media.giphy.com/media/XYqkVQuRsmQqMGv9I8/giphy.gif?cid=ecf05e47mw6t0p2v3m5gge35k0gdoedy6qjogid8o44f65iu&ep=v1_gifs_search&rid=giphy.gif&ct=g',
            text: 'Yamaha YZ 125',
            createdAt: new Date(2024, 9, 21),
            modifiedAt: null
        },
        {
            id: 'm73e486vqia',
            userName: 'dallen',
            author: 'm7313t7yhcl',
            image: 'https://www.motorbikemag.es/wp-content/uploads/2018/06/KTM-125-SX-2019-01-760x507.jpg',
            text: 'Ktm SX 125 R',
            createdAt: new Date(2025, 0, 18),
            modifiedAt: null
        }
    ],

    userId: null
}