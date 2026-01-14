// implementación SPLICE

// CASE 2: 

Array.prototype.splice = function (startIndex, removedCount, ...elements) {

    const removedElements = []

    for (let i = startIndex; i < startIndex + removedCount; i++) {
        
        const currentElement = this[i]

        removedElements[removedElements.length] = currentElement // cada elemento sacado de currentElement se agrega al array de removedElements(es como hacer un push pero manualmente)

        this[i] = elements[i - startIndex] 
    }
    return removedElements
} 
  





/*
Explicación this[i] = elements[i - startIndex]:

-Se reemplazan los elementos eliminados por los nuevos elementos.
-Si startIndex = 1 y elements = ['pear', 'melon']. En el primer ciclo de la iteración, 
i = 1, por lo que i - startIndex = 0. Entonces, this[0] = elements[0]. Por lo que this[1] = 'pear'.
*/
/*
-crear array con elementos eliminados (si los hay)
-iterar en el array desde startIndex hasta indexFrom + removeCount
-copiar elementos iterados ( de startIndex i startIndex + removedCount) al array de removedElements
-copiar element en las posiciones iteradas
-retornar removedElements
*/

