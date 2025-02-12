// --- FATHER COMPONENT --- 
function Component(tagName) {
    this.container = document.createElement(tagName)
}

// --- FATHER COMPONENT FUNCTIONS ---
Component.prototype.add = function (child) {
    this.container.appendChild(child.container)
}

Component.prototype.remove = function (child) {
    this.container.removeChild(child.container)
}

Component.prototype.addClickListener = function (callback) {
    this.container.addEventListener('click', callback)
}
