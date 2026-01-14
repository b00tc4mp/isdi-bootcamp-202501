const logic = {
    generateMachineChoice: () => {
        data.machine = Math.floor(Math.random() * 3)
    },

    findRoundWinner: () => {
        var message
        if (data.player === data.machine) {
            data.result += 0
            data.machineWins += 0
            message = 'Tie! Nobody loses this round'
        } else {
            switch (data.player) {
                case 0:
                    data.result += (data.machine == 1) ? 1 : 0
                    data.machineWins += (data.machine == 1) ? 0 : 1
                    message = (data.machine == 1) ? 'Excellent, you won this round!' : 'This time you lose'
                    break
                case 1:
                    data.result += (data.machine == 2) ? 1 : 0
                    data.machineWins += (data.machine == 2) ? 0 : 1
                    message = (data.machine == 1) ? 'Excellent, you won this round!' : 'This time you lose'
                    break
                case 2:
                    data.result += (data.machine == 0) ? 1 : 0
                    data.machineWins += (data.machine == 2) ? 0 : 1
                    message = (data.machine == 1) ? 'Excellent, you won this round!' : 'This time you lose'
                    break
            }
        }
        // data.result = 0
        //machineWins = 0
        alert(message)
    },

    getWinner: () => {
        // var finalResult 
        if (data.result > machineWins) {
            alert('Congratulations, you win!')
        } else if (data.result < machineWins) {
            alert('Oh no, this time you lose :(')
        } else {
            alert('Tie, this time nobody loses!')
        }
        // return finalResult
    }
}


// function playerChoice() {
//     player = prompt(`Please, chose 0, 1 or 2: 0 = 📜, 1 = 🪨, 2 = ✂️`)
// }

// function machineChoice() {
//     data.machine = Math.floor(Math.random() * 3)
// }

// function roundWinner() {
//     var message
//     if (player == data.machine) {
//         data.result += 0
//         machineWins += 0
//         message = 'Tie! Nobody loses this round'
//     } else {
//         switch (player) {
//             case '0':
//                 data.result += (data.machine == 1) ? 1 : 0
//                 machineWins += (data.machine == 1) ? 0 : 1
//                 message = (data.machine == 1) ? 'Excellent, you won this round!' : 'This time you lose'
//                 break
//             case '1':
//                 data.result += (data.machine == 2) ? 1 : 0
//                 machineWins += (data.machine == 2) ? 0 : 1
//                 message = (data.machine == 1) ? 'Excellent, you won this round!' : 'This time you lose'
//                 break
//             case '2':
//                 data.result += (data.machine == 0) ? 1 : 0
//                 machineWins += (data.machine == 2) ? 0 : 1
//                 message = (data.machine == 1) ? 'Excellent, you won this round!' : 'This time you lose'
//                 break
//         }
//     }
//     // data.result = 0
//     //machineWins = 0
//     alert(message)
// }

// function askRounds() {
//     rounds = prompt('How many rounds do you wish to play?')
// }

// function winner() {
//     // var finalResult
//     if (data.result > machineWins) {
//         alert('Congratulations, you win!')
//     } else if (data.result < machineWins) {
//         alert('Oh no, this time you lose :(')
//     } else {
//         alert('Tie, this time nobody loses!')
//     }
//     // return finalResult
// }

// askRounds()
// for (var i = 0; i < rounds; i++) {
//     machineChoice()
//     playerChoice()
//     roundWinner()
// }
// winner()