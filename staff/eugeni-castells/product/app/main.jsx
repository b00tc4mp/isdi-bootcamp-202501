var Landing = require("./view/Landing");

data.users = JSON.parse(localStorage.getItem("users"));
data.posts = JSON.parse(localStorage.getItem("posts"));

function App() {
  return (
    <>
      <div>Eureka</div>
      <Landing />
    </>
  );
}

const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
// function removeItemAddItem(itemToRemove, itemToAdd) {
//   body.remove(itemToRemove);
//   body.add(itemToAdd);
// }

// const body = new Body();
// body.container = document.body;

// const landing = new Landing();

// landing.addRegisterClickListener(function () {
//   removeItemAddItem(landing, register);
// });

// landing.addClickLoginListener(function () {
//   removeItemAddItem(landing, login);
// });
// body.add(landing);

// const register = new Register();

// register.addRegisterSubmitListener(function () {
//   removeItemAddItem(register, login);
// });

// register.addLoginClickListener(function () {
//   removeItemAddItem(register, login);
// });

// const login = new Login();

// login.addRegisterClickListener(function () {
//   removeItemAddItem(login, register);
// });

// login.addLoginSubmitListener(function () {
//   try {
//     const name = logic.getOnlineUserName();

//     home.setWelcomeText("Hello, " + name + "!");

//     const posts = logic.getPosts();

//     home.setPosts(posts);

//     removeItemAddItem(login, home);
//   } catch (error) {
//     console.error(error);
//     alert(error.message);
//   }
// });

// const home = new Home();

// home.addLogoClickListener(function () {
//   removeItemAddItem(home, landing);
// });

// home.addLogoutClickListener(function () {
//   removeItemAddItem(home, login);
// });

// // home.addCreatePostClickListener(function () {
// //   removeItemAddItem(home, createPost);
// // });

// // const createPost = new CreatePost();

// // createPost.addCreatePostSubmitListener(function () {
// //   removeItemAddItem(createPost, home);
// // });
