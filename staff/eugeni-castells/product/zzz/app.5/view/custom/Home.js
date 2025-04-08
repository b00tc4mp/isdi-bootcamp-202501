function Home() {
  Component.call(this, "div");
  this.container.style.padding = "1rem";
  var logo = new Header("1", "Logo");
  logo.container.addEventListener(
    "click",
    function () {
      document.body.removeChild(this.container);
      document.body.appendChild(landing.container);
    }.bind(this)
  );
  this.add(logo);

  var sectionWrapper = new Div();
  sectionWrapper.container.style.width = "calc(100vw - 2rem)";
  sectionWrapper.container.style.height = "150px";
  sectionWrapper.container.style.backgroundColor = "gray";

  this.add(sectionWrapper);
}

Home.prototype = Object.create(Component.prototype);
Home.prototype.constructor = Home;
