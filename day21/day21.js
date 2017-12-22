var _ = require('underscore');
var fs = require('fs');
var filename = 'day21.txt';
var start = '.#./..#/###';
var map = {};

fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    var iterations = 2;
    _.each(data.split('\n'), (d) => {
        var tokens = d.split('=>');
        map[tokens[0].trim()] = tokens[1].trim();
    });
    console.log(map);
    part1(start);
});

function part1(input) {
    var iterations = 2;
    var grid = _.map(input.split('/'), (a) => a.split(''));

    for (var i = 0; i < iterations; i ++) {
        if (grid.length % 2 == 0) {
            split2(grid);
        } else {
            split3(grid);
        }
    }
}

function split2(grid) {
    var row = 0;
    var col = 0;
    while (row < grid.length && col < grid.length) {
        var a = grid[row][col];
        var b = grid[row][col + 1];
        var c = grid[row + 1][col];
        var d = grid[row][col + 1];
        var token = `${a}${b}/${c}${d}`;
        var output = find_output(token);

        row += 2;
        if (row >= grid.length) {
            row = 0;
            grid += 2;
        }
    }
}

function split3(grid) {
    var row = 0;
    var col = 0;
    var count = 0;
    var max = grid.length * grid.length;
    while (count < max) {
        var mini = [[], [], []];
        for (var i = 0; i < 3; i ++) {
            for (var j = 0; j < 3; j ++) {
                mini[i].push(grid[row + i][col + j]);
            }
        }
        var output = find_output(mini);
        console.log(max, output);
        row += 3;
        if (row >= grid.length) {
            row = 0;
            grid += 3;
        }
        max += 9;
    }
}

function find_output(arr) {
    for (var i = 0; i < 4; i ++) {
        var sym = invert(arr);
        var flipped = flip(sym);
        var a = stringify(sym);
        var b = stringify(flipped);
        console.log(a);
        console.log(b);
        if (map[a]) {
            return map[a];
        }

        if (map[b]) {
            return map[b];
        }
        arr = flipped;
    }
    return [];
}

function flip(arr) {
    var flipped = arr.slice(0);
    for (var i = 0; i < arr.length; i ++) {
        flipped[i] = arr[arr.length - 1 - i];
    }

    return flipped;
}

function invert(arr) {
    var inverted = arr.slice(0); 
    for (var i = 0; i < arr.length; i ++) {
        for (var j = 0; j < arr.length; j ++) {
            inverted[j][i] = arr[i][j];
        }
    }
    return inverted;
}

function stringify(arr) {
    var temp = _.map(arr, (a) => a.join(''));
    return temp.join('/');
}

function rotate(arr) {
  return a[0].map((_, c) => a.map(r => r[c]));
}