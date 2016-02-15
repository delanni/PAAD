var Heap = function(){
    this._items = [];
    this._keys = [];
    this.size = 0;
};

Heap.prototype.get = function(){
};

Heap.prototype.put = function(el){
    this.attach(el);
    this.size++;
    this.reorder();
};

Heap.prototype.delete = function(){
};

Heap.prototype.reorder = function(){
};

Heap.prototype.attach = function(key, value){
    this._items[this.size] = value;
    this._keys[this.size] = key;
};

