var data = {
    uuid: function () {
        return (Date.now() + Math.random()).toString(36).replace('.', '')
    },
    users: [
        {
            id: 'm71tm7l3l5l',
            name: 'Marc',
            email: 'marc@ramos.com',
            username: 'marcramos',
            password: '123123123',
            createdAt: new Date(2025, 0, 10),
            modifiedAt: null
        }
    ],
    posts: [
        {
            id: 'm71tm7l3l5n',
            author: 'm71tm7l3l5l',
            image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWlhNzdnaHEzNWZ4bnIwZzdrbzh2dnJpY3NobXNjeWRsam84ZnNieiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/J0prW9PHpwgHrK92Ym/giphy.gif',
            text: 'Superbowl Kendrick',
            createdAt: new Date(2025, 0, 1),
            modifiedAt: null
        },
        {
            id: 'm71tm7l3l5a',
            author: 'm71tm7l3l5l',
            image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHhhaWRjOHJ3YmVpenZnNzBoa25nb2lrdmZhOWtlZ20zM3hheG12bSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/qQqXVTEbz6T2dZMoGF/giphy.gif',
            text: 'luka dance',
            createdAt: new Date(2025, 0, 1),
            modifiedAt: null
        }
    ],
    userId: null
}