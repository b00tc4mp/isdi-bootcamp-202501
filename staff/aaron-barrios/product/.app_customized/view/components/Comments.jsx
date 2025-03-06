const { useState, useEffect } = React

import Comment from './Comment.jsx'

import logic from '../../logic.js'

function Comments() {
    const [comments, setComments] = useState([])

    useEffect(() => {

    }, [])

    return <section>
        {comments.map(comment => <Comment />)}
    </section>
}

export default Comments