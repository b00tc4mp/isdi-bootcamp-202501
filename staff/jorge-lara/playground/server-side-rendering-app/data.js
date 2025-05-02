const uuid = () => (Date.now() + Math.random()).toString(36).replace('.', '');

const users = [
    {
        id: 'm8mzaakew8',
        name: 'admin',
        username: 'admin',
        password: '123123123'
    },
    {
        id: 'm8mzaakew9',
        name: 'john doe',
        username: 'johndoe',
        password: '123123123'
    }
]

module.exports = {
    users,
    uuid
}