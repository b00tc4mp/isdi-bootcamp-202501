const uuid = () => (Date.now() + Math.random()).toString(36).replace('.', '')

const users = [
    {
        id: 'm8mzaakew8',
        name: 'Arnau Romero',
        username: 'Arnau_Sots',
        password: '123123123'
    },
    {
        id: 'm8mzaakew9',
        name: 'Marc Gramos',
        username: 'Suricatox99',
        password: '123123123'
    }
]

module.exports = {
    users,

    uuid
}