```sh
test> show databases
admin   40.00 KiB
config  12.00 KiB
local   40.00 KiB
test> db.users.insertOne({ name: 'Peter Pan', email: 'peter@pan.com', username: 'peterpan', password: '123123123' })
{
  acknowledged: true,
  insertedId: ObjectId('67dab7dc4004605bfaa729a0')
}
test> db.users.find()
[
  {
    _id: ObjectId('67dab7dc4004605bfaa729a0'),
    name: 'Peter Pan',
    email: 'peter@pan.com',
    username: 'peterpan',
    password: '123123123'
  }
]
test> db.users.insertOne({ name: 'Wendy Darling', email: 'wendy@darling.com', username: 'wendydarling', password: '123123123' })
{
  acknowledged: true,
  insertedId: ObjectId('67dab8514004605bfaa729a1')
}
test> db.users.find()
[
  {
    _id: ObjectId('67dab7dc4004605bfaa729a0'),
    name: 'Peter Pan',
    email: 'peter@pan.com',
    username: 'peterpan',
    password: '123123123'
  },
  {
    _id: ObjectId('67dab8514004605bfaa729a1'),
    name: 'Wendy Darling',
    email: 'wendy@darling.com',
    username: 'wendydarling',
    password: '123123123'
  }
]
test> db.users.insertOne({ name: 'Pepito Grillo', email: 'pepito@grillo.com', username: 'pepitogrillo', password: '123123123' })
{
  acknowledged: true,
  insertedId: ObjectId('67dab8854004605bfaa729a2')
}
test> db.users.find()
[
  {
    _id: ObjectId('67dab7dc4004605bfaa729a0'),
    name: 'Peter Pan',
    email: 'peter@pan.com',
    username: 'peterpan',
    password: '123123123'
  },
  {
    _id: ObjectId('67dab8514004605bfaa729a1'),
    name: 'Wendy Darling',
    email: 'wendy@darling.com',
    username: 'wendydarling',
    password: '123123123'
  },
  {
    _id: ObjectId('67dab8854004605bfaa729a2'),
    name: 'Pepito Grillo',
    email: 'pepito@grillo.com',
    username: 'pepitogrillo',
    password: '123123123'
  }
]
test> db.users.insertOne({ name: 'Campa Nilla', email: 'campa@nilla.com', username: 'campanilla', password: '123123123' })
{
  acknowledged: true,
  insertedId: ObjectId('67dab8b24004605bfaa729a3')
}
test> db.users.find()
[
  {
    _id: ObjectId('67dab7dc4004605bfaa729a0'),
    name: 'Peter Pan',
    email: 'peter@pan.com',
    username: 'peterpan',
    password: '123123123'
  },
  {
    _id: ObjectId('67dab8514004605bfaa729a1'),
    name: 'Wendy Darling',
    email: 'wendy@darling.com',
    username: 'wendydarling',
    password: '123123123'
  },
  {
    _id: ObjectId('67dab8854004605bfaa729a2'),
    name: 'Pepito Grillo',
    email: 'pepito@grillo.com',
    username: 'pepitogrillo',
    password: '123123123'
  },
  {
    _id: ObjectId('67dab8b24004605bfaa729a3'),
    name: 'Campa Nilla',
    email: 'campa@nilla.com',
    username: 'campanilla',
    password: '123123123'
  }
]
test> db.users.find({ name: 'a' })

test> db.users.find({ name: /a/ })
[
  {
    _id: ObjectId('67dab7dc4004605bfaa729a0'),
    name: 'Peter Pan',
    email: 'peter@pan.com',
    username: 'peterpan',
    password: '123123123'
  },
  {
    _id: ObjectId('67dab8514004605bfaa729a1'),
    name: 'Wendy Darling',
    email: 'wendy@darling.com',
    username: 'wendydarling',
    password: '123123123'
  },
  {
    _id: ObjectId('67dab8b24004605bfaa729a3'),
    name: 'Campa Nilla',
    email: 'campa@nilla.com',
    username: 'campanilla',
    password: '123123123'
  }
]
test> db.users.find({ name: /^C/ })
[
  {
    _id: ObjectId('67dab8b24004605bfaa729a3'),
    name: 'Campa Nilla',
    email: 'campa@nilla.com',
    username: 'campanilla',
    password: '123123123'
  }
]
test> db.users.updateOne({ _id: ObjectId('67dab8854004605bfaa729a2') }, { $set: { password: '234234234' } })
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
test> db.users.find()
[
  {
    _id: ObjectId('67dab7dc4004605bfaa729a0'),
    name: 'Peter Pan',
    email: 'peter@pan.com',
    username: 'peterpan',
    password: '123123123'
  },
  {
    _id: ObjectId('67dab8514004605bfaa729a1'),
    name: 'Wendy Darling',
    email: 'wendy@darling.com',
    username: 'wendydarling',
    password: '123123123'
  },
  {
    _id: ObjectId('67dab8854004605bfaa729a2'),
    name: 'Pepito Grillo',
    email: 'pepito@grillo.com',
    username: 'pepitogrillo',
    password: '234234234'
  },
  {
    _id: ObjectId('67dab8b24004605bfaa729a3'),
    name: 'Campa Nilla',
    email: 'campa@nilla.com',
    username: 'campanilla',
    password: '123123123'
  }
]
test> db.users.deleteOne({ _id: ObjectId('67dab8854004605bfaa729a2') })
{ acknowledged: true, deletedCount: 1 }
test> db.users.find()
[
  {
    _id: ObjectId('67dab7dc4004605bfaa729a0'),
    name: 'Peter Pan',
    email: 'peter@pan.com',
    username: 'peterpan',
    password: '123123123'
  },
  {
    _id: ObjectId('67dab8514004605bfaa729a1'),
    name: 'Wendy Darling',
    email: 'wendy@darling.com',
    username: 'wendydarling',
    password: '123123123'
  },
  {
    _id: ObjectId('67dab8b24004605bfaa729a3'),
    name: 'Campa Nilla',
    email: 'campa@nilla.com',
    username: 'campanilla',
    password: '123123123'
  }
]
test> show collections
users
test> db.posts.insertOne({ author: ObjectId('67dab8b24004605bfaa729a3'), image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3kyNDE3d2RzaWxxYXA5OTd2MXBsdWQzOTR6ODBncHd3djJja3ljdyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Kqwx0Rab82TfcVr0Kv/giphy.gif', text: 'me myself and i', createdAt: new Date, modifiedAt: null })
{
  acknowledged: true,
  insertedId: ObjectId('67daba784004605bfaa729a4')
}
test> show collections
posts
users
test> db.posts.find()
[
  {
    _id: ObjectId('67daba784004605bfaa729a4'),
    author: ObjectId('67dab8b24004605bfaa729a3'),
    image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3kyNDE3d2RzaWxxYXA5OTd2MXBsdWQzOTR6ODBncHd3djJja3ljdyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Kqwx0Rab82TfcVr0Kv/giphy.gif',
    text: 'me myself and i',
    createdAt: ISODate('2025-03-19T12:37:12.679Z'),
    modifiedAt: null
  }
]
test> db.posts.find({ author: ObjectId('67dab8b24004605bfaa729a3') })
[
  {
    _id: ObjectId('67daba784004605bfaa729a4'),
    author: ObjectId('67dab8b24004605bfaa729a3'),
    image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3kyNDE3d2RzaWxxYXA5OTd2MXBsdWQzOTR6ODBncHd3djJja3ljdyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Kqwx0Rab82TfcVr0Kv/giphy.gif',
    text: 'me myself and i',
    createdAt: ISODate('2025-03-19T12:37:12.679Z'),
    modifiedAt: null
  }
]
test> db.posts.find({ author: ObjectId('67dab8514004605bfaa729a1') })
test> db.users.createIndex({ email: 1 }, { unique: true })
email_1
test> db.users.createIndex({ username: 1 }, { unique: true })
username_1
test> db.users.getIndexes()
[
  { v: 2, key: { _id: 1 }, name: '_id_' },
  { v: 2, key: { email: 1 }, name: 'email_1', unique: true },
  { v: 2, key: { username: 1 }, name: 'username_1', unique: true }
]
test> 
```

# API Documentation
## Descripción
Este proyecto es una API construida con Node.js y Express que utiliza MongoDB como base de datos. La API incluye varias rutas para manejar usuarios, posts, likes, y más. Este documento describe los middlewares utilizados en el archivo index.js y su propósito.

### Middlewares Utilizados
1. jsonBodyParse
Descripción: Middleware que convierte el cuerpo de las solicitudes HTTP en un objeto JSON accesible a través de req.body.
* Implementación:
```sh
const jsonBodyParse = json();
Uso: Se utiliza en las rutas POST y PATCH para procesar el cuerpo de las solicitudes.
Ejemplo:
api.post(
  "/users/auth",
  jsonBodyParse,
  withErrorHandling((req, res) => {
    const { email, password } = req.body;
    // Lógica de autenticación
  })
);
```
2. cors
Descripción: Middleware que habilita el intercambio de recursos entre orígenes cruzados (CORS). Permite que la API sea accesible desde diferentes dominios.
Implementación:
api.use(cors());
Uso: Aplicado globalmente a todas las rutas de la API.
Ejemplo:
```sh
api.use(cors());
```
3. withErrorHandling
Descripción: Middleware personalizado que encapsula la lógica de las rutas para manejar errores de forma centralizada. Si ocurre un error (síncrono o asíncrono), lo pasa al siguiente middleware de manejo de errores.
Implementación:
```sh
const withErrorHandling = (callback) => {
  return (req, res, next) => {
    try {
      callback(req, res).catch((error) => {
        next(error);
      });
    } catch (error) {
      next(error);
    }
  };
};
```
Uso: Se utiliza en todas las rutas para manejar errores.
Ejemplo:
```sh
api.get(
  "/posts",
  withErrorHandling((req, res) => {
    const { authorization } = req.headers;
    const token = authorization.slice(7);
    const { sub: userId } = jwt.verify(token, JWT_SECRET);
    return logic.getPosts(userId).then((posts) => res.json(posts));
  })
);
```
4. errorHandler
Descripción: Middleware global para manejar errores. Construye una respuesta adecuada con un código de estado HTTP y un mensaje descriptivo basado en el tipo de error.
Implementación:
```sh
const errorHandler = (error, req, res, next) => {
  console.error(error);

  let status = 500;
  let errorName = SystemError.name;

  if (error instanceof ValidateError) {
    status = 400;
    errorName = error.constructor.name;
  } else if (error instanceof CredentialsError) {
    status = 401;
    errorName = error.constructor.name;
  } else if (error instanceof NotFoundError) {
    status = 404;
    errorName = error.constructor.name;
  } else if (error instanceof OwnershipError) {
    status = 403;
    errorName = error.constructor.name;
  } else if (error instanceof DuplicityError) {
    status = 409;
    errorName = error.constructor.name;
  }

  res.status(status).json({ error: errorName, message: error.message });
};
```
Uso: Aplicado globalmente al final de todas las rutas.
Ejemplo:
```sh
api.use(errorHandler);
```
### Flujo de Ejecución de los Middlewares
cors:

* Se ejecuta primero porque está definido globalmente con api.use(cors()).
jsonBodyParse:

* Se ejecuta en las rutas que lo necesitan (por ejemplo, POST y PATCH).
withErrorHandling:

* Se ejecuta en cada ruta para manejar errores.
errorHandler:

* Se ejecuta al final si ocurre un error en alguna ruta o middleware.
### Ejemplo de Ruta con Middlewares
```sh
Ruta: /users/auth
Flujo:
jsonBodyParse convierte el cuerpo de la solicitud a JSON.
withErrorHandling maneja cualquier error que ocurra en la lógica de la ruta.
Si no hay errores, se genera un token JWT y se envía como respuesta.
Conclusión
Esta API utiliza middlewares de manera eficiente para manejar solicitudes, errores y seguridad. La combinación de middlewares globales (cors, errorHandler) y específicos por ruta (jsonBodyParse, withErrorHandling) asegura que la API sea robusta, segura y fácil de mantener.const jsonBodyParse = json();
```