logic = {
    remainingRounds(){
         data.rounds.remainingRounds = data.rounds.maxRounds - data.rounds.currentRounds
    },

    checkPlay(player1choice, machineChoice){
        if(data.rounds.remainingRounds === 0) throw new Error('Tas pasao de rondas flipao!')
        if(player1choice == machineChoice){
            data.results.countersDraw ++
            data.rounds.currentRounds ++
            return "It's a draw!!"
        }
        else if(player1choice == 'r' && machineChoice == 's'){
            data.results.counterWinsPlayer++
            data.rounds.currentRounds++
            return "Player Win this round!! Player-> 🪨 vs ✂️ <- Machine"
            
        }else if(player1choice == 'p' && machineChoice == 'r'){
            data.results.counterWinsPlayer++
            data.rounds.currentRounds++
            return "Player Win this round!! Player-> 📋 vs 🪨 <- Machine"
        
        }else if(player1choice == 's' && machineChoice == 'p'){
            data.results.counterWinsPlayer++
            data.rounds.currentRounds++
            return "Player Win this round!! Player-> ✂️ vs 📋 <- Machine"
            
        }else if(player1choice == 'r' && machineChoice == 'p'){
            data.results.CountersWinsMachine++
            data.rounds.currentRounds++
            return "Machine Win this round!! Machine-> 📋 vs 🪨 <- Player "
            
        }else if(player1choice == 'p' && machineChoice == 's'){
            data.results.CountersWinsMachine++
            data.rounds.currentRounds++
            return "Machine Win this round!! Machine-> ✂️ vs 📋 <- Player"
            
        }else if(player1choice == 's' && machineChoice == 'r'){
            data.results.CountersWinsMachine++
            data.rounds.currentRounds++
            return "Machine Win this round!! Machine-> 🪨 vs ✂️ <- Player"
            
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
                return "Player 1 win the game! " + '\n'+ ' Player wins: ' + data.results.counterWinsPlayer + ' Machine wins: ' + data.results.CountersWinsMachine + ' Draws: ' + data.results.countersDraw
            }else if(data.results.counterWinsPlayer < data.results.CountersWinsMachine){
                return "Machine win the game! " + '\n'+ ' Player wins: ' + data.results.counterWinsPlayer + ' Machine wins: ' + data.results.CountersWinsMachine + ' Draws: ' + data.results.countersDraw
            }else if(data.results.CountersWinsMachine == data.results.counterWinsPlayer){
                return "It's a draw! " + '\n'+ ' Player wins: ' + data.results.counterWinsPlayer + ' Machine wins: ' + data.results.CountersWinsMachine + ' Draws: ' + data.results.countersDraw
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

}