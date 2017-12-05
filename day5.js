var _ = require('underscore');
var fs = require('fs');
var filename = 'day5.txt';
fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  part1(data);
  part2(data);
});

function part1(data) {
    var lines = _.map(data.trim().split('\n'), (a) => parseInt(a));
    console.log(lines);
    var index = 0;
    var count = 0;
    while (index >= 0 && index < lines.length) {
        var cur = lines[index];
        lines[index] ++;
        index += cur;
        count ++;
    }
    console.log(count);
}

function part2(data) {
    var lines = _.map(data.trim().split('\n'), (a) => parseInt(a));
    var index = 0;
    var count = 0;
    while (index >= 0 && index < lines.length) {
        var cur = lines[index];
        if (cur >= 3) {
            lines[index] --;
        } else {
            lines[index] ++;
        }
        index += cur;
        count ++;
    }
    console.log(count);
}