const uuid = () => (Date.now() + Math.random()).toString(36).replace('.', '')

const users = [
    {
        id: 'm8mzaakew8',
        name: 'Peter Pan',
        username: 'peterpan',
        password: '123123123'
    },
    {
        id: 'm8mzaakew9',
        name: 'Wendy Darling',
        username: 'wendydarling',
        password: '123123123'
    }
]

module.exports = {
    users,

    uuid
}