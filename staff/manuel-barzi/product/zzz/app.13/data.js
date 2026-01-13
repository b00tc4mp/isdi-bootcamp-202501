var data = {
    uuid: function () {
        return (Date.now() + Math.random()).toString(36).replace('.', '')
    },
    users: [
        { id: 'm71tm7l3l5l', name: 'James Hook', email: 'james@hook.com', username: 'jameshook', password: '123123123' },
        { id: 'm71tml17ly', name: 'Wendy Darling', email: 'wendy@darling.com', username: 'wendydarling', password: '123123123' }
    ], // { name: ..., }
    userId: null
}