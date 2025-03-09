const logic = {
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