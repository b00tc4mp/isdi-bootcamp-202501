import { DataManagger } from "./DataManagger.js";

const users = new DataManagger("users");
const posts = new DataManagger("posts");

//console.log(users.getAll());
//console.log(posts.getAll());

// users.setAll([{
//     name: 'Lionel Messi',
//     email: 'lio@messi.com',
//     password: '123456',
//     created_at: new Date(),
//     modified_at: null,
//     status: 'active',
//     role: 'user'

// }]);

//  users.insertOne({
//      name: 'Sampaoli',
//      email: 'pelado@sampaoli',
//      password : '123456',
//      created_at: new Date(),
//      modified_at: null,
//      status: 'active',
//      role: 'user'
//  });

//console.log(users.getById('m7yy45qb-rv1cg9xnbg'));

//console.log(users.findOne((user) => user.email === 'lio@messi.com'))

// console.log(
//   users.updateOne((user) => user.email === "lio@messi.com", {
//     id: "m834iqai-q9g8acf555p",
//     name: "Lionel Messi",
//     email: "lio@messi.com",
//     password: "123456",
//     created_at: "2025-03-12T18:53:11.677Z",
//     modified_at: null,
//     status: "enabled",
//     role: "user",
//   })
// );


//console.log(users.deleteOne((user) => user.email === 'pelado@sampaoli'));