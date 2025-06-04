function Form() {
  Component.call(this, "form");
}

Form.prototype = Object.create(Component.prototype);
Form.prototype.constructor = Form;

Form.prototype.addSubmitListener = function (listener) {
  this.container.addEventListener("submit", listener);
};
