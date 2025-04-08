function Body() {
  Component.call(this, "body");
}

Body.prototype = Object.create(Component.prototype);
Body.prototype.constructor = Body;
