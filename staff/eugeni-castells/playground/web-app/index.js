const express = require("express");
const logic = require("./logic.js");

const server = express();

const encodedBodyParser = express.urlencoded();

const port = 8080;

server.get("/", (req, res) => {
  if (req.headers.cookie && req.headers.cookie.includes("userId")) {
    res.redirect("/home");

    return;
  }
  res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Web-App</title>
  </head>
  <body>
    <main>
        <h1>Welcome to my server web-app</h1> 
       <a href="/register">Register</a> or <a href="/login">Login</a>
    </main>
  </body>
</html>`);
});

server.get("/register", (req, res) => {
  if (req.headers.cookie && req.headers.cookie.includes("userId")) {
    res.redirect("/home");

    return;
  }
  res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Web-App</title>
  </head>
  <body>
    <main>
        <h1>Welcome to My server web-app</h1> 
     <form method="POST" action="/register">
        <label>Name: </label>
        <input type="text" name="name"/>
        <label>Username: </label>
        <input type="text" name="username"/>
        <label>Pasword: </label>
        <input type="password" name="password"/>
         <button type="submit">Register</button>
        <a href="/login">Login</a>
    </form>
    </main>
  </body>
</html>`);
});

server.get("/login", (req, res) => {
  if (req.headers.cookie && req.headers.cookie.includes("userId")) {
    res.redirect("/home");

    return;
  }
  res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Web-App</title>
  </head>
  <body>
    <main>
        <h1>Welcome to My server web-app</h1> 
     <form method="POST" action="/login">
        <label>Username: </label>
        <input type="text" name="username"/>
        <label>Pasword: </label>
        <input type="password" name="password"/>
        <button type="submit">Login</button>
        <a href="/register">Register</a>
    </form>
    </main>
  </body>
</html>`);
});

server.get("/home", encodedBodyParser, (req, res) => {
  if (!req.headers.cookie?.includes("userId")) {
    res.redirect("/");

    return;
  }

  try {
    const userId = req.headers.cookie.slice(7);

    const username = logic.getUserName(userId);

    res.send(`<!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8">
                <title>Web-App</title>
              </head>
              <body>
                <main>
                    <h1>Hello, ${username}</h1>
                    <form action="/logout" method="post">
                        <button type="submit">Logout</button>
                    </form>
                </main>
              </body>
            </html>`);
  } catch (error) {
    res.send(`<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>Web-App</title>
          </head>
          <body>
            <main>
                <h1>Hello world</h1>

                <p>${error.message}</p>
            </main>
          </body>
        </html>`);
  }
});

server.post("/register", encodedBodyParser, (req, res) => {
  try {
    const { name, username, password } = req.body;

    logic.registerUser(name, username, password);

    res.redirect("/login");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
});

server.post("/login", encodedBodyParser, (req, res) => {
  const { username, password } = req.body;
  try {
    const userId = logic.authenticateUser(username, password);

    res.setHeader("Set-Cookie", `userId=${userId}`);

    res.redirect("/home");
  } catch (error) {
    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Login</title>
            </head>

            <body>
                <form action="/login" method="post">
                    <label for="username">Username</label>
                    <input type="text" name="username" value="${username}">

                    <label for="password">Password</label>
                    <input type="password" name="password">

                    <button type="submit">Login</button>
                </form>

                <p>${error.message}</p>
                
                <a href="/register">Register</a>
            </body>
        </html>
    `);
  }
});

server.post("/logout", (req, res) => {
  res.clearCookie("userId");

  res.redirect("/login");
});

server.listen(port, () => `server listening in port ${port}`);
