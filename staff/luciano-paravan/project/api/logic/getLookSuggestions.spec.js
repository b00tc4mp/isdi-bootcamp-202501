import { expect } from 'chai'
import sinon from 'sinon'
import { SystemError } from 'com/errors.js'

describe('getLookSuggestions basic', () => {
    let getLookSuggestions
    let fetchStub

    before(() => {
        return import('./getLookSuggestions.js')
            .then(mod => {
                getLookSuggestions = mod.default
            })
    })

    afterEach(() => {
        if (fetchStub) {
            fetchStub.restore()
            fetchStub = null
        }
    })

    it('throws SystemError on failed fetch', () => {
        fetchStub = sinon.stub(global, 'fetch').rejects(new Error('mock error'))

        return getLookSuggestions('dummy')
            .then(() => { throw new Error('should not reach') })
            .catch(error => {
                expect(error).to.be.instanceOf(SystemError)
                expect(error.message).to.equal('mock error')
            })
    })

    it('throws SystemError on invalid JSON body when status !== 200', () => {
        fetchStub = sinon.stub(global, 'fetch').resolves({
            status: 500,
            json: () => Promise.reject(new Error('invalid json'))
        })

        return getLookSuggestions('dummy')
            .then(() => { throw new Error('should not reach') })
            .catch(error => {
                expect(error).to.be.instanceOf(SystemError)
                expect(error.message).to.include('Open AI error')
            })
    })

    it('throws SystemError on invalid JSON string in choices', () => {
        fetchStub = sinon.stub(global, 'fetch').resolves({
            status: 200,
            json: () => Promise.resolve({
                choices: [{ message: { content: '{invalid-json' } }]
            })
        })

        return getLookSuggestions('dummy')
            .then(() => { throw new Error('should not reach') })
            .catch(error => {
                expect(error).to.be.instanceOf(SystemError)
                expect(error.message).to.equal('invalid response format from AI')
            })
    })

    it('returns suggestions correctly when response is valid', () => {
        const mockData = {
            suggestions: [{
                look: [
                    { category: 'top', itemName: 'shirt', source: 'user' },
                    { category: 'bottom', itemName: 'jeans', source: 'user' },
                    { category: 'shoes', itemName: 'sneakers', source: 'external' }
                ],
                notes: 'Mock look 1'
            },
            {
                look: [
                    { category: 'top', itemName: 'hoodie', source: 'user' },
                    { category: 'bottom', itemName: 'chinos', source: 'user' },
                    { category: 'shoes', itemName: 'boots', source: 'external' },
                    { category: 'accessory', itemName: 'watch', source: 'user' }
                ],
                notes: 'Mock look 2'
            }]
        }

        fetchStub = sinon.stub(global, 'fetch').resolves({
            status: 200,
            json: () => Promise.resolve({
                choices: [{ message: { content: JSON.stringify(mockData) } }]
            })
        })

        return getLookSuggestions('dummy')
            .then(result => {
                expect(result).to.have.property('suggestions')
                expect(result.suggestions).to.be.an('array').with.lengthOf(2)
                result.suggestions.forEach(suggestion => {
                    expect(suggestion.look).to.be.an('array')
                    expect(suggestion.notes).to.be.a('string')
                })
            })
    })

    it('throws SystemError with fallback message when OpenAI returns no error message', () => {
        fetchStub = sinon.stub(global, 'fetch').resolves({
            status: 500,
            json: () => Promise.resolve({})
        })

        return getLookSuggestions('dummy')
            .then(() => { throw new Error('should not reach') })
            .catch(error => {
                expect(error).to.be.instanceOf(SystemError)
                expect(error.message).to.equal('Unknown error from OpenAI')
            })
    })

})