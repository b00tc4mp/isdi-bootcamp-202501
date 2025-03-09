const logic = {
    toggleLikePost(postId) {
        this.validate.id(postId, 'postId')
        //paso el post Id por parametro desde loadPosts y lo busco
        const { userId } = data

        const foundPost = data.posts.findOne(post => post.id === postId)

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

        data.posts.updateOne(foundPost)
    },

    deletePost(postId) {
        this.validate.id(postId, 'postId')

        const { userId } = data

        const foundPost = data.posts.findOne(post => post.id === postId)

        if (!foundPost) throw new NotFoundError('post not found')

        if (foundPost.author !== userId) throw new OwnershipError('user is not author of post')

        data.posts.deleteOne(post => post.id === postId)
    },

    updatePostText(postId, text) {
        this.validate.id(postId, 'postId')

        const { userId } = data

        const foundPost = data.posts.findOne(post => post.id === postId)

        if (!foundPost) throw new NotFoundError('post not found')

        if (foundPost.author !== userId) throw new OwnershipError('user is not author of post')

        foundPost.text = text
        foundPost.modifiedAt = new Date

        data.posts.updateOne(foundPost)
    },

    isCurrentAuthor(author) {
        const { userId } = data

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