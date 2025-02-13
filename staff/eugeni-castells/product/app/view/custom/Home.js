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

  var welcomeTextHeader = new Header(2);
  this.welcomeTextHeader = welcomeTextHeader;
  this.add(welcomeTextHeader);

  var postsSection = new Section();
  this.postsSection = postsSection;
  this.add(postsSection);

  var createPostButton = new Button("+");
  createPostButton.setStyle(style.createPostButton);
  this.add(createPostButton);
  this.createPostButton = createPostButton;
}

Home.prototype = Object.create(Component.prototype);
Home.prototype.constructor = Home;

Home.prototype.addLogoClickListener = function (listener) {
  this.logo.addClickListener(listener);
};

Home.prototype.addLogoutClickListener = function (listener) {
  this.logoutClickListener = listener;
};

Home.prototype.setWelcomeText = function (text) {
  this.welcomeTextHeader.setText(text);
};

Home.prototype.setPosts = function (posts) {
  for (var i = 0; i < posts.length; i++) {
    var post = new Post(posts[i]);

    this.postsSection.add(post);
  }
};

Home.prototype.addCreatePostClickListener = function (listener) {
  this.createPostButton.addClickListener(listener);
};
