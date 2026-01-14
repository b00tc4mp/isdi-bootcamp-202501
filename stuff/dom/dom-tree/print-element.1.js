debugger

function printElement(element, level) {
    var spaces = ''

    for (var i = 0; i < level; i++)
        spaces += ' '

    console.log(spaces + element.constructor.name)

    for (var i = 0; i < element.children.length; i++) {
        var childElement = element.children[i]

        printElement(childElement, level + 1)
    }
}

printElement(document, 0)

/*
HTMLDocument
VM5408:7  HTMLHtmlElement
VM5408:7   HTMLHeadElement
VM5408:7    HTMLTitleElement
VM5408:7   HTMLBodyElement
VM5408:7    HTMLHeadingElement
*/