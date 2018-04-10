fs = require('fs');
readline = require('readline');

const input = fs.createReadStream('7-input');
const lineReader = readline.createInterface({
    input,
});

lineReader.on('line', processLine);
const lineRegExp = /^(\w+)\s+\((\d+)\)(?:\s+->\s+(.*))*$/;
const programMap = new Map();
function processLine(line) {
    const [, name, weight, progsAbove ] = lineRegExp.exec(line);
    const children = progsAbove ? progsAbove.split(', ') : [];
    programMap.set(name, {
        name, 
        weight: Number.parseInt(weight),
        children
    })
}

lineReader.on('close', () => {
    const root = findRoot(programMap);
    console.log(`root is ${root}`);
    findUnbalancedNode(root, programMap, (num) => {
        console.log(`weight should be ${num}`);
    });
});

/**
 * 
 * @param {Map<string, Object>} programMap 
 */
function findRoot(programMap /* Map */) {
    let rootProg; 
    for ([,rootProg] of programMap) {
        if (isRoot(rootProg, programMap)) {
            break;
        }
    }
    return rootProg.name;
}

/**
 * 
 * @param {Object} prog 
 * @param {Map} programMap 
 */
function isRoot(prog, programMap) {
    const visited = {};
    visit(prog, programMap, visited);
    return Object.keys(visited).length === programMap.size;
}

/**
 * 
 * @param {Object} prog 
 * @param {Map} programMap 
 * @param {Object} visited 
 */
function visit(prog, programMap, visited) {
    visited[prog.name] = true;
    prog.children.map(p => visit(programMap.get(p), programMap, visited));
}

/**
 * 
 * @param {string} root
 * @param {Map<string, Object>} programMap 
 */
function findUnbalancedNode(root, programMap, foundIt) {
    const currNode = programMap.get(root);
    const weights = currNode.children.map(node => findUnbalancedNode(node, programMap, foundIt));
    const weightMap = {};
    const indexMap = {};
    let i = 0;
    for (let weight of weights) {
        indexMap[ weight ] = i;
        if (weightMap[ weight ]) {
            weightMap[ weight ]++;
        } else {
            weightMap[ weight ] = 1;
        }
        i++;
    }

    let hasUnbal = false;
    let unbalWeight;
    let balWeight;
    for (let weight in weightMap) {
        if (weightMap[weight] === 1) {
            unbalWeight = weight;
            hasUnbal = true;
        } else {
            balWeight = weight;
        }
    }

    if (hasUnbal) {
        const indexOfUnBal = indexMap[unbalWeight];
        const childToAdj = currNode.children[indexOfUnBal];
        const adj = balWeight - unbalWeight;
        const newWeight = adj + programMap.get(childToAdj).weight;
        foundIt(newWeight);
    }

    return weights.reduce((prev, curr) => curr + prev, 0) + currNode.weight;
}