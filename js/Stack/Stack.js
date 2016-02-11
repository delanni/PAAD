var Stack = function () {

};

Stack.prototype = {
    get size() {
        return this.__size;
    },
    __size: 0,
    __items: []
};

Stack.prototype.push = function (el) {
    this.__items[this.size] = el;
    this.__size += 1;
};


Stack.prototype.pop = function () {
    if (this.size == 0) return;

    this.__size -= 1;
    var el = this.__items[this.size];
    this.__items[this.size] = null;
    return el;
};

Stack.prototype.duplicate = function () {
    this.push(this.peek());
};

Stack.prototype.peek = function () {
    return this.__items[this.size - 1];
};

Stack.prototype.__shift = function () {
    var el = this.__items[0];

    for (var i = 0; i < this.size - 1; i++) {
        this.__items[i] = this.__items[i + 1];
    }
    this.__size -= 1;

    return el;
};

Stack.prototype.__unshift = function (el) {
    for (var i = this.size; i > 0; i--) {
        this.__items[i] = this.__items[i - 1];
    }
    this.__items[0] = el;
    this.__size += 1;
};

Stack.prototype.rotate = function (n) {
    if (!n) return;
    if (n < 0) {
        while (n++) {
            var bottom = this.__shift();
            this.push(bottom);
        }
    } else {
        while (n--) {
            var top = this.pop();
            this.__unshift(top);
        }
    }
};