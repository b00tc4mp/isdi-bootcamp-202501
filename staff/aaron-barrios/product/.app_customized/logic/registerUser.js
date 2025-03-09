const logic = {
    registerUser(name, email, username, password) {
        this.validate.text(name, 'name')
        this.validate.minLength(name, 1, 'name')
        this.validate.maxLength(name, 20, 'name')
        this.validate.email(email, 'email')
        this.validate.username(username, 'username')
        this.validate.password(password, 'password')

        const found = index.users.findOne(
            user => user.email === email ||
                user.username === username)

        if (found) throw new DuplicityError('User already exists')

        const user = {
            name: name,
            email: email,
            username: username,
            password: password,
            createdAt: new Date(),
            role: username === 'god' ? 'admin' : 'user', //TEST -> ROLE
            state: null,  // TEST -> status
            modifiedAt: null,
        }

        index.users.insertOne(user)
    },

    loginUser(username, password) {
        this.validate.username(username, 'name')
        this.validate.password(password, 'password')

        const found = index.users.findOne(user => user.username === username)

        if (!found || found.password !== password) throw new CredentialsError('Wrong credentials')

        index.currentUser = found
        // found.state = 'Online'

        index.userId = found.id
    },

    isUserLoggedIn() {
        return !!index.userId
    },

    //TEST -> ONLINE USER
    getCurrentUser() {
        var foundUser = index.users.find(user => user.state === 'Online')

        if (!foundUser)
            throw new Error('Any user online')
        else
            return foundUser
    },

    getUsername() {
        const users = index.users.getAll()

        const { userId } = index

        const found = index.users.getById(userId)

        if (!found) throw new Error('user not found')

        return found.name
    },

    getPosts() {
        const posts = index.posts.getAll()

        const { userId } = index

        const aggregatedPosts = []

        for (let i = 0; i < posts.length; i++) {
            const post = posts[i]

            let liked = false

            for (let i = 0; i < post.likes.length && !liked; i++) {
                const id = post.likes[i]

                if (id === userId)
                    liked = true
            }

            const user = index.users.getById(post.author)

            const aggregatedPost = {
                id: post.id,
                author: { id: post.author, username: user.username },
                image: post.image,
                text: post.text,
                createdAt: new Date(post.createdAt),
                modifiedAt: post.modifiedAt && new Date(post.modifiedAt),
                liked: liked,
                likesCount: post.likes.length,
                own: post.author === userId
            }

            aggregatedPosts[aggregatedPosts.length] = aggregatedPost
        }

        return aggregatedPosts.reverse()
    },

    createPost(image, text) {
        this.validate.url(image, 'image')
        this.validate.maxLength(1000)
        this.validate.text(text, 'text')
        this.validate.minLength(500)

        const { userId } = index

        const post = {
            author: userId,
            image: image,
            text: text,
            createdAt: new Date(),
            modifiedAt: null,
            likes: []
        }

        index.posts.insertOne(post)
    },

    logoutUser() {
        index.userId = null
        // index.currentUser.state = 'Offline'
        // index.currentUser = null
    },

    toggleLikePost(postId) {
        this.validate.id(postId, 'postId')
        //paso el post Id por parametro desde loadPosts y lo busco
        const { userId } = index

        const foundPost = index.posts.findOne(post => post.id === postId)

        if (!foundPost) throw new NotFoundError('post not found')

        let userIdFound = false

        //en este caso lo encuentro y voy a buscar el like en concreto
        for (let i = 0; i < foundPost.likes.length && !userIdFound; i++) {
            const id = foundPost.likes[i]

            if (id === userId)
                userIdFound = true
        }

        //si no encuentro el like de ese usuario le doy like 
        if (!userIdFound) {
            foundPost.likes[foundPost.likes.length] = userId
        }
        else {
            //en caso de tener like lo solapo con otro array para quitarlo
            const likes = []

            for (let i = 0; i < foundPost.likes.length; i++) {
                const id = foundPost.likes[i]

                if (id !== userId)
                    likes[likes.length] = id
            }

            foundPost.likes = likes
        }

        index.posts.updateOne(foundPost)
    },

    deletePost(postId) {
        this.validate.id(postId, 'postId')

        const { userId } = index

        const foundPost = index.posts.findOne(post => post.id === postId)

        if (!foundPost) throw new NotFoundError('post not found')

        if (foundPost.author !== userId) throw new OwnershipError('user is not author of post')

        index.posts.deleteOne(post => post.id === postId)
    },

    updatePostText(postId, text) {
        this.validate.id(postId, 'postId')

        const { userId } = index

        const foundPost = index.posts.findOne(post => post.id === postId)

        if (!foundPost) throw new NotFoundError('post not found')

        if (foundPost.author !== userId) throw new OwnershipError('user is not author of post')

        foundPost.text = text
        foundPost.modifiedAt = new Date

        index.posts.updateOne(foundPost)
    },

    isCurrentAuthor(author) {
        const { userId } = index

        if (author === userId)
            return true
        else
            return false
    },

    formatedDate(date) {
        return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
    }
}

export default logic