/*----- constants -----*/ 
const PLAYERS = {
    '1' : 'X',
    '-1' : 'O',
    'null': ''
};

const COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

/*----- app's state (variables) -----*/ 
let board, turn, winner;

/*----- cached element references -----*/ 
const message = document.querySelector('h2');
const squares = document.querySelectorAll('.square');

/*----- event listeners -----*/ 
document.querySelector('button').addEventListener('click', init);
document.getElementById('game-board').addEventListener('click', handleMove);

/*----- functions -----*/
init();

function init() {
    console.log('game started');
    board = [
        null, null, null,
        null, null, null,
        null, null, null
    ];
    turn = 1; // X will go first
    winner = null;
    render(); // clear the game board and reset to beginning
}

function handleMove(evt) {
    if(winner) return;
    // TODO: stop the game if we have a winner
    if(evt.target.tagName !== 'DIV') return;
    // 1) capture the id value from the clicked div
    const squareIdx = evt.target.id;

    if(board[squareIdx]) return; // if the space if occupied, don't run
    // 2) update the board array and place a 1 or -1 in 
    // the correct position 
    board[squareIdx] = turn;
    // check if there's a winner
    winner = getWinner();

    turn *= -1; // toggling between 1 & -1
    // update the DOM
    render();
}

function getWinner() {
    // loop over the combos array
    for(let i = 0; i < COMBOS.length; i++) {
        // for each sub array in the combos array:
        // check the corresponding positions in the board array
        // use Math.abs to match up all the values in the winning positions
        // if we get 3 as the absolute value in those positions, we have a winner        
        if(Math.abs(board[COMBOS[i][0]] + board[COMBOS[i][1]] + board[COMBOS[i][2]]) === 3) {
            return turn; // the last turn made the winning move
        }
    }

    if(board.includes(null)) return null;
    // if the board still have at least one value of null, and no winner, keep playing
    // if all spaces are occupied by a value other than null, and no winner, we have a tie
    return 'T';
}

function render() {
    board.forEach((value, index) => {
        squares[index].textContent = PLAYERS[value]
    });

    if (!winner) {
        message.textContent = `${PLAYERS[turn]}'s Turn`
    } else if (winner === 'T') {
        message.textContent = 'Tie Game!'
    } else {
        message.textContent = `${PLAYERS[winner]} Wins!`
    }
}