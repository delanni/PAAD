describe("Instantiation and API", function () {

    it("can be instantiated", function () {
        var t = new RedBlackTree();
    });

    it("has dicionary API", function () {
        var t = new RedBlackTree();

        expect(typeof (t.put)).toBe("function");
        expect(typeof (t.get)).toBe("function");
        expect(typeof (t.delete)).toBe("function");
        expect(typeof (t.size)).toBe("number");
        expect(typeof (t.isEmpty)).toBe("boolean");
    });
});

describe("Behaviour", function () {
    it("can be put into", function () {
        var t = new RedBlackTree();

        expect(t.isEmpty).toBe(true);
        expect(t.size).toBe(0);

        t.put("key", "value");

        expect(t.size).toBe(1);
        expect(t.isEmpty).toBe(false);
    });

    it("can be put into (multiple)", function () {
        var t = new RedBlackTree();

        expect(t.isEmpty).toBe(true);
        expect(t.size).toBe(0);

        t.put("key1", 4);
        t.put("key2", 5);
        t.put("key3", 77);

        expect(t.size).toBe(3);
        expect(t.isEmpty).toBe(false);
    });

    it("can be retrieved from", function () {
        var t = new RedBlackTree();
        var val = 4;
        var key = "key1";
        t.put(key, val);

        expect(t.isEmpty).toBe(false);

        var retrieved = t.get(key);

        expect(retrieved).toBe(val);
    });

    it("can be retrieved from (multiple)", function () {
        var t = new RedBlackTree();
        var keys = ["a", "b", "c"];
        var values = [1, 2, 3];

        for (var i = 0; i < keys.length; i++) {
            t.put(keys[i], values[i]);
        }

        expect(t.size).toBe(3);
        for (var i = 0; i < keys.length; i++) {
            var retrieved = t.get(keys[i]);
            expect(retrieved).toBe(values[i]);
        }
    });
    
    it("does not mess up when adding a lot of random stuff", function(){
        var keys = [];
        var values = [];
        var itemSize = 100;
        var t = new RedBlackTree();
        
        for(var i = 0; i<itemSize; i++){
            var k = Math.floor(Math.random()*100) + "-shit-" + i;
            keys.push(k);
            values.push(k);
            t.put(k,k);
        }
        
        while(keys.length){
            var k = keys.pop();
            var v = values.pop();
            
            var ret = t.get(k);
            
            expect(ret).toBe(v);
        }
    });

    it("has red-black property", function () {
        var t = new RedBlackTree();
        var keys = ["a", "b", "c", "apples", "peaches", "bananas", "2309", 39, "xair"];
        var values = [1, 2, 3, "3923", {}, {
            c: 4
        }, 4, 2, 4];

        for (var i = 0; i < keys.length; i++) {
            t.put(keys[i], values[i]);
            var res = t.validateRedBlack();
            expect(res).toBe(true);
        }
    });

    it("updates key if collides", function () {
        var t = new RedBlackTree();

        var k = "dakey";
        var v = "davalue";

        t.put(k, v);
        var retrieved = t.get(k);

        t.put(k, "somethingelse");

        var otherRetrieved = t.get(k);

        expect(otherRetrieved).not.toBe(retrieved);
    });

    it("removes nodes correctly", function () {
        var t = new RedBlackTree();

        var keys = ["oranges", "apples", "peaches"];
        var values = [1, 2, 3];

        for (var i = 0; i < keys.length; i++) {
            t.put(keys[i], values[i]);
        }

        expect(t.validateRedBlack()).toBe(true);
        expect(t.size).toBe(3);

        t.delete("oranges");
        expect(t.size).toBe(2);
        expect(t.get("oranges")).toBeFalsy();
        expect(t.validateRedBlack()).toBe(true);
    });

    it("removes multiple elements", function () {
        var t = new RedBlackTree();

        var keys = ["McGuiver", "beaches", "oranges", "apples", "peaches", "dolphins"];
        var values = [1, 2, 3, 4, 5, 6];

        for (var i = 0; i < keys.length; i++) {
            t.put(keys[i], values[i]);
        }

        expect(t.validateRedBlack()).toBe(true);
        expect(t.size).toBe(keys.length);

        for (var i = 0; i < keys.length; i++) {
            t.delete(keys[keys.length - 1 - i]);
            expect(t.validateRedBlack()).toBe(true);
        }

        expect(t.size).toBe(0);
        expect(t.isEmpty).toBe(true);
    });

    it("does actually work pretty well, although this is shitty random data", function () {
        var keyHolder = {};
        var keySize = 100;
        var _keys = [];
        while (_keys.length < keySize) {
            var r = Math.floor(Math.random() * keySize * 1000);
            var key = "Key" + r;
            if (keyHolder[key]) {
                continue;
            } else {
                keyHolder[key] = r;
                _keys.push(key);
            }
        }
        
        var t = new RedBlackTree();
        _keys.forEach(function (k) {
            t.put(k, keyHolder[k]);
            if (t.size !== t.getNodes().length){
                console.log(k, keyHolder[k], t.getNodes().toString(), t.get(k));
                throw new Error("SIZE INTEGRITY FUCKED UP");
            }
        });

        expect(t.size).toBe(keySize);
        expect(t.validateRedBlack()).toBe(true);

        var firstKey = _keys[0];
        var midKey = _keys[Math.floor(_keys.length / 2)];
        var lastKey = _keys[_keys.length - 1];


        var firstValue = keyHolder[firstKey];
        var midValue = keyHolder[midKey];
        var lastValue = keyHolder[lastKey];

        var retrieved1 = t.get(firstKey);
        expect(retrieved1).toBe(firstValue);

        var retrieved2 = t.get(midKey);
        expect(retrieved2).toBe(midValue);

        var retrieved3 = t.get(lastKey);
        expect(retrieved3).toBe(lastValue);

        t.delete(firstKey);
        t.delete(midKey);
        t.delete(lastKey);

        expect(t.size).toBe(keySize - 3);
        
        for(var i=0; i<_keys.length;i++){
            t.delete(_keys[i]);
        }
        
        expect(t.size).toBe(0);
    });
    
    it("is a search tree indeed", function(){
        var keys = [Math.random(), Math.random(), Math.random()];
        
        var t = new RedBlackTree();
        
        t.put(keys[0],keys[0]);
        t.put(keys[1],keys[1]);
        t.put(keys[2],keys[2]);
        
        var nodesInOrder = t.getNodes();
        expect(nodesInOrder.length).toBe(3);
        
        expect(nodesInOrder[0].key < nodesInOrder[1].key).toBe(true);
        expect(nodesInOrder[1].key < nodesInOrder[2].key).toBe(true);
        
        t.delete(keys[0]);
        t.delete(keys[1]);
        t.delete(keys[2]);
        
        var emptySet = t.getNodes();
        expect(emptySet.length).toBe(0);
    });
    
    it("handles empty edge cases", function(){
        var t = new RedBlackTree();
        
        t.put("key","value");
        
        expect(t.size).toBe(1);
        
        t.delete("jibjab");
        
        expect(t.size).toBe(1);
        
        t.delete("key");
        
        expect(t.size).toBe(0);
        
        t.delete("jibjabagain");
        
        expect(t.size).toBe(0);
    });
});