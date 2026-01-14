class Component {
    constructor(tagName) {
        this.container = document.createElement(tagName)
    }

    add(child) {
        this.container.appendChild(child.container)
    }

    remove(child) {
        this.container.removeChild(child.container)
    }

    addClickListener(callback) {
        this.container.addEventListener('click', callback)
    }
}