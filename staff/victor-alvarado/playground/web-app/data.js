const uuid = () => (Date.now() + Math.random()).toString(36).replace('.', '')

const users = [
    {
        id: 'm8mzaakew8',
        name: 'iron man',
        username: 'ironMan',
        password: '123123123'
    },
    {
        id: 'm8mzaakew9',
        name: 'spiderMan',
        username: 'spiderMan',
        password: '123123123'
    }
]

module.exports = {
    users,

    uuid
}