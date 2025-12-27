logic = {
    remainingRounds(){
         data.rounds.remainingRounds = data.rounds.maxRounds - data.rounds.currentRounds
    },

    checkPlay(player1choice, machineChoice){
        data.choices.playerChoice = player1choice
        if(data.rounds.remainingRounds === 0) throw new Error('Se ha acabado el juego!') 
        if(player1choice === machineChoice){
            data.results.countersDraw ++
            data.rounds.currentRounds ++
            data.results.playerWinRound = false
            data.results.machineWinRound = false
            this.changeMachineEmoji()
            this.changePlayerEmoji()
            this.remainingRounds()
        }
        else if(player1choice === 'r' && machineChoice === 's'){
            data.results.counterWinsPlayer++
            data.rounds.currentRounds++
            data.results.playerWinRound = true
            data.results.machineWinRound = false
            this.changeMachineEmoji()
            this.changePlayerEmoji()
            this.remainingRounds()
       
            
        }else if(player1choice === 'p' && machineChoice === 'r'){
            data.results.counterWinsPlayer++
            data.rounds.currentRounds++
            data.results.playerWinRound = true
            data.results.machineWinRound = false
            this.changeMachineEmoji()
            this.changePlayerEmoji()
            this.remainingRounds()
       
        
        }else if(player1choice === 's' && machineChoice === 'p'){
            data.results.counterWinsPlayer++
            data.rounds.currentRounds++
            data.results.playerWinRound = true
            data.results.machineWinRound = false
            this.changeMachineEmoji()
            this.changePlayerEmoji()
            this.remainingRounds()
       
            
        }else if(player1choice === 'r' && machineChoice === 'p'){
            data.results.CountersWinsMachine++
            data.rounds.currentRounds++
            data.results.playerWinRound = false
            data.results.machineWinRound = true
            this.changeMachineEmoji()
            this.changePlayerEmoji()    
            this.remainingRounds()
            
        }else if(player1choice === 'p' && machineChoice === 's'){
            data.results.CountersWinsMachine++
            data.rounds.currentRounds++
            data.results.playerWinRound = false
            data.results.machineWinRound = true
            this.changeMachineEmoji()   
            this.changePlayerEmoji() 
            this.remainingRounds()
        }else if(player1choice === 's' && machineChoice === 'r'){
            data.results.CountersWinsMachine++
            data.rounds.currentRounds++
            data.results.playerWinRound = false
            data.results.machineWinRound = true
            this.changeMachineEmoji()
            this.changePlayerEmoji()
            this.remainingRounds()
        }  
    },

    generateRockPaperScissors(){ 
        var randomNumber =  Math.floor(Math.random() * (3)) 
        
        if(randomNumber == 0) data.choices.machineChoice = 'r'
        else if(randomNumber == 1) data.choices.machineChoice = 'p'
        else if (randomNumber == 2) data.choices.machineChoice = 's'
    },

    checkWin(){
            if(data.results.counterWinsPlayer > data.results.CountersWinsMachine){
                data.results.playerWinGame = true
                data.results.machineWinGame = false
            }else if(data.results.counterWinsPlayer < data.results.CountersWinsMachine){
               data.results.playerWinGame = false
               data.results.machineWinGame = true
            }else if(data.results.CountersWinsMachine === data.results.counterWinsPlayer){
                data.results.playerWinGame = false
                data.results.machineWinGame = false
            }  
    },

    resetGame(){
        data.rounds.currentRounds = 0
        data.rounds.maxRounds = 0
        data.rounds.remainingRounds = 0
        data.results.counterWinsPlayer= 0
        data.results.CountersWinsMachine= 0
        data.results.countersDraw= 0
    },
    changeMachineEmoji(){
        const choices = ['✂️','📋','🪨']
        if (data.choices.machineChoice === 's')
            data.choices.machineChoice = choices[0]
        else if(data.choices.machineChoice === 'p')
            data.choices.machineChoice = choices[1]
        else if (data.choices.machineChoice === 'r')
            data.choices.machineChoice = choices[2]
 
    },
    changePlayerEmoji(){
        const choices = ['✂️','📋','🪨']
        if (data.choices.playerChoice === 's')
            data.choices.playerChoice = choices[0]
        else if(data.choices.playerChoice === 'p')
            data.choices.playerChoice = choices[1]
        else if (data.choices.playerChoice === 'r')
            data.choices.playerChoice = choices[2]
    },
    getStatus(){
        
       
        return {
            currentRounds : data.rounds.currentRounds,
            machineChoice:  data.choices.machineChoice,
            playerChoice: data.choices.playerChoice,
            remainingRounds: data.rounds.remainingRounds,
            playerWinRound: data.results.playerWinRound,
            machineWinRound: data.results.machineWinRound,
            playerWinGame: data.results.playerWinGame,
            machineWinGame: data.results.machineWinGame,
            playerWins: data.results.counterWinsPlayer,
            machineWins: data.results.CountersWinsMachine,
            draws: data.results.countersDraw
        }
    }
}