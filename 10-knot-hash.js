"use strict";

const input = init();
function init() {
    const result = [];
    for (let i = 0; i <= 255; i++) {
        result.push(i);
    }
    return result;
}
const lengths = [189,1,111,246,254,2,0,120,215,93,255,50,84,15,94,62];

function knotHash(lengths, input) {
    let currentPosition = 0;
    let skipSize = 0;
    lengths.forEach(length => {
        reverse(input, currentPosition, length);
        currentPosition += length + skipSize;
        currentPosition %= input.length;
        skipSize++;
    });
    // console.log(input[0] * input[1]);
}

function reverse(input, currentPosition, length) {
    const orig = [...input];
    length = length - 1;
    for (let i = 0; i <= Math.floor(length / 2); i++) {
        let begin = (currentPosition + i) % input.length;
        let end = (currentPosition + length - i) % input.length;
        // console.log(`swapping ${begin} and ${end}`);
        let temp = input[begin];
        input[begin] = input[end];
        input[end] = temp;
    }
    // console.log(`${orig} reversed to ${input}. current pos: ${currentPosition}. length: ${length}`);
}

// knotHash(lengths, input);

/* Part Two */
function partTwo(lengths, input) {
    lengths = lengths.split('').map(s => s.charCodeAt(0))
    console.log(lengths);
    
    // lengths = lengths.reduce((prev, curr) => [...prev, ...curr], []);
    lengths = [...lengths, 17, 31, 73, 47, 23];
    knotHashParTwo(lengths, input);
}

function knotHashParTwo(lengths, input) {
    let currentPosition = 0;
    let skipSize = 0;
    for (let i = 0; i < 64; i++) {
        lengths.forEach(length => {
            reverse(input, currentPosition, length);
            currentPosition += length + skipSize;
            currentPosition %= input.length;
            skipSize++;
        });
    }
    // console.log(input[0] * input[1]);
    reduceToDenseHash(input);
}

function reduceToDenseHash(sparseHash) {
    console.log(sparseHash.length);
    let result = [];
    for (let i = 0; i + 16 <= 256; i += 16) {
        const s = sparseHash.slice(i, i + 16);
        const digit = s.reduce((prev, curr) => {
            return prev ^ curr;
        }, 0);
        result.push(digit);
    }

    const hex = result.map(n => {
        const r = n.toString(16);
        if (r.length === 1) {
            return "0" + r;
        } else return r;
    });
    console.log(hex);
    console.log(hex.join(''));
}

const partTwoInput = "189,1,111,246,254,2,0,120,215,93,255,50,84,15,94,62";
// partTwo("1,2,3", input);
partTwo(partTwoInput, input);
