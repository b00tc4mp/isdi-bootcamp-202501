import { Collection } from "./Collection.js";

const users = new Collection("users");
const posts = new Collection("posts");

//GET ALL
// console.log(users.getAll());
// console.log(posts.getAll());

//SETALL
// users.setAll([
//   {
//     name: "eugeni",
//     email: "eugeni@castells.com",
//     username: "castells",
//     password: "123123123",
//     createdAt: "2025-03-07T11:53:37.702Z",
//     modifiedAt: null,
//     id: "4h3lrd6j0j.e",
//   },
// ]);

// console.log(users);

// posts.setAll([
//   {
//     author: "3cc0nr16w1.b",
//     image: "https://i.gifer.com/MEkr.gif",
//     text: "tortellini",
//     createdAt: "2025-03-08T11:15:05.913Z",
//     modifiedAt: "2025-03-08T11:15:26.102Z",
//     likes: ["4h3lrd6j0j.e"],
//     id: "301fg823zb.m",
//   },
// ]);

// console.log(posts);

//GET BY ID
// console.log("userById", users.getById("7odunezhz0.9"));
// console.log("userById", users.getById("sdsd.9"));
// console.log("postById", posts.getById("301fg823zb.m"));
// console.log("postById", posts.getById("rgrg.m"));

//INSERT ONE
// users.insertOne({
//   name: "aaron",
//   email: "aaron@sabroson.com",
//   username: "aaronski",
//   password: "123123123",
// });
// console.log(users);

// posts.insertOne({
//   name: "aaron",
//   email: "aaron@sabroson.com",
//   username: "aaronski",
//   password: "123123123",
// });
// console.log(posts);

//FIND ONE
// console.log(users.findOne((user) => user.username === "castells"));

// console.log(
//   posts.findOne((post) => {
//     return post.author === "3cc0nr16w1.b";
//   })
// );

// users.updateOne({
//   name: "enric",
//   email: "eugeni@castells.com",
//   username: "castells",
//   password: "123123123",
//   createdAt: "2025-03-07T11:53:37.702Z",
//   modifiedAt: null,
//   id: "4h3lrd6j0j.e",
// });

// posts.updateOne({
//   author: "3cc0nr16w1.b",
//   image: "https://i.gifer.com/MEkr.gif",
//   text: "spaguettini",
//   createdAt: "2025-03-08T11:15:05.913Z",
//   modifiedAt: "2025-03-08T11:15:26.102Z",
//   likes: ["4h3lrd6j0j.e"],
//   id: "301fg823zb.m",
// });

// users.deleteOne((user) => user.id === "4h3lrd6j0j.e");

// posts.deleteOne((post) => post.author === "3cc0nr16w1.b");
