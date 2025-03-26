const uuid = () => (Date.now() + Math.random()).toString(36).replace('.', '')

const users = [
    {
        id: 'm8mzaakew8',
        name: 'Rocky Balboa',
        username: 'rocky1',
        password: '123123123'
    },
    {
        id: 'm8mzaake12',
        name: 'Mache Te',
        username: 'machete',
        password: '123123123'
    }
]

module.exports = {
    users,
    uuid
}
