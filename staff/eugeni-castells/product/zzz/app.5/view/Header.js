function Header(level, text) {
  TextComponent.call(this, `h${level}`, text);
}

Header.prototype = Object.create(TextComponent.prototype); //Copia el prototype de Component, no el contingut de component.
// Header.constructor
Header.prototype.constructor = Header;
