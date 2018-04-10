"use strict";

const fs = require('fs');
const readline = require('readline');

const input = fs.createReadStream('9-input');
const lineReader = readline.createInterface({
    input,
});

lineReader.on('line', processLine);

/**
 * 
 * @param {string} line 
 */
function processLine(line) {
    let totalScore = 0;
    let skipNextChar = false;
    let nestingLevel = 0;
    let inGarbage = false;
    let cancelledChars = 0;

    for (let i = 0; i < line.length; i++) {
        if (skipNextChar) {
            skipNextChar = false;
            continue;
        }
        const currChar = line[i];

        if (inGarbage) {
            switch (currChar) {
                case '!':
                    skipNextChar = true;
                    break;
                case '>':
                    inGarbage = false;
                    break;
                default:
                    cancelledChars++;
                    break;
            }
        } else /* not in garbage stream */ {
            switch (currChar) {
                case '!':
                    skipNextChar = true;
                    break;
                case '<':
                    inGarbage = true;
                    break;
                case '{':
                    nestingLevel++;
                    totalScore += nestingLevel;
                    break;
                case '}':
                    nestingLevel--;
                    break;
            }
        }
    }
    console.log(`total score: ${totalScore}. total cancelled chars: ${cancelledChars}`);
}
