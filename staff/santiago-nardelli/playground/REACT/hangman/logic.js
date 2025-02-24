var helper = {
  constant: {
    alphabetRegex: /^[a-zA-Z]+$/,
    wordRegex: /^[a-zA-Z]+$/,
  },

  validateCharacter: function (character) {
    this.validateEmpty(character);
    this.validateString(character);
    if (!this.constant.alphabetRegex.test(character))
      throw new Error("character is not a letter");
  },

  validateWord: function (word) {
    this.validateEmpty(word);
    this.validateString(word);
    if (!this.constant.wordRegex.test(word))
      throw new Error("word is not a word");
  },

  validateEmpty: function (word) {
    if (word === undefined || word === null) throw new Error("word is empty");
  },

  validateString: function (word) {
    if (typeof word !== "string")
      throw new TypeError(`${word} is not a string`);
  },

  validateHasLife: function (){
    if(data.attempts === data.maxAttempts) throw new Error('You have no more attempts')
  }
};

var logic = {


  // Logica que me permite al introducir la palabra validarla y devolver los espacios a completar con la palabra
  introduceWord: function (playerWord) {
    helper.validateWord(playerWord);
    

    data.word = playerWord;

    for (let i = 0; i < playerWord.length; i++) {
      data.matches[i] = "_";
    }
  },

  
  //Logica que me imprime los espacios a completar con la palabra
  getStatus: function () {
    var matchesString = "";

    for (var i = 0; i < data.matches.length; i++) {
      matchesString += data.matches[i] + " ";
    }
    return matchesString;
  },


  //Logica que me permite validar si la PALABRA ingresada por el usuario es correcta
  checkGuessWordMatches: function (guessWord) {
    helper.validateWord(guessWord);
    if (guessWord === data.word) {
      data.matches = data.word;
    } else {
      data.attempts++;
    }
  },
  //Logica que me permite validar si la LETRA ingresada por el usuario es correcta
  checkGuessCharacterMatches: function (guessCharacter) {
    helper.validateCharacter(guessCharacter);
    var check = false;

    for (var i = 0; i < data.word.length; i++) {
      if (guessCharacter === data.word[i]) {
        data.matches[i] = data.word[i];
        check = true;
      }
    }
  },

  //Logica que me permite saber si el jugador ha ganado
  hasPlayerWon: function () {
    for (let i = 0; i < word.length; i++) {
      if (data.matches[i] !== data.word[i]) {
        return false;
      }
    }
    return true;
  },
    //Logica que me permite saber si el jugador ha perdido

  hasPlayerLost: function () {
    return data.attempts === data.maxAttempts;
  },

    //Logica que me permite saber si el juego ha terminado

  isGameOver: function () {
    return this.hasPlayerWon() || this.hasPlayerLost();
  },


};
