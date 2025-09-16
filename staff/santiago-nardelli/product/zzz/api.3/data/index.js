//Importo Mongo y ObjectId de la librería mongodb
import { MongoClient, ObjectId } from "mongodb";
import { errors } from "com";

const { SystemError } = errors;

let client;// ==> creo una variable client

export const data = {
  
  users: null, //==> creo una variable users collection
  posts: null, //==> creo una variable posts collection

  //Utilizo metodo de mongo connect para conectarme a la base de datos
  //url: url de la base de datos
  //dbName: nombre de la base de datos
  //Devuelvo una promesa que se resuelve cuando se conecta a la base de datos
  connect(url, dbName) {//==> url y dbName son los parametros que recibe la función connect
    return (client = new MongoClient(url)).connect()//==> creo una nueva conexión a la base de datos y la asigno a la variable client
      .catch((error) => {
        new SystemError("Error connecting to database"(error.message));
      })
      .then((client) => {
        
        const db = client.db(dbName);//==> asigno a la variable db la base de datos
        data.users = db.collection("users");//==> asigno a la variable users la colección users de la base de datos 
        data.posts = db.collection("posts"); //==> asigno a la variable posts la colección posts de la base de datos
      });
  },
  disconnect() {
    
    return client.close();// ==> cierro la conexión a la base de datos
  },
  
  ObjectId,//==> exporto ObjectId por que lo utilizo en otros archivos
};
