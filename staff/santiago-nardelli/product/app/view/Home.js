function Home() {
  Component.call(this, "section");
  this.container.style.display = "grid";
  this.container.style.gridTemplateAreas = `
      "sidebar navbar"
      "sidebar content"
    `;
  this.container.style.gridTemplateRows = "auto 1fr";
  this.container.style.gridTemplateColumns = " 100px auto";
  this.container.style.height = "auto";
  this.container.style.width = "100%";

  var sidebar = new Div();
  sidebar.container.style.gridArea = "sidebar";
  sidebar.container.style.display = "flex";
  sidebar.container.style.flexDirection = "column";
  sidebar.container.style.padding = "20px";
  this.add(sidebar);

  var logoHomeIcon = new Icon();
  logoHomeIcon.container.className = "fa-solid fa-user-secret";
  logoHomeIcon.container.style.fontSize = "50px";
  logoHomeIcon.container.style.color = "#00d4ff";
  logoHomeIcon.container.style.marginBottom = "20px";
  this.logoHomeIcon = logoHomeIcon;
  sidebar.add(logoHomeIcon);

  var logoHomeIcon = new Icon();
  logoHomeIcon.container.className = "fa-solid fa-user-secret";
  logoHomeIcon.container.style.fontSize = "50px";
  logoHomeIcon.container.style.color = "#00d4ff";
  logoHomeIcon.container.style.marginBottom = "20px";
  sidebar.add(logoHomeIcon);

  var logoHeartIcon = new Icon();
  logoHeartIcon.container.className = "fa-solid fa-heart";
  logoHeartIcon.container.style.fontSize = "50px";
  logoHeartIcon.container.style.color = "#00d4ff";
  logoHeartIcon.container.style.marginBottom = "20px";
  sidebar.add(logoHeartIcon);

  var logoMesseageIcon = new Icon();
  logoMesseageIcon.container.className = "fa-solid fa-comments";
  logoMesseageIcon.container.style.fontSize = "50px";
  logoMesseageIcon.container.style.color = "#00d4ff";
  logoMesseageIcon.container.style.marginBottom = "20px";
  sidebar.add(logoMesseageIcon);

  var logoSearchIcon = new Icon();
  logoSearchIcon.container.className = "fa-solid fa-magnifying-glass";
  logoSearchIcon.container.style.fontSize = "50px";
  logoSearchIcon.container.style.color = "#00d4ff";
  logoSearchIcon.container.style.marginBottom = "20px";
  sidebar.add(logoSearchIcon);

  var logoLinkIcon = new Icon();
  logoLinkIcon.container.className = "fa-solid fa-link";
  logoLinkIcon.container.style.fontSize = "50px";
  logoLinkIcon.container.style.color = "#00d4ff";
  logoLinkIcon.container.style.marginBottom = "20px";
  sidebar.add(logoLinkIcon);

  var logoMenuIcon = new Icon();
  logoMenuIcon.container.className = "fa-solid fa-bars";
  logoMenuIcon.container.style.fontSize = "50px";
  logoMenuIcon.container.style.color = "#00d4ff";
  logoMenuIcon.container.style.marginBottom = "20px";
  sidebar.add(logoMenuIcon);

  var logoSettingsIcon = new Icon();
  logoSettingsIcon.container.className = "fa-solid fa-cog";
  logoSettingsIcon.container.style.fontSize = "50px";
  logoSettingsIcon.container.style.color = "#00d4ff";
  logoSettingsIcon.container.style.marginBottom = "20px";
  sidebar.add(logoSettingsIcon);

  var navbar = new Div();
  navbar.container.style.gridArea = "navbar";
  navbar.container.style.display = "flex";
  navbar.container.style.justifyContent = "space-between";
  navbar.container.style.alignItems = "center";
  navbar.container.style.padding = "20px";
  navbar.container.style.flexDirection = "row";
  navbar.container.style.backgroundColor = "#1a1a1a";
  navbar.container.style.width = "100%";
  navbar.container.style.height = "50px";
  navbar.container.style.marginTop = "20px";
  this.add(navbar);

  for (i = 0; i < 12; i++) {
    var navbarIcon = new Icon();
    navbarIcon.container.className = "fa-solid fa-user";
    navbarIcon.container.style.fontSize = "20px";
    navbarIcon.container.style.color = "#00d4ff";
    navbar.add(navbarIcon);
  }

  var content = new Div();
  content.container.style.gridArea = "content";
  content.container.style.display = "flex";
  content.container.style.justifyContent = "space-between";
  content.container.style.alignItems = "center";
  content.container.style.padding = "20px";
  content.container.style.flexDirection = "column";
  content.container.style.backgroundColor = "#1a1a1a";
  content.container.style.width = "100%";
  content.container.style.height = "100%";
  content.container.style.marginTop = "20px";
  this.add(content);

  var contentTitle = new Heading(1);
  contentTitle.setText("Home");
  content.add(contentTitle);

  var contentText = new Span();
  contentText.container.textContent = "Bienvenido a la sección de Home";
  content.add(contentText);
}

Home.prototype = Object.create(Component.prototype);
Home.prototype.constructor = Home;

Home.prototype.addHomeClickListener = function (listener) {
  this.logoHomeIcon.addClickListener(listener);
};
