const data = {
    uuid(starting) {
        const array = new Uint8Array(16)
        crypto.getRandomValues(array)
        const ending = (Array.from(array).map(byte => byte.toString(16).padStart(2, '0')).join('')).toString()
        starting = starting.toString()
        const id = starting + ending
        return id
    },
    users: [
        {
            id: '0078dfd4e3168502717c19a4905d239202',
            name: 'Francesco Virgolini',
            email: 'fvirgolini@gmail.com',
            username: 'fvirgolini',
            password: 'fvirgolini'
        },
        {
            id: '000f7843c33d74d6f04752b570d676097d',
            name: 'Shrek',
            email: 'soyshrek@gmail.com',
            username: 'shrek_official',
            password: 'shrek_official'
        },
        {
            id: '00c69ff7dac4230157adf7c937d19abfeb',
            name: 'Hackerman',
            email: 'hackerman@gmail.com',
            username: 'vacktor23',
            password: 'vacktor23'
        },
        {
            id: '00ed93c753b9c65bad4180036f80eed6e6',
            name: 'Elon Musk',
            email: 'elonmusk@gmail.com',
            username: 'elon_the_best',
            password: 'elon_the_best'
        },
        {
            id: '00aab75a0a516ca368d5828fea24e14b8b',
            name: 'Sergi',
            email: 'god@gmail.com',
            username: 'god',
            password: 'godgod'
        },
        {
            id: '002bcd5fd319256b1d61b9ed07482a00c9',
            name: 'Manu Barzi',
            email: 'manu@gmail.com',
            username: 'manubarzi',
            password: 'manubarzi'
        }
    ],
    posts: [
        {
            id: '016a08a5ca989b7be1277c7fc7b1a21cbe',
            authorId: '0078dfd4e3168502717c19a4905d239202',
            imageSrc: 'https://i1.sndcdn.com/artworks-000456304605-4ddqud-t500x500.jpg',
            textDescription: 'La maquina mas veloz de tutte Italie!!!',
            createdAt: new Date("2025-02-15T10:32:27Z"),
            modifiedAt: null,
            likes: ['002bcd5fd319256b1d61b9ed07482a00c9', '00aab75a0a516ca368d5828fea24e14b8b']
        },
        {
            id: '0151e85a6eff3f22ba6554fc79b5ff0851',
            authorId: '000f7843c33d74d6f04752b570d676097d',
            imageSrc: 'https://www.esdip.com/wp-content/uploads/2023/01/historia-de-la-animacion_la-saga-shrek.jpg',
            textDescription: 'Not my best pic lol',
            createdAt: new Date("2025-02-15T11:11:09Z"),
            modifiedAt: null,
            likes: []
        },
        {
            id: '0134477c78fedb4d4e55f0a8116160029f',
            authorId: '00c69ff7dac4230157adf7c937d19abfeb',
            imageSrc: 'https://s1.significados.com/foto/hacker-og.jpg?class=ogImageSquare',
            textDescription: 'Acabo de hackear esta cuenta jeje quien quiere Bitcoin baratito?',
            createdAt: new Date("2025-02-15T12:48:32Z"),
            modifiedAt: null,
            likes: []
        },
        {
            id: '013f17a87c6be2aaeaa80acfd588b0830b',
            authorId: '00ed93c753b9c65bad4180036f80eed6e6',
            imageSrc: 'https://www.lavanguardia.com/andro4all/hero/2025/02/spacex-elon-musk.webp?width=768&aspect_ratio=16:9&format=nowebp',
            textDescription: 'Considering buying this social network as well :P',
            createdAt: new Date("2025-02-15T15:19:58Z"),
            modifiedAt: null,
            likes: ['00c69ff7dac4230157adf7c937d19abfeb', '00ed93c753b9c65bad4180036f80eed6e6']
        }
    ],
    userId: null
}