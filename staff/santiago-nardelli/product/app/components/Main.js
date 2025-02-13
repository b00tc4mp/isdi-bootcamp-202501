function Main() {
    Component.call(this, "main");
    this.container.style.display = "flex";
    this.container.style.flexDirection = "column";
    this.container.style.alignItems = "center";
    this.container.style.backgroundColor = "#1a1a1a";
    this.container.style.width = "100vw";
    this.container.style.height = "100vh";
  }
  Main.prototype = Object.create(Component.prototype);
  Main.prototype.constructor = Main;
  