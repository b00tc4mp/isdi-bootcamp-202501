import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { NotFoundError, OwnershipError } = errors

//pasamos userId por la función porque la traemos de la app, ya no la llamamos desde data y la validamos
export const deletePost = (userId, postId) =>  {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    //comprobamos que el usuario exista
    const user = data.users.getById(userId)

    if(!user) throw new NotFoundError ('user not found')

    //comprobamos que el post exista:
    const foundPost = data.posts.findOne(post => post.id === postId)

    if (!foundPost) throw new NotFoundError ('post not found') 

    if(foundPost.author !== userId) throw new OwnershipError('user is not author of post') 

    data.posts.deleteOne(post => post.id === postId)
}
