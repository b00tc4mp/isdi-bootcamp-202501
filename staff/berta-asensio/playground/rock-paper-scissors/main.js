const data = {
    posibleOptions: ['rock', 'paper', 'scissors'],

    pcChoose: '',
    playerChoose: '',
    
    counterPc: 0,
    counterPlayer: 0,

    roundTie,
    roundWin,
    roundLost
}

const logic = {

    pcOptions() {

        let randomIndex = Math.floor(Math.random() * data.posibleOptions.length) 
        data.pcChoose = data.posibleOptions[randomIndex]
    
        console.log(data.pcChoose)
    },

    playerOptions(data.playerChoose) {

        if(data.posibleOptions.includes(data.playerChoose)) { 
                
            logic.validateRound()

        } else { throw new TypeError ('invalid option type') }
        },
    
    validateRound() {
    
        if (data.pcChoose === data.playerChoose) {
           //alert('Round tie! The two players add one point. \nYou have chosen ' + playerChoose + ', and your opponent ' + pcChoose + '.')
            data.counterPlayer++
            data.counterPc++
            
        } else if ((data.pcChoose === data.posibleOptions[0] && data.playerChoose === data.posibleOptions[2]) ||
            (data.pcChoose === data.posibleOptions[1] && data.playerChoose === data.posibleOptions[0]) ||
            (data.pcChoose === data.posibleOptions[2] && data.playerChoose === data.posibleOptions[1])) {
           // alert ('You lost the round! \nYou have chosen ' + playerChoose + ' and your opponent ' + pcChoose +'.')
            data.counterPc++
            
            
        } else if ((data.pcChoose === data.posibleOptions[0] && data.playerChoose === data.posibleOptions[1]) ||
            (data.pcChoose === data.posibleOptions[1] && data.playerChoose === data.posibleOptions[2]) ||
            (data.pcChoose === data.posibleOptions[2] && data.playerChoose === data.posibleOptions[0])) {
            //alert ('You won the round! \nYou have chosen ' + playerChoose + ' and your opponent '  + pcChoose + '.')
            data.counterPlayer++
        
        } else {
            throw new Error(error.message)
        }
        console.log('Bookmark: Player - ' + data.counterPlayer + '| Opponent - ' + data.counterPc + '.')
        //winGame()
        //pcOptions()
        //playerOptions()
        
        
    }
}

const interface = {

    start () {
        try {
            logic.pcOptions()
        } catch (error) {
    
            console.error(error)
            alert(error.message)
        }
    },
    
    askOptions() {
        try {
            playerChoose = prompt('Please, Insert an option: rock, paper or scissors')
            data.playerChoose = playerChoose.toLowerCase()
            logic.playerOptions(data.playerChoose)
               
        } catch (error) {
            console.error(error)
            alert('Wrong word. Try again and write well.')
            logic.playerOptions()   
        }
    },
    
    playRounds() {
        try {
            validateRound()
    
        } catch(error) {
            console.error(error)
            alert(error.message)
        }
    },
    
    viewStatus() {
        try {
            
        } catch (error) {
            console.error(error)
            
            alert(error.message)            
        }
    },



    function winGame() {
        
        if (counterPc === 3 && counterPlayer < 3) {
            alert('You lost the game! \njBookmark: Player - ' + counterPlayer + ' | Opponent - ' + counterPc + '.')
            return resetGame()
            
        } else if (counterPlayer === 3 && counterPc < 3) {
            alert('Congratulations! You won the game! \nBookmark: Player - ' + counterPlayer + ' | Opponent - ' + counterPc + '.')
            return resetGame()
            
        } else if ( (counterPlayer === 3 && counterPc === 3)) {
            alert('You have tied the game. Play again to tiebreaker')
            return resetGame()       
        }
        
        pcOptions()
        playerOptions()
    }        
    
    
            
    function resetGame() {
        counterPc = 0
        counterPlayer = 0
        pcOptions()
        playerOptions()
        
    }

}