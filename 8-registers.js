"use strict";

const fs = require('fs');
const readline = require('readline');

const input = fs.createReadStream('8-input');
const lineReader = readline.createInterface({
    input,
});

lineReader.on('line', processLine);
lineReader.on('close', run);

const instructions = [];

class Instruction {
    constructor(register, op, amount, predLeftArg, predOp, predRightArg) {
        this.register = register;
        this.op = Instruction.parseOp(op);
        this.amount = amount;
        this.predicate = new Predicate(predLeftArg, predOp, predRightArg);
    }
    execute(registers) {
        if (this.predicate.execute(registers)) {
            const registerValue = this.getRegisterValue(this.register, registers);
            const result = eval(`${registerValue} ${this.op} ${this.amount}`);
            
            // store result in register
            registers[this.register] = result;
        }
    }
    getRegisterValue(register, registers) {
        if (registers.hasOwnProperty(register)) {
            return registers[register].toString();
        }
        return "0"; // unset registers start at 0;
    }
    static parseOp(op) {
        if (op === 'inc') {
            return '+';
        } else {
            return '-';
        }
    }
}

class Predicate {
    constructor(left, op, right) {
        this.left = left;
        this.op = op;
        this.right = right;
    }

    execute(registers) {
        const left = this.resolveSymbol(this.left, registers);
        const right = this.resolveSymbol(this.right, registers);
        return eval(`${left} ${this.op} ${right}`);
    }

    /**
     * 
     * @param {string} sym 
     */
    resolveSymbol(sym, registers) {
        // sym is either a literal number or a register
        if (/\d+/.test(sym)) {
            return sym;
        } else {
            return registers[sym] || "0";
        }
    }
}

class Computer {
    constructor() {
        this.registers = {};
    }
    executeInstruction(instruction) {
        instruction.execute(this.registers);
    }
    getLargestRegister() {
        let max = Number.NEGATIVE_INFINITY;
        for (let reg in this.registers) {
            if (this.registers[reg] > max) {
                max = this.registers[reg];
            }
        }
        return max;
    }
}

/**
 * 
 * @param {string} line 
 */
function processLine(line) {
    const [register, op, amount, /* if */, predLeftArg, predOp, predRightArg] = line.split(' '); 
    instructions.push(new Instruction(
        register,
        op,
        amount,
        predLeftArg,
        predOp,
        predRightArg
    ));
}

function run() {
    const computer = new Computer();
    let largestEverRegister = Number.NEGATIVE_INFINITY;
    instructions.forEach(i => {
        computer.executeInstruction(i)
        const currLargest = computer.getLargestRegister();
        if (currLargest > largestEverRegister) {
            largestEverRegister = currLargest;
        }
    });
    console.log(`largest: ${computer.getLargestRegister()}, largest ever: ${largestEverRegister}`);
}