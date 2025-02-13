console.clear();
console.log("Hello, App!");

// var body = document.createElement('body')
var body = new Body();
body.container = document.body;
document.body.style.margin = 0;

// var main = document.createElement('main')
var main = new Main();
body.add(main);

var landing = new Landing();
landing.addLoginSubmitListener(function () {
  main.remove(landing);
  main.add(home);
});
landing.addRegisterClickListener(function () {
  main.remove(landing);
  main.add(register);
});
main.add(landing);

var register = new Register();
register.addRegisterSubmitListener(function () {
  main.remove(register);
  main.add(landing);
});
register.addLandingClickListener(function () {
  main.remove(register);
  main.add(landing);
});

var home = new Home();
home.addHomeClickListener(function () {
  main.remove(home);
  main.add(landing);
});


