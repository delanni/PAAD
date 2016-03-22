describe("LRU Cache API", function () {
    it("can be constructed", function () {
        var c = new LRUCache();
    });

    it("has a size and capacity", function () {
        var c = new LRUCache();
        expect(c.size).toBeDefined();
        expect(c.capacity).toBeDefined();
    });

    it("has retrieve api", function () {
        var c = new LRUCache();

        expect(typeof (c.retrieve)).toBe("function");
    });
});

describe("LRU Cache", function () {
    var mockKey = "alma";
    var mockValue = 5;
    var mockKey2 = "korte";
    var mockValue2 = 555;
    var mockKey3 = "barack";
    var mockValue3 = [];

    var mockStorage = {};

    mockStorage[mockKey] = mockValue;
    mockStorage[mockKey2] = mockValue2;
    mockStorage[mockKey3] = mockValue3;
    var mockRetriever = function (key, storage) {
        return storage[key];
    };

    it("constructs with correct size", function () {
        var c = new LRUCache(10);

        expect(c.size).toBe(10);
        expect(c.capacity).toBe(10);
    });

    it("works when not causing collision", function () {

        var c = new LRUCache(10, mockRetriever, mockStorage);

        expect(c.size).toBe(10);
        expect(c.capacity).toBe(10);

        var retrievedValue = c.retrieve(mockKey);

        expect(c.size).toBe(10);
        expect(c.capacity).toBe(9);

        var retrievedValueAgain = c.retrieve(mockKey);

        expect(c.size).toBe(10);
        expect(c.capacity).toBe(9);

        var retrievedValue2 = c.retrieve(mockKey2);

        expect(c.capacity).toBe(8);

        expect(retrievedValue).toBe(mockValue);
        expect(retrievedValueAgain).toBe(mockValue);

        expect(retrievedValue2).toBe(mockValue2);
    });

    it("works well with collisions", function () {
        var c = new LRUCache(2, mockRetriever, mockStorage);
        
        expect(c.size).toBe(2);
        expect(c.capacity).toBe(2);
        
        var retrieved1 = c.retrieve(mockKey);
        
        var retrieved2 = c.retrieve(mockKey2);
        
        var retrieved3 = c.retrieve(mockKey3);
        
        expect(c.capacity).toBe(0);
        
        expect(retrieved1).toBe(mockValue);
        expect(retrieved2).toBe(mockValue2);
        expect(retrieved3).toBe(mockValue3);
        
        var activeKeys = c.getActiveKeys();
        
        expect(activeKeys).toContain(mockKey);
        expect(activeKeys).toContain(mockKey3);
        expect(activeKeys).not.toContain(mockKey2);
        
        var stats = c.statistics;
        
        expect(stats.hits).toBe(0);
        expect(stats.misses).toBe(3);
        expect(stats.deletes).toBe(1);
    });
});