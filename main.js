/**
 * 
 * @param {array} nodes pool of nodes to search
 * @param {String} name name of origin node
 * @param {array} not_in array of previously visited nodes {source, destination, distance, isBidirection}
 */
function getVertices(nodes, name, not_in = []) {
    let vertices = [];
    let length = nodes.length;
    for (let i = 0; i < length; ++i) {
        let node = nodes[i];
        
        if ((node[3] == "y" && node[1] == name)) {
            //shortcut to check bidirectional nodes... not the best way likely
            let tempNode = [node[1], node[0], node[2], node[3]];
            node = tempNode;
        }
        if (node[0] == name) {
            let ok_to_push = true;
            //scan to see if we've already visited this node
            for (let j = 0; j < not_in.length; j++) {
                if (node[1] == not_in[j][0]) {
                    //this is already in the path
                    ok_to_push = false;
                    debugLog("excluding vertice " + node);
                    break;
                }
            }
            if (ok_to_push) {
                vertices.push(node);
            }
        }
    }
    return vertices;
}

/**
 * 
 * @param {array} nodes array of objects {source, destination, distance, isBidirection}
 * @param {array} path array of objects {source, destination, distance, isBidirection}
 * @param {String} next node name that we're searching from
 * @param {string} destination  node name of destination node
 */
function recursive_solution(nodes, path, next, destination) {
    debugLog("recursive_solution: " + next + "->" + destination);
    if (next == destination) {
        //sum up the path
        let sum = 0;
        for (let i = 0; i < path.length; i++) {
            sum += path[i][2];
        }
        debugLog('sum is ' + sum);
        return sum;
    } else {
        let vertices = getVertices(nodes, next, path);
        let smallest_sum = Infinity;
        for (let i = 0; i < vertices.length; i++) {
            let next_node = vertices[i];
            path.push(next_node);
            let distance = recursive_solution(nodes, path, next_node[1], destination);
            if (distance < smallest_sum) {
                debugLog ("distance of " + distance + " beat current record of " + smallest_sum);
                debugLog ("path is [\n" + debugFormatCurrentPath(path) + "\n]");
                smallest_sum = distance;
            }
            path.pop();
        }
        return smallest_sum;
    }
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
    let solution = recursive_solution(g, [], a, b);
    
    return solution;
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
    var debugFormatCurrentPath = (path) => {};
    var debugLog = (msg) => {};

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
    function debugFormatCurrentPath(path) {
        let output = "";
        for (let i = 0; i < path.length; i++) {
            let node = path[i];
            output += "\t" + node[0] + "--(" + node[2] + ")-->" + node[1] + "\n";
        }
        return output;
    }
    var debugLog = (msg) => console.log(msg);
    
    //sandbox code
    debugLog(computeShortestDistance(graph,"g", "h"));
}