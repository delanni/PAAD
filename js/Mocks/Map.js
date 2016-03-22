var Map = function(){
    this.obj = {};
};

Map.prototype.put = function(key, value){
    this.obj[key]=value;
};

Map.prototype.get = function(key){
    return this.obj[key];
};

Map.prototype.delete = function(key){
    this.obj[key]=null;
};