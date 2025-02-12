function Home() {
  Component.call(this, "div");
  this.setStyle(style.homeContainerStyle);
  var logo = new Header("1", "Logo");
  this.logo = logo;

  this.add(logo);

  var logoutButton = new Button("Logout");
  logoutButton.setStyle(style.logoutButton);
  logoutButton.addClickListener(
    function () {
      logic.setOfflineUser();
      this.logoutClickListener();
    }.bind(this)
  );
  this.add(logoutButton);

  var sectionWrapper = new Div();
  sectionWrapper.setStyle(style.sectionWrapperStyle);

  this.add(sectionWrapper);
}

Home.prototype = Object.create(Component.prototype);
Home.prototype.constructor = Home;

Home.prototype.addLogoClickListener = function (listener) {
  this.logo.addClickListener(listener);
};

Home.prototype.addLogoutClickListener = function (listener) {
  this.logoutClickListener = listener;
};
