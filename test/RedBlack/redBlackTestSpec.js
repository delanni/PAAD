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

    it("has red-black property", function () {
        var t = new RedBlackTree();
        var keys = ["a", "b", "c", "apples", "peaches", "bananas"];
        var values = [1, 2, 3, "3923", {}, {
            c: 4
        }];
        
        for (var i = 0; i < keys.length; i++) {
            t.put(keys[i], values[i]);
            var res = t.validateRedBlack();
            expect(res).toBe(true);
        }
    });
});