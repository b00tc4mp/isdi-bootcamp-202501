var logic = {
    validation: function (num) {
        const number = Number(num)
        if (typeof number != 'number')
            throw new TypeError('invalid typeof answer')

        if (num === '' || number < 0 || number > 100)
            return 'invalid'


    },
    showState: function () {
        const info = [data.attempts, data.isWin, data.isLost]


        return info
    },

    tryNumber: function (number) {
        if (data.attempts > 0 && !data.isWin) {
            if (number === data.randomNumber) {
                data.isWin = true
            } else {
                data.attempts--
                if (data.attempts <= 0) {
                    data.isLost = true
                }
                data.attemptedNumbers.push(number)
            }
        }
    },
    reset: function () {
        data.randomNumber = Math.floor(Math.random() * 101)
        data.attempts = 10
        data.attemptedNumbers = []
        data.isWin = false
        data.isLost = false
    }

}