import { data } from "../data"

import { validate } from "./validate"

export const createPost = (image, text) => {
    validate.url(image, 'image')
    validate.maxLength(1000)
    validate.text(text, 'text')
    validate.maxLength(500)

    const { userId } = data
    const user = data.users.getById(userId)

    var post = {
        author: { id: userId, username: user.username },
        image: image,
        text: text,
        createdAt: new Date(),
        modifiedAt: null,
        likes: [],
    }

    data.posts.insertOne(post)

}