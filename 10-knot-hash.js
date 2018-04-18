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
    console.log(input[0] * input[1]);
}

function reverse(input, currentPosition, length) {
    const orig = [...input];
    length = length - 1;
    for (let i = 0; i <= Math.floor(length / 2); i++) {
        let begin = (currentPosition + i) % input.length;
        let end = (currentPosition + length - i) % input.length;
        console.log(`swapping ${begin} and ${end}`);
        let temp = input[begin];
        input[begin] = input[end];
        input[end] = temp;
    }
    console.log(`${orig} reversed to ${input}. current pos: ${currentPosition}. length: ${length}`);
}

knotHash(lengths, input);

// knotHash([3, 4, 1, 5],[0, 1, 2, 3, 4])