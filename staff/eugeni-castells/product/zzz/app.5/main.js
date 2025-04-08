document.body.style.margin = "0";
//data

var screenStyle = { height: "100vh", padding: "2rem" };

var formStyle = { display: "flex", flexDirection: "column", gap: "1rem" };

var formFieldStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "5px",
};

var buttonWrapperStyle = {
  display: "flex",
  justifyContent: "space-between",
};

var mainButtonStyle = {
  width: "65px",
  backgroundColor: "black",
  color: "white",
  padding: "5px",
};

var secondaryButtonStyle = {
  width: "auto",
  padding: "5px",
};
var loginFormData = {
  username: "",
  password: "",
};

var registerFormData = {
  name: "",
  email: "",
  username: "",
  password: "",
};

var users = [];
users = JSON.parse(localStorage.getItem("users"));

//functions
function handleClickNavigation(itemToRemove, itemToShow) {
  document.body.removeChild(itemToRemove.container);
  document.body.appendChild(itemToShow.container);
}

function handleKeydown(callback) {
  this.container;
}

const body = new Body();
document.body = body.container;

var landing = new Landing();

body.add(landing);

// register

var register = new Register();

// login

var login = new Login();
// home

var home = new Home();

//global styles
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
