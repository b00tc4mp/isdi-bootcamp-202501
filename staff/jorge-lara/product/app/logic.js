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

        const found = data.users.findOne(user = user.email === email || user.username === username);

        if (found) {
            throw new Error('user already exists');
        }

        const user = {
            name: name,
            email: email,
            username: username,
            password: password,
            createdAt: new Date(),
            modifiedAt: null
        }

        data.users.insertOne(user)
    },

    loginUser(username, password) {
        this.validate.username(username, 'username');
        this.validate.password(password, 'password');

        const found = data.users.findOne(user => user.username === username);

        if (!found || found.password !== password) {
            throw new Error('Wrong credentials');
        }

        data.userId = found.id;
    },

    logoutUser() {
        data.userId = null;
    },

    getLoggedUser() {
        const users = data.users.getAll();

        const { userId } = data;

        const found = data.users.getById(userId);

        if (!found) {
            throw new Error('user not found');
        }

        return found.name
    },

    isUserLoggedIn() {
        return !!data.userId;
    },

    getPosts() {
        const posts = data.posts.getAll();

        const { userId } = data;

        const addedPosts = [];

        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];

            let liked = false;

            for (let i = 0; i < post.likes.length && !liked; i++) {
                const id = post.likes[i];

                if (id === userId) {
                    liked = true;
                }
            }

            const user = data.users.getById(post.author);

            const addedPost = {
                id: post.id,
                author: { id: post.author, username: user.username },
                image: post.image,
                text: post.text,
                createdAt: new Date(post.createdAt),
                modifiedAt: post.modifiedAt,
                liked: liked,
                likesCount: post.likes.length
            }

            addedPosts.push(addedPost);
        }

        return addedPosts.reverse();
    },

    addPost(text, image) {
        this.validate.text(text, 'title');
        this.validate.url(image, 'url');

        const { userId } = data;

        let post = {
            author: userId,
            image: image,
            text: text,
            createdAt: new Date(),
            modifiedAt: null,
            likes: []
        }

        data.posts.insertOne(post);
    },

    toggleLikePost(postId) {
        const { userId } = data;

        const foundPost = data.posts.findOne(post => post.id === postId);

        if (!foundPost) {
            throw new Error("post not found");
        }

        let userIdFound = false;

        for (let i = 0; i < foundPost.likes.length && !userIdFound; i++) {
            const id = foundPost.likes[i];

            if (id === userId) {
                userIdFound = true
            }
        }


        if (!userIdFound) {
            foundPost.likes.push(userId);
        } else {
            const likes = [];

            for (let i = 0; i < foundPost.likes.length; i++) {
                const id = foundPost.likes[i];

                if (id !== userId) {
                    likes.push(id);
                }
            }

            foundPost.likes = likes;
        }
        data.posts.updateOne(foundPost);
    }
}