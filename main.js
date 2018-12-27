
function findNode(nodes, name) {
    let length = nodes.length;
    for(let i = 0; i < length; ++i) {
        let node = nodes[i];
        if (node[0] == name) {
            return node;
        }
    }
    return null;
}
/**
* Find the shortest distance between point a and point b in the graph g.
*
* @param  {array} g array of objects {source, destination, distance, isBidirection}
* @param  {String} a source
* @param  {String} b destination
* @return {double} shortest distance between a and b, return -9999 if no route found
*
*/
function computeShortestDistance(g, a, b) {
    let current_node = findNode(g, a);
    return current_node;
}

// Sample Data
const graph = [
    ['a', 'b', 5, 'y'],
    ['a', 'c', 4, 'y'],
    ['a', 'f', 8, 'y'],
    ['a', 'k', 4, 'n'],
    ['b', 'a', 5, 'y'],
    ['b', 'c', 2, 'y'],
    ['b', 'd', 3, 'y'],
    ['c', 'a', 4, 'y'],
    ['c', 'b', 2, 'y'],
    ['c', 'd', 3, 'y'],
    ['c', 'e', 8, 'y'],
    ['d', 'b', 3, 'y'],
    ['d', 'c', 2, 'y'],
    ['d', 'f', 2, 'y'],
    ['e', 'c', 8, 'y'],
    ['e', 'f', 1, 'y'],
    ['e', 'h', 5, 'y'],
    ['f', 'a', 8, 'y'],
    ['f', 'd', 2, 'y'],
    ['f', 'e', 1, 'y'],
    ['f', 'g', 6, 'y'],
    ['g', 'f', 6, 'y'],
    ['g', 'k', 5, 'y'],
    ['h', 'i', 8, 'y'],
    ['i', 'f', 1, 'y'],
    ['i', 'j', 1, 'y'],
    ['j', 'g', 3, 'y'],
    ['j', 'k', 4, 'y'],
    ['k', 'f', 6, 'y'],
    ['z', 'z', 1, 'y']
];  

var isInTest = typeof global.it === 'function';
if (isInTest) {
    var assert = require('assert');

    // Sample Unit Test for the above data
    describe('--- Shortest Distance Test ---', function() {
        it('Distance from a to g should be equal to 9', function() {
            const result = computeShortestDistance(graph,"a", "g");
            const expected = 9;
            assert.equal(result, expected);
        });
        it('Distance from g to h should be equal to 12', function() {
            const result = computeShortestDistance(graph,"g", "h");
            const expected = 12;
            assert.equal(result, expected);
        });
        it('Distance from z to a should be equal to Infinity', function() {
            const result = computeShortestDistance(graph,"z", "a");
            const expected = Infinity;
            assert.equal(result, expected);
        });
        it('Distance from b to e should be equal to 6', function() {
            const result = computeShortestDistance(graph,"b", "e");
            const expected = 6;
            assert.equal(result, expected);
        });
        it('Distance from a to k should be equal to 4', function() {
            const result = computeShortestDistance(graph,"a", "k");
            const expected = 4;
            assert.equal(result, expected);
        });
        it('Distance from a to i should be equal to 9', function() {
            const result = computeShortestDistance(graph,"a", "i");
            const expected = 9;
            assert.equal(result, expected);
        });
        it('Distance from i to a should be equal to 9', function() {
            const result = computeShortestDistance(graph,"i", "a");
            const expected = 9;
            assert.equal(result, expected);
        });
    });
} else {
    //sandbox code
    console.log(computeShortestDistance(graph,"a", "g"));
}