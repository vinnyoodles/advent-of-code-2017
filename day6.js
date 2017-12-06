var _ = require('underscore');
var fs = require('fs');
var filename = 'day6.txt';
fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  part1(data);
  part2(data);
});

function part1(data) {
    var arr = _.map(data.trim().split(' '), (a) => parseInt(a));
    var visited = {};
    var index = findMax(arr);
    var count = 0;
    while (!visited[arr.toString()]) {
        count ++;
        visited[arr.toString()] = true;
        arr = distribute(arr, index);
        index = findMax(arr);
    }
    console.log(count);
}

function part2(data) {
    var arr = _.map(data.trim().split(' '), (a) => parseInt(a));
    var visited = {};
    var index = findMax(arr);
    var count = 0;
    while (!visited[arr.toString()]) {
        visited[arr.toString()] = count;
        count ++;
        arr = distribute(arr, index);
        index = findMax(arr);
    }
    console.log(visited[arr.toString()], count);
}

function findMax(arr) {
    var index = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] > arr[index]) {
            index = i;
        }
    }
    return index;
}

function distribute(arr, index) {
    var n = arr[index];
    var len = arr.length;
    arr[index] = 0;

    index = (index + 1) % len;
    while (n > 0) {
        arr[index] ++;
        index = (index + 1) % len;
        n --;
    }

    return arr;
}