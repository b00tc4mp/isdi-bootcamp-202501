function Section() {
  Component.call(this, "div");
}

Section.prototype = Object.create(Component.prototype);
Section.prototype.constructor = Section;
