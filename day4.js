var _ = require('underscore');
var fs = require('fs');
var filename = 'day4.txt';
fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  part1(data);
  part2(data);
});

function part1(data) {
    var lines = data.trim().split('\n');
    var sum = 0;
    for (var line of lines) {
        var set = {};
        var tokens = line.split(' ');
        var valid = true;
        for (var t of tokens) {
            if (set[t]) {
                valid = false;
                break;
            }
            set[t] = true;
        }
        if (valid)
            sum ++;
    }

    console.log(sum);
}

function part2(data) {
    var lines = data.trim().split('\n');
    var sum = 0;
    for (var line of lines) {
        var set = {};
        var tokens = line.split(' ');
        var valid = true;
        for (var t of tokens) {
            var arr = t.split('');
            var sorted = arr.sort().join('');

            if (set[sorted]) {
                valid = false;
                break;
            }

            set[sorted] = true;
        }

        if (valid)
            sum ++;
    }

    console.log(sum);
}