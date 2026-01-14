class Component {
    constructor (tagName) {
        this.container = document.createElement(tagName)
    }

    add (child) {
        this.container.appendChild(child.container)
    }

    remove (child) {
        this.container.removeChild(child.container)
    }

    addClickListener (listener) {
        this.container.addEventListener('click', listener)
    }

    addSubmitListener (callback) {
        this.container.addEventListener('submit', callback)
    }

    setText (text) {
        this.container.textContent = text
    }

    setType (type) {
        this.container.type = type
    }
}