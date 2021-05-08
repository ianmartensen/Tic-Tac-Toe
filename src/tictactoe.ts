const readline = require('readline');

let ticTacToeBoard = [
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"]
]

let winningOutcomes: Array<Array<number>> = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function drawBoard(): void {
    return console.log(`
    _${ticTacToeBoard[0][0]}_|_${ticTacToeBoard[0][1]}_|_${ticTacToeBoard[0][2]}_\r\n
    _${ticTacToeBoard[1][0]}_|_${ticTacToeBoard[1][1]}_|_${ticTacToeBoard[1][2]}_\n
     ${ticTacToeBoard[2][0]} | ${ticTacToeBoard[2][1]} | ${ticTacToeBoard[2][2]}\n`)}

function getUserInput() {
    let choice: number = rl.question(`
    You are X. \n
    Please choose an available number and hit enter: `, function(input: string): any {
        let row: number;
        let idx: number;

        if (parseInt(input) > 8 && parseInt(input) < 0) {
            console.log('Input not valid. Please try again...');
            getUserInput();
        } else {
            if (parseInt(input) >= 0 && parseInt(input) <= 2) {
                row = 0;
                idx = parseInt(input)
            } else if (parseInt(input) >= 3 && parseInt(input) <= 5) {
                row = 1;
                idx = parseInt(input) - 3;
            } else if (parseInt(input) >= 6 && parseInt(input) <= 8) {
                row = 2;
                idx = parseInt(input) - 6;
            }
            processUserInput(row, idx);
         }
        
        // if (ticTacToeBoard[0][parseInt(input)] !== "X" || ticTacToeBoard[0][parseInt(input)] !== "O") {
        //     processUserInput(parseInt(input));
        // } else {
        //     console.log('Input not valid. Please try again...');
        //     getUserInput();
        // }
    });   
}

function processUserInput(row: number, input: number) {
    ticTacToeBoard[row][input] = "X";
    checkGameState(ticTacToeBoard, input);
    drawBoard();
    setTimeout(computerInput, 1000)
}

function computerInput() {
    while (true) {
        let row: number = Math.floor(Math.random() * 3);
        let idx: number = Math.floor(Math.random() * 3);
        let input: number;

        if (row = 2) {
            input = idx + 6;
        } else if (row = 1) {
            input = idx + 3;
        } else {
            input = idx;
        }

        if (ticTacToeBoard[row][idx] === "X" || ticTacToeBoard[row][idx] === "O") {
            row = Math.floor(Math.random() * 3);
            idx = Math.floor(Math.random() * 3);
        } else {
            ticTacToeBoard[row][idx] = "O";
            console.log(input);
            checkGameState(ticTacToeBoard, input);
            drawBoard();
            getUserInput();
            break;
        }
    }
}

function checkGameState(board: Array<Array<string>>, input: number) {
    let x: Array<number> = [];
    let o: Array<number> = [];

    // Add all current board pos to their respective list
    for (let i: number = 0; i < board.length; i++) {
        for (let j: number = 0; j < board[i].length; j++) {
            if (i === 0) {
                if (board[i][j] == "X") {
                    console.log(board[i].indexOf(board[i][j]))
                    x.push(board[i].indexOf(board[i][j]));
                } else if (board[i][j] == "O") {
                    o.push(board[i].indexOf(board[i][j]));
                }
            } else if (i === 1) {
                if (board[i][j] == "X") {
                    console.log(board[i].indexOf(board[i][j]))
                    x.push(board[i].indexOf(board[i][j]) + 3);
                } else if (board[i][j] == "O") {
                    o.push(board[i].indexOf(board[i][j]) + 3);
                }
            } else if (i === 2) {
                if (board[i][j] == "X") {
                    console.log(board[i].indexOf(board[i][j]))
                    x.push(board[i].indexOf(board[i][j]) + 6);
                } else if (board[i][j] == "O") {
                    o.push(board[i].indexOf(board[i][j]) + 6);
                }
            }
        }
    }

    console.log(x, 'Current X Positions');
    console.log(o, 'Current O Positions');
}

drawBoard();
getUserInput();