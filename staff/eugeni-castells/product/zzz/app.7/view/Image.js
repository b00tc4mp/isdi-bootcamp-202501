function Image(src) {
  Component.call(this, "img");
  this.container.src = src;
}

Image.prototype = Object.create(Component.prototype);
Image.prototype.constructor = Image;

Image.prototype.setImageURL = function (src) {
  this.container.src = src;
};
