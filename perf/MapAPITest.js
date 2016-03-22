var MapAPITest = function () {
    console.log("Running Map API test");
    console.log("Contestants are: ");
    var contestants = [].slice.call(arguments);

    contestants.forEach(function (c) {
        console.log(" - " + c.name);
    });

    var validationResults = contestants.filter(function (c) {
        return MapAPITest.validate(c);
    });

    if (validationResults.length) {
        validationResults.forEach(function (c) {
            console.error(c.name + " is not valid. " + c.error);
        });
    }

    var datasets = [];
    for (var i = 0; i < 1000000; i++) {
        var r = Math.floor(Math.random() / 0.3);
        switch (r) {
        case 0:
            datasets.push(Math.random() * 1000888);
            break;
        case 1:
            datasets.push((Math.random() * 10e10).toString());
            break;
        case 2:
            var o = {};
            o[Math.random()] = Math.random();
            datasets.push(o);
            break;
        }
    };

    var results = contestants.map(function (c) {
        return MapAPITest.runTest(c, datasets);
    });
    
    return results;
}

MapAPITest.validate = function (c) {
    if (!c.ctor.prototype[c.put]) {
        c.error = (c.error || "") + "Missing API .put(key, value)";
    }
    if (!c.ctor.prototype[c.get]) {
        c.error = (c.error || "") + "Missing API .get(key)";
    }
    if (!c.ctor.prototype[c.delete]) {
        c.error = (c.error || "") + "Missing API .delete(key)";
    }
    return !!c.error;
};

MapAPITest.runTest = function (c, d) {
    var t0 = process.hrtime();
    var map = new c.ctor();
    var constructionTime = process.hrtime(t0);

    t0 = process.hrtime();
    map.put(d[0], d[0]);
    var putOneTime = process.hrtime(t0);

    t0 = process.hrtime();
    map.get(d[0]);
    var getOneTime = process.hrtime(t0);

    t0 = process.hrtime();
    for (var i = 0; i < d.length; i++) {
        map.put(d[i],d[i]);
    }
    var putAllForloop = process.hrtime(t0);

    t0 = process.hrtime();
    for (var i = 0; i < d.length; i++) {
        map.get(d[i]);
    }
    var getAllForloop = process.hrtime(t0);
    
    t0= process.hrtime();
    for(var i=0; i< d.length; i++){
        map.delete(d[i]);
    }
    var deleteAllForloop = process.hrtime(t0);

    t0 = process.hrtime();
    d.forEach(function (e) {
        map.put(e,e);
    });
    var putAllForeach = process.hrtime(t0);

    t0 = process.hrtime();
    d.forEach(function (e) {
        map.get(e);
    });
    var getAllForeach = process.hrtime(t0);
    
    t0 = process.hrtime();
    d.forEach(function(e){
        map.delete(e);
    });
    var deleteAllForeach = process.hrtime(t0);
    
    return {
        name: c.name,
        constructionTime: constructionTime,
        pushOneTime: putOneTime,
        popOneTime: getOneTime,
        pushAllForloop: putAllForloop,
        popAllForloop: getAllForloop,
        pushAllForeach: putAllForeach,
        popAllForeach: getAllForeach,
        deleteAllForloop: deleteAllForloop,
        deleteAllForeach: deleteAllForeach
    };
};

module.exports = MapAPITest;