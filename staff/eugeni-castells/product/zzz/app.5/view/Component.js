function Component(tag) {
  this.container = document.createElement(tag);
}

Component.prototype.add = function (child) {
  this.container.appendChild(child.container);
};

Component.prototype.clickListener = function (callback) {
  this.container.addEventListener("click", callback);
};

Component.prototype.submitListener = function (callback) {
  this.container.addEventListener("submit", callback);
};
Component.prototype.setStyle = function (stylesObject) {
  for (var styleName in stylesObject) {
    this.container.style[styleName] = stylesObject[styleName];
  }
};
