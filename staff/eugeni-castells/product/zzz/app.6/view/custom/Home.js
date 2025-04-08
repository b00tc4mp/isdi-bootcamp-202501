function Home() {
  Component.call(this, "div");
  this.setStyle(style.homeContainerStyle);
  var logo = new Header("1", "Logo");
  this.logo = logo;

  this.add(logo);

  var sectionWrapper = new Div();
  sectionWrapper.setStyle(style.sectionWrapperStyle);

  this.add(sectionWrapper);
}

Home.prototype = Object.create(Component.prototype);
Home.prototype.constructor = Home;

Home.prototype.addLogoClickListener = function (listener) {
  this.logo.addClickListener(listener);
};
