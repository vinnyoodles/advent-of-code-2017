var _ = require('underscore');
var fs = require('fs');
var filename = 'day11.txt';
fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    part1(data);
    // part2(data);
});

/**
 * 3 dimensional grid
 * N/S - x direction
 * NW/SE - y direction
 * NE/SW - z direction
 */
function part1(data) {
    var x = 0;
    var y = 0;
    var max = 0;
    _.each(data.split(','), (cor) => {
        if (cor === 'n') {
            y ++;
        } else if (cor === 'ne') {
            x ++;
            y ++;
        } else if (cor === 'se') {
            x ++;
        } else if (cor === 's') {
            y --;
        } else if (cor === 'sw') {
            x --;
            y --;
        } else if (cor === 'nw') {
            x --;
        }

        max = Math.max(max, shortestPath(0, 0, x, y));
    });

    console.log(shortestPath(0, 0, x, y));
    console.log(max);
}

function shortestPath(x, y, endx, endy) {
    var count = 0;
    while (x !== endx || y !== endy) {
        if (x > endx) {
            x --;
        } else if (x < endx) {
            x ++;
        }

        if (y > endy) {
            y --;
        } else if (y < endy) {
            y ++;
        }

        count ++;
    }
    return count;
}