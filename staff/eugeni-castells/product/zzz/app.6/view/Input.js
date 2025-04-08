function Input(type) {
  Component.call(this, "input");
  this.container.type = type;
}

Input.prototype = Object.create(Component.prototype);
Input.prototype.constructor = Input;

Input.prototype.getValue = function () {
  return this.container.value;
};
