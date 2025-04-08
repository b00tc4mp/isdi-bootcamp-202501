function Paragraph(text) {
  TextComponent.call(this, "p", text);
}

Paragraph.prototype = Object.create(TextComponent.prototype);
Paragraph.prototype.constructor = Paragraph;
