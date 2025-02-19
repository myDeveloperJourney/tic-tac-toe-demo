# **Building a Tic-Tac-Toe Game in JavaScript**

## **Introduction**
This tutorial will guide you through building a simple **Tic-Tac-Toe** game using JavaScript, HTML, and CSS. We'll cover constants, state management, event listeners, and rendering game logic.

---

## **Project Structure**
### **1. Constants**
The game requires predefined constants for players and winning combinations.
```javascript
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
```
- `PLAYERS` maps numerical values (`1`, `-1`) to **'X'** and **'O'**.
- `COMBOS` contains all possible winning conditions.

### **2. Application State Variables**
The game state needs variables to track the board, player turns, and the winner.
```javascript
/*----- app's state (variables) -----*/
let board, turn, winner;
```
- `board` is an array representing the 3x3 grid.
- `turn` determines which player's turn it is (1 for 'X', -1 for 'O').
- `winner` tracks the game outcome (`1`, `-1`, `null`, or `'T'` for tie).

### **3. Cached DOM Elements**
We need to reference certain HTML elements to update them dynamically.
```javascript
/*----- cached element references -----*/
const message = document.querySelector('h2');
const squares = document.querySelectorAll('.square');
```
- `message` updates the text displaying the turn or winner.
- `squares` is a collection of board cells.

### **4. Event Listeners**
We add event listeners to handle user interactions.
```javascript
/*----- event listeners -----*/
document.querySelector('button').addEventListener('click', init);
document.getElementById('game-board').addEventListener('click', handleMove);
```
- Clicking the **reset button** calls `init()` to restart the game.
- Clicking on a **game square** triggers `handleMove()` to process the turn.

### **5. Initializing the Game**
The `init()` function resets all state variables and calls `render()`.
```javascript
function init() {
    console.log('game started');
    board = [
        null, null, null,
        null, null, null,
        null, null, null
    ];
    turn = 1; // 'X' goes first
    winner = null;
    render();
}
```
- Sets `board` to all `null` values.
- Sets `turn` to **1** (player 'X' starts first).
- Resets `winner`.
- Calls `render()` to update the UI.

### **6. Handling Player Moves**
`handleMove()` processes the player's move.
```javascript
function handleMove(evt) {
    if (winner) return;
    if (evt.target.tagName !== 'DIV') return;
    
    const squareIdx = evt.target.id;
    if (board[squareIdx]) return;
    
    board[squareIdx] = turn;
    winner = getWinner();
    
    turn *= -1; // Switch turns
    render();
}
```
- If there is a winner, the function **stops execution**.
- Ensures the clicked element is a square.
- Retrieves the clicked square index.
- If the square is already occupied, it prevents further changes.
- Updates the `board` with the current player's move.
- Calls `getWinner()` to check for a game-ending condition.
- Swaps turn between `1` (X) and `-1` (O).
- Calls `render()` to update the UI.

### **7. Checking for a Winner**
The `getWinner()` function evaluates if a player has won or if the game is a tie.
```javascript
function getWinner() {
    for (let i = 0; i < COMBOS.length; i++) {
        if (Math.abs(board[COMBOS[i][0]] + board[COMBOS[i][1]] + board[COMBOS[i][2]]) === 3) {
            return turn;
        }
    }
    
    if (board.includes(null)) return null;
    return 'T';
}
```
- Iterates through each possible **winning combination**.
- If a row, column, or diagonal sums to `3` (all Xs) or `-3` (all Os), that player wins.
- If there are no null spaces left but no winner, the game is a **tie** ('T').

### **8. Rendering the Game State**
The `render()` function updates the UI based on the latest game state.
```javascript
function render() {
    board.forEach((value, index) => {
        squares[index].textContent = PLAYERS[value];
    });

    if (!winner) {
        message.textContent = `${PLAYERS[turn]}'s Turn`;
    } else if (winner === 'T') {
        message.textContent = 'Tie Game!';
    } else {
        message.textContent = `${PLAYERS[winner]} Wins!`;
    }
}
```
- Loops through `board`, updating each square with 'X', 'O', or blank.
- Updates the **message** based on the game's status:
  - Displays the current player's turn.
  - Declares the **winner** if applicable.
  - Declares a **tie** if no moves are left.

---

## **Final Thoughts**
### **How the Game Works**
1. The game initializes with an empty board.
2. Players take turns clicking squares to place **X** or **O**.
3. The program checks for a **win condition** or a **tie**.
4. The UI updates dynamically after each move.
5. Clicking **reset** starts a new game.

### **Next Steps**
- Add a **score tracker**.
- Implement **AI for single-player mode**.
- Enhance the UI with **CSS animations**.

This simple Tic-Tac-Toe game is a great way to understand JavaScript fundamentals, including event listeners, DOM manipulation, and game logic! 🚀

