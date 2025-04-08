class Component {
  constructor(tag) {
    this.container = document.createElement(tag);
  }
  add = function (child) {
    this.container.appendChild(child.container);
  };

  remove = function (child) {
    this.container.removeChild(child.container);
  };

  addClickListener = function (callback) {
    this.container.addEventListener("click", callback);
  };

  submitListener = function (callback) {
    this.container.addEventListener("submit", callback);
  };

  setStyle = function (stylesObject) {
    for (const styleName in stylesObject) {
      this.container.style[styleName] = stylesObject[styleName];
    }
  };
}
