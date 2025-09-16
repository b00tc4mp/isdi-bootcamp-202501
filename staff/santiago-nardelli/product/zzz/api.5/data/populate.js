import "dotenv/config";
import { data, User, Post } from "../data/index.js";
import bcrypt from "bcryptjs";

const { URL_MONGO, DB_NAME } = process.env;

data
  .connect(URL_MONGO, DB_NAME)
  .then(() => {
    return Promise.all([User.deleteMany({}), Post.deleteMany({})])
      .then(() => bcrypt.hash("123123123", 10))
      .then((hash) => {
        return User.insertMany([
          {
            name: "Diego Maradona",
            email: "diego@maradona.com",
            password: hash,
          },
          { name: "Lio Messi", email: "lio@messi.com", password: hash },
          { name: "Julian Alvarez", email: "julian@alv.com", password: hash },
          { name: "Rodigo De Paul", email: "rodri@depaul.com", password: hash },
          { name: "Emiliano Martinez", email: "emi@dibu.com", password: hash },
          { name: "Enzo Fernandez", email: "enzo@fer.com", password: hash },
        ]);
      })
      .then(([diego, lio, enzo, rodrigo, julian, emiliano]) => {
        return Post.insertMany([
          {
            author: diego.id,
            image:
              "https://media.giphy.com/media/sTczweWUTxLqg/giphy.gif?cid=790b7611mnwf959ak21rbewl2jsp9b2a8wu6x7vxif4eism5&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
            text: "free day!",
            likes: [lio.id, rodrigo.id]
          },
          {
            author: enzo.id,
            image:
              "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW53Zjk1OWFrMjFyYmV3bDJqc3A5YjJhOHd1Nng3dnhpZjRlaXNtNSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/uQgXjl505BdYAv8H0X/giphy.gif",
            text: "i am free!",
            likes: [diego.id, lio.id],},
          {
            author: emiliano.id,
            image:
              "https://media.giphy.com/media/yoJC2GnSClbPOkV0eA/giphy.gif?cid=790b7611mnwf959ak21rbewl2jsp9b2a8wu6x7vxif4eism5&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
            text: "so happy for you... mf",
            likes: [julian.id],
          },
        ]);
      });
  })
  .finally(() => data.disconnect());
