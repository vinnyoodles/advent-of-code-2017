var _ = require('underscore');
var fs = require('fs');
var filename = 'day10.txt';
fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    part1(data);
    part2(data);
});

function part1(data) {
    var lengths = _.map(data.split(','), (a) => parseInt(a));
   var arr = [];
    for (var i = 0; i < 256; i ++) 
        arr.push(i);

    var index = 0;
    var step = 0;
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

function part2(data) {
    var lengths = _.map(data.split(''), (a) => a.charCodeAt(0));
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

    console.log(dense.join(''));
}