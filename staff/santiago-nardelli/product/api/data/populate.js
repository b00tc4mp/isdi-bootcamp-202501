import { MongoClient } from "mongodb";

// Conectamos a la base de datos
const client = new MongoClient("mongodb://localhost:27017");

client
  .connect()
  .catch((err) => {
    console.error("Error al conectar a la base de datos:", err);
    process.exit(1); // Salimos si hay un error crítico
  })
  .then(() => {
    console.log("Conexión exitosa a la base de datos");
    const db = client.db("test");

    const users = db.collection("users");

    // Ejemplo: Insertar un usuario
    return users
      .insertOne({
        name: "Julian Alvarez",
        email: "julian@alvarez.com",
        password: "123456",
      })
      .then((insertResult) => {
        console.log("Usuario insertado:", insertResult);

        // Ejemplo: Buscar usuarios
        return users.find().toArray();
      })
      .then((usersList) => {
        console.log("Usuarios encontrados:", usersList);

        // Ejemplo: Eliminar un usuario
        return users.deleteOne({ name: "Arnau" });
      })
      .then((deleteResult) => {
        console.log("Usuario eliminado:", deleteResult);
      });
  })
  .then(() => {
    console.log("Operaciones completadas exitosamente");
  })
  .catch((err) => {
    console.error("Error durante las operaciones:", err);
  })
  .finally(() => {
    client.close();
    console.log("Conexión cerrada");
  });
