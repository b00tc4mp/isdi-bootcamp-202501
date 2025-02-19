Array.prototype.join = function (element) {
    let string = '';
    let separator = (element === undefined) ? ',' : element
    for (let i = 0; i < this.length; i++) {
        if (i === 0){
            string += this[i]
        }else{
            string += `${separator}${this[i]}`;
        }
    }
    return string;
}