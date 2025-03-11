const express = require("express");

//crea el servidor
const app = express();

//defineix una variable amb el port
const port = 1717;

const uuid = () => {
  return (Math.random() * 15 + 1 ** 15).toString(36);
};

const data = {
  users: [
    { name: "frank", age: 25, id: uuid() },
    { name: "mashenka", age: 20, id: uuid() },
  ],
  posts: [
    {
      id: uuid(),
      text: "Hey mundo",
      author: uuid(),
    },
  ],
};

// iguales una variable a la funció express.json()
// express.json() fa parse a les requests que tinguin el Content-Type de json al Header
const jsonParse = express.json();

//defineix un mètode associat a una ruta. En aquest cas farem un get que ens retornarà la data
app.get("/", (req, res) => {
  res.json(data);
});

//associem el mètode post a la ruta /api el mètode post.
//Li passem un middleware que hem guardat abans per a parsejar el body a javascript
//Executem el callback per a fer el push del user
app.post("/users", jsonParse, (req, res) => {
  //validate body info
  const { name, age } = req.body;

  const newUser = {
    name,
    age,
    id: uuid(),
  };

  data.users.push(newUser);

  res.status(201).json({ message: "User created!" });
});

//el mateix però amb posts
app.post("/posts", jsonParse, (req, res) => {
  //validate body info
  const { text, author } = req.body;

  const newUser = {
    text,
    author,
    id: uuid(),
  };

  data.posts.push(newUser);

  res.status(201).json({ message: "Post created!" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
