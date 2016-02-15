describe("Heap", function(){
    
    it("can be instantiated", function(){
        var h = new Heap();
    });
    
    it("has the Heap API", function(){
        var h = new Heap();
        
        expect(typeof(h.put)).toBe("function");
        expect(typeof(h.get)).toBe("function");
        expect(typeof(h.delete)).toBe("function");
    });
    
    it("has a size property", function(){
        var h = new Heap();
        
        expect(h.size).toBeDefined();
    });
    
    it("has internal functions", function(){
        var h = new Heap();
        
        expect(typeof(h.reorder)).toBe("function");
        expect(typeof(h.attach)).toBe("function");
    });
});

describe("Heap put", function(){
    it("increases size", function(){
        var h = new Heap();
        
        expect(h.size).toBe(0);
        
        h.put(66);
        
        expect(h.size).toBe(1);
    });
    
    it("triggers reorder", function(){
        var h = new Heap();
        
        spyOn(h, "reorder");
        spyOn(h, "attach");
        
        h.put();
        
        expect(h.reorder).toHaveBeenCalled();
        expect(h.attach).toHaveBeenCalled();
    });
    
});