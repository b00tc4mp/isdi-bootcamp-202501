import "dotenv/config.js";
import { data, User, Post } from "./index.js";
import bcrypt from "bcryptjs";

const { MONGO_URL, MONGO_DB } = process.env;

data
  .connect(MONGO_URL, MONGO_DB)
  .then(() => {
    return Promise.all([User.deleteMany(), Post.deleteMany()])
      .then(() => {
        return bcrypt
          .hash("123123123", 10)
          .catch((error) => {
            throw new SystemError(error.message);
          })
          .then((hash) => {
            return User.insertMany([
              {
                name: "Luciano",
                email: "luciano@marrano.com",
                username: "lucho",
                password: hash,
              },
              {
                name: "Aaron",
                email: "aaron@sabroson.com",
                username: "aaron",
                password: hash,
              },
              {
                name: "Masha",
                email: "masha@nova.com",
                username: "mashinski",
                password: hash,
              },
            ]);
          });
      })
      .then((result) => {
        const [{ _id: luchoId }, { _id: aaronId }, { _id: mashaId }] = result;

        return Post.insertMany([
          {
            image:
              "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjNlYnJzbXZlM245eGhub3M2MWg4ZmppdnVnNmt1MXVjbjNvNTM5ZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/TTPi3fB9F5Aqs/giphy.gif",
            text: "work",
            author: luchoId,
            likes: [mashaId],
          },
          {
            image:
              "https://media.giphy.com/media/IfQEkiEmaruqKTm8KA/giphy.gif?cid=ecf05e47ncv1fwr1zpkt12ex5pwl520fbfsc1zgcmg682n1j&ep=v1_gifs_search&rid=giphy.gif&ct=g",
            text: "smooth",
            author: mashaId,
            likes: [aaronId],
          },
        ]);
      })
      .then((result) => {
        console.log(result);
      });
  })
  .finally(() => data.disconnect());
