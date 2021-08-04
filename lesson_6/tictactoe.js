const readline = require("readline-sync");
const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const WINNING_LINES = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9],
    [1, 5, 9], [3, 5, 7]
  ];

function prompt(msg) {
  console.log(`>> ${msg}`);
}

function displayBoard(board, userScore, compScore) {
  console.clear();
  
  prompt(`You are ${HUMAN_MARKER}. Computer is ${COMPUTER_MARKER}`);

  console.log('');
  console.log('     |     |');
  console.log(`  ${board['1']}  |  ${board['2']}  |  ${board['3']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['4']}  |  ${board['5']}  |  ${board['6']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['7']}  |  ${board['8']}  |  ${board['9']}`);
  console.log('     |     |');
  console.log('');
}

function initializeBoard() {
  let board = {};

  for (let square = 1; square <= 9; square++) {
    board[String(square)] = INITIAL_MARKER;
  }

  return board;
}

function emptySquares(board) {
  return Object.keys(board).filter(key => board[key] === ' ');
}

function joinOr(arr, delimiter = ', ', lastWord = 'or') {
  switch (arr.length) {
    case 0:
      return '';
    case 1:
      return arr[0];
    case 2:
      return arr[0] + ' ' + lastWord + ' ' + arr[1];
    default:
      return arr.slice(0, arr.length - 1).join(delimiter) + delimiter + lastWord + ' ' + arr[arr.length - 1];
  }
}

function playerChoosesSquare(board) {
  let square;

  while (true) {
    prompt(`Choose a square (${joinOr(emptySquares(board))}):`);
    square = readline.question().trim();
    if (emptySquares(board).includes(square)) break;

    prompt("Sorry, that's not a valid choice.");
  }

  board[square] = HUMAN_MARKER;
}

function computerChoosesSquare(board) {
  let square;
  
  for (let index = 0; index < WINNING_LINES.length; index++) {
    let line = WINNING_LINES[index];
    square = findAtRiskSquare(line, board, COMPUTER_MARKER);
    if (square) break;
  }
  
  for (let index = 0; index < WINNING_LINES.length; index++) {
    let line = WINNING_LINES[index];
    square = findAtRiskSquare(line, board, HUMAN_MARKER);
    if (square) break;
  }
  
  if (board['5'] === INITIAL_MARKER) return board['5'] = COMPUTER_MARKER;

  if (!square) {
    let randomIndex = Math.floor(Math.random() * emptySquares(board).length);
    square = emptySquares(board)[randomIndex];
  }

  board[square] = COMPUTER_MARKER;
}

function findAtRiskSquare(line, board, marker) {
  let markersInLine = line.map(square => board[square]);

  if (markersInLine.filter(val => val === marker).length === 2) {
    let unusedSquare = line.find(square => board[square] === INITIAL_MARKER);
    if (unusedSquare !== undefined) {
      return unusedSquare;
    }
  }

  return null;
}

function boardFull(board) {
  return emptySquares(board).length === 0;
}

function someoneWon(board) {
  return detectWinner(board);
}

function detectWinner(board) {
  for (let line = 0; line < WINNING_LINES.length; line++) {
    let [ sq1, sq2, sq3 ] = WINNING_LINES[line];

    if (
        board[sq1] === HUMAN_MARKER &&
        board[sq2] === HUMAN_MARKER &&
        board[sq3] === HUMAN_MARKER
    ) {
      return 'Player';
    } else if (
        board[sq1] === COMPUTER_MARKER &&
        board[sq2] === COMPUTER_MARKER &&
        board[sq3] === COMPUTER_MARKER
    ) {
      return 'Computer';
    }
  }

  return null;
}

function displayScore(score1, score2) {
  return 'Player Score: ' + score1 + ' Computer Score: ' + score2;
}

function playAgain(string) {
  prompt('Play again? Enter ( Y/y or N/n )');
  let answer = readline.question().toLowerCase();
  
  while (!(answer === 'y' || answer === 'n')) {
    prompt('Invalid input: Must enter either ( Y/y or N/n )')
    answer = readline.question().toLowerCase();
  }
  return answer;
}

function chooseSquare(board, player) {
  if (player === 'Player') {
    return playerChoosesSquare(board);
  } else if (player === 'Computer') {
    return computerChoosesSquare(board);
  }
}

function alternatePlayer(player) {
  if (player === 'Player') return 'Computer';
  else if (player === 'Computer') return 'Player';
}

while (true) {
  let board = initializeBoard();
  let playerScore = 0;
  let computerScore = 0;
  let currentPlayer = 'Player';

  while (!(playerScore === 5 || computerScore === 5)) {
    board = initializeBoard();

    while (true) {
      displayBoard(board);
      chooseSquare(board, currentPlayer);
      currentPlayer = alternatePlayer(currentPlayer);
      if (someoneWon(board) || boardFull(board)) break;
    }

    displayBoard(board);

    if (someoneWon(board)) {
      prompt(`${detectWinner(board)} won!`);
      detectWinner === 'Player' ? playerScore += 1 : computerScore += 1;
      prompt(displayScore(playerScore, computerScore));
    } else {
      prompt("It's a tie!");
      prompt(displayScore(playerScore, computerScore));
    }
  }
  let answer = playAgain();
  if (answer === 'n') break;
}

prompt('Thanks for playing Tic Tac Toe!');