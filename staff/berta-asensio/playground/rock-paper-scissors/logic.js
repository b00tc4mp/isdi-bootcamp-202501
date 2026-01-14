const logic = {

    pcOptions() {

        let randomIndex = Math.floor(Math.random() * data.posibleOptions.length) 
        data.pcChoice = data.posibleOptions[randomIndex]
    },

    playerOptions(playerChoice) {

        if(data.posibleOptions.includes(playerChoice)) {
            data.playerChoice = playerChoice

        } else { throw new Error ('invalid option') }
    },
    
    getStatus() {

        let result = ''
    
        if (data.pcChoice === data.playerChoice) {
            result = 'tie'
            data.counterPlayer++
            data.counterPc++
            
        } else if ((data.pcChoice === data.posibleOptions[0] && data.playerChoice === data.posibleOptions[2]) ||
            (data.pcChoice === data.posibleOptions[1] && data.playerChoice === data.posibleOptions[0]) ||
            (data.pcChoice === data.posibleOptions[2] && data.playerChoice === data.posibleOptions[1])) {
           result = 'lost' 
           data.counterPc++
             
        } else if ((data.pcChoice === data.posibleOptions[0] && data.playerChoice === data.posibleOptions[1]) ||
            (data.pcChoice === data.posibleOptions[1] && data.playerChoice === data.posibleOptions[2]) ||
            (data.pcChoice === data.posibleOptions[2] && data.playerChoice === data.posibleOptions[0])) {
            result = 'win'
            data.counterPlayer++
        
        } else {
            throw new Error('Unexpected error ocurred')
        }
        return result
    },

    finalGame() {

        let finalResult = ''

        if (data.counterPc === 3 && data.counterPlayer < 3) {
            finalResult = 'LOST'
        } else if (data.counterPlayer === 3 && data.counterPc < 3) {
            finalResult = 'WIN'
        } else if (data.counterPlayer === 3 && data.counterPc === 3) {
            finalResult = 'TIE'
        } else if (data.counterPlayer < 3 && data.counterPc < 3) {
            return null;
        } else {
            throw new Error('Unexpected error occurred')
        }

        return finalResult
    },

    resetGame() {
        data.counterPlayer = 0
        data.counterPc= 0
    }
}