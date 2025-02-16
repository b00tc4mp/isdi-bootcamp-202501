class Component {
    constructor(tag) {
        this.container = document.createElement(tag);
    }

    add(child) {
        this.container.appendChild(child.container);
    }

    remove(child) {
        this.container.removeChild(child.container);
    }

    addClickListener(callback) {
        this.container.addEventListener('click', callback)
    }
}