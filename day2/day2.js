var _ = require('underscore');
var fs = require('fs');
var filename = 'day2.txt';
fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  part2(data);
});

function part1(data) {
    var lines = data.trim().split('\n');
    var sum = 0;
    for (var line of lines) {
        var elements = line.split(' ');
        var min = Number.MAX_SAFE_INTEGER;
        var max = Number.MIN_SAFE_INTEGER;
        for (var elem of elements) {
            min = Math.min(parseInt(elem), min);
            max = Math.max(parseInt(elem), max);
        }
        var diff = Math.abs(max - min);
        sum += diff;
    }

    console.log(sum);
}

function part2(data) {
    var lines = data.trim().split('\n');
    var sum = 0;
    for (var line of lines) {
        var elements = _.map(line.split(' '), (elem) => parseInt(elem));

        var found = false;
        for (var a in elements) {
            for (var b in elements) {
                if (a == b)
                    continue;
                if (elements[a] % elements[b] == 0) {
                    sum += (elements[a] / elements[b]);
                    found = true;
                    break;
                } else if (elements[b] % elements[a] == 0) {
                    sum += (elements[b] / elements[a]);
                    found = true;
                    break;
                }
            }

            if (found) 
                break;
        }
    }

    console.log(sum);
}