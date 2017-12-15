var _ = require('underscore');

var lookup = {
  '0': '0000',
  '1': '0001',
  '2': '0010',
  '3': '0011',
  '4': '0100',
  '5': '0101',
  '6': '0110',
  '7': '0111',
  '8': '1000',
  '9': '1001',
  'a': '1010',
  'b': '1011',
  'c': '1100',
  'd': '1101',
  'e': '1110',
  'f': '1111',
  'A': '1010',
  'B': '1011',
  'C': '1100',
  'D': '1101',
  'E': '1110',
  'F': '1111'
};

var moves = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1]
];

var key = 'jzgqcdpd';
function part1() {
    return;
    var score = 0;
    _.times(128, (n) => {
        var hash_str = hash(key + '-' + n);
        var bin = hex_to_bin(hash_str);
        score += _.reduce(bin.split(''), (m, n) => m + parseInt(n), 0);
    });
    console.log(score);
}

function part2() {
    var grid = [];
    _.times(128, (n) => {
        var hash_str = hash(key + '-' + n);
        var bin = hex_to_bin(hash_str);
        grid.push(_.map(bin.split(''), (a) => parseInt(a)));
    });

    var queue = [[0, 0]];
    var visited = {};
    var count = 0;

    while (queue.length > 0) {
        var [x, y] = queue.shift();
        var str = `x${x}:y${y}`;
        if (visited[str] || x < 0 || y < 0 || x > 127 || y > 127)
            continue;

        visited[str] = true;
        if (grid[x][y] == 1) {
            count ++;
            grid = remove(grid, x, y);
        }
        _.each(moves, ([i, j]) => {
            queue.push([x + i, y + j]);
        })
    }

    console.log(count);
}

function remove(grid, x, y) {
    var queue = [[x, y]];
    var local_visited = {};

    while (queue.length > 0) {
        var [x, y] = queue.shift();
        var str = `x${x}:y${y}`;
        if (local_visited[str] || x < 0 || y < 0 || x > 127 || y > 127)
            continue;

        local_visited[str] = true;

        if (grid[x][y] == 0)
            continue;
        grid[x][y] = 0;
        _.each(moves, ([i, j]) => {
            queue.push([x + i, y + j]);
        })
    }

    return grid;
}

function hash(key) {
    var lengths = _.map(key.split(''), (a) => a.charCodeAt(0));
    var foo = [17, 31, 73, 47, 23]
    for (var f of foo)
        lengths.push(f);

    var arr = [];
    for (var i = 0; i < 256; i ++) 
        arr.push(i);

    var index = 0;
    var step = 0;
    for (var a = 0; a < 64; a ++) {
        for (var length of lengths) {
            var subset = [];
            for (var i = 0; i < length; i ++) {
                subset.push(arr[(index + i) % arr.length]);
            }

            var reversed = subset.reverse();

            for (var i = 0; i < length; i ++) {
                arr[(index + i) % arr.length] = subset[i];
            } 

            index += ((length + (step ++)) % arr.length);
        }
    }

    var dense = [];
    for (var i = 0; i < arr.length/16; i ++) {
        var xor = arr[i * 16];
        for (var j = 1; j < 16; j ++) {
            xor = xor ^ arr[(i * 16) + j];
        }
        var hex = xor.toString(16);
        if (hex.length == 1)
            hex = '0' + hex;
        dense.push(hex);
    }

    return dense.join('');
}

function hex_to_bin(str) {
    var ret = '';
    for (var i = 0, len = str.length; i < len; i++) {
        ret += lookup[str[i]];
    }
    return ret;
}

part1();
part2();