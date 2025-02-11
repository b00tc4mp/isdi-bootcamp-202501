// WEBSITE INITIALIZATION //
const body = new Body();
document.body = body.container;

let landing = new Landing();
body.add(landing);

landing.addRegisterClickListener(function () {
    body.remove(landing);
    body.add(register);
});

landing.addLoginClickListener(function () {
    body.remove(landing);
    body.add(login);
});

let register = new Register();

register.addLoginClickListener(function () {
    body.remove(register);
    body.add(login);
})

register.addRegisterSubmitListener(function () {
    body.remove(register);
    body.add(login);
});

let login = new Login();

login.addRegisterClickListener(function () {
    body.remove(login);
    body.add(register);
})

login.addLoginSubmitListener(function () {
    body.remove(login);
    body.add(home);
})

let home = new Home();

home.addSignoutClickListener(function () {
    body.remove(home);
    body.add(landing);
})
