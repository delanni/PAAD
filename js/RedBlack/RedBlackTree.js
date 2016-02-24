var RedBlackTree = function () {
    this.size = 0;
    this.isEmpty = true;
    this._root = null;
};

RedBlackTree.prototype.put = function (key, value) {
    var n = new RedBlackNode(key, value);
    this._insert(n);
};

RedBlackTree.prototype.get = function (key) {
    var value = this._retrieve(key);
    return value;
};

RedBlackTree.prototype.delete = function () {

};

RedBlackTree.prototype._insert = function (n) {
    if (this.isEmpty) {
        this._root = n;
        this.size++;
        this.isEmpty = false;
        n.recolor();
    } else {
        this._root.attach(n);
    }
};

RedBlackTree.prototype._retrieve = function (k) {
    if (this.isEmpty) return null;
    else return this._root.retrieve(k);
};

RedBlackTree.prototype.getNodes = function () {
    if (this._root) {
        return this._root.express();
    } else {
        return [];
    }
};

RedBlackTree.prototype.validateRedBlack = function () {
    var nodes = this.getNodes();

    // A node is either red or black.
    var clause1 = nodes.every(function (e) {
        return e.isBlack || !e.isBlack
    });

    // The root is always black
    var clause2 = this.isEmpty || this._root.isBlack == true;

    // All leaves are black
    // No reason to do this, no need to insert empty black nodes
    //    var clause3 = nodes.filter(function (n) {
    //        // is root
    //        return !(n.left || n.right);
    //    }).every(function (n) {
    //        return n.isBlack;
    //    });

    var clause4 = nodes.filter(function (e) {
        return !e.isBlack;
    }).some(function (e) {
        return (!e.left || e.left.isBlack) && (!e.right || e.right.isBlack);
    });

    if (!this.isEmpty) {
        var leaves = nodes.filter(function (n) {
            // is root
            return !(n.left || n.right);
        });

        var _this = this;
        var paths = leaves.map(function (l) {
            return _this._root._pathTo(l);
        });

        var blackLengths = paths.map(function (p) {
            if (!p) return 0;
            var length = p.reduce(function (sum, step) {
                return sum + step.isBlack ? 1 : 0;
            });
            return length;
        });

        var clause5 = blackLengths.every(function (l) {
            return l == blackLengths[0];
        });
    } else {
        clause5 = true;
    };

    if (!clause1) {
        console.log("clause 1 is false");
    }
    if (!clause2) {
        console.log("clause 2 is false");
    }
    if (!clause4) {
        console.log("clause 4 is false");
    }
    if (!clause5) {
        console.log("clause 5 is false");
    }

    return clause1 && clause2 /*&& clause3*/ && clause4 && clause5;
};