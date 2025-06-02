// Response

const express = require("express");

const app = express();

//Respuesta en formato texto gracias al metodo send
app.get("/", (req, res) => {
  res.send("Hello World");
});

//Respondemos un archivo con el metodo sendFile y la ruta del archivo (imagen en este caso)
app.get("/miarchivo", (req, res) => {
  res.sendFile("./javascript.webp", {
    root: __dirname,
  });
});

/*Responder con un formato de objeto de json, para devolver información
de un usuario*/
app.get("/user", (req, res) => {
  res.json({
    Nombre: "Berta",
    Apellido: "Asensio",
    age: 40,
    puntos: [1, 2, 3],
    dirección: {
      city: "Barcelona",
      calle: "Eduard Ferrés,21",
    },
  });
});

/* Creamos ruta isAlive (que normalmente se utiliza para comprobar si un servidor ha caido)
Y en vez de devolver un texto o un archivo, queremos enviar al cliente un codigo de estado
para informarle que está todo ok, pero que no devolveremos nada (204). Al ponerle este código, 
veremos que no ejecuta la página pero en network si veremos que se ha ejecutado. Es porque le hemos
dicho que no devuelva nada.*/
app.get("/isAlive", (req, res) => {
    res.sendStatus(204);
  });

app.listen(3000);
console.log(`Server on port ${3000}`);
