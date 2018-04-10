const input = [2, 8, 8, 5, 4, 2, 3, 1, 5, 5, 1, 2, 15, 13, 5, 14];

function redist(mem) {
    const history = {};
    let numRedists = 0;
    for (;history[mem] === undefined; numRedists++) {
        history[mem] = numRedists;
        const maxIndex = findMaxIndex(mem);
        redistFromIndex(mem, maxIndex);
    }
    const cycleLength = numRedists - history[mem];
    console.log(`performed ${numRedists} redists. Cycle length was ${cycleLength}`);
}

function findMaxIndex(mem) {
    let max = Number.MIN_SAFE_INTEGER;
    let maxIndex = -1;
    for (let i = 0; i < mem.length; i++) {
        if (mem[i] > max) {
            max = mem[i];
            maxIndex = i;
        }
    }
    return maxIndex;
}

function redistFromIndex(mem, index) {
    let remaining = mem[index];
    mem[index] = 0;
    for (let i = getNextIndex(mem, index); remaining > 0; --remaining, i = getNextIndex(mem, i)) {
        mem[i]++;
    }
}

function getNextIndex(mem, index) {
    return index === mem.length - 1 ? 0 : index + 1;
}

redist(input);