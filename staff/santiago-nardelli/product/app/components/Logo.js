function Logo() {
    Component.call(this, "div");
  }
  Logo.prototype = Object.create(Component.prototype);
  Logo.prototype.constructor = Logo;