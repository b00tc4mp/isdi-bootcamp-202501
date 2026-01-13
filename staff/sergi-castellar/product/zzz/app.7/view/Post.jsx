function Post({post, reloadPosts}) {
    const { id: currentPostId, authorId: currentPostAuthorId, imageSrc: currentPostImageSrc, textDescription: currentPostTextDescription, createdAt: currentPostCreatedAt, modifiedAt: currentPostModifiedAt, likes: currentPostLikes, liked: isCurrentPostLiked } = post
    
    const likesToString = likes => {
        if (likes.length === 0) {
            return ''
        } else if (likes.length < 3) {
            return `${likes.join(' and ')} liked that.`
        } else {
            const firstLike = likes[0]
            const secondLike = likes[1]
            const restLikes = likes.length - 2

            return `${firstLike}, ${secondLike} and ${restLikes} more people liked that.`
        }
    }

    const handleToggleLikePostClick = (currentPostId) => {
        try {
            logic.toggleLike(currentPostId)

            reloadPosts()
        } catch (error) {
            logic.helper.handleError
        }
    }

    let authorName = ''
    let authorUsername = ''
    let likesString = ''
        try {
            authorName = logic.getUserProperty(currentPostAuthorId, 'name')
            authorUsername = logic.getUserProperty(currentPostAuthorId, 'username')

            const likesUsernames = logic.getLikesUsernames(currentPostLikes)
            likesString = likesToString(likesUsernames)
        } catch (error) {
            logic.helper.handleError(error)
        }

    return <article>
        <header>
            <h2>{authorName}</h2>
        </header>
        <figure>
            <img src={currentPostImageSrc}/>
        </figure>
        <section>
            <section>
                <button onClick={() => handleToggleLikePostClick(currentPostId)}>{currentPostLikes.length} {isCurrentPostLiked ? '❤️' : '🤍'}</button>
            </section>
            <section>
                <p>{likesString}</p>
            </section>
            <section>
                <p>{authorUsername}</p>
                <p>{currentPostTextDescription}</p>
            </section>
        </section>
    </article>
}