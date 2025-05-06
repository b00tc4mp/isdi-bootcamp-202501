const uuid = () => (Date.now() + Math.random()).toString(36).replace('.', '')

const users = [
    {
        id: 'm8n9wbco3e',
        name: 'Eugeni Castells',
        email: 'eugeni@castells.com',
        username: 'euginski',
        password: '123456789'
    }
]

module.exports = {
    users,
    uuid
}