// Creamos una nueva promesa: una instancia de promesa con dos callbacks (resolve y reject).
//Y utilizamos tres métodos: then, catch y finally(para actuar tanto si ha ido bien como mal)
//LAS PROMESAS SIEMPRE SIGUEN

new Promise((resolve, reject) => {
    resolve('1')
})
    .then(value => value + '-2') 
    .catch(error => console.error('catch', error))
    .finally(() => console.log('finally'))
    .then(value => console.log('then', value))
    .finally(() => console.log ('finally'))

/*
-Como la promesa termina en resolve, pasa por then. Al pasar por then se le pasa el valor y se concatena un 2.
-Pasa por el catch si ha habido un error.
-Se come si o si el finally, nos avisa que se ha ejecutado sea para bien o para mal.
-Devolvemos otro then para poder imprimir el value final.
-Otro finally para decir que ha terminado.
-OUTPUT: 
    finally
    then 1-2
    finally
*/ 


new Promise((resolve, reject) => {
    resolve('1')
})
    .then(value => value + '-2') //then 1
    .catch(error => console.error('catch', error)) //catch 1
    .finally(() => console.log('finally')) //finally 1
    .then(value => { console.log('then', value); throw value + '-3' }) //then 2
    .then(value => { console.log('then', value) }) //then 3
    .finally(() => console.log('finally')) //finally 2
    .catch(error => console.error('catch', error)) //catch 2

/*
OUTPUT:
    finally
    1-2
    finally
    catch 1-2-3
-La promesa al ser resolve pasa por el primer then e ignora el primer catch.
-Imprime finally.
-El segundo then imprime el primer then (1-2) y lanza un error por lo que ignora el then 3.
-Pasa el finally 2.
-Y se captura el error que se habia lanzado y se imprime el error (que es value + '-3')
*/

new Promise((resolve, reject) => {
    resolve('1')
})
    .then(value => value + '-2') //then 1
    .catch(error => console.error('catch', error)) //catch 1
    .finally(() => console.log('finally')) //finally 1
    .then(value => { 
        console.log('then', value); 

        throw value + '-3' 
    }) //then 2
    .then(value => { 
        console.log('then', value) 
    }) //then 3
    .finally(() => console.log('finally')) //finally 2
    .catch(error => { 
        console.error('catch', error); 

        return error + '-4' 
    }) //catch 2
    .finally(() => console.log('finally')) //finally 3
    .then(value => value + '-5') //then 4
    .catch(error => console.error('catch', error)) //catch 3
    .then(value => {
        console.log('then', value)
    }) //then 5

/*
OUTPUT:
    finally
    then 1-2
    finally
    catch 1-2-3
    finally
    1-2-3-4-5

-La promesa al ser resolve pasa por el primer then e ignora el primer catch.
-Imprime finally.
-El segundo then imprime el primer then (1-2) y lanza un error por lo que ignora el then 3.
-Pasa el finally 2.
-Y se captura el error que se habia lanzado y se imprime el error (que es value + '-3').
Este error se devuelve concatenando un 4 (pero no se imprime).
-Pasa por finally 3.
-Pasa por el then 4, donde concatena un -5 pero no se imprime.
-Ignora el catch 3.
-El then 5 imprime el value total (1-2-3-4-5)
*/

//UNCCAUGHT:

new Promise((resolve, reject) => {
    resolve('1')
})
    .then(value => value + '-2') //then 1
    .catch(error => console.error('catch', error)) //catch 1
    .finally(() => console.log('finally')) //finally 1
    .then(value => { 
        console.log('then', value); 

        throw value + '-3' 
    }) //then 2
    .then(value => { 
        console.log('then', value) 
    }) //then 3
    .finally(() => console.log('finally')) //finally 2
    .catch(error => { 
        console.error('catch', error); 

        return error + '-4' 
    }) //catch 2
    .finally(() => console.log('finally')) //finally 3
    .then(value => value + '-5') //then 4
    .catch(error => console.error('catch', error)) //catch 3
    .then(value => {
        console.log('then', value)

        throw value + '-6'
    }) //then 5

    /*El ultimo throw me imprimirá el error con value 1-2-3-4-5-6, pero me marcará Uncaught, lo que significa
    que es un error que no se ha capturado en ningún lado, solo se ha lanzado. */


    new Promise((resolve, reject) => {
        resolve('1')
    })
        .then(value => value + '-2') //then 1
        .catch(error => console.error('catch', error)) //catch 1
        .finally(() => console.log('finally')) //finally 1
        .then(value => { 
            console.log('then', value); 
    
            throw value + '-3' 
        }) //then 2
        .then(value => { 
            console.log('then', value) 
        }) //then 3
        .finally(() => console.log('finally')) //finally 2
        .catch(error => { 
            console.error('catch', error); 
    
            return error + '-4' 
        }) //catch 2
        .finally(() => console.log('finally')) //finally 3
        .then(value => value + '-5') //then 4
        .catch(error => console.error('catch', error)) //catch 3
        .then(value => {
            console.log('then', value)
    
            throw value + '-6'
        }) //then 5
        .catch(error => {
            console.error('catch', error)

            throw error + '-7'
        }) //catch 4
        .then(value => {
            console.log('then', value)

            throw value + '-8'
        }) //then 6
        .catch(error => {
            console.error('catch', error)

            return error + '-9'
        }) //catch 5
        .then(value => {
            console.log('then', value)
        }) //then 7

        /*
        OUTPUT:
        finally
        then 1-2
        finally
        catch 1-2-3
        finally
        then 1-2-3-4-5
        catch 1-2-3-4-5-6
        catch 1-2-3-4-5-6-7
        then 1-2-3-4-5-6-7-9
        */