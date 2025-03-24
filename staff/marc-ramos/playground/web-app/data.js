const uuid = () => (Date.now() + Math.random()).toString(36).replace('.', '')

const users = [
    {
        id: 'm8mzaakew13',
        name: 'Marc',
        username: 'marcramos13',
        password: '123123123'
    },
    {
        id: 'm8mzaakew16',
        name: 'Arnau',
        username: 'sots16',
        password: '123123123'
    }
]

module.exports = {
    users,
    uuid
}