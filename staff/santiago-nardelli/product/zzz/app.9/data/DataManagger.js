import {uuid} from './uuid.js'

export class DataManagger {
    constructor(name) {
      this.name = name;
    }
  
    getAll() {
      //JSON.parse() convierte un string JSON en un objeto JavaScript--> de JSON a JS -->PARSE(solo obj, arr, primitivos)
      const collection = JSON.parse(localStorage[this.name] || "[]");
  
      return collection;
    }
  
    setAll(collection) {
      //JSON.stringify() convierte un objeto JavaScript en un string JSON --> de JS a JSON -->STRINGIFY(solo obj, arr, primitivos)
      const json = JSON.stringify(collection);
  
      localStorage[this.name] = json;
    }
  
    getById(id) {
      //accedo a la coleccion de usuarios
      const collection = JSON.parse(localStorage[this.name] || "[]");
  
      //busco el usuario por id con el metodo find que por parametros le paso un callback que recibe un usuario y me devuelve el usuario que coincida con el id o null si no hay ninguno
      // a todo esto yo este meotod cuando lo utilizo le paso el id del usuario que quiero buscar
      const document = collection.find((document) => document.id === id) || null;
  
      return document;
    }
  
    insertOne(document) {
      // cuando quierta usar este metodo le paso un objeto usuario/documento que quiero insertar
      //obtengo la coleccion de usuarios accediendo a la funcion getAll
      const collection = JSON.parse(localStorage[this.name] || "[]");
  
      //le asigno un id unico al usuario/documento
      document.id = uuid();
  
      //inserto el usuario/documento en la coleccion
      collection.push(document);
  
      //guardo la coleccion en el localStorage
      const json = JSON.stringify(collection);
  
      localStorage[this.name] = json;
    }
  
    findOne(condition) {
      //por parametros le paso un callback que recibe un usuario y me devuelve el usuario que coincida con la condicion o null si no hay ninguno
      const collection = JSON.parse(localStorage[this.name] || "[]");
  
      for (let i = 0; i < collection.length; i++) {
        const document = collection[i];
  
        const matches = condition(document);
  
        if (matches) return document;
      }
  
      return null;
    }
  
    updateOne(document) {
      const collection = JSON.parse(localStorage[this.name] || "[]");
  
      const index = collection.findIndex((doc) => doc.id === document.id);
  
      collection[index] = document;
  
      const json = JSON.stringify(collection);
  
      localStorage[this.name] = json;
    }
    deleteOne(condition) {
      const collection = JSON.parse(localStorage[this.name] || "[]");
  
      const index = collection.findIndex(condition);
  
      if(index > -1){
        collection.splice(index, 1);
      }
  
      const json = JSON.stringify(collection);
  
      localStorage[this.name] = json;
    }
  }