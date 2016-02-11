var StackAPITest = function () {
    console.log("Running Stack API test");
    console.log("Contestants are: ");
    var contestants = [].slice.call(arguments);

    contestants.forEach(function (c) {
        console.log(" - " + c.name);
    });

    var validationResults = contestants.filter(function (c) {
        return StackAPITest.validate(c);
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
        return StackAPITest.runTest(c, datasets);
    });
    
    return results;
}

StackAPITest.validate = function (c) {
    if (!c.ctor.prototype[c.push]) {
        c.error = (c.error || "") + "Missing API .push(item)";
    }
    if (!c.ctor.prototype[c.pop]) {
        c.error = (c.error || "") + "Missing API .pop()";
    }
    return !!c.error;
};

StackAPITest.runTest = function (c, d) {
    var t0 = process.hrtime();
    var stack = new c.ctor();
    var constructionTime = process.hrtime(t0);

    t0 = process.hrtime();
    stack.push(d[0]);
    var pushOneTime = process.hrtime(t0);

    t0 = process.hrtime();
    stack.pop();
    var popOneTime = process.hrtime(t0);

    t0 = process.hrtime();
    for (var i = 0; i < d.length; i++) {
        stack.push(d[i]);
    }
    var pushAllForloop = process.hrtime(t0);

    t0 = process.hrtime();
    for (var i = 0; i < d.length; i++) {
        stack.pop();
    }
    var popAllForloop = process.hrtime(t0);

    t0 = process.hrtime();
    d.forEach(function (e) {
        stack.push(e);
    });
    var pushAllForeach = process.hrtime(t0);

    t0 = process.hrtime();
    d.forEach(function (e) {
        stack.pop();
    });
    var popAllForeach = process.hrtime(t0);
    
    return {
        name: c.name,
        constructionTime: constructionTime,
        pushOneTime: pushOneTime,
        popOneTime: popOneTime,
        pushAllForloop: pushAllForloop,
        popAllForloop: popAllForloop,
        pushAllForeach: pushAllForeach,
        popAllForeach: popAllForeach
    };
};

module.exports = StackAPITest;