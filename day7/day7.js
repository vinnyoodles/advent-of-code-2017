var _ = require('underscore');
var fs = require('fs');
var filename = 'day7.txt';
fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  part1(data);
  part2(data);
});

function part1(data) {
    var arr = _.map(data.trim().split('\n'), (a) => {
        var pair = _.map(a.split('->'), (b) => {
            return b.trim();
        });
        var node = {};
        node.name = pair[0].split('(')[0].trim();
        if (pair.length > 1) {
            var children = _.map(pair[1].split(','), (c) => c.trim());
            node.children = {};
            _.each(children, (c) => {
                node.children[c] = true;
            })
        }
        return node;
    });
    var seen = {};
    _.each(arr, (node) => {
        _.each(node.children, (_, k) => {
            seen[k] = true;
        });
    });

    var unseen = [];
    _.each(arr, (node) => {
        if (!seen[node.name]) {
           unseen.push(node.name);
        }
    });
    console.log(unseen);
}

function part2(data) {
    var arr = _.map(data.trim().split('\n'), (a) => {
        var pair = _.map(a.split('->'), (b) => {
            return b.trim();
        });
        var node = {};
        var node_data = pair[0].split('(');
        node.name = node_data[0].trim();
        node.weight = node_data[1].split(')')[0];
        if (pair.length > 1) {
            var children = _.map(pair[1].split(','), (c) => c.trim());
            node.children = {};
            _.each(children, (c) => {
                node.children[c] = true;
            })
        }
        return node;
    });
    var tree = _.indexBy(arr, 'name');
    var root_node = 'gmcrj';
    var total_weights = {};
    fill_weight(tree, total_weights, root_node);
    find_weight(tree, 0, total_weights, root_node);
}

function fill_weight(tree, total_weights, root) {
    if (!tree || !root || !tree[root]) 
        return;
    var children = tree[root].children;
    total_weights[root] = tree[root].weight;
    _.each(children, (_, c) => {
        fill_weight(tree, total_weights, c);
        total_weights[root] += tree[c].weight;
    });
}

function find_weight(tree, current_weight, total_weights, root) {
    if (!tree[root])
        return;

    var child_weights = [];
    _.each(tree[root].children, (_, c) => {
        child_weights.push(tree[c].weight);
    });

    if (child_weights.length == 0)
        return;

    var same = child_weights[0];
    for (var elem of child_weights) {
        if (same != elem) {
            // uneven
            _.each(tree[root].children, (_, c) => {
                find_weight(tree, current_weight, total_weights, c);
            });
            break;
        }
    }
}
