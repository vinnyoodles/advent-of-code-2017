var _ = require('underscore');
var fs = require('fs');
var filename = 'day19.txt';

var UP = 0;
var RIGHT = 1;
var DOWN = 2;
var LEFT = 3;

fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  solve(data.split('\n').map((l) => l.split('')));
});

function solve(maze) {
    var col = maze[0].indexOf('|');
    var row = 0;
    var path = [];
    var cur_dir = DOWN;
    var count = 0;

    while (true) {
        switch (cur_dir) {
            case UP: 
            row --;
            break;
            case RIGHT: 
            col ++;
            break;
            case DOWN: 
            row ++;
            break;
            case LEFT: 
            col --;
            break;
        }
        count ++;

        var cur = maze[row][col];

        if (cur <= 'Z' && cur >= 'A')
            path.push(cur);

        if (cur === ' ')
            break;

        // Only change directions when an intersection is found.
        if (cur === '+') {
            if (maze[row - 1][col] === '|' && cur_dir !== DOWN) {
                cur_dir = UP;
            } else if (maze[row + 1][col] === '|' && cur_dir !== UP) {
                cur_dir = DOWN;
            } else if (maze[row][col - 1] === '-' && cur_dir !== RIGHT) {
                cur_dir = LEFT;
            } else if (maze[row][col + 1] === '-' && cur_dir !== LEFT) {
                cur_dir = RIGHT;
            }
        }
    }

    console.log(path.join(''), count);
}
