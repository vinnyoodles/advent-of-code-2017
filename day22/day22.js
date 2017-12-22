var _ = require('underscore');
var input = `#.##.###.#.#.##.###.##.##\n.##.#.#.#..####.###.....#\n...##.....#..###.#..#.##.\n##.###.#...###.#.##..##.#\n###.#.###..#.#.##.#.###.#\n.###..#.#.####..##..#..##\n..###.##..###.#..#...###.\n........##..##..###......\n######...###...###...#...\n.######.##.###.#.#...###.\n###.##.###..##..#..##.##.\n.#.....#.#.#.#.##........\n#..#..#.#...##......#.###\n#######.#...#..###..#..##\n#..#.###...#.#.#.#.#....#\n#.#####...#.##.##..###.##\n..#..#..#.....#...#.#...#\n###.###.#...###.#.##.####\n.....###.#..##.##.#.###.#\n#..#...######.....##.##.#\n###.#.#.#.#.###.##..###.#\n..####.###.##.#.###..#.##\n#.#....###....##...#.##.#\n###..##.##.#.#.##..##...#\n#.####.###.#...#.#.....##`;
var UP = 0;
var RIGHT = 1;
var DOWN = 2;
var LEFT = 3;
var CLEAN = '.';
var WEAKENED = '!';
var INFECTED = '#';
var FLAGGED = '$';

part1(populate(input.split('\n')));
part2(populate(input.split('\n')));

function part1(arr) {
    var bursts = 10000;
    var dir = UP;
    var count = 0;
    var row = Math.floor(arr.length / 2);
    var col = row;

    for (var i = 0; i < bursts; i ++) {
        if (arr[row][col] === '#') {
            dir = right(dir);
            arr[row][col] = '.';
        } else {
            dir = left(dir);
            arr[row][col] = '#';
            count ++;
        }

        [row, col] = move(row, col, dir);
    }

    console.log(count);
}

function part2(arr) {
    var bursts = 10000000;
    var dir = UP;
    var count = 0;
    var row = Math.floor(arr.length / 2);
    var col = row;

    for (var i = 0; i < bursts; i ++) {
        switch (arr[row][col]) {
            case CLEAN:
                dir = left(dir);
                break;
            case INFECTED:
                dir = right(dir);
                break;
            case FLAGGED:
                dir = reverse(dir);
                break;
        }
        arr[row][col] = modify(arr[row][col]);
        if (arr[row][col] === INFECTED) count ++;
        [row, col] = move(row, col, dir);
    }

    console.log(count);
}

function populate(input) {
    var arr = [];
    var length = 1000;
    _.times(length, () => {
        var index = arr.length;
        arr.push([]);
        _.times(length, () => {
            arr[index].push('.');
        });
    });

    var x1 = Math.floor(length / 2);
    var y1 = x1;

    var x2 = Math.floor(input.length / 2);
    var y2 = x2;

    var visited = {};
    var queue = [];
    queue.push([x1, y1, x2, y2]);

    while (queue.length > 0) {
        [x1, y1, x2, y2] = queue.shift();
        if (visited[stringify(x1, y1, x2, y2)]) continue;
        visited[stringify(x1, y1, x2, y2)] = true;
        arr[x1][y1] = input[x2][y2];
        for (var i = -1; i <= 1; i ++) {
            var nx = x2 + i;
            if (nx < 0 || nx >= input.length) continue;
            for (var j = -1; j <= 1; j ++) {
                if (j == 0 && i == 0) continue;
                var ny = y2 + j;
                if (ny < 0 || ny >= input.length) continue;
                queue.push([x1 + i, y1 + j, nx, ny]);
            }
        }
    }

    return arr;
}

function stringify(x1, y1, x2, y2) {
    return `${x1},${y1},${x2},${y2}`;
}

function right(cur_dir) { 
    return (cur_dir + 1) % 4;
}

function left(cur_dir) { 
    if (cur_dir === 0) return 3;
    return (cur_dir - 1) % 4;
}

function reverse(cur_dir) {
    return (cur_dir + 2) % 4;
}

function modify(state) {
    switch (state) {
        case CLEAN: return WEAKENED;
        case WEAKENED: return INFECTED;
        case INFECTED: return FLAGGED;
        case FLAGGED: return CLEAN;
    }
}

function move(x, y, cur_dir) {
    switch (cur_dir) {
        case UP: return [x - 1, y];
        case RIGHT: return [x, y + 1];
        case DOWN: return [x + 1, y];
        case LEFT: return [x, y - 1];
    }
}