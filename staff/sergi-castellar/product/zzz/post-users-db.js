const db = {
    users: [
        {
            id: '0078dfd4e3168502717c19a4905d239202',
            name: 'Masha Stepanova',
            email: 'masha@gmail.com',
            username: 'masha',
            password: '123456'
        },
        {
            id: '000f7843c33d74d6f04752b570d676097d',
            name: 'Aaron Barrios',
            email: 'aaron@gmail.com',
            username: 'aaron',
            password: '123456'
        },
        {
            id: '00c69ff7dac4230157adf7c937d19abfeb',
            name: 'Victor Alvarado',
            email: 'victor@gmail.com',
            username: 'victor',
            password: '123456'
        },
        {
            id: '00ed93c753b9c65bad4180036f80eed6e6',
            name: 'Camila Torrent',
            email: 'camila@gmail.com',
            username: 'camila',
            password: '123456'
        },
        {
            id: '00aab75a0a516ca368d5828fea24e14b8b',
            name: 'Sergi',
            email: 'sergi@gmail.com',
            username: 'sergi',
            password: '123456'
        },
        {
            id: '002bcd5fd319256b1d61b9ed07482a00c9',
            name: 'Manu Barzi',
            email: 'manu@gmail.com',
            username: 'manu',
            password: '123456'
        },
        {
            id: '00b24894e4b666fdd6f5cecf5373e7935a',
            name: 'Frank Pereira',
            email: 'frank@gmail.com',
            username: 'frank',
            password: '123456'
        }
    ],

    /*
[
    {
        name: "Masha Stepanova",
        email: "masha@gmail.com",
        username: "masha",
        password: "123456",
        createdAt: "2025-01-07T13:43:16.443666",
        modifiedAt: null
    },
    {
        name: "Aaron Barrios",
        email: "aaron@gmail.com",
        username: "aaron",
        password: "123456",
        createdAt: "2025-01-17T03:45:25.155150",
        modifiedAt: null
    },
    {
        name: "Victor Alvarado",
        email: "victor@gmail.com",
        username: "victor",
        password: "123456",
        createdAt: "2025-01-20T03:27:55.422538",
        modifiedAt: null
    },
    {
        name: "Camila Torrent",
        email: "camila@gmail.com",
        username: "camila",
        password: "123456",
        createdAt: "2025-01-19T00:19:08.487973",
        modifiedAt: null
    },
    {
        name: "Sergi",
        email: "sergi@gmail.com",
        username: "sergi",
        password: "123456",
        createdAt: "2025-01-14T11:06:38.344148",
        modifiedAt: null
    },
    {
        name: "Manu Barzi",
        email: "manu@gmail.com",
        username: "manu",
        password: "123456",
        createdAt: "2025-01-05T14:13:03.582546",
        modifiedAt: null
    },
    {
        name: "Frank Pereira",
        email: "frank@gmail.com",
        username: "frank",
        password: "123456",
        createdAt: "2025-01-05T23:16:40.510628",
        modifiedAt: null
    }
]
*/

    posts: [
        {
            id: '016a08a5ca989b7be1277c7fc7b1a21cbe',
            authorId: '0078dfd4e3168502717c19a4905d239202',
            imageSrc: 'https://i.ibb.co/Mxctt2nG/masha.png',
            textDescription: 'Se van a enterar, tengo un regalito preparado',
            createdAt: new Date("2025-02-25T10:32:27Z"),
            modifiedAt: null,
            likes: []
        },
        {
            id: '0151e85a6eff3f22ba6554fc79b5ff0851',
            authorId: '000f7843c33d74d6f04752b570d676097d',
            imageSrc: 'https://i.ibb.co/xK9rvJF2/aaron.png',
            textDescription: 'Siendo el mas sexy',
            createdAt: new Date("2025-02-26T21:11:09Z"),
            modifiedAt: null,
            likes: ['000f7843c33d74d6f04752b570d676097d']
        },
        {
            id: '0134477c78fedb4d4e55f0a8116160029f',
            authorId: '00c69ff7dac4230157adf7c937d19abfeb',
            imageSrc: 'https://i.ibb.co/9kGvPg4C/victor.png',
            textDescription: 'Menuda tarta de queso me ha salido chavales',
            createdAt: new Date("2025-02-27T10:48:32Z"),
            modifiedAt: null,
            likes: ['000f7843c33d74d6f04752b570d676097d', '0078dfd4e3168502717c19a4905d239202', '00b24894e4b666fdd6f5cecf5373e7935a', '00aab75a0a516ca368d5828fea24e14b8b']
        },
        {
            id: '013f17a87c6be2aaeaa80acfd588b0830b',
            authorId: '00ed93c753b9c65bad4180036f80eed6e6',
            imageSrc: 'https://i.ibb.co/hxjTYPyJ/camila.png',
            textDescription: 'Increible como come esta gente, me van a arruinar',
            createdAt: new Date("2025-02-28T14:19:58Z"),
            modifiedAt: null,
            likes: ['00aab75a0a516ca368d5828fea24e14b8b']
        },
        {
            id: '01d6d86865afa34e529eb9cea55a27f0f1',
            authorId: '002bcd5fd319256b1d61b9ed07482a00c9',
            imageSrc: 'https://i.ibb.co/21W8fR6Q/manu.png',
            textDescription: 'Hoy no se programa papissss',
            createdAt: new Date("2025-03-01T15:19:58Z"),
            modifiedAt: null,
            likes: ['00ed93c753b9c65bad4180036f80eed6e6', '00b24894e4b666fdd6f5cecf5373e7935a']
        },
        {
            id: '01c8408d07ad7cd867a189d0a17dddea87',
            authorId: '00b24894e4b666fdd6f5cecf5373e7935a',
            imageSrc: 'https://i.ibb.co/v4RTvBdq/frank.png',
            textDescription: 'Eldiavlo menuda bellesa',
            createdAt: new Date("2025-03-03T15:19:58Z"),
            modifiedAt: null,
            likes: ['002bcd5fd319256b1d61b9ed07482a00c9', '00ed93c753b9c65bad4180036f80eed6e6']
        }
    ]
}


/*
[
    {
        authorId: "0078dfd4e3168502717c19a4905d239202",
        imageSrc: "https://i.ibb.co/Mxctt2nG/masha.png",
        textDescription: "Se van a enterar, tengo un regalito preparado",
        createdAt: "2025-02-25T10:32:27.000Z",
        modifiedAt: null,
        likes: []
    },
    {
        authorId: "000f7843c33d74d6f04752b570d676097d",
        imageSrc: "https://i.ibb.co/xK9rvJF2/aaron.png",
        textDescription: "Siendo el mas sexy",
        createdAt: "2025-02-26T21:11:09.000Z",
        modifiedAt: null,
        likes: []
    },
    {
        authorId: "00c69ff7dac4230157adf7c937d19abfeb",
        imageSrc: "https://i.ibb.co/9kGvPg4C/victor.png",
        textDescription: "Menuda tarta de queso me ha salido chavales",
        createdAt: "2025-02-27T10:48:32.000Z",
        modifiedAt: null,
        likes: []
    },
    {
        authorId: "00ed93c753b9c65bad4180036f80eed6e6",
        imageSrc: "https://i.ibb.co/hxjTYPyJ/camila.png",
        textDescription: "Increible como come esta gente, me van a arruinar",
        createdAt: "2025-02-28T14:19:58.000Z",
        modifiedAt: null,
        likes: []
    },
    {
        authorId: "002bcd5fd319256b1d61b9ed07482a00c9",
        imageSrc: "https://i.ibb.co/21W8fR6Q/manu.png",
        textDescription: "Hoy no se programa papissss",
        createdAt: "2025-03-01T15:19:58.000Z",
        modifiedAt: null,
        likes: []
    },
    {
        authorId: "00b24894e4b666fdd6f5cecf5373e7935a",
        imageSrc: "https://i.ibb.co/v4RTvBdq/frank.png",
        textDescription: "Eldiavlo menuda bellesa",
        createdAt: "2025-03-03T15:19:58.000Z",
        modifiedAt: null,
        likes: [
            "002bcd5fd319256b1d61b9ed07482a00c9",
            "00ed93c753b9c65bad4180036f80eed6e6",
            "00aab75a0a516ca368d5828fea24e14b8b"
        ]
    }
]
*/