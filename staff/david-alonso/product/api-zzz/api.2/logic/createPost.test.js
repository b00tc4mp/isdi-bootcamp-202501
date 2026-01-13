import { createPost } from './createPost.js'

try {
    createPost('m7yk28baa38', 'https://i.pinimg.com/736x/b7/fd/bc/b7fdbc14c225946a5f63ec2215c6f4b4.jpg', 'Motocross Vintage')
} catch (error) {
    console.error(error)
}