/* funciones

// 🔹 Configuración inicial
11 recibirInputMaxNumber() → presentation | try-catch a 12 y llamar a 13
12 validarMaxNumber(input) → logic
13 generarNumeroRandom(maxNumber) → logic | retorna el número random
14 guardarNumeroRandom(randomNumber) → data
15 alertarInicioJuego() → presentation

---

// 🔹 Juego (bucle de intentos)
21 pedirInputTryNumber() → presentation | try-catch a 22 y llamar a 23
22 validarTryNumber(input) → logic
23 compararNumeros(tryNumber, randomNumber) → logic | retorna true si acierta
24 calcularDiferencia(tryNumber, randomNumber) → logic | retorna distancia
25 elegirFraseSegunDiferencia(diferencia) → logic | retorna frase
26 mostrarFeedback(frase) → presentation
27 incrementarIntentos() → data
28 volverAPedirIntento() → presentation | llama a 21 si no ha ganado

---

// 🔹 Fin del juego
31 mostrarMensajeVictoria() → presentation

___________________ */

// 🔹 Data global
let maxNumber;
let randomNumber;
let playerAttempts = 0;

// 🔹 Función 11: Recibir input del usuario
function recibirInputMaxNumber() {
    try {
        let input = prompt("Ingresa un número máximo (entre 1 y 9999):");
        maxNumber = validarMaxNumber(input);
        randomNumber = generarNumeroRandom(maxNumber);
        alertarInicioJuego();
        pedirInputTryNumber(); // Llamar al juego
    } catch (error) {
        alert(error.message);
        recibirInputMaxNumber(); // Vuelve a pedir input si hay error
    }
}

// 🔹 Función 12: Validar el número máximo
function validarMaxNumber(input) {
    let num = parseInt(input, 10);
    if (isNaN(num) || num < 1 || num > 9999) {
        throw new Error("Número inválido. Debe estar entre 1 y 9999.");
    }
    return num;
}

// 🔹 Función 13: Generar número aleatorio
function generarNumeroRandom(maxNumber) {
    return Math.floor(Math.random() * (maxNumber + 1));
}

// 🔹 Función 15: Mostrar mensaje de inicio
function alertarInicioJuego() {
    alert("¡Se ha generado un número aleatorio! Intenta adivinarlo.");
}

// 🔹 Función 21: Pedir número al usuario
function pedirInputTryNumber() {
    try {
        let input = prompt("Ingresa tu intento:");
        let tryNumber = validarTryNumber(input);
        procesarIntento(tryNumber);
    } catch (error) {
        alert(error.message);
        pedirInputTryNumber(); // Vuelve a pedir input si hay error
    }
}

// 🔹 Función 22: Validar intento del usuario
function validarTryNumber(input) {
    let num = parseInt(input, 10);
    if (isNaN(num) || num < 0 || num > maxNumber) {
        throw new Error(`Número inválido. Debe estar entre 0 y ${maxNumber}.`);
    }
    return num;
}

// 🔹 Función 23-24-25: Procesar intento y calcular respuesta
function procesarIntento(tryNumber) {
    if (compararNumeros(tryNumber, randomNumber)) {
        mostrarMensajeVictoria();
        return;
    }

    let diferencia = calcularDiferencia(tryNumber, randomNumber);
    let mensaje = elegirFraseSegunDiferencia(diferencia);
    
    mostrarFeedback(mensaje);
    incrementarIntentos();
    volverAPedirIntento();
}

// 🔹 Función 23: Comparar número con el número aleatorio
function compararNumeros(tryNumber, randomNumber) {
    return tryNumber === randomNumber;
}

// 🔹 Función 24: Calcular la diferencia
function calcularDiferencia(tryNumber, randomNumber) {
    return Math.abs(tryNumber - randomNumber);
}

// 🔹 Función 25: Elegir frase según la diferencia
function elegirFraseSegunDiferencia(diferencia) {
    if (diferencia >= 50) {
        return 'Muy frío'
    } else if (diferencia < 50 && diferencia >= 25) {
        return 'Fresquito'
    } else if (diferencia < 25 && diferencia >= 15) {
        return 'Templado'
    } else if (diferencia < 15 && diferencia >= 10) {
        return 'Calentito'
    } else if (diferencia < 10 && diferencia >= 5) {
        return 'Caliente'
    } else if (diferencia < 5) {
        return 'Súper caliente'
    }
}

// 🔹 Función 26: Mostrar mensaje de feedback
function mostrarFeedback(frase) {
    alert(frase);
}

// 🔹 Función 27: Incrementar intentos
function incrementarIntentos() {
    playerAttempts++;
}

// 🔹 Función 28: Volver a pedir intento si no ha acertado
function volverAPedirIntento() {
    pedirInputTryNumber();
}

// 🔹 Función 31: Mensaje de victoria
function mostrarMensajeVictoria() {
    alert(`¡Felicidades! Has adivinado el número en ${playerAttempts} intentos.`);
}

recibirInputMaxNumber()