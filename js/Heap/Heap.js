var Heap = function (keyFn) {
    this._items = [];
    this._keys = [];
    this.size = 0;
    this.isEmpty = true;
    this._hash = (keyFn || this._defaultKey);
};

Heap.fromArray = function (array, keyFn) {
    var h = new Heap(keyFn);
    h.push.apply(h, array);
    return h;
};

Heap.prototype.drain = function (other) {
    while(!other.isEmpty){
        this.push(other.pop());
    }
};

Heap.prototype.peek = function () {
    return this._items[0];
};

Heap.prototype.push = function (el) {
    if (arguments.length > 1){
        var _this = this;
        [].slice.call(arguments).forEach(function(a){
            _this.push(a);
        });
    } else {
        var key = this._hash(el);
        this._attach(key, el);
    }
};

Heap.prototype.pop = function () {
    var el = this._items[0];
    var key = this._keys[0];
    this.delete(key);
    return el;
};

Heap.prototype._heapDown = function (idx) {
    var childrenIndices = Heap._children(idx);
    var childKeys = [this._keys[childrenIndices[0]], this._keys[childrenIndices[1]]];

    var thisKey = this._keys[idx];
    
    if (!childKeys[0] && childKeys[0]!==0){
        childKeys[0] = Infinity;
    }
    if (!childKeys[1] && childKeys[1]!==0){
        childKeys[1] = Infinity;
    }

    if (thisKey > Math.min(childKeys[0],childKeys[1])) {
        if (childKeys[0] < childKeys[1]){
            this._swap(childrenIndices[0], idx);
            this._heapDown(childrenIndices[0]);
        } else {
            this._swap(childrenIndices[1], idx);
            this._heapDown(childrenIndices[1]);
        }
    } else {
        // DONE
    }
};

Heap.prototype._heapUp = function (idx) {
    var parentIndex = Heap._parent(idx);
    var parentKey = this._keys[parentIndex];

    var thisKey = this._keys[idx];

    if (parentKey > thisKey) {
        this._swap(parentIndex, idx);
        this._heapUp(parentIndex);
    }
};

Heap.prototype._swap = function (index, index2) {
    var k = this._keys[index];
    var v = this._items[index];

    this._keys[index] = this._keys[index2];
    this._items[index] = this._items[index2];

    this._keys[index2] = k;
    this._items[index2] = v;
};

Heap.prototype.delete = function (key) {
    var idx = this._keys.indexOf(key);
    this._keys[idx] = null;
    this._items[idx] = null;

    this._swap(idx, this.size - 1);

    this._heapDown(idx);

    this.size -= 1;
    this.isEmpty = this.size == 0;
};

Heap.prototype._defaultKey = function (el) {
    if (typeof (el) == "number") {
        return el;
    }
    if (typeof (el) == "string") {
        return el;
    }
    if (typeof (el) == "object") {
        return JSON.stringify(el).toString().length;
    }
};

Heap.MIN = function (el) {
    return Heap.prototype._defaultKey(el);
};

Heap.MAX = function (el) {
    return -1 * Heap.prototype._defaultKey(el);
};

Heap.prototype._attach = function (key, value) {
    this._items[this.size] = value;
    this._keys[this.size] = key;

    this._heapUp(this.size);

    this.size += 1;
    this.isEmpty = false;
};

Heap._parent = function (n) {
    return Math.floor((n - 1) / 2);
};

Heap._children = function (n) {
    return [n * 2 + 1, n * 2 + 2];
};