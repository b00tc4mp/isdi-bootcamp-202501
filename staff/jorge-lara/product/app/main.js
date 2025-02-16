// WEBSITE INITIALIZATION //
const body = new Body();
document.body = body.container;

const landing = new Landing();
body.add(landing);

landing.addRegisterClickListener(function () {
    body.remove(landing);
    body.add(register);
});

landing.addLoginClickListener(function () {
    body.remove(landing);
    body.add(login);
});

const register = new Register();
register.addLoginClickListener(function () {
    body.remove(register);
    body.add(login);
})

register.addRegisterSubmitListener(function () {
    body.remove(register);
    body.add(login);
});

const login = new Login();
login.addRegisterClickListener(function () {
    body.remove(login);
    body.add(register);
})

login.addLoginSubmitListener(function () {
    try {
        const user = logic.getLoggedUser();

        home.setUserLoggedText(`Current user: ${user}!`);

        const posts = logic.getPosts()

        home.loadPosts(posts);

        body.remove(login);
        body.add(home);
    } catch (error) {
        console.error(error);

        alert(error.message);
    }
})

let home = new Home();
home.addSignoutClickListener(function () {
    body.remove(home);
    body.add(landing);
})

home.addPostClickListener(function (){
    body.remove(home);
    body.add(createPost)
})

let createPost = new CreatePost();

createPost.addCancelClickListener(function (){
    body.remove(createPost);
    body.add(home);
})

createPost.addCreatePostSubmitListener(function (){
    body.remove(createPost);
    const posts = logic.getPosts();

    home.loadPosts(posts);
    body.add(home);
})