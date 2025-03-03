const logic = {
  constants:{
    message:{
      win:"You win",
      lose:"You lose",
      empate:"Empate"
    }
  },
  helpers: {
    handleError(value) {
      if (value !== "r" && value !== "r" && value !== "r")
        throw new SyntaxError("Entry the right move");
    },
    typeError(value) {
      if (typeof value !== "string") throw new TypeError("Type error of entry");
    },

    emptyError(value) {
      if (value === "" || value === null) throw new SyntaxError("Empty entry");
    },

    // helper para manejo de errores de juego
    // si la suma de el array de rondas es mayor a 1 y la suma de las rondas es menor a -1 o mayor a 1
    // o si la suma de el array de rondas es mayor a 2 y la suma de las rondas es menor a 0 o mayor a 0
    // tira un error de que el juego termino
    gameOver(rondas , sum ) {
      if (
        (rondas.length > 1 && (sum < -1 || sum > 1)) ||
        (rondas.length > 2 && (sum < 0 || sum > 0))
      )
        throw new Error("game is over");
    },
    selectMode(mode) {
      if (mode === "IA" || mode === "VS") {
        data.mode = mode;
      } else {
        throw new Error("Mode not found");
      }
    },
    selectRounds(rounds) {
      if (typeof rounds !== "number" || rounds <= 0) {
        throw new Error("Invalid number of rounds");
      }
      data.rounds = rounds;
    },
  },

  /*
CAPA LOGICA
dentro de mi logica defino mi funcion de toma de desicion de ganador de rondas, defino mis helpers de manejo de errores
defino una suma que me va a ayudar a contabilizar localmente dentro de la funcion una respuesta numerica de si gana el user sea un 1 si es empate devuelva un 0 y si gana la machine que sea -1
primero defino un for para recorrer el array de rondas que en prinsipio lo defino vacio
y con el for lo recorro y le voy sumando los -1 / 0 / 1 de mis comparaciones de jugadas contra la PC

*/

  takeDesicion(value) {
    this.helpers.typeError(value);
    this.helpers.handleError(value);

    var sum = 0;

    for (i = 0; i < data.rondas.length; i++) sum += rondas[i];

    this.helpers.gameOver(data.rondas, sum);

    //comparaciones de entrada
    var machine;
     const random = Math.random();

    if (random < 1 / 3) machine = "r";
    else if (random < 2 / 3) machine = "s";
    else machine = "p";

    //comparaciones de entrada
    if (
      (value === "r" && machine === "s") ||
      (value === "s" && machine === "p") ||
      (value === "p" && machine === "r")
    ) {
      sum += 1;
    } else if (value === machine) {
      sum += 0;
    } else {
      sum -= 1;
    }

    data.rondas.push(sum);

    return this.determineWinner(sum);
  },
  determineWinner(sum){
    if(sum === 1) return this.constants.message.win;
    else if(sum === 0) return this.constants.message.empate;
    else return this.constants.message.lose;
  }


};
