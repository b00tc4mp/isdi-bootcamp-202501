// implementación UNSHIFT


Array.prototype.unshift = function (...elementos) {
    for (let i = this.length - 1; i >= 0; i--) {
        this[i + elementos.length] = this[i]
    }
    for (let i = 0; i < elementos.length; i++) {
        this[i] = elementos[i]
    }
    return this.length

}












/*
-Primer for: su propósito es mover todos los elementos hacia la derecha para hacer espacio a los nuevos elementos.
    -this.length -1: empezamos el ciclo desde el último elemento del array.
    -i >= 0: se detendrá el bucle cuando i < 0. 
    -i --: iterará de derecha a izquierda.
    Dentro del bucle:
        -this[i + elementos.length] = this[i]: nos indica que this[i] (el elemento del array original)
        debe moverse hacia la derecha. Elementos.length es la cantidad de nuevos elementos que se van
        a agregar. Por lo que si el i = 3, le sumamos por ejemplo 2 elementos, nos dará la posición 5.
        Por lo que si this[i] estaba en la posición 3, ahora estará en la 5.
-El segundo for agrega los nuevos elementos al principio del array.
-
*/