console.clear()

//---- DATA -----
var maxNum = 100
var number = 0
var inputNumber = 0
var attempts = 10

//---- LOGIC -----
function randomNumber() {
    number = Math.floor(Math.random() * (maxNum - 1 + 1))
    introduceNumber()
}

function totalAttempts() {
    return attempts !== 0
}

function sentNumber() {
    var difference = Math.abs(number - inputNumber)

    if (number === inputNumber)
        alert(`Congratulations, you guessed correctly the ${number} number`)
    else if (difference > 40) {
        alert('It freezes')
        attempts--
        introduceNumber()
    }
    else if (difference > 30 && difference <= 40) {
        alert('Soooo cold')
        attempts--
        introduceNumber()
    }
    else if (difference > 20 && difference <= 30) {
        alert('Meh...')
        attempts--
        introduceNumber()
    }
    else if (difference > 10 && difference <= 20) {
        alert('hot, hot')
        attempts--
        introduceNumber()
    }
    else if (difference > 5 && difference <= 10) {
        alert('Sooo hot')
        attempts--
        introduceNumber()
    }
    else if (difference <= 5) {
        alert('It burns!!!')
        attempts--
        introduceNumber()
    }
}

function validateInput() {
    if (isNaN(inputNumber)) {
        alert('Invalid input. Please enter a number.')
        introduceNumber()
    }
    else if (inputNumber > maxNum || inputNumber < 1) {
        alert('Number out of range. Please enter a number between 1 and 100.')
        introduceNumber()
    }
}

function restart(rgame) {
    if (rgame === 'y') {
        attempts = 10
        randomNumber()
    } else {
        alert('Chao')
    }
}


//---- PRESENTATION -----
function introduceNumber() {
    inputNumber = Number(prompt(`Try to guess a Number (1-100)
                attempts: ${attempts}`))

    try {
        var hasAttempts = totalAttempts()

        if (!hasAttempts) {
            alert('You do not have attempts')
            restartGame()
        } else {
            validateInput()

            sentNumber()
        }
    } catch (error) {
        alert(error.message)

        console.error(error)
    }
}

function restartGame() {
    var rgame = prompt('Do you want to restart the Game? Please type yes (y) or no (n)')

    try {
        restart(rgame)
    } catch (error) {
        alert(error.message)

        console.error(error)
    }
}

function startGame() {
    var info = confirm(`Here's a little bit of info about the correct number and your number
        - It freezes ( >40)
        - So cooold ( > 30 <= 40)
        - Meh ( > 20 <= 30)
        - Hot, hot ( > 10 <= 20)
        - So hot ( > 5 <= 10)
        - It burns ( <= 50)`)

    try {
        randomNumber()
    } catch (error) {
        alert(error.message)

        console.error(error)
    }
}

startGame()