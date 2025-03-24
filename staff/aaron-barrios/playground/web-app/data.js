const uuid = () => (Date.now() + Math.random()).toString(36).replace('.', '')

const users = [
    {
        id: 'm8mzaakew8',
        name: 'John Doe',
        username: 'jojo',
        password: 'jojojo',
    },

    {
        id: 'm8mzaakew9',
        name: 'Corpu Lento',
        username: 'corpu',
        password: 'cococo',
    }
]

module.exports = {
    users,

    uuid
}