const data = {
    constant: {
        MAX_ATTEMPTS: 10,
        number: {
            MIN: 0,
            MAX: 100
        },
        temperature: {
            literal: {
                VERY_COLD: 'very_cold',
                COLD: 'cold',
                TEMPERED: 'tempered',
                WARM: 'warm',
                HOT: 'hot',
                VERY_HOT: 'very hot'
            },
            limit: {
                VERY_COLD: 50,
                COLD: 30,
                TEMPERED: 20,
                WARM: 10,
                HOT: 5,
                VERY_HOT: 1
            }
        }
    },
    numberToGuess: -1,
    attempts: 0,
    temperature: '',
    attemptedNumbers: []
}
