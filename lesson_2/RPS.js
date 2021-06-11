const READLINE = require('readline-sync');
const VALID_INPUT = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
const SHORT_INPUT = {
  r: 'rock',
  p: 'paper',
  sc: 'scissors',
  l: 'lizard',
  sp: 'spock'
};
const WINNING_COMBO = {
  rock: ['scissors','lizard'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  lizard: ['paper', 'spock'],
  spock: ['rock', 'scissors']
};
const WIN_SCORE = 3;
let playerScore = 0;
let compScore = 0;
let answer = '';
let greet = {
  welcome: '---------- Welcome to Rock Paper Scissors Lizard Spock! Time to Play! ----------',
  exit: '---------- Thanks for playing Rock Paper Scissors Lizard Spock! ----------'
};

function prompt(msg) {
  console.log('>>> ' + msg);
}

function getRoundResult(player, comp) {
  if (player === comp) {
    return 'Both input are the same - Its a Draw!';
  }
  for (let index = 0; index < WINNING_COMBO[player].length; index++) {
    if (WINNING_COMBO[player][index] === comp) {
      return player + ' beats ' + WINNING_COMBO[player][index] + ' - Player Wins!';
    } else if (WINNING_COMBO[comp][index] === player) {
      return comp + ' beats ' + WINNING_COMBO[comp][index] + ' - Computer Wins!';
    }
  }
  return undefined;
}

function computerMove() {
  let max = VALID_INPUT.length;
  let move = Math.floor((Math.random() * (max - Math.random())));
  return VALID_INPUT[move];
}

function playerMove() {
  prompt('What will Player choose? (Rock / Paper / Scissors / Lizard / Spock) - Can enter shorthand (r / p / sc / l / sp)');
  let move = READLINE.prompt().toLowerCase();
  move = invalidChoice(move);
  return move;
}

function shortChoice(value) {
  let choice = value;
  for (let key in SHORT_INPUT) {
    if (choice === key) {
      choice = SHORT_INPUT[key];
    }
  }
  return choice;
}

function invalidChoice(input) {
  let choice = shortChoice(input);
  while (!VALID_INPUT.includes(choice)) {
    prompt('Invalid input, please enter either (Rock / Paper / Scissors / Lizard / Spock) - Can also enter shorthand (r / p / sc / l / sp)');
    choice = READLINE.prompt().toLowerCase();
    choice = shortChoice(choice);
  }
  return choice;
}

function incrementWinner(input) {
  if (input.match(/Computer Wins!/g)) {
    compScore += 1;
  } else if (input.match(/Player Wins!/g)) {
    playerScore += 1;
  }
}

function checkWinner() {
  if (playerScore === WIN_SCORE) {
    prompt('Player won 3 out of 5! Player Wins!!!');
  } else if (compScore === WIN_SCORE) {
    prompt('Computer won 3 out of 5! Computer Wins!!!');
  } else {
    prompt('Player has won: ' + playerScore + ' - Computer has won: ' + compScore + ' - Next Round!');
  }
}

function playAgain() {
  prompt('Would you like to play again? (\'yes\' or \'no\')');
  let input = READLINE.prompt().toLowerCase();

  while (!(input === 'yes' || input === 'no')) {
    prompt('Invalid input, enter either \'yes\' or \'no\'...');
    input = READLINE.prompt().toLowerCase();
  }
  return input;
}

console.log(greet.welcome);

do {
  playerScore = 0;
  compScore = 0;

  while (!(playerScore === WIN_SCORE || compScore === WIN_SCORE)) {
    let playerInput = playerMove();

    let computerInput = computerMove();

    prompt('Player chose: ' + playerInput + ' - Computer chose: ' + computerInput);

    prompt(getRoundResult(playerInput, computerInput));

    incrementWinner(getRoundResult(playerInput, computerInput));

    checkWinner();
  }

  answer = playAgain();
} while (answer === 'yes');

console.log(greet.exit);