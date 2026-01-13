import logic from '../logic.js'

function Post({post, reloadPosts}) {
    const { id: currentPostId, author: currentPostAuthor, imageSrc: currentPostImageSrc, textDescription: currentPostTextDescription, createdAt: currentPostCreatedAt, modifiedAt: currentPostModifiedAt, likes: currentPostLikes, liked: isCurrentPostLiked} = post
    
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
    
    const dateToFormat = postDate => {
        const date = new Date(postDate)
        
        const options = {
            day: 'numeric',
            month: 'short',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false
        }
        
        const formatedDate = date.toLocaleString('en-EN', options)

        // const [calendar, time] = formatedDate.split(', ')
        // const [ month, day ] = calendar.split(' ')
        // const [ hours, minutes ] = time.split(':')

        // return `${day} ${month}, ${hours}:${minutes}`
        return formatedDate
    }

    const handleToggleLikePostClick = (currentPostId) => {
        try {
            logic.toggleLike(currentPostId)

            reloadPosts()
        } catch (error) {
            logic.helper.handleError
        }
    }

    const { name: authorName, username: authorUsername } = currentPostAuthor

    let likesString = ''
    let formattedDate = ''
        try {
            const likesUsernames = logic.getLikesUsernames(currentPostLikes)
            likesString = likesToString(likesUsernames)

            formattedDate = dateToFormat(currentPostCreatedAt)
        } catch (error) {
            logic.helper.handleError(error)
        }

    return <article>
            <h2>{authorName}</h2>
        <figure>
            <img src={currentPostImageSrc} style={{ width: '100%', maxWidth: '300px', height: 'auto', objectFit: 'cover' }}/>
        </figure>
        <section>
            <section className="like-date">
                <button onClick={() => handleToggleLikePostClick(currentPostId)}>{currentPostLikes.length} {isCurrentPostLiked ? '❤️' : '🤍'}</button>
                <span>{formattedDate}</span>
            </section>
            <section>
                <p>{likesString}</p>
            </section>
            <section>
                <p>
                    <span className="post-username" style={{fontWeight: 'bold'}}>{authorUsername}</span>
                    {': '}
                    <span className="post-description">{currentPostTextDescription}</span>
                </p>
            </section>
        </section>
    </article>
}

export default Post