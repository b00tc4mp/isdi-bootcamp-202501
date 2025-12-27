var logic = {
    constants: {
        ALPHABET: 'aàábcçdeèéfghiíïjklmnñoòópqrstuúüvwxyz'
    },

    helper: {
        checkWordMatchesAlphabet: function (word) {
            var wordIsValid = true

            for (var i = 0; i < word.length; i++) {
                var candidateCharacter = word[i]

                var characterInAlphabet = logic.helper.checkCharacterMatchesAlphabet(candidateCharacter)

                if (characterInAlphabet === false) {
                    wordIsValid = false

                    break
                }
            }

            return wordIsValid
        },

        checkCharacterMatchesAlphabet: function (character) {
            for (var i = 0; i < logic.constants.ALPHABET.length; i++) {
                var alphabetCharacter = logic.constants.ALPHABET[i]

                if (character === alphabetCharacter)
                    return true
            }

            return false
        },

        hasRemainingAttemps: function () {
            return data.remainingAttemps !== 0
        },

        hasGuessedWord: function () {
            var progressFullTrue = true

            for (var i = 0; i < data.progress.length; i++) {
                var status = data.progress[i]

                if (!status) {
                    progressFullTrue = false

                    break
                }
            }

            return progressFullTrue
        },

        validateText: function (text, explain) {
            if (typeof text !== 'string')
                throw new TypeError('invalid ' + explain + ' type')
        },

        validateTextHasLength: function (text, explain) {
            if (text.length === 0)
                throw new RangeError('invalid ' + explain + ' length (0)')
        },

        validateTextIsCharacter: function (text, explain) {
            if (text.length !== 1)
                throw new RangeError('invalid ' + explain + ' length (> 1)')
        },

        validateCharacterMatchesAlphabet: function (character, explain) {
            if (!logic.helper.checkCharacterMatchesAlphabet(character))
                throw new SyntaxError('invalid ' + explain + ' syntax (not in alphabet)')
        },

        validateWordMatchesAlphabet: function (word, explain) {
            if (!logic.helper.checkWordMatchesAlphabet(word))
                throw new SyntaxError('invalid ' + explain + ' syntax (not in alphabet)')
        }
    },

    introduceWord: function (candidateWord) {
        logic.helper.validateText(candidateWord, 'candidateWord')
        logic.helper.validateTextHasLength(candidateWord, 'candidateWord')
        logic.helper.validateWordMatchesAlphabet(candidateWord, 'candidateWord')

        data.word = candidateWord

        for (var i = 0; i < data.word.length; i++)
            data.progress[i] = false
    },

    getStatus: function () {
        var status = ''

        for (var i = 0; i < data.progress.length; i++) {
            var characterStatus = data.progress[i]

            if (characterStatus === true) {
                var character = data.word[i]

                status += character
            } else
                status += '-'
        }

        return {
            status: status,
            remainingAttemps: data.remainingAttemps
        }
    },

    attemptCharacter: function (attemptedCharacter) {
        logic.helper.validateText(attemptedCharacter, 'attemptedCharacter')
        logic.helper.validateTextIsCharacter(attemptedCharacter, 'attemptedCharacter')
        logic.helper.validateCharacterMatchesAlphabet(attemptedCharacter, 'attemptedCharacter')

        if (!logic.helper.hasRemainingAttemps())
            throw new Error('no more attemps')
        if (logic.helper.hasGuessedWord())
            throw new Error('word already guessed')

        var attemptedCharacterFound = false

        for (var i = 0; i < data.word.length; i++) {
            var character = data.word[i]

            if (attemptedCharacter === character) {
                data.progress[i] = true

                attemptedCharacterFound = true
            }
        }

        if (attemptedCharacterFound === false) {
            data.remainingAttemps--
        }
    },

    attemptWord: function (attemptedWord) {
        logic.helper.validateText(attemptedWord, 'attemptedWord')
        logic.helper.validateTextHasLength(attemptedWord, 'attemptedWord')
        logic.helper.validateWordMatchesAlphabet(attemptedWord, 'attemptedWord')

        if (!logic.helper.hasRemainingAttemps())
            throw new Error('no more attemps')
        if (logic.helper.hasGuessedWord())
            throw new Error('word already guessed')

        if (attemptedWord.length !== data.word.length) {
            data.remainingAttemps = 0

            return
        }

        if (attemptedWord === data.word)
            for (var i = 0; i < data.progress.length; i++)
                data.progress[i] = true
        else
            data.remainingAttemps = 0
    },

    resetGame: function () {
        data.word = ''
        data.remainingAttemps = data.constants.MAX_ATTEMPS
        data.progress = []
    },

    isGameOver: function () {
        return !logic.helper.hasRemainingAttemps() || logic.helper.hasGuessedWord()
    },

    isWon: function(){
        return logic.helper.hasGuessedWord()
    }
}