var player  
var machine  
var result = 0
var machineWins = 0
var rounds = 0

    function playerChoice() {
    player = prompt(`Please, chose 0, 1 or 2: 0 = 📜, 1 = 🪨, 2 = ✂️`)
    }

    function machineChoice() {
    machine = Math.floor(Math.random() * 3)
    }

    function roundWinner() {
    var message
    if (player == machine) {
        result += 0
        machineWins += 0
        message = 'Tie! Nobody loses this round'
    } else {
        switch(player) {
            case '0':
            result += (machine == 1) ? 1 : 0
            machineWins += (machine == 1) ? 0 : 1
            message = (machine == 1) ? 'Excellent, you won this round!' : 'This time you lose'
            break
            case '1':
            result += (machine == 2) ? 1 : 0
            machineWins += (machine == 2) ? 0 : 1
            message = (machine == 1) ? 'Excellent, you won this round!' : 'This time you lose'
            break
            case '2':
            result += (machine == 0) ? 1 : 0
            machineWins += (machine == 2) ? 0 : 1
            message = (machine == 1) ? 'Excellent, you won this round!' : 'This time you lose'
            break
        }
    }
       // result = 0
        //machineWins = 0
        alert(message)
    }

    function askRounds() {
        rounds = prompt('How many rounds do you wish to play?')
    }

    function winner() {
        // var finalResult 
        if (result > machineWins) {
            alert('Congratulations, you win!')
        } else if (result < machineWins) {
            alert('Oh no, this time you lose :(')
        } else {
            alert('Tie, this time nobody loses!')
        }
       // return finalResult
    }

    askRounds()
    for (var i = 0; i < rounds; i++) {
    machineChoice()
    playerChoice()
    roundWinner()
    }
    winner()