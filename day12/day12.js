var _ = require('underscore');
var fs = require('fs');
var filename = 'day12.txt';
fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;

    var lines = _.map(data.split('\n'), (a) => {
        var arr = a.split('<->');
        arr[0] = parseInt(arr[0].trim());
        arr[1] = _.map(arr[1].split(','), (b) => parseInt(b.trim()));
        return arr;
    });
    var map = {};
    var count = 0;
    _.each(lines, (arr) => {
        count ++;
        map[arr[0]] = arr[1];
    });

    part1(map);
    part2(map, count);
});

function part1(map) {
    var seen = {};
    var q = [0];
    while (q.length > 0) {
        var curr = q.shift();
        seen[curr] = true;
        var edges = map[curr];
        for (var c of edges) {
            if (!seen[c]) {
                q.push(c);
            }
        }
    }
    console.log(_.keys(seen).length);
}

function part2(map, count) {

    var groups = 0;
    while (count > 0) {
        var node = _.first(_.keys(map));
        var seen = {};
        var q = [node];

        while (q.length > 0) {
            var curr = q.shift();
            seen[curr] = true;
            var edges = map[curr];
            if (!edges)
                continue
            for (var c of edges) {
                if (!seen[c]) {
                    q.push(c);
                }
            }
            delete map[curr];
            count --;
        }

        groups ++;
    }

    console.log(groups);
}