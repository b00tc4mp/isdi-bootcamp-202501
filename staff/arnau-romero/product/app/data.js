// Creamos classe collection para manejar los datos con la localStore
class Collection{
    // hacemos constructora para traer name
    constructor(name){
        this.name = name
    }

     
    getAll(){
        // Obtenemos todos los datos de la local Storage, los transformamos a objeto y los retornamos.
        const collection = JSON.parse(localStorage[this.name] || '[]')

        return collection 
    }    

    setAll(collection){
        // Transformamos nuestro objeto a string para guardarlo en la local Store.
        const json = JSON.stringify(collection)

        localStorage[this.name] = json
    }

    getById(id){
        // Traemos la informacion de la local Storage
        const collection = JSON.parse(localStorage[this.name] || '[]') 
        
        // buscamos en la informacion de la localStorage la id que pasamos por parametro a la funcion mediante el metodo de arrays find., si no lo encontramos retormanos un null
        const document = collection.find(document => document.id === id) || null

        return document
    }

    insertOne(document){
        const collection = JSON.parse(localStorage[this.name] || '[]')

        // genero una id para document con nuestra funcion de generar id
        document.id = data.uuid()

        //pusheamos en collection que nos hemos traido antes de la local storage la id que hemos generado
        collection.push(document)

        // passamos collection a string JSON
        const json = JSON.stringify(collection)

        // y lo guadramos en la localstorage
        localStorage[this.name] = json
    }

    findOne(condition){
        const collection = JSON.parse(localStorage[this.name] || '[]')

        for (let i = 0; i < collection.length; i++){
            const document = collection[i]

            const matches = condition(document)

            if (matches) return document
        }

        return null
    }

    updateOne(document){
        const collection = JSON.parse(localStorage[this.name] || '[]')

        const index = collection.findIndex(doc => doc.id === document.id)

        collection[index] = document

        const json = JSON.stringify(collection)

        localStorage[this.name] = json
    }
}

const data = {
    uuid(){ // Funcion para generar id aleatorias y assignarlas cuando se registre un usuario.
        return (Date.now() + Math.random()).toString(36).replace('.', '') 
    },

    users: new Collection('users'),
    posts: new Collection('posts'),

    get userId(){
        const id = JSON.parse(sessionStorage.userId || 'null')

        return id
    },

    set userId(id){
        const json = JSON.stringify(id)

        sessionStorage.userId = json
    },

}

export default data