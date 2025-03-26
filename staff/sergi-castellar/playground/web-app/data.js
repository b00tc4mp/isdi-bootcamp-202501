const uuid = () => (Date.now() + Math.random()).toString(36).replace('.', '')

const users = [
    {
        id: 'm8mzaakew9',
        name: 'Sergi',
        username: 'sergi',
        password: '123456'
    },
    {
        id: 'm8nayahg7dh',
        name: 'El Diavlo',
        username: 'eldiavlo',
        password: '123456'
    }
]

module.exports = {
    uuid, users
}