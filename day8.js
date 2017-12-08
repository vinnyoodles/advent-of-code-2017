var _ = require('underscore');
var fs = require('fs');
var filename = 'day8.txt';
fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  part1(data);
  part2(data);
});

function part1(data) {
    var arr = data.trim().split('\n');
    var map = {};
    _.each(arr, (line) => {
        var [reg_a, op, size, _, reg_b, equality, level] = line.split(' ');
        if (!map[reg_a])
            map[reg_a] = 0;
        var current_level = map[reg_b] ? map[reg_b] : 0;
        var boolean = false;
        level = parseInt(level);
        if (equality === ">") {
            boolean = current_level > level;
        } else if (equality === "<") {
            boolean = current_level < level;
        } else if (equality === ">=") {
            boolean = current_level >= level;
        } else if (equality === "<=") {
            boolean = current_level <= level;
        } else if (equality === "==") {
            boolean = current_level === level;
        } else if (equality === "!=") {
            boolean = current_level !== level;
        }

        if (boolean) {
            var value = map[reg_a] ? map[reg_a] : 0;
            if (op === "inc") {
                map[reg_a] = value + parseInt(size);
            } else if (op === "dec") {
                map[reg_a] = value - parseInt(size);
            }
        }
    });

    var max = 0;
    _.each(map, (v, k) => {
        max = Math.max(max, v);
    });
    console.log(max);
}


function part2(data) {
    var arr = data.trim().split('\n');
    var map = {};
    var max = 0;
    _.each(arr, (line) => {
        var [reg_a, op, size, _, reg_b, equality, level] = line.split(' ');
        if (!map[reg_a])
            map[reg_a] = 0;
        var current_level = map[reg_b] ? map[reg_b] : 0;
        var boolean = false;
        level = parseInt(level);
        if (equality === ">") {
            boolean = current_level > level;
        } else if (equality === "<") {
            boolean = current_level < level;
        } else if (equality === ">=") {
            boolean = current_level >= level;
        } else if (equality === "<=") {
            boolean = current_level <= level;
        } else if (equality === "==") {
            boolean = current_level === level;
        } else if (equality === "!=") {
            boolean = current_level !== level;
        }

        if (boolean) {
            var value = map[reg_a] ? map[reg_a] : 0;
            if (op === "inc") {
                map[reg_a] = value + parseInt(size);
            } else if (op === "dec") {
                map[reg_a] = value - parseInt(size);
            }
        }
        max = Math.max(max, map[reg_a]);
    });

    console.log(max);
}

