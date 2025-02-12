data.users = JSON.parse(localStorage.getItem("users"));

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
  removeItemAddItem(login, home);
});

var home = new Home();
home.addLogoClickListener(function () {
  removeItemAddItem(home, landing);
});

home.addLogoutClickListener(function () {
  removeItemAddItem(home, login);
});
