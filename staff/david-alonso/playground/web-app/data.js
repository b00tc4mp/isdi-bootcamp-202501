const uuid = () => (Date.now() + Math.random()).toString(36).replace('.', '')

const users = [
    {
        id: 'm8nqdto0poj',
        name: 'David',
        username: 'dallen',
        password: '123123123'
    },
    {
        id: 'm8nqe9te72',
        name: 'Luna',
        username: 'lunita',
        password: '123123123'
    }
]

module.exports = {
    users,

    uuid
}