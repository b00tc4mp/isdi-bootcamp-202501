var data = {
    uuid: function () {
        return (Date.now() + Math.random()).toString(36).replace('.', '')
    },
    users: [
        {
            id: 'm71tm7l3l5l',
            name: 'James Hook',
            email: 'james@hook.com',
            username: 'jameshook',
            password: '123123123',
            createdAt: new Date(2024, 0, 10),
            modifiedAt: null
        },
        {
            id: 'm71tml17ly',
            name: 'Wendy Darling',
            email: 'wendy@darling.com',
            username: 'wendydarling',
            password: '123123123',
            createdAt: new Date(2024, 5, 20),
            modifiedAt: null
        }
    ], // { name: ..., }

    posts: [
        {
            id: 'm737z98ciyt',
            author: 'm71tm7l3l5l',
            image: 'https://imgs.search.brave.com/gLe1nNepyk97sd_4fBikHFr8rWHTdPIChvqye9jikaU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNjc1/MjU4NDEyL2VzL2Zv/dG8vYm9zcXVlLWRl/LXNlY3VveWFzLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1y/NXZqRjRkSWhnVkdo/aXFUMFhmV2Z0MUVa/SFU1X1hwZnJndTky/QUk5SWFjPQ',
            text: 'Rainforest',
            createdAt: new Date(2025, 0, 1),
            modifiedAt: null
        },
        {
            id: 'm737z98ciyt',
            author: 'm71tml17ly',
            image: 'https://imgs.search.brave.com/Cnh02OiyfEeEPUHV_Tc2KU6AN48vRUngZI01EopI4XE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cmV2aXN0YW94aWdl/bm8uZXMvdXBsb2Fk/cy9zMS85Ni85Ny84/Ny8zL3J1dGFzLWNv/bi10b2RvLWVsLWVz/cGxlbmRvci1kZWwt/b3Rvbm8tZW4tbGEt/cHJvdmluY2lhLWRl/LWxlb24uanBlZw',
            text: 'River',
            createdAt: new Date(2024, 11, 13),
            modifiedAt: null
        }
    ],
    userId: null,
}