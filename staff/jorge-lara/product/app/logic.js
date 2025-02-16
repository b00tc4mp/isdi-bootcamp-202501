const logic = {
    constant: {
        EMPTY_OR_BLANK_REGEX: /^\s*$/,
        EMAIL_REGEX: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        URL_REGEX: /(http[s]?:\/\/)?([^\/\s]+\/)(.*)/
    },

    validate: {
        string(string, explain) {
            if (typeof string !== 'string') {
                throw new TypeError(`invalid ${explain} type`);
            }
        },
        text(text, explain) {
            this.string(text, explain);
            if (logic.constant.EMPTY_OR_BLANK_REGEX.test(text)) {
                throw new SyntaxError(`invalid ${explain} syntax`);
            }
        },
        email(email, explain) {
            this.string(email, explain);
            if (!logic.constant.EMAIL_REGEX.test(email)) {
                throw new SyntaxError(`invalid ${explain} syntax`);
            }
            this.maxLength(email, 30, explain);
        },
        maxLength(value, maxLength, explain) {
            if (value.length > maxLength) {
                throw new RangeError(`invalid ${explain} maxLength`);
            }
        },
        minLength(value, minLength, explain) {
            if (value.length < minLength) {
                throw new RangeError(`invalid ${explain} minLength`);
            }
        },
        username(username, explain) {
            this.text(username, explain);
            this.minLength(username, 3, explain);
            this.maxLength(username, 20, explain);
        },
        password(password, explain) {
            this.text(password, explain);
            this.minLength(password, 8, explain);
            this.maxLength(password, 20, explain);
        },
        url(url, explain) {
            this.string(url, explain);
            if (!logic.constant.URL_REGEX.test(url)) {
                throw new SyntaxError(`invalid ${explain} syntax`);
            }
        }
    },

    registerUser(name, email, username, password) {
        this.validate.text(name, 'name');
        this.validate.maxLength(name, 20, 'name');
        this.validate.email(email, 'email');
        this.validate.username(username, 'username');
        this.validate.password(password, 'password');

        let found;

        for (const user of data.users) {
            if (user.email === email || user.username === username) {
                found = user;
            }
        }

        if (found) {
            throw new Error('user already exists');
        }

        const user = {
            id: data.uuid(),
            name: name,
            email: email,
            username: username,
            password: password,
            createdAt: new Date(),
            modifiedAt: null
        }

        data.users[data.users.length] = user;
    },

    loginUser(username, password) {
        this.validate.username(username, 'username');
        this.validate.password(password, 'password');

        let found;

        for (const user of data.users) {
            if (user.username === username) {
                found = user;
            }
        }

        if (!found || found.password !== password) {
            throw new Error('Wrong credentials');
        }

        data.userId = found.id;
        data.userlogged = found.username;
    },

    logoutUser() {
        data.userId = null;
        data.userlogged = null;
    },

    getLoggedUser() {
        return data.userlogged;
    },

    getPosts() {
        return data.posts;
    },

    addPost(text, image) {
        this.validate.text(text, 'title');
        this.validate.url(image, 'url');

        let post = {
            id: data.uuid(),
            author: data.userlogged,
            image: image,
            text: text,
            createdAt: new Date(),
            modifiedAt: null
        }

        data.posts[data.posts.length] = post;
    }
}