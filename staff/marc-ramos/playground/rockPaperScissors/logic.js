const logic = {
    generateCpuPlay(){
        if(data.wins.checkWinCpu === true || data.wins.checkWinPlayer === true) throw new Error('Game Over')
        const choices = ['r', 'p', 's']
        data.plays.cpuPlay = choices[Math.floor(Math.random() * 3)]

    },
  
    comparePlays(userPlay, cpuPlay) {
        if (userPlay === cpuPlay) return 'draw'
        else if (
            (userPlay === 'r' && cpuPlay === 's') ||
            (userPlay === 'p' && cpuPlay === 'r') ||
            (userPlay === 's' && cpuPlay === 'p')
        ){
            data.wins.userWins++

            return 'user win'

        } else
            data.wins.cpuWins++

            return 'cpu win'

    },

    checkWinningCounter(){ // check si cpu o user han ganado
        if (data.wins.cpuWins >= data.constant.MAX_WINS){
            data.wins.checkWinCpu = true
            
        } else if (data.wins.userWins >= data.constant.MAX_WINS){
            data.wins.checkWinPlayer = true
        }
    },

    resetGame () {
        data.wins.userWins = 0
        data.wins.cpuWins = 0
        data.wins.checkWinCpu = false
        data.wins.checkWinPlayer = false
        data.plays.userPlay = ''
        data.plays.cpuPlay = ''
        data.result.winner = ''

    }
}