import 'dotenv/config'
import { errors } from 'com'
const { SystemError } = errors

// Esta variable controla si usamos datos simulados (mock) o hacemos una consulta real a la API de OpenAI.
// Se usa para ahorrar tokens durante pruebas o desarrollo.
// ▸ Si NODE_ENV === 'test' y NO está definido TEST_FORCE_FETCH → se usarán mocks.
// ▸ En cualquier otro caso (por ejemplo NODE_ENV !== 'test' o TEST_FORCE_FETCH=1) → se hace fetch real a la API.
// Podés controlar esto con tu archivo .env o directamente desde los scripts de package.json.

export default function getLookSuggestions(prompt, fetchFn = fetch) {
    if (fetchFn !== fetch) {
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
    }

    return fetchFn('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7
        })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 200)
                return response.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(data => {
                        const reply = data.choices?.[0]?.message?.content
                        try {
                            const parsed = JSON.parse(reply)

                            const normalized = parsed.suggestions.map(suggestion => ({
                                ...suggestion,
                                look: suggestion.look.map(item => ({
                                    category: item.category,
                                    itemName: item.itemName,
                                    source: item.source
                                }))
                            }))

                            return { suggestions: normalized }
                        } catch (error) {
                            console.error('Error parsing Open AI reply: ', error)
                            throw new SystemError('invalid response format from AI')
                        }
                    })

            return response.json()
                .catch(error => { throw new SystemError('Open AI error:' + error.message) })
                .then(body => {
                    const errorMessage = body?.error?.message || 'Unknown error from OpenAI'
                    throw new SystemError(errorMessage)
                })
        })
}
