data.users = JSON.parse(localStorage.getItem("users"));
data.posts = JSON.parse(localStorage.getItem("posts"));

function removeItemAddItem(itemToRemove, itemToAdd) {
  body.remove(itemToRemove);
  body.add(itemToAdd);
}

const body = new Body();
body.container = document.body;

var landing = new Landing();

landing.addRegisterClickListener(function () {
  removeItemAddItem(landing, register);
});

landing.addClickLoginListener(function () {
  removeItemAddItem(landing, login);
});
body.add(landing);

var register = new Register();

register.addRegisterSubmitListener(function () {
  removeItemAddItem(register, login);
});

register.addLoginClickListener(function () {
  removeItemAddItem(register, login);
});

var login = new Login();

login.addRegisterClickListener(function () {
  removeItemAddItem(login, register);
});

login.addLoginSubmitListener(function () {
  try {
    const name = logic.getUserName();

    home.setWelcomeText("Hello, " + name + "!");

    const posts = logic.getPosts();

    home.setPosts(posts);

    removeItemAddItem(login, home);
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
});

var home = new Home();

home.addLogoClickListener(function () {
  removeItemAddItem(home, landing);
});

home.addLogoutClickListener(function () {
  removeItemAddItem(home, login);
});

home.addCreatePostClickListener(function () {
  removeItemAddItem(home, createPost);
});

var createPost = new CreatePost();

createPost.addCreatePostSubmitListener(function () {
  removeItemAddItem(createPost, home);
});
