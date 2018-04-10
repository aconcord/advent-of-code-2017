/**
 * :: Part 1 ::
 * Compute the manhattan distance from the origin of a number
 * 7 8 9
 * 6 1 2
 * 5 4 3
 */
function manhattanDistance(number /* Number */) {
    let curr = 1;
    let runLength = 1; // the number of squares we will go in each direction
    let position = [0,0]; // x,y

    const getNextDirection = getNextDirectionGenerator();
    const nextDirection = () => getNextDirection.next().value;
    let i = 0;
    while (curr !== number) {
        const direction = nextDirection();
        for (let i = 0; i < runLength && curr !== number; i++) {
            position = applyMovement(position, direction);
            curr++;
        }
        if (i % 2 === 1) {
            runLength++;
        }
        i++;
    }
    const mDist = Math.abs(position[0])+Math.abs(position[1]);

    console.log(`counted up to ${curr}. Got position ${position}. Manhattan dist ${mDist}`);
}

// the ordered list of directions
const directions = ['right', 'down', 'left', 'up'];
const movements = {
    right: [1,0],
    down: [0,-1],
    left: [-1,0],
    up: [0,1]
};

const adjacentMovements = Object.assign({},movements,{
    rightUp: [1,1],
    leftUp: [-1,1],
    leftDown: [-1,-1],
    rightDown: [1,-1]
});
function* getNextDirectionGenerator() {
    while (true) {
        yield movements.right;
        yield movements.up;
        yield movements.left;
        yield movements.down;
    }
}
manhattanDistance(325489);

/**
 * :: Part Two ::
 * The value of a square is calculated based on the sum of its neighbors
 * 
 * 147  142  133  122   59
 * 304    5    4    2   57
 * 330   10    1    1   54
 * 351   11   23   25   26
 * 362  747  806--->   ...
 */
function adjacentSums(number /* Number */) {
    let curr = 1;
    let runLength = 1; // the number of squares we will go in each direction
    let position = [0,0]; // x,y
    const board = {'0,0': 1}; // cellPos -> value: Number

    const getNextDirection = getNextDirectionGenerator();
    const nextDirection = () => getNextDirection.next().value;
    let i = 0;
    while (curr <= number) {
        const direction = nextDirection();
        for (let i = 0; i < runLength && curr <= number; i++) {
            position = applyMovement(position, direction);
            curr = sumOfAdj(position, board);
            board[position] = curr;
        }
        if (i % 2 === 1) {
            runLength++;
        }
        i++;
    }
    const mDist = Math.abs(position[0])+Math.abs(position[1]);

    console.log(`counted up to ${curr}. Got position ${position}. Adjacent Sums ${mDist}`);
}

/**
 * 
 */
function sumOfAdj(position, board) {
    let value = 0;
    for (let dir in adjacentMovements) {
        let newPos = applyMovement(position, adjacentMovements[dir]);
        if (board.hasOwnProperty(newPos)) {
            value += board[newPos];
        }
    }
    return value;
}

function applyMovement(position, movement) {
    return [position[0] + movement[0], position[1] + movement[1]];
}

adjacentSums(325489);