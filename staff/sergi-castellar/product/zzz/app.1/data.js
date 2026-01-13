var data = {
    uuid: function (starting) {
        var array = new Uint8Array(16)
        crypto.getRandomValues(array)
        var ending = (Array.from(array).map(byte => byte.toString(16).padStart(2, '0')).join('')).toString()
        var starting = starting.toString()
        var id = starting + ending
        console.log(starting, ending, id)
        return id
    },
    users: [
        {
            id: '0078dfd4e3168502717c19a4905d239202',
            name: 'God',
            email: 'god@gmail.com',
            username: 'god',
            password: 'godgod'
        }
    ],
    posts: [
        {
            id: 'm737z98ciyt8b6611ab68e5323aeddae4897cc64cc3',
            authorId: '0078dfd4e3168502717c19a4905d239202',
            imageSrc: './assets/4.jpg',
            textDescription: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius tempore amet culpa voluptatibus alias? Mollitia iusto, optio quam libero perspiciatis qui odio minima eos at repudiandae illum, impedit repellat autem, neque temporibus. Molestias sint quo minima saepe assumenda consequatur odio!',
            createdAt: new Date(2025, 1, 8).toLocaleDateString(),
            modifiedAt: null
        },
        {
            id: 'm737z98ciyt8b6611ab68e5323aeddae4897dd64cc3',
            authorId: '0078dfd4e3168502717c19a4905d239202',
            imageSrc: './assets/3.jpg',
            textDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, cupiditate. Ipsum sint dolor dicta, voluptatibus fugiat praesentium quaerat aperiam quidem esse, omnis sit voluptates sequi tempora provident magnam officiis eius architecto blanditiis? Assumenda autem voluptate ex saepe porro eaque earum?',
            createdAt: new Date(2025, 1, 9).toLocaleDateString(),
            modifiedAt: null
        },
        {
            id: 'm737z98ciyt8b6611ab87e5323aeddae4897cc64cc3',
            authorId: '0078dfd4e3168502717c19a4905d239202',
            imageSrc: './assets/2.jpg',
            textDescription: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, iste! Voluptas temporibus incidunt quaerat! Impedit eius et ad dicta labore omnis quis. Illum deleniti repudiandae velit ducimus vel iure omnis doloremque reiciendis placeat rem sed, explicabo voluptates, minus nobis! Veritatis?',
            createdAt: new Date(2025, 1, 10).toLocaleDateString(),
            modifiedAt: null
        },
        {
            id: 'm737z98ciyt8b6611ab68e5323aeyyae4897dd64cc3',
            authorId: '0078dfd4e3168502717c19a4905d239202',
            imageSrc: './assets/1.jpg',
            textDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos rerum impedit, quae, aspernatur, veritatis debitis sed modi distinctio perspiciatis unde aperiam deserunt assumenda nostrum voluptas quas fuga iusto saepe. Deserunt cumque adipisci ab quod quae consectetur delectus impedit ad ducimus.',
            createdAt: new Date(2025, 1, 11).toLocaleDateString(),
            modifiedAt: null
        },
    ],
    userId: '78dfd4e3168502717c19a4905d239202'
}