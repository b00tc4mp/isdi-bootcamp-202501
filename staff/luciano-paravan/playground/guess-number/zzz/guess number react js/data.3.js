const data = {
    constant: {
        MAX_ATTEMPTS: 10,
        number: {
            MIN: 0,
            MAX: 100
        },
        temperature: {
            literal: {
                VERY_COLD: 'very cold',
                COLD: 'cold',
                MILD: 'mild',
                WARM: 'warm',
                HOT: 'hot',
                VERY_HOT: 'very hot',
                BURNED: 'burned'
            },
            limit: {
                VERY_COLD: 50,
                COLD: 30,
                MILD: 20,
                WARM: 10,
                HOT: 5,
                VERY_HOT: 1,
                BURNED: 0
            }
        }
    },
    numberToGuess: -1,
    attempts: 0,
    temperature: '',
    attemptedNumbers: []
}