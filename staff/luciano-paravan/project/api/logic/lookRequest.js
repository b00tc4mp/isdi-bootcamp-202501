import { User, ClothingItem, LookRequest } from '../data/index.js'
import { errors, validate } from 'com'
import getLookSuggestions from './getLookSuggestions.js'

const { SystemError, NotFoundError } = errors

export const lookRequest = (userId, contextOccasion, location, temperature, timeOfDay, style, additionalDetails, allowExternalSuggestions, fetchFn) => {
    validate.id(userId, 'id')
    validate.occasion(contextOccasion, 'occasion')
    validate.string(location, 'location')
    validate.string(temperature, 'temperature')
    validate.string(timeOfDay, 'time of day')
    validate.style(style, 'style')
    validate.string(additionalDetails, 'additional details')
    validate.maxLength(additionalDetails, 20, 'additional details')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return ClothingItem.find({ owner: userId }).lean()
        })
        .then(clothingItems => {
            if (!clothingItems.length) throw new NotFoundError('User has no clothing items')

            const prompt = `
            Act as a fashion assistant AI. Based on the following user inputs, suggest **TWO different complete outfits** from any previous ones you may have proposed, using the user's clothing items. Suggest external items ONLY if allowed.

            Each clothing item is listed with its:
            - itemName
            - category: one of ["top", "bottom", "shoes", "accessory"]
            - type
            - color
            - season: array of values from ["summer", "winter", "spring", "autumn"]
            - occasion: array of values from ["formal", "casual", "sport", "party"]

            Return two distinct outfit suggestions. Each one should contain:
            - one top
            - one bottom
            - one pair of shoes
            - optionally one accessory

            Respond strictly in JSON format like this:
            {
            "suggestions": [
                {
                "look": [
                    { "category": "top", "itemName": "white t-shirt", "source": "user" },
                    { "category": "bottom", "itemName": "black jeans", "source": "user" },
                    { "category": "shoes", "itemName": "white sneakers", "source": "external" },
                    { "category": "accessory", "itemName": "silver watch", "source": "user" }
                ],
                "notes": "This look is ideal for a casual summer afternoon."
                },
                {
                "look": [
                    { "category": "top", "itemName": "blue shirt", "source": "user" },
                    { "category": "bottom", "itemName": "chinos", "source": "user" },
                    { "category": "shoes", "itemName": "loafers", "source": "external" }
                ],
                "notes": "Smart casual look suitable for evening events."
                }
            ]
            }

            User context:
            - Occasion: ${contextOccasion.join(', ')}
            - Location: ${location}
            - Temperature: ${temperature}
            - Time of Day: ${timeOfDay}
            - Style: ${style}
            - Additional Details: ${additionalDetails || 'None'}
            - Allow External Item Suggestion: ${allowExternalSuggestions ? 'You may include external item suggestions (e.g., new brands or styles) for top, bottom, shoes, and accessories.' : 'Only suggest items from the internal clothingItems for all categories.'}

            User's Clothing Items:
            ${clothingItems.map(item =>
                `- Item name: ${item.itemName}, category: ${item.category}, type: ${item.type}, color: ${item.color}, season: [${item.season.join(', ')}], occasion: [${item.occasion.join(', ')}]`).join('\n')}
            `.trim()

            return getLookSuggestions(prompt, fetchFn || (() => {
                const mock = {
                    suggestions: [
                        {
                            look: [
                                { category: 'top', itemName: 'mock top 1', source: 'user' },
                                { category: 'bottom', itemName: 'mock bottom 1', source: 'user' },
                                { category: 'shoes', itemName: 'mock shoes 1', source: 'external' }
                            ],
                            notes: 'Mock look 1'
                        },
                        {
                            look: [
                                { category: 'top', itemName: 'mock top 2', source: 'user' },
                                { category: 'bottom', itemName: 'mock bottom 2', source: 'user' },
                                { category: 'shoes', itemName: 'mock shoes 2', source: 'user' },
                                { category: 'accessory', itemName: 'mock watch', source: 'user' }
                            ],
                            notes: 'Mock look 2'
                        }
                    ]
                }

                const normalized = mock.suggestions.map(suggestion => ({
                    ...suggestion,
                    look: suggestion.look.map(item => ({
                        category: item.category,
                        itemName: item.itemName,
                        source: item.source
                    }))
                }))

                return Promise.resolve({ suggestions: normalized })
            }))
                .then(result => {
                    return LookRequest.create({
                        user: userId,
                        contextOccasion,
                        location,
                        temperature,
                        timeOfDay,
                        style,
                        additionalDetails,
                        allowExternalSuggestions
                    })
                        .then(request => {
                            return {
                                requestId: request._id.toString(),
                                suggestions: result.suggestions
                            }
                        })
                })
        })
}