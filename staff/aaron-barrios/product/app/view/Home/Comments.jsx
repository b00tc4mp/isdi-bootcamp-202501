import { useState, useEffect } from 'react'

import {Comment} from './Comment.jsx'


export function Comments() {
    const [comments, setComments] = useState([])

    useEffect(() => {

    }, [])

    return <section>
        {comments.map(comment => <Comment />)}
    </section>
}