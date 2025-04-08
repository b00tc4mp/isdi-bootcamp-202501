data.users = JSON.parse(localStorage.getItem("users"));

function removeItemAddItem(itemToRemove, itemToAdd) {
  body.remove(itemToRemove);
  body.add(itemToAdd);
}

const body = new Body();
document.body = body.container;

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

var styledLinks = document.getElementsByTagName("a");

for (var i = 0; i < styledLinks.length; i++) {
  console.log(styledLinks[i]);
  styledLinks[i].style.textDecoration = "underline";
  styledLinks[i].style.color = "black";
  styledLinks[i].style.fontSize = "30px";
}

var styledSpans = document.getElementsByTagName("span");

for (var i = 0; i < styledSpans.length; i++) {
  styledSpans[i].style.color = "black";
  styledSpans[i].style.fontSize = "26px";
}
