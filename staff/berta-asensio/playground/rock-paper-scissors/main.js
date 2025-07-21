
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