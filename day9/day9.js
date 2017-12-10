var _ = require('underscore');
var fs = require('fs');
var filename = 'day9.txt';
fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  _.each(data.split('\n'), solve);
});

function solve(data) {
    var total = 0;
    var level = 0;
    var index = 0;
    var count = 0;
    var garbage = false;
    while (index < data.length) {
        var char = data[index];
        if (char === '{' && !garbage) {
            level ++;
        } else if (char === '}' && !garbage) {
            total += level;
            level --;
        } else if (char === '!') {
            index += 2;
            continue;
        } else if (char === '>' && garbage) {
            garbage = false;
            index ++;
            continue;
        } else if (char === '<' && !garbage) {
            garbage = true;
            index ++;
            continue;
        }

        if (garbage)
            count ++;
        index ++;
    }
    console.log(total, count);
}
