import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

client
  .connect()
  .then(() => {
    const db = client.db("test");

    const users = db.collection("users");
    const posts = db.collection("posts");

    return users.insertOne({
      name: "Lucho",
      email: "lucho@trucho.com",
      username: "el pectis",
      password: "123123123",
    });
  })
  .then((result) => {
    console.log(result);
  })
  .finally(() => client.close());
