class Component {
    constructor(tagName) {
        this.container = document.createElement(tagName)
    }

    add = function (child) {
        this.container.appendChild(child.container)
    }

    remove = function (child) {
        this.container.removeChild(child.container)
    }

    addClickListener = function (callback) {
        this.container.addEventListener('click', callback)
    }
}