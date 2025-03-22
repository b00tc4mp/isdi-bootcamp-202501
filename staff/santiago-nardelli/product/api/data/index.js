//Importo Mongo y ObjectId de la librería mongodb
import {MongoClient, ObjectId} from 'mongodb';
import {errors} from 'com'

const {SystemError} = errors;

// declaro una variable client que va a ser la conexión a la base de datos
let client 

export const data = {
    //estas serian mis colecciones 
    users: null,
    posts:null,

    //Utilizo metodo de mongo connect para conectarme a la base de datos
    //url: url de la base de datos
    //dbName: nombre de la base de datos
    //Devuelvo una promesa que se resuelve cuando se conecta a la base de datos
    connect(url, dbName){
        //conecto a la base de datos
       
        return (client= new MongoClient(url ).connect())
        .catch(error => {
            new SystemError('Error connecting to database'( error.message))
        })
        .then(client => {
            //asigno a la variable db la base de datos
            const db= client.db(dbName)
            //asigno a la variable users la colección users de la base de datos
            data.users=db.collection('users');
            //asigno a la variable posts la colección posts de la base de datos
            data.users=db.collection('posts');
        })
    },
    disconnect(){
        //cierro la conexión a la base de datos
        return client.close()
    },
    //Devuelvo el ObjectId de la librería mongodb
    ObjectId
}