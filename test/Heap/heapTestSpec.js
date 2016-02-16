describe("Heap", function () {

    it("can be instantiated", function () {
        var h = new Heap();

        expect(h).toBeDefined();

        expect(Heap.fromArray).toBeDefined();

        expect(h.drain).toBeDefined();
    });

    it("has the Heap API", function () {
        var h = new Heap();

        expect(typeof (h.push)).toBe("function");
        expect(typeof (h.peek)).toBe("function");
        expect(typeof (h.pop)).toBe("function");

    });

    it("has properties", function () {
        var h = new Heap();

        expect(h.size).toBeDefined();
        expect(h.isEmpty).toBeDefined();
    });

    it("has internal functions", function () {
        var h = new Heap();

        expect(typeof (h.delete)).toBe("function");
        expect(typeof (h._heapUp)).toBe("function");
        expect(typeof (h._heapDown)).toBe("function");
        expect(typeof (h._attach)).toBe("function");
    });
});

describe("Heap push", function () {
    it("increases size", function () {
        var h = new Heap();

        expect(h.size).toBe(0);

        h.push(66);

        expect(h.size).toBe(1);
    });

    it("really increases size", function () {
        var h = new Heap();

        expect(h.size).toBe(0);
        expect(h.isEmpty).toBe(true);

        h.push(55);
        h.push(66);
        h.push(77);

        expect(h.size).toBe(3);
        expect(h.isEmpty).toBe(false);
    });

    it("triggers internals", function () {
        var h = new Heap();

        spyOn(h, "_hash");
        spyOn(h, "_attach");

        h.push(77);

        expect(h._attach).toHaveBeenCalled();
        expect(h._hash).toHaveBeenCalled();
    });
});

describe("Heap peek", function(){
    
    it("gets top element", function(){
        var h = new Heap();
        var el = 77;
        
        h.push(el);
        
        var retrieved = h.peek();
        
        expect(retrieved).toBe(el);
    });
    
    it("gives undef if empty", function(){
        var h = new Heap();
        
        var top = h.peek();
        
        expect(top).toBeUndefined();
    });
    
    it("doesn't reduce size", function(){
        var h = new Heap();
        
        h.push(88);
        
        expect(h.size).toBe(1);
        expect(h.isEmpty).toBe(false);
        
        h.peek();
        
        expect(h.size).toBe(1);
        expect(h.isEmpty).toBe(false);
    });
    
});

describe("Heap pop", function(){
    
    it("gets top element", function(){
        var h = new Heap();
        var el = 77;
        
        h.push(el);
        
        var retrieved = h.pop();
        
        expect(retrieved).toBe(el);
    });
    
    it("gives undef if empty", function(){
        var h = new Heap();
        
        var top = h.pop();
        
        expect(top).toBeUndefined();
    });
    
    it("reduces size", function(){
        var h = new Heap();
        
        h.push(88);
        
        expect(h.size).toBe(1);
        expect(h.isEmpty).toBe(false);
        
        h.pop();
        
        expect(h.size).toBe(0);
        expect(h.isEmpty).toBe(true);
    });
    
    it("really reduces size", function(){
        var h = new Heap();
        
        h.push(88);
        
        expect(h.size).toBe(1);
        expect(h.isEmpty).toBe(false);
        
        h.push(88);
        expect(h.size).toBe(2);
        
        h.pop();
        
        expect(h.size).toBe(1);
        expect(h.isEmpty).toBe(false);
        
        h.pop();
        
        expect(h.size).toBe(0);
        expect(h.isEmpty).toBe(true);
    });
});

describe("Heap behaviour", function(){
    
    it("gets minimum key first", function(){
        var h = new Heap();
        
        var min = 55;
        var med = 66;
        var max = 77;
        
        h.push(med);
        h.push(min);
        h.push(max);
        
        var retrievedMin = h.pop();
        var retrievedMed = h.pop();
        var retrievedMax = h.pop();
        
        expect(retrievedMin).toBe(min);
        expect(retrievedMed).toBe(med);
        expect(retrievedMax).toBe(max);
    });
    
    it("does work with arbitrary numbers", function(){
        var h = new Heap();
        var input = [];
        for(var i=0;i<100;i++){
            var r = Math.random();
            input[i]=r;
            h.push(r);
        }
        
        var inputSorted = input.slice().sort(function(a,b){
            return a-b});
        
        while(!h.isEmpty){
            var original = inputSorted.shift();
            var heapTop = h.pop();
            expect(heapTop).toBe(original);
        }
    });
    
    it("can delete random node", function(){
        var h = new Heap();
        
        var min = 55;
        var med = 66;
        var max = 77;
        
        h.push(med);
        h.push(min);
        h.push(max);
        
        h.delete(med);
        
        var assumedMin = h.pop();
        var assumedMax = h.pop();
        
        expect(assumedMin).toBe(min);
        expect(assumedMax).toBe(max);
        expect(h.isEmpty).toBe(true);
    });
    
    it("can merge two trees", function(){
        var h = new Heap();
        var k = new Heap();
        
        var nums = [1,2,3,4,5,6];
        
        for(var i=0;i<6;i++){
            if (i%2){
                h.push(nums[i]);
            } else {
                k.push(nums[i]);
            }            
        }
        
        h.drain(k);
        
        expect(k.isEmpty).toBe(true);
        expect(h.size).toBe(6);
        
        var retrieved = [];
        while(!h.isEmpty){
            retrieved.push(h.pop());
        }
        
        expect(retrieved.toString()).toBe(nums.toString());
    });
    
    it("can do max-heap", function(){
        var h = new Heap(Heap.MAX);
        
        var min = 55;
        var med = 66;
        var max = 77;
        
        h.push(min,med,max);
        
        var assumedMax = h.pop();
        
        expect(assumedMax).toBe(max);
    });
    
    it("can do custom keying", function(){
        var keyer = function(x){ return x.length };
        var h = new Heap(keyer);
        
        var min = "Yamcha";
        var med = "Son-goku";
        var max = "Tenshinhan";
        
        h.push(med,min,max);
        
        var assumedMin = h.pop();
        var assumedMed = h.pop();
        var assumedMax = h.pop();
        
        expect(assumedMin).toBe(min);
        expect(assumedMed).toBe(med);
        expect(assumedMax).toBe(max);
    });
    
    it("supports fromArray", function(){
        var t = [4,2,545,30292,193,.04];
        
        var h = Heap.fromArray(t);
        
        expect(h).toBeDefined();
        expect(h.peek()).toBe(0.04);
    });
});