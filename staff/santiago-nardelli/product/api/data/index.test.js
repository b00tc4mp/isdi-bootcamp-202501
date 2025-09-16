import { data } from "./index.js";

data // ==> data es un objeto que tiene las siguientes propiedades y métodos (users, posts, connect, disconnect, ObjectId) 
  .connect("mongodb://localhost:27017", "test") //==> conecto a la base de datos test en el puerto 27017 de localhost(mi máquina)
  .then(() => data.users.find().toArray())
  //.then(() => data.users.findOne({ name: 'Dibu Martinez' }))
  .then((result) => console.log(result))
  .then(() => console.log("the end"))
  .catch(console.error)
  .finally(() => data.disconnect());
