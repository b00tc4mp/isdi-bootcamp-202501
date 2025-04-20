import { SystemError } from 'com/errors.js'
import { User, Recipe } from '../data/index.js'
import { errors, validate } from 'com'

const { NotFoundError } = errors

export const getRecipes = userId => {
    validate.id(userId, 'userId')

    return Promise.all([
        User.findById(userId).lean(),
        Recipe.find().select('-__v').sort('-createdAt').populate('author', 'username').lean()
    ])
        .catch(error => {
            throw new SystemError(error.message)
        })
        .then(([user, recipes]) => {
            if (!user) throw new NotFoundError('user not found')

            if (!Array.isArray(recipes)) {
                recipes = []
            }

            recipes.forEach(recipe => {
                recipe.id = recipe._id.toString()
                delete recipe._id

                if (recipe.author && recipe.author._id) {
                    recipe.author.id = recipe.author._id.toString()
                    delete recipe.author._id
                }

                recipe.liked = recipe.likes?.some(userObjectId => userObjectId.toString() === userId) || false
                recipe.likesCount = recipe.likes?.length || 0
                delete recipe.likes

                recipe.own = recipe.author?.id === userId
            })

            // ✅ DEVUELVE UN ARRAY SIEMPRE
            return recipes
        })
}
