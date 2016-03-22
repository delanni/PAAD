var fs = require("fs");

var args = process.argv;

var perfDescriptorName = args[2];

var perfDescriptor = JSON.parse(fs.readFileSync(perfDescriptorName).toString());

var cases = perfDescriptor;


function times(s, n, joiner) {
    var txt = new Array(n);
    for (var i = 0; i < n; i++) {
        txt[i] = s;
    }
    return txt.join(joiner || "");
}

cases.forEach(runPerfCase);

function runPerfCase(testCase) {
    var name = testCase.name;
    console.log("--- " + name + " ---");
    console.log(times("-", name.length + 8));

    console.log(" Loading fixture: " + testCase.fixture);
    var fixture = require("./perf/" + testCase.fixture);

    var contestants = testCase.contestants;
    console.log(" Loading source files:");
    contestants.forEach(function (e) {
        if (e.path) {
            var files = e.path.split(",");
            for (var i = 0; i < files.length; i++) {
                if (files[i]) {
                    console.log("  - " + e.path);
                    var source = fs.readFileSync(files[i]).toString();
                    eval(source);
                }
            }
        }
        e.ctor = eval(e.name);
    });

    console.log("Starting fixture...");
    try {
        var results = fixture.apply(fixture, contestants);
    } catch (ex) {
        console.error(ex);
        console.trace(ex);
    } finally {
        console.log("... fixture finished.");
    }

    console.log(" -- Results --");
    var keys = Object.keys(results[0]);
    var maxlength = Math.max.apply(null, keys.map(function (e) {
        return e.length
    }));
    keys.forEach(function (k) {
        var row = [" " + k + ":" + times(" ", maxlength - k.length)];
        results.forEach(function (e) {
            var result = e[k];
            if (result instanceof Array) result = result[0] + "s " + Math.floor(result[1] / 1000000) + "ms " + result[1] % 1000000 + "ns";
            row.push(result);
        });
        row = row.join("\t");
        console.log(row);
        console.log(times(".", row.length));
    });

    console.log("--------------");
}