const data = {
    posibleOptions: ['rock', 'paper', 'scissors'],

    pcChoose: '',
    playerChoose: '',
    
    counterPc: 0,
    counterPlayer: 0,
}

const logic = {

    pcOptions() {

        let randomIndex = Math.floor(Math.random() * data.posibleOptions.length) 
        data.pcChoose = data.posibleOptions[randomIndex]
    
        console.log(data.pcChoose)
    },

    playerOptions(playerChoose) {

        if(data.posibleOptions.includes(playerChoose)) {
            data.playerChoose = playerChoose
                
            logic.validateRound()

        } else { throw new Error ('invalid option') }
    },
    
    validateRound() {

        let result = ''
    
        if (data.pcChoose === data.playerChoose) {
            //alert('Round tie! The two players add one point. \nYou have chosen ' + playerChoose + ', and your opponent ' + pcChoose + '.')
            result = 'tie'
            data.counterPlayer++
            data.counterPc++
            
        } else if ((data.pcChoose === data.posibleOptions[0] && data.playerChoose === data.posibleOptions[2]) ||
            (data.pcChoose === data.posibleOptions[1] && data.playerChoose === data.posibleOptions[0]) ||
            (data.pcChoose === data.posibleOptions[2] && data.playerChoose === data.posibleOptions[1])) {
           // alert ('You lost the round! \nYou have chosen ' + playerChoose + ' and your opponent ' + pcChoose +'.')
           result = 'lost' 
           data.counterPc++
            
            
        } else if ((data.pcChoose === data.posibleOptions[0] && data.playerChoose === data.posibleOptions[1]) ||
            (data.pcChoose === data.posibleOptions[1] && data.playerChoose === data.posibleOptions[2]) ||
            (data.pcChoose === data.posibleOptions[2] && data.playerChoose === data.posibleOptions[0])) {
            //alert ('You won the round! \nYou have chosen ' + playerChoose + ' and your opponent '  + pcChoose + '.')
            result = 'win'
            data.counterPlayer++
        
        } else {
            throw new Error('Unexpected error ocurred')
        }

        return result
    },

    getStatus() {

        let finalResult = ''

        if (data.counterPc === 3 && data.counterPlayer < 3) {
            finalResult = 'LOST'
        } else if (data.counterPlayer === 3 && data.counterPc < 3) {
            finalResult = 'WIN'
        } else if (data.counterPlayer === 3 && data.counterPc === 3) {
            finalResult = 'TIE'
        } else {
            throw new Error(error.message)
        }

        return finalResult
    },

    resetGame() {
        data.counterPc = 0
        data.counterPlayer = 0
        data.pcChoose = ''
        data.playerChoose = ''        
    }
}

const interface = {

    start () {
        try {
            logic.pcOptions()
            this.askOptions()
        } catch (error) {
    
            console.error(error)
            alert(error.message)
        }
    },
    
    askOptions() {
        try {
            let playerChoose = prompt('Please, Insert an option: rock, paper or scissors')
            data.playerChoose = playerChoose.toLowerCase()
           
            let result = logic.playerOptions(data.playerChoose)
            console.log(`Player chose: ${data.playerChoose}`)

            if (result === 'tie') {
                alert('Round tie! The two players add one point. \nYou have chosen ' + data.playerChoose + ', and your opponent ' + data.pcChoose + '.')
            
            } else if (result === 'lost') {
                alert('You lost the round! \nYou have chosen ' + data.playerChoose + ' and your opponent ' + data.pcChoose +'.')
            
            } else if (result === 'win') {
                alert('You won the round! \nYou have chosen ' + data.playerChoose + ' and your opponent '  + data.pcChoose + '.')
            }

            alert('Bookmark: Player - ' + data.counterPlayer + '| Opponent - ' + data.counterPc + '.')
            this.setStatus()
               
        } catch (error) {
            console.error(error)
            alert('Wrong word. Try again and write well.')
            this.askOptions() 
        }
    },

    setStatus() {

        try {
            let finalResult = logic.getStatus()

            if (finalResult === 'LOST') {
                alert ('You lost the game! \njBookmark: Player - ' + data.counterPlayer + ' | Opponent - ' + data.counterPc + '.')  
            } else if (finalResult === 'WIN') {
                alert('Congratulations! You won the game! \nBookmark: Player - ' + data.counterPlayer + ' | Opponent - ' + data.counterPc + '.')
            } else if (finalResult === 'TIE') {
                alert('You have tied the game. Play again to tiebreaker')
            }

            logic.resetGame()
            
        } catch (error) {
            console.error(error)
            alert(error.message)    
        }
    }
}