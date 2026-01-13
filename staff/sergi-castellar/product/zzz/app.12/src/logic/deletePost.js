import { data } from './../data/index'
import { NotFoundError, OwnershipError } from './../errors';
import { validate } from './validate'

export const deletePost = (postId) => {
    validate.id(postId, 'id');

    const { userId } = data

    return fetch(`http://localhost:8080/posts/delete/${postId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Basic ${userId}`
        }
    })
        .catch(error => { throw new Error(error.message) })
        .then(response => {
            console.log(response.status)

            if (response.status === 204)
                return
            return response.json()
                .catch(error => { throw new Error(error.message) })
                .then(body => {
                    const { error, message } = body

                    throw new Error(message)
                })
        })



    const findPost = posts.findOne(post => post.id === postId);

    if (!findPost) throw new NotFoundError('post not found');
    if (data.userId !== findPost.authorId) throw new OwnershipError('user is not the post author');

    data.posts.deleteOne(post => post.id === postId);
};
