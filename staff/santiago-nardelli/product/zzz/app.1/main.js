console.log("Hello, App!");


//AQUI MANEJO TODO LO RELACIONADO AL DOM

//Remplazo el body por un contenedor
const body = new Body();
body.container = document.body;
document.body.style.margin = 0;

//creo el main y lo agrego al body
const main = new Main();
body.add(main);


//Vista y navegaciopn de Landing&Login
const landing = new Landing();
landing.addLoginSubmitListener(function () {

  
  home.loadUserName()
  home.setPosts()
  
  main.remove(landing);
  main.add(home);
});
landing.addRegisterClickListener(function () {
  main.remove(landing);
  main.add(register);
});
main.add(landing);





const register = new Register();
register.addRegisterSubmitListener(function () {
  main.remove(register);
  main.add(landing);
});
register.addLandingClickListener(function () {
  main.remove(register);
  main.add(landing);
});

const home = new Home();
home.addHomeClickListener(function () {
  main.remove(home);
  main.add(landing);
});


/*
tarea para el finde de semana:
0- modificar el try catch del main y sacar esa dependiencia hacia el home 
1- crear el componente Post y incorporarlo en la vista Home 
va a ser un button que me permita acceder a la vista PostCreate y dentro del mismo crear jun formulario para crear un post que yo le pueda acceder titulo y url de la imagen y texto del post
1.1 crear la logicas necesarias para poder crear un post
2- crear la vista PostCreate
3- crear la vista PostDetail
4- crear la vista PostEdit
5- crear la vista PostList
6- crear la vista PostSearch
7- crear la vista PostDelete
8- crear la vista PostUpdate
9- crear la vista PostLike
10- crear la vista PostComment
11- crear la vista PostShare
2- pasar todas mis functiom constructoras a class constructoras

*/