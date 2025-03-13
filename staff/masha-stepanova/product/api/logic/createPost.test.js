import { createPost } from './createPost.js'

try {
    createPost('m7yz5vpd0gg', 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExODZpcXVlbWhyaXM1Z2lpenU4c2F1bGh5N2l0M3ZlZGJ4YTF0OWtydCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sA67Sa7qtAF8Y/giphy.gif', 'Wendy my friend')
} catch (error) {
    console.error(error)
}