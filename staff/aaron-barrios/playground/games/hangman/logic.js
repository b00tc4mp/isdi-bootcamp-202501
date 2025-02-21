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
    isWon: function () {
        return logic.helper.hasGuessedWord()
    }
}

// INTERFACE

var interface = {
    helper: {
        promptToLowerCase: function (message) {
            var input = prompt(message)

            logic.helper.validateText(input, message)

            return input.toLowerCase()
        }
    },

    introduceWord: function () {
        try {
            var candidateWord = interface.helper.promptToLowerCase('input a word')

            logic.introduceWord(candidateWord)
        } catch (error) {
            console.error(error)

            alert(error.message)

            interface.introduceWord()
        }
    },

    showStatus: function () {
        try {
            var gameStatus = logic.getStatus()

            alert(gameStatus.status + '\nyou have ' + gameStatus.remainingAttemps + ' attemps')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    },

    tryCharacter: function () {
        try {
            var attemptedCharacter = interface.helper.promptToLowerCase('character?')

            logic.attemptCharacter(attemptedCharacter)
        } catch (error) {
            if (error.message === 'invalid character') {
                interface.tryCharacter()
            } else {
                alert(error.message)

                console.error(error)
            }
        }
    },

    tryWord: function () {
        try {
            var attemptedWord = interface.helper.promptToLowerCase('word?')

            logic.attemptWord(attemptedWord)
        } catch (error) {
            if (error.message === 'invalid word') {
                interface.tryWord()
            } else {
                alert(error.message)

                console.error(error)
            }
        }
    },

    playAgain: function () {
        try {
            logic.resetGame()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    },


    // automate

    automate: function () {
        try {
            interface.introduceWord()

            // bucle
            function tryGuess() {
                interface.showStatus()

                var option = ''

                function chooseOption() {
                    option = interface.helper.promptToLowerCase('character (c) or word (w)?')

                    if (option !== 'c' && option !== 'w')
                        chooseOption()
                }

                chooseOption()

                if (option === 'c')
                    interface.tryCharacter()
                else if (option === 'w')
                    interface.tryWord()

                try {
                    if (logic.isGameOver()) {
                        interface.showStatus()

                        var replay = confirm('play again?')

                        if (replay) {
                            interface.playAgain()
                            interface.automate()
                        } else {
                            alert('bye')
                        }
                    } else
                        tryGuess()
                } catch (error) {
                    alert(error.message)

                    console.error(error)
                }
            }

            tryGuess()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }
}

// interface.automate()
