// implementación SPLICE

// CASE 5:

Array.prototype.splice = function (startIndex, removedCount, ...elements) {

    const removedElements = []

    if (elements.length !== 0) {

        for (let i = startIndex; i < startIndex + removedCount; i++) {
        
            const currentElement = this[i]
    
            removedElements[removedElements.length] = currentElement // cada elemento sacado de currentElement se agrega al array de removedElements(es como hacer un push pero manualmente)
    
            this[i] = elements[i - startIndex] 
        }

    } else {
        const sideStartIndex = startIndex < 0? this.length + startIndex : startIndex // this.length + (-startIndex)

        for (let i = sideStartIndex; i < sideStartIndex + removedCount; i++) {

            const currentElement = this[i]

            removedElements[removedElements.length] = currentElement

            this[i] = this[i + removedCount]
        }
        this.length -= removedCount
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

