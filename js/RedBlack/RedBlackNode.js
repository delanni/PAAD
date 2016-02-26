var RedBlackNode = function (key, value, tree) {
    this.left = null;
    this.right = null;
    this.key = key;
    this.value = value;
    this.isBlack = false;
    this._parent = null;
    this._tree = tree;
};

RedBlackNode.prototype.attach = function (node) {
    var side = node.key > this.key ? "right" : "left";
    if (this[side]) {
        this[side].attach(node);
    } else {
        this[side] = node;
        node._parent = this;
        node.recolor();
    }
};

RedBlackNode.prototype.delete = function () {
    if (this.left && this.right) {
        var leftKids = this.left.express();
        var rightKids = this.right.express();
        if (leftKids.length > rightKids.length) {
            var biggest = leftKids[leftKids.length - 1];
            this.key = biggest.key;
            this.value = biggest.value;
            biggest.delete();
        } else {
            var smallest = rightKids[0];
            this.key = smallest.key;
            this.value = smallest.value;
            smallest.delete();
        }
    } else if (!this.left && !this.right) {
        var p = this._parent;
        if (p) {
            if (p.left == this) p.left = null;
            if (p.right == this) p.right = null;
        }
        this._parent = null;
        this._tree = null;
    } else {
        // what's here? 
    }
};

RedBlackNode.prototype.retrieve = function (key) {
    if (this.key == key) {
        return this;
    } else {
        var side = key > this.key ? "right" : "left";
        if (this[side]) {
            return this[side].retrieve(key);
        } else {
            return null;
        }
    }
};

RedBlackNode.prototype.express = function () {
    var expressed = [];
    if (this.left) {
        expressed.push.apply(expressed, this.left.express());
    }
    expressed.push(this);
    if (this.right) {
        expressed.push.apply(expressed, this.right.express());
    }
    return expressed;
};

RedBlackNode.prototype.hasDescendant = function (node) {
    return this.express().some(function (e) {
        return e == node;
    });
};

RedBlackNode.prototype.recolor = function () {
    if (!this._parent) {
        this.isBlack = true;
    } else {
        var parent = this._parent;
        if (!parent.isBlack) {
            var aunt = this._getAunt();
            var granny = this._getGrandParent();
            if (aunt && !aunt.isBlack) {
                parent.isBlack = true;
                aunt.isBlack = true;
                granny.isBlack = false;
                granny.recolor();
            } else {
                var newFocus = this;
                if (parent.right == this && granny.left == parent) {
                    // Rotate left on parent
                    this._rotateLeft();

                    newFocus = parent;
                } else if (parent.left == this && granny.right == parent) {
                    // Rotate right on parent 
                    this._rotateRight();

                    newFocus = parent;
                }
                granny = newFocus._getGrandParent();
                parent = newFocus._parent;
                parent.isBlack = true;
                granny.isBlack = false;
                if (newFocus == parent.left) {
                    // Rotate right on granny
                    parent._rotateRight();
                } else {
                    // Rotate left on granny
                    parent._rotateLeft();
                }
            }
        }
    }
};

RedBlackNode.prototype._rotateLeft = function () {
    // TODO: Revise
    var parent = this._parent;
    var leftKid = this.left;

    if (parent) {
        var granny = parent._parent;

        parent.right = leftKid;
        if (leftKid) {
            leftKid._parent = parent;
        }
        parent._parent = this;

        this.left = parent;
        this._parent = granny;
        if (!granny) {
            this._tree._root = this;
        } else {
            if (granny.left == parent) {
                granny.left = this;
            } else {
                granny.right = this;
            }
        }
    }
};

RedBlackNode.prototype._rotateRight = function () {
    // TODO: Revise
    var parent = this._parent;
    var rightKid = this.right;

    if (parent) {
        var granny = parent._parent;

        parent.left = rightKid;
        if (rightKid) {
            rightKid._parent = parent;
        }
        parent._parent = this;

        this.right = parent;
        this._parent = granny;
        if (!granny) {
            this._tree._root = this;
        } else {
            if (granny.left == parent) {
                granny.left = this;
            } else {
                granny.right = this;
            }
        }
    }
};


RedBlackNode.prototype._getSister = function () {
    var parent = this._parent;
    if (!parent) return null;
    if (this == parent.left) {
        return parent.right;
    } else {
        return parent.left;
    }
};

RedBlackNode.prototype._getGrandParent = function () {
    var parent = this._parent;
    if (parent) {
        return parent._parent;
    } else {
        return null;
    }
};

RedBlackNode.prototype._getAunt = function () {
    var parent = this._parent;
    if (parent) {
        return parent._getSister();
    } else {
        return null;
    }
};

RedBlackNode.prototype._pathTo = function (leaf) {
    if (!this.hasDescendant(leaf)) return false;
    if (this.left && this.left.hasDescendant(leaf)) {
        return [this].concat(this.left._pathTo(leaf));
    } else if (this.right && this.right.hasDescendant(leaf)) {
        return [this].concat(this.right._pathTo(leaf));
    } else {
        return [this];
    }
};

RedBlackNode.prototype.toString = function () {
    var s = "[" + this.key + ", " + (this.isBlack ? "black" : "red") + "]";
    return s;
};