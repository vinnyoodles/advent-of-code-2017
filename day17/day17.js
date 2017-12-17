var _ = require('underscore');
var fs = require('fs');
var filename = 'day17.txt';
var length = 345;

part1();
part2();

function part1() {
    var buffer = [];
    _.times(10, () => buffer.push(0));

    var cur_length = 1;
    var index = 0;
    for (var i = 1; i <= 2017; i ++) {
        index = (index + length) % cur_length;
        buffer.splice(++index, 0, cur_length ++);
    }
    console.log(buffer[index + 1]);
}

function part2() {
    var buffer = [];
    _.times(10, () => buffer.push(0));

    var cur_length = 1;
    var index = 0;
    while (cur_length <= 50000000) {
        index = (index + length) % cur_length;
        index ++;
        if (index === 1)
            console.log(cur_length);
        cur_length ++;
    }
}

