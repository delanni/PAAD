'use strict';

describe('stack basics', function() {
    it('can see Stack', function() {
        expect(typeof Stack).toEqual("function");
    });
    it("can instantiate Stack", function(){
        var s = new Stack();
        expect(s).not.toBe(undefined);
        expect(s).not.toBe(null);
        expect(typeof s).toBe("object");
    });
});

describe("stack push-pop", function(){
    it("has push-pop api", function(){
        var s = new Stack();
        expect(typeof s.push).toBe("function");
        expect(typeof s.pop).toBe("function");
        expect(s.size).toBeDefined();
    });
    
    it("pushes and pops affects size", function(){
        var s = new Stack();
        var a = 123;
        
        expect(s.size).toBe(0);
        
        s.push(a);
        
        expect(s.size).toBe(1);
        
        var b = s.pop();
        
        expect(s.size).toBe(0);
    });
    
    it("pushes and pops affects size", function(){
        var s = new Stack();
        var a = 123;
        
        expect(s.size).toBe(0);
        
        s.push(a);
        s.push(a);
        
        expect(s.size).toBe(2);
        
        var b = s.pop();
        
        expect(s.size).toBe(1);
        
        var c = s.pop();
        
        expect(s.size).toBe(0);
    }); 
    
    it("stores and retrieves numbers", function(){
        var s = new Stack();
        var a = 123;
        
        expect(s.size).toBe(0);
        
        s.push(a);
        
        var b = s.pop();
        
        expect(b).toBe(a);
    });
    
    it("stores and retrieves objects", function(){
        var s = new Stack();
        var a = {
            Cheylenne: "Silver",
            Maya: "Gold",
            Aleska: "Diamond"
        };
        
        expect(s.size).toBe(0);
        
        s.push(a);
        
        var b = s.pop();
        
        expect(b).toBe(a);
    });
    
    it("acts a LIFO", function(){
        var s = new Stack();
        var a = 123;
        var b = -222;
        var c = 200292929111922;
        
        expect(s.size).toBe(0);
        
        s.push(a);
        s.push(b);
        s.push(c);
        
        var c1 = s.pop();
        var b1 = s.pop();
        var a1 = s.pop();
        
        expect(c1).toBe(c);
        expect(b1).toBe(b);
        expect(a1).toBe(a);
    });
    
    it("pops undefined when empty", function(){
        var s = new Stack();
        
        expect(s.size).toBe(0);
        
        expect(s.pop()).toBeUndefined();
        
        expect(s.size).toBe(0);
    });
    
    it("blocks write access to size", function(){
        var s = new Stack();
        
        s.push("asd");
        
        expect(s.size).toBe(1);
        
        expect(function(){s.size=56}).toThrow();
        
        expect(s.size).toBe(1);
    });
});

describe("extended api", function(){
    
    it("has extended API", function(){
        var s = new Stack();
        
        expect(typeof s.duplicate).toBe("function");
        
        expect(typeof s.peek).toBe("function");
        
        expect(typeof s.rotate).toBe("function");
    });
    
    it("duplicates", function(){
        var s = new Stack();
        var item = "Foxi Di";
        
        s.push(item);
        
        expect(s.size).toBe(1);
        
        s.duplicate();
        
        expect(s.size).toBe(2);
        
        var out1 = s.pop();
        var out2 = s.pop();
        
        expect(out1).toBe(item);
        expect(out2).toBe(item);
    });
    
    it("peeks", function(){
        var s = new Stack();
        var i = "Aletta Ocean";
        
        s.push(i);
        
        expect(s.size).toBe(1);
        var o = s.peek();
        
        expect(o).toBe(i);
    });
    
    it("rotates", function(){
        var s = new Stack();
        
        var items = [1,2,3,4,5,6];
        
        for(var i in items){
            s.push(items[i]);
        }
        
        expect(s.size).toBe(6);
        
        s.rotate(3);
        
        expect(s.peek()).toBe(3);
        expect(s.size).toBe(6);
        
        s.pop();
        s.pop();
        s.pop();
        
        expect(s.size).toBe(3);
        expect(s.peek()).toBe(6);
        
        s.rotate(0);
        
        expect(s.size).toBe(3);
        expect(s.peek()).toBe(6);
    });
    
    it("rotates backwards", function(){
        var s = new Stack();
        
        var items = [1,2,3,4,5,6];
        
        for(var i in items){
            s.push(items[i]);
        }
        
        expect(s.size).toBe(6);
        
        s.rotate(-2);
        
        expect(s.peek()).toBe(2);
        expect(s.size).toBe(6);
        
        s.pop();
        s.pop();
        
        expect(s.size).toBe(4);
        expect(s.peek()).toBe(6);
    });
});