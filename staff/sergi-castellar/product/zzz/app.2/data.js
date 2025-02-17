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
            name: 'God',
            email: 'god@gmail.com',
            username: 'god',
            password: 'godgod'
        },
        {
            id: '00aab75a0a516ca368d5828fea24e14b8b',
            name: 'God',
            email: 'god@gmail.com',
            username: 'god',
            password: 'godgod'
        }
    ],
    posts: [
        {
            id: '016a08a5ca989b7be1277c7fc7b1a21cbe',
            authorId: '0078dfd4e3168502717c19a4905d239202',
            imageSrc: './assets/4.jpg',
            textDescription: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius tempore amet culpa voluptatibus alias? Mollitia iusto, optio quam libero perspiciatis qui odio minima eos at repudiandae illum, impedit repellat autem, neque temporibus. Molestias sint quo minima saepe assumenda consequatur odio!',
            createdAt: new Date("2025-02-15T10:32:27Z"),
            modifiedAt: null,
            likes: []
        },
        {
            id: '0151e85a6eff3f22ba6554fc79b5ff0851',
            authorId: '0078dfd4e3168502717c19a4905d239202',
            imageSrc: './assets/3.jpg',
            textDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, cupiditate. Ipsum sint dolor dicta, voluptatibus fugiat praesentium quaerat aperiam quidem esse, omnis sit voluptates sequi tempora provident magnam officiis eius architecto blanditiis? Assumenda autem voluptate ex saepe porro eaque earum?',
            createdAt: new Date("2025-02-15T11:11:09Z"),
            modifiedAt: null,
            likes: []
        },
        {
            id: '0134477c78fedb4d4e55f0a8116160029f',
            authorId: '0078dfd4e3168502717c19a4905d239202',
            imageSrc: './assets/2.jpg',
            textDescription: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, iste! Voluptas temporibus incidunt quaerat! Impedit eius et ad dicta labore omnis quis. Illum deleniti repudiandae velit ducimus vel iure omnis doloremque reiciendis placeat rem sed, explicabo voluptates, minus nobis! Veritatis?',
            createdAt: new Date("2025-02-15T12:48:32Z"),
            modifiedAt: null,
            likes: []
        },
        {
            id: '013f17a87c6be2aaeaa80acfd588b0830b',
            authorId: '0078dfd4e3168502717c19a4905d239202',
            imageSrc: './assets/1.jpg',
            textDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos rerum impedit, quae, aspernatur, veritatis debitis sed modi distinctio perspiciatis unde aperiam deserunt assumenda nostrum voluptas quas fuga iusto saepe. Deserunt cumque adipisci ab quod quae consectetur delectus impedit ad ducimus.',
            createdAt: new Date("2025-02-15T15:19:58Z"),
            modifiedAt: null,
            likes: []
        }
    ],
    userId: '78dfd4e3168502717c19a4905d239202'
}