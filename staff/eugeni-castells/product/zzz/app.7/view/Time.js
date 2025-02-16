function Time() {
  Component.call(this, "time");
}

Time.prototype = Object.create(Component.prototype);
Time.prototype.constructor = Time;
