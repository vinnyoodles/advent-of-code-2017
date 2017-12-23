var _ = require('underscore');
var input = `set b 93\nset c b\njnz a 2\njnz 1 5\nmul b 100\nsub b -100000\nset c b\nsub c -17000\nset f 1\nset d 2\nset e 2\nset g d\nmul g e\nsub g b\njnz g 2\nset f 0\nsub e -1\nset g e\nsub g b\njnz g -8\nsub d -1\nset g d\nsub g b\njnz g -13\njnz f 2\nsub h -1\nset g b\nsub g c\njnz g 2\njnz 1 3\nsub b -17\njnz 1 -23`;

function part1(data) {
    var count = 0;
    var index = 0;
    var reg = {};

    while (index >= 0 && index < data.length) {
        var tokens = data[index].split(' ');
        var jump = 1;
        if (!_.has(reg, tokens[1])) reg[tokens[1]] = 0;
        switch(tokens[0]) {
            case 'set':
                reg[tokens[1]] = get(reg, tokens[2]);
                break;
            case 'sub':
                reg[tokens[1]] -= get(reg, tokens[2]);
                break;
            case 'mul':
                count ++;
                reg[tokens[1]] *= get(reg, tokens[2]);
                break;
            case 'jnz':
                if (get(reg, tokens[1]) != 0) {
                    jump = get(reg, tokens[2]);
                }
                break;

        }

        index += jump;
    }
    console.log(count);
}

function get(reg, token) {
    return isNaN(token) ? (reg[token] ? reg[token] : 0) : parseInt(token);
}

part1(input.split('\n'));
