import { createPost } from './createPost.js'

try {
    createPost('m7w30juebf', 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExamZ3cm4zbmlrdWY0bDljNndpc2Z4cnZuZWJuMmhjaTE2dXZ2Mmh6dyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/AQ7GWTm9iBxaU/giphy.gif', 'I love this girl')
    
    console.log(posts)
} catch (error) {
    console.error(error)
}