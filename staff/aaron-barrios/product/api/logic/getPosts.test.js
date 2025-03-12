import {getPosts} from './getPosts.js'

try{
    const posts = getPosts('m861ab4yxg0')

    console.log(posts)
}catch(error){
    console.error(error)
}