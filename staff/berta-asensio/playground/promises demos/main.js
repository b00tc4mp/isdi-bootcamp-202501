// HAREMOS CONSULTAS, CON FETCH DESDE UNA API YA MONTADA DE ANIME
//Las promesas ayudan a evitar el calbacks hell

fetch('https://api.jikan.moe/v4/anime?q=legend') //esto me trae una respuesta json con todo el codigo de la app que contenga 'legend', que es lo que busco
    .catch(error => { throw new Error('connection error') }) //si falla conexión, que me imprima error en consola
    .then(response => { //si todo va bien, que nos devuelva una respuesta. Response por eso, solo nos traerá el status y la cabecera, no el cuerpo. Para el cuerpo hay que usar otra promesa que sea JSON.
        const { status } = response

        if (status === 200) 
            return response.json() //si la respuesta es Ok(200), que me devuelva el objeto recogido en formato json
                .catch(error => { throw new Error ('failed to parse json response') }) //por si json no es un json y da error, lo capturamos
        
        throw new Error('status not 200 but ' + status) // si respuesta no es 200, me devuelve error con el status que es
    })
    //si todo ha ido bien, pasamos a la siguiente promesa, que me devolverá el body que hemos pasado a json
    .then(body => {

        const { data } = body // estamos llamando a la data de la api de anime

        console.table(data)
    })
    .catch(error => console.error(error)) //aqui capturamos los errores anteriores
