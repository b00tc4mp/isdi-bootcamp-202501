function printElement(element, level) {
    var spaces = ''

    for (var i = 0; i < level; i++)
        spaces += ' '

    console.log(spaces + element.tagName + ' (' + element.constructor.name + ')')

    for (var i = 0; i < element.children.length; i++) {
        var childElement = element.children[i]

        printElement(childElement, level + 1)
    }
}

printElement(document, 0)

/*
VM66:7 undefined (HTMLDocument)
VM66:7  HTML (HTMLHtmlElement)
VM66:7   HEAD (HTMLHeadElement)
VM66:7    TITLE (HTMLTitleElement)
VM66:7   BODY (HTMLBodyElement)
VM66:7    HEADER (HTMLElement)
VM66:7     H1 (HTMLHeadingElement)
VM66:7     IMG (HTMLImageElement)
*/