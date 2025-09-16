/**
 * El hook useState es una herramienta fundamental en React que nos permite manejar estado en componentes funcionales. 
 */

// Simulación de useState
function useStateMock(valorInicial) {
    let estado = valorInicial;
    
    return [
        // Primer elemento: el valor actual
        () => estado,
        
        // Segundo elemento: función para actualizar
        nuevoValor => {
            estado = nuevoValor;
            return estado;
        }
    ];
}

// 1. Destructuración de array (forma común)
const [estado, setEstado] = useStateMock(0);

// 2. Acceso directo como array
const arrayEstado = useStateMock(0);
const valor = arrayEstado[0];
const setValor = arrayEstado[1];

console.log('1. Con destructuring:');
console.log('estado:', estado());
console.log('setEstado:', typeof setEstado);

console.log('\n2. Con acceso a array:');
console.log('valor:', valor());
console.log('setValor:', typeof setValor);

// 3. Demostración que funcionan igual
console.log('\n3. Probando ambas formas:');
setEstado(10);
console.log('Estado después de setEstado:', estado());

setValor(20);
console.log('Valor después de setValor:', valor());