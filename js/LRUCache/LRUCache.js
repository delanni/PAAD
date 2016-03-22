var LRUCache = function (size, resolver, storage) {
    this._size = size || 0;
    this._fakeTimestamp = 0;
    this._itemsCount = 0;

    this.statistics = {
        hits: 0,
        misses: 0,
        deletes: 0
    };

    this.resolver = resolver || function () {
        throw new Error("No resolver function present. Cache is dysfunctional.");
    };

    this.storage = storage;

    this._keystorage = new RedBlackTree();

    this._keyToTimestamp = new RedBlackTree();
    this._LRUHeap = new Heap(function (item) {
        // Remove the - to get a MRU
        return -item.timestamp;
    });
};

LRUCache.prototype = {
    get size() {
        return this._size;
    },
    get capacity() {
        return this.size - this._itemsCount;
    },

    retrieve: function (key) {
        var hit = this._keystorage.get(key);
        if (hit) {
            this.statistics.hits += 1;
            this._updateLRUHeap(key);
            return hit;
        } else {
            this.statistics.misses += 1;
            var value = this.resolver.call(this, key, this.storage);

            if (this.capacity <= 0) {
                this._deleteLeastRecentlyUsedEntry();
            }

            this._insertEntry(key, value);

            return value;
        }
    },

    getActiveKeys: function () {
        return this._keystorage.getKeys();
    },

    invalidate: function () {

    },

    _updateLRUHeap: function (key) {
        this._deleteLRUHeapEntry(key);

        var timestamp = this._fakeTimestamp++;
        this._LRUHeap.push({
            timestamp: timestamp,
            key: key
        });
        this._keyToTimestamp.put(key, -timestamp);
    },

    _deleteLRUHeapEntry: function (key) {
        var timestamp = this._keyToTimestamp.delete(key);
        this._LRUHeap.delete(timestamp);
    },

    _deleteLeastRecentlyUsedEntry: function () {
        this.statistics.deletes += 1;
        var cacheOut = this._LRUHeap.pop();
        this._keystorage.delete(cacheOut.key);

        this._keyToTimestamp.delete(cacheOut.key);
        this._itemsCount = this._keystorage.size;
    },

    _insertEntry: function (key, value) {
        var timestamp = this._fakeTimestamp++;
        this._keystorage.put(key, value);
        this._itemsCount = this._keystorage.size;
        this._LRUHeap.push({
            timestamp: timestamp,
            key: key
        });
        this._keyToTimestamp.put(key, timestamp);
    }
};