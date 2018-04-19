"use strict";

let fs = require('fs');
let readline = require('readline');

const input = fs.createReadStream('11-input');
const lineReader = readline.createInterface({
    input
});

lineReader.on('line', processLine);
function processLine(line) {
    const directions = line.split(',');
    const moves = {
        n: 0, // -s
        ne: 0, // -sw
        nw: 0, // -se
        s: 0,
        sw: 0,
        se: 0
    };
    let ds = [];
    directions.forEach(d => {
        switch (d) {
            case 'n':
                if (moves['s'] > 0) {
                    moves['s']--;
                } else {
                    moves['n']++;
                }
                break;
            case 'ne':
                if (moves['sw'] > 0) {
                    moves['sw']--;
                } else {
                    moves['ne']++;
                }
                break;
            case 'nw':
                if (moves['se'] > 0) {
                    moves['se']--;
                } else {
                    moves['nw']++;
                }
                break;
            case 'se':
                if (moves['nw'] > 0) {
                    moves['nw']--;
                } else {
                    moves['se']++;
                }
                break;
            case 'sw':
                if (moves['ne'] > 0) {
                    moves['ne']--;
                } else {
                    moves['sw']++;
                }
                break;
            case 's':
                if (moves['n'] > 0) {
                    moves['n']--;
                } else {
                    moves['s']++;
                }
                break;
        }
        ds.push(calculateDistance(moves));
    });
    console.log(moves);
    console.log(Math.max.apply(null, ds));
}

function calculateDistance(moves) {
    const movesArr = ['n', 'ne', 'se', 's', 'sw', 'nw'];
    let startingElement;
    for (let i = 0; i < movesArr.length; i++) {
        if (moves[movesArr[i]] === 0 && moves[movesArr[(i + 1) % movesArr.length]] !== 0) {
            startingElement = (i + 1) % movesArr.length;
            // console.log(startingElement);
            break;
        }
    }
    let rotatedMoves = { ne: 0, n: 0, nw: 0 };
    const dir = ['nw', 'n', 'ne'];
    if (startingElement !== undefined) {
        for (let i = 0; i < 3; i++) {
            rotatedMoves[dir[i]] = moves[movesArr[(startingElement + i) % movesArr.length]]
        }
    }
    // console.log(rotatedMoves);

    let diff = Math.abs(rotatedMoves['ne'] - rotatedMoves['nw']);
    let min = Math.min(rotatedMoves['ne'], rotatedMoves['nw']);
    let max = Math.max(rotatedMoves['ne'], rotatedMoves['nw'])
    return (diff + min + rotatedMoves['n']);
}

/**
 * Notes:
 * ne + nw = n
 * se + sw = s
 * n + se = ne
 * ne + s = se
 * s + ne = sw
 * n + sw = nw
 * 
 * -nw - ne = -n SO n = nw + ne 
 * OK interesting... 
 */