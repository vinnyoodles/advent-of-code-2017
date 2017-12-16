var _ = require('underscore');
var fs = require('fs');
var filename = 'day16.txt';
var start = 'abcdefghijklmnop';
var moves;
fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  moves = data.split(',');
  var arr = start.split('');
  console.log(part1(arr));
  var arr = start.split('');
  var seen = {};
  _.times(61, (n) => {
    var res = part1(arr)
    console.log(n % 60, res);
    arr = res.split('');
    if (seen[res])
        seen[res] ++;
    else
        seen[res] = 1;
  })
});

function part1(arr) {
    _.each(moves, (move) => {
        var action = move[0];
        if (action === 's') {
            var n = move.replace('s', '');
            arr = shift(arr, n);
        } else if (action === 'x') {
            var [a, b] = move.split('/');
            a = a.replace('x', '');
            arr = swap(arr, a, b);
        } else if (action === 'p') {
            var [a, b] = move.split('/');
            a = a.substr(1);
            var a_index = find_index(arr, a);
            var b_index = find_index(arr, b);
            arr = swap(arr, a_index, b_index);
        }
    });
    return arr.join('');
}

function find_index(arr, search) {
    for (var idx in arr) {
        if (search === arr[idx])
            return idx;
    }

    return -1;
}

function swap(arr, a, b) {
    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
    return arr;
}

function shift(arr, n) {
    var m = arr.length - n;
    var cur = 0;
    var first = [];
    var second = [];
    while (cur < arr.length) {
        var char = arr[cur];
        if (cur < m)
            first.push(char);
        else 
            second.push(char);
        cur ++;
    }
    return second.concat(first);
}
