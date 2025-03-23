import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

client
  .connect()
  .then(() => {
    const db = client.db("test");

    const users = db.collection("users");
    const posts = db.collection("posts");

    return Promise.all([users.deleteMany(), posts.deleteMany()])
      .then(() => {
        return users.insertMany([
          {
            name: "Luciano",
            email: "luciano@marrano",
            username: "lucho",
            password: "123123123",
          },
          {
            name: "Aaron",
            email: "aaron@sabroson",
            username: "aaron",
            password: "123123123",
          },
          {
            name: "Masha",
            email: "masha@nova",
            username: "mashinski",
            password: "123123123",
          },
        ]);
      })
      .then((result) => {
        const { 0: luchoId, 1: aaronId, 2: mashaId } = result.insertedIds;

        return posts.insertMany([
          {
            image:
              "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjNlYnJzbXZlM245eGhub3M2MWg4ZmppdnVnNmt1MXVjbjNvNTM5ZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/TTPi3fB9F5Aqs/giphy.gif",
            text: "beast",
            author: luchoId,
            createdAt: new Date(),
            modifiedAt: null,
            likes: [mashaId],
          },
          {
            image:
              "https://media.giphy.com/media/IfQEkiEmaruqKTm8KA/giphy.gif?cid=ecf05e47ncv1fwr1zpkt12ex5pwl520fbfsc1zgcmg682n1j&ep=v1_gifs_search&rid=giphy.gif&ct=g",
            text: "smooth",
            author: mashaId,
            createdAt: new Date(),
            modifiedAt: null,
            likes: [aaronId],
          },
        ]);
      })
      .then((result) => {
        console.log(result);
      });
  })
  .finally(() => client.close());
