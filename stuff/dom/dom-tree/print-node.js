function printNode(node, level) {
    var spaces = ''

    for (var i = 0; i < level; i++)
        spaces += ' '

    console.log(spaces + node.constructor.name)

    for (var i = 0; i < node.childNodes.length; i++) {
        var childNode = node.childNodes[i]

        printNode(childNode, level + 1)
    }
}

printNode(document, 0)

/*
HTMLDocument
VM5405:7  DocumentType
VM5405:7  HTMLHtmlElement
VM5405:7   HTMLHeadElement
VM5405:7    Text
VM5405:7    HTMLTitleElement
VM5405:7     Text
VM5405:7    Text
VM5405:7   Text
VM5405:7   HTMLBodyElement
VM5405:7    Text
VM5405:7    HTMLHeadingElement
VM5405:7     Text
VM5405:7    Text
*/