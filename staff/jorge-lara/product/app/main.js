console.clear()


// WEBSITE INITIALIZATION //
const body = new Body();
document.body = body.container

let landing = new Landing();
body.add(landing);

let register = new Register();
let login = new Login();
let home = new Home();
