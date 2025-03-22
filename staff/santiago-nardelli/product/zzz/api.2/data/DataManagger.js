import { readData, writeData } from "./fsHelpers.js";
import { uuid } from "./uuid.js";

export class DataManagger {
  constructor(name) {
    this.name = name;
  }
  getAll() {
    return readData(this.name);
  }

  setAll(collection) {
    writeData(this.name, collection);
  }

  getById(id) {
    const collection = readData(this.name);

    const document = collection.find((document) => document.id === id) || null;

    return document;
  }

  insertOne(document) {
    const collection = readData(this.name);

    document.id = uuid();

    collection.push(document);

    writeData(this.name, collection);
  }

  findOne(condition) {
    const collection = readData(this.name);

    for (let i = 0; i < collection.length; i++) {
      const document = collection[i];

      const matches = condition(document);

      if (matches) return document;
    }

    return null;
  }

  updateOne(condition, document) {
    const collection = readData(this.name);

    const index = collection.findIndex((condition));

    collection[index] = document;

    writeData(this.name, collection);
  }
  deleteOne(condition) {
    const collection = readData(this.name);

    const index = collection.findIndex(condition);

    if (index > -1) {
      collection.splice(index, 1);
    }

    writeData(this.name, collection);
  }
}

//METODOS
/*
 * getAll --> obtiene todos los documentos de la coleccion:
      1- declaro variable json y la igualo a JSON.stringify() convierte un objeto JavaScript en un string JSON --> de JS a JSON -->STRINGIFY(solo obj, arr, primitivos)
      2-escribo el archivo con writeFileSync() que recibe por parametros la ruta del archivo que quiero escribir y el contenido que quiero escribir en el archivo
     
 * setAll --> guarda todos los documentos de la coleccion
    1- declaro variable json y la igualo a JSON.stringify() convierte un objeto JavaScript en un string JSON --> de JS a JSON -->STRINGIFY(solo obj, arr, primitivos)
    2- escribo el archivo con writeFileSync() que recibe por parametros la ruta del archivo que quiero escribir y el contenido que quiero escribir en el archivo
  
 * getById --> obtiene un documento por id :
    1- accedo a la coleccion de usuarios
    2- busco el usuario por id con el metodo find que por parametros le paso un callback que recibe un usuario y me devuelve el usuario que coincida con el id o null si no hay ninguno
    3- a todo esto yo este meotod cuando lo utilizo le paso el id del usuario que quiero buscar
    4- retorna el usuario que coincida con el id o null si no hay ninguno
     
    
 * insertOne --> inserta un documento
    1- accedo a la coleccion de usuarios
    2- le asigno un id al usuario con el metodo uuid
    3- inserto el usuario en la coleccion
    4- guardo la coleccion en el archivo


 * findOne --> obtiene un documento por condicion
    1- accedo a la coleccion de usuarios
    2- recorro la coleccion con un for
    3- en cada iteracion obtengo un usuario
    4- le paso el usuario a la condicion que me pasan por parametro
    5- si la condicion se cumple retorno el usuario
    6- si no se cumple retorno null
    7- a todo esto yo este meotod cuando lo utilizo le paso la condicion que quiero que se cumpla

 * updateOne --> actualiza un documento
    1- accedo a la coleccion de usuarios
    2- busco el usuario por id con el metodo findIndex que recibe un callback que recibe un usuario y me devuelve el indice del usuario que coincida con el id
    3- actualizo el usuario en la coleccion
    4- guardo la coleccion en el archivo

 * deleteOne --> elimina un documento 
    1- accedo a la coleccion de usuarios
    2- busco el usuario por id con el metodo findIndex que recibe un callback que recibe un usuario y me devuelve el indice del usuario que coincida con el id
    3- elimino el usuario de la coleccion
    4- guardo la coleccion en el archivo
 */
