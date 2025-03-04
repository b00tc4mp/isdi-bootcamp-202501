class Collection {
    constructor(name) {
        this.name = name;
    }

    getAll() {
        const collection = JSON.parse(localStorage[this.name] || '[]');

        return collection;
    }

    setAll() {
        const collection = JSON.stringify(collection);

        localStorage[this.name] = json;
    }

    getById(id) {
        const collection = JSON.parse(localStorage[this.name] || '[]');

        const document = collection.find(document => document.id === id) || null;

        return document
    }

    insertOne(document) {
        const collection = JSON.parse(localStorage[this.name] || '[]');

        document.id = data.uuid();

        collection.push(document);

        const json = JSON.stringify(collection);

        localStorage[this.name] = json;
    }

    findOne(condition) {
        const collection = JSON.parse(localStorage[this.name] || '[]');

        for (let i = 0; i < collection.length; i++) {
            const document = collection[i];

            const matches = condition(document);

            if (matches) {
                return document;
            }
        }

        return null;
    }

    updateOne(document) {
        const collection = JSON.parse(localStorage[this.name] || '[]');

        const index = collection.findIndex(doc => doc.id === document.id);

        collection[index] = document;

        const json = JSON.stringify(collection);

        localStorage[this.name] = json;
    }
}
const data = {
    uuid() {
        //return crypto.randomUUID()
        return (Math.random() * 10 ** 17).toString(36);
    },
    users: new Collection('users'),
    posts: new Collection('posts'),

    get userId() {
        const id = JSON.parse(sessionStorage.userId || 'null');

        return id;
    },

    set userId(id) {
        const json = JSON.stringify(id);

        sessionStorage.userId = json
    },

    // get users() {
    //     const users = JSON.parse(localStorage.users || '[]')

    //     return users;
    // },

    // set users(users) {
    //     const json = JSON.stringify(users)

    //     localStorage.users = json
    // },


    // get posts() {
    //     const posts = JSON.parse(localStorage.posts || '[]');

    //     return posts;
    // },

    // set posts(posts) {
    //     const json = JSON.stringify(posts);

    //     localStorage.posts = json;
    // }
}