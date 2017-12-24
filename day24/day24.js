var _ = require('underscore')
var input = `25/13\n4/43\n42/42\n39/40\n17/18\n30/7\n12/12\n32/28\n9/28\n1/1\n16/7\n47/43\n34/16\n39/36\n6/4\n3/2\n10/49\n46/50\n18/25\n2/23\n3/21\n5/24\n46/26\n50/19\n26/41\n1/50\n47/41\n39/50\n12/14\n11/19\n28/2\n38/47\n5/5\n38/34\n39/39\n17/34\n42/16\n32/23\n13/21\n28/6\n6/20\n1/30\n44/21\n11/28\n14/17\n33/33\n17/43\n31/13\n11/21\n31/39\n0/9\n13/50\n10/14\n16/10\n3/24\n7/0\n50/50`;
var lengths = {};

function solve(arr) {
    var parts = populate(arr);
    var score = descend(parts, 0 /*starting value*/, 0 /*current score*/, {} /*visited*/, 0 /*length*/);
    console.log(score);
    console.log(lengths);
}

function descend(parts, cur, score, visited, length) {
    // If no more parts.
    if (!parts[cur]) {
        score += cur;
        if (!lengths[length]) lengths[length] = [];
        lengths[length].push(score);
        return score;
    }

    var scores = [score];
    _.each(parts[cur], (index, value) => {
        value = parseInt(value);
        if (visited[index]) return;
        var updated_visited = {};
        updated_visited[index] = true;
        var local_score = Math.max(score, descend(parts, value, score + value + cur, _.extend({}, visited, updated_visited), length + 1));
        scores.push(local_score);
    });

    if (scores.length == 1) {
        if (!lengths[length]) lengths[length] = [];
        lengths[length].push(score);
        return score;
    }

    return _.reduce(scores, (m, n) => m > n ? m : n, 0);
}

function populate(arr) {
    var parts = {};
    _.each(arr, (part, index) => {var [a, b] = _.map(part.split('/'), (a) => parseInt(a));
        parts = insert(parts, a, b, index);
        parts = insert(parts, b, a, index);
    });

    return parts;
}

function insert(parts, a, b, index) {
    if (!parts[a])
        parts[a] = {};

    parts[a][b] = index;
    return parts;
}

solve(input.split('\n'));

