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

    /*
    return users
      .insertOne({
        name: "Leo Paredes",
        email: 'leo@paredes.com',
        password: "123456",
      }) // Ejemplo: Insertar un usuario
      .then((insertResult) => {
        console.log("Usuario insertado:", insertResult);

        
        return users.find().toArray();// Ejemplo: Buscar usuarios
      })
      .then((usersList) => {
        console.log("Usuarios encontrados:", usersList);



    */
    // return users.deleteOne({ name: "Arnau" });// Eliminar por nombre
    //return users.findOne({ name: "Leo Paredes"  });// Buscar por nombre
    // Buscar y modificar un usuario
    return users.findOneAndUpdate(
      { name: "Leo Paredes" }, // Filtro: buscar por nombre
      { $set: { email: "leo.updated@paredes.com" } }, // Actualización: cambiar el email
      { returnDocument: "after" } // Opciones: devolver el documento actualizado
    );
  })
  //  .then((deleteResult) => {
  //    console.log("Usuario eliminado:", deleteResult);
  //  });
  .then((userFoundModify) => {
    if (userFoundModify) {
      console.log("Usuario encontrado:", userFoundModify);
    } else {
      console.log("Usuario no encontrado");
    }
  })
  //})
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
/**
 * ¿Qué pasa si no pones el return?
Si no pones el return en las operaciones que retornan una promesa, el flujo de ejecución seguirá sin esperar a que esas operaciones terminen. En lugar de esperar a que la promesa se resuelva, el código avanzaría inmediatamente al siguiente .then(), lo que probablemente no es lo que quieres en un flujo de trabajo asíncrono donde las operaciones deben ejecutarse en secuencia.

Conclusión:
Los return en tu código son importantes porque hacen que las operaciones asíncronas se encadenen correctamente, asegurando que cada paso espere a que el anterior se complete antes de continuar. De esta forma, las promesas no se ejecutan de manera independiente, sino que se aseguran de que el flujo de trabajo se maneje en el orden correcto.

Resumen del flujo de promesas:
El return de cada operación asíncrona (como insertOne(), find().toArray(), etc.) devuelve una promesa que es utilizada en el siguiente .then().

Las promesas se encadenan porque cada .then() se ejecuta solo cuando la promesa previa se ha resuelto correctamente. Al usar return, aseguras que el siguiente .then() espere a que la operación asíncrona se complete.

El return también permite capturar el resultado de cada operación (como el resultado de insertOne(), la lista de usuarios, etc.) y pasarlo a los siguientes .then().

Ejemplo simplificado:
Podemos imaginar el siguiente flujo de promesas:

client.connect() retorna una promesa.

Si la conexión es exitosa, entramos en el primer .then(), donde retornamos una nueva promesa (la de users.insertOne()).

Cuando esa promesa se resuelve, el siguiente .then() se ejecuta, y retornamos otra promesa de users.find().toArray().

Cuando esa promesa también se resuelve, se ejecuta el siguiente .then() con el resultado de la búsqueda.

Al final, si hay otro return (como el de deleteOne()), desencadenaría otra promesa.

Cada vez que usas .then(), el valor que la promesa anterior devuelve se pasa como argumento al siguiente .then(), y puedes llamarlo como desees (en tu caso, insertResult).

El uso de return en las promesas asegura que el siguiente .then() reciba el valor de la promesa resuelta, permitiendo que el flujo de promesas se encadene correctamente.

 */
