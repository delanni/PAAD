var RedBlackNode = function (key, value) {
    this.left = null;
    this.right = null;
    this.key = key;
    this.value = value;
    this.isBlack = false;
    this._parent = null;
};

RedBlackNode.prototype.attach = function (node) {
    var side = node.key > this.key ? "right" : "left";
    if (this[side]) {
        console.log("Attaching to the " + side);
        this[side].attach(node);
    } else {
        console.log("creating new leaf to the " + side);
        this[side] = node;
    }
    node._parent = this;
    node.recolor();
};

RedBlackNode.prototype.retrieve = function (key) {
    if (this.key == key) {
        return this.value;
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
    if (this == node) return false;
    return this.express().some(function (e) {
        return e == node;
    });
};

RedBlackNode.prototype.recolor = function () {
    if (!this._parent) {
        console.log("Coloring to black", this.toString());
        this.isBlack = true;
    } else {
        var parent = this._parent;
        if (!parent.isBlack) {
            console.log("Parent is not black", this.toString());
            var aunt = this._getAunt();
            var granny = this._getGrandParent();
            console.log("Aunt, and granny: ", aunt.toString(), granny.toString());
            if (aunt && !aunt.isBlack) {
                parent.isBlack = true;
                aunt.isBlack = true;
                granny.isBlack = false;
                granny.recolor();
            } else {
                var newFocus = this;
                if (parent.right == this && granny.left == parent) {
                    // Rotate left on parent
                    parent._rotateLeft();

                    newFocus = parent;
                } else if (parent.left == this && granny.right == parent) {
                    // Rotate right on parent 
                    parent._rotateRight();

                    newFocus = parent;
                }
                granny = newFocus._getGrandParent();
                parent = newFocus._parent;
                parent.isBlack = true;
                granny.isBlack = false;
                if (newFocus == parent.left) {
                    // Rotate right on granny
                    granny._rotateRight();
                } else {
                    // Rotate left on granny
                    granny._rotateLeft();
                }
            }
        }
    }
};

RedBlackNode.prototype._rotateLeft = function () {
    var parent = this._parent;
    var rightKid = this.right;

    if (parent) {
        parent.left = rightKid;
        rightKid._parent = parent;
    }
    this.right = rightKid.left;
    rightKid.left = this;
    this._parent = rightKid;
};

RedBlackNode.prototype._rotateRight = function () {
    var parent = this._parent;
    var leftKid = this.left;

    if (parent) {
        parent.left = leftKid;
        leftKid._parent = parent;
    }
    this.left = leftKid.right;
    leftKid.right = this;
    this._parent = leftKid;
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
    var s = "[" + this.key + "]";
    if (this.left) s += " left:" + this.left.key;
    if (this.right) s += " left:" + this.right.key;
    return s;
};