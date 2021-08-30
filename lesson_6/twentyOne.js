const readline = require('readline-sync');
const SUIT_NAMES = {
  H: 'Hearts',
  D: 'Diamonds',
  S: 'Spades',
  C: 'Clubs'
};
const CARD_FACE_VALUES = {
  A: {name: 'Ace', value: 11},
  K: {name: 'King', value: 10},
  Q: {name: 'Queen', value: 10},
  J: {name: 'Jack', value: 10}
};
const TARGET_SCORE = 21;
const PLAY_CHOICES = ['yes', 'y', 'no', 'n'];
const HIT_OR_STAY = ['hit', 'h', 'stay', 's'];
const MAX_WINS = 5;

let playerHand = [];
let dealerHand = [];
let scores = {
  player: 0,
  dealer: 0
};

function prompt(msg) {
  console.log('>> ' + msg);
  return undefined;
}

function welcomeMsg() {
  console.log('>'.repeat(12) + ' Welcome To The Twenty-One Card Game! ' + '<'.repeat(12));
  console.log(' '.repeat(6) + '*'.repeat(50) + ' '.repeat(6));
  console.log(' '.repeat(12) + '*'.repeat(38) + ' '.repeat(12));
  console.log(' '.repeat(18) + '*'.repeat(26) + ' '.repeat(18));
  console.log('>'.repeat(24) + '   Rules   ' + '<'.repeat(27));
  console.log(`Player vs Dealer, both are dealt a hand of 2-Cards
On each turn, can choose to either Hit or Stay, add cards to hand or dont
If when a player hits and the total hand value goes over 21, they bust and lose the round
At end of round, both players show their hands to see whose total hand value is closer to 21
21 is the best possible hand, so that will always win the round
If both players have same total hand value, its a tie and round restarts
First player to win 5 rounds wins the game!\n`);
  return undefined;
}

function playAgain() {
  prompt('Would you like to play again? (Yes or No)');
  let answer = readline.question().toLowerCase();
  while (!PLAY_CHOICES.includes(answer)) {
    prompt('Invalid input, enter either (Yes or No)');
    answer = readline.question().toLowerCase();
  }
  return (answer === 'yes' || answer === 'y') ? true : false;
}

function nextRound() {
  prompt('Move onto next round? (Yes or No)');
  let answer = readline.question().toLowerCase();
  while (!PLAY_CHOICES.includes(answer)) {
    prompt('Invalid answer, please enter either (Yes or No)');
    answer = readline.question().toLowerCase();
  }
  return (answer === 'yes' || answer === 'y') ? true : false;
}

function startGame() {
  prompt('Ready to start the game? (Yes or No)');
  let answer = readline.question().toLowerCase();
  while (!PLAY_CHOICES.includes(answer)) {
    prompt('Invalid input, enter either (Yes or No)');
    answer = readline.question().toLowerCase();
  }
  return (answer === 'yes' || answer === 'y') ? true : false;
}

function shuffle(array) {
  for (let index = array.length - 1; index > 0; index--) {
    let otherIndex = Math.floor(Math.random() * (index + 1)); // 0 to index
    [array[index], array[otherIndex]] = [array[otherIndex], array[index]]; // swap elements
  }
  return undefined;
}

function initializeDeck() {
  let deck = [];

  for (let key in SUIT_NAMES) {
    for (let count = 2; count <= 10; count++) {
      deck.push([key, String(count)]);
    }
    for (let face in CARD_FACE_VALUES) {
      deck.push([key, face]);
    }
  }

  shuffle(deck);
  return deck;
}

function hitOrStay() {
  prompt('Player\'s turn: Would you like to Hit or Stay?');
  let move = readline.question().toLowerCase();
  while (!HIT_OR_STAY.includes(move)) {
    prompt('Invalid input, please enter either: Hit or Stay');
    move = readline.question().toLowerCase();
  }
  return (move === 'hit' || move === 'h') ? true : false;
}

function dealCards(shuffDeck, pHand, dHand) {
  let deckCopy = shuffDeck.slice();
  let cardIndex = Math.floor(Math.random() * (deckCopy.length + 1));

  for (let fullHand = 2; fullHand > 0; fullHand--) {
    pHand.push(deckCopy.splice(deckCopy[cardIndex], 1).flat());
    dHand.push(deckCopy.splice(deckCopy[cardIndex], 1).flat());
  }

  return undefined;
}

function dealHitCards(shuffDeck, answer, pHand) {
  let deckCopy = shuffDeck.slice().filter(card => !pHand.includes(card));
  let cardIndex = Math.floor(Math.random() * (deckCopy.length + 1));

  shuffle(deckCopy);

  if (answer === true) {
    pHand.push(deckCopy.splice(deckCopy[cardIndex], 1).flat());
  }

  return undefined;
}

function handTotal(hand) {
  let handTotal = 0;

  hand.forEach(function (card) {
    for (let key in CARD_FACE_VALUES) {
      if (parseInt(card[1], 10)) {
        handTotal += Number(card[1]);
        break;
      } else if (card[1] === key) {
        handTotal += CARD_FACE_VALUES[key].value;
        break;
      }
    }
  });

  hand.filter(face => face === 'A').forEach(_ => {
    if (handTotal > TARGET_SCORE) handTotal -= 10;
  })

  return handTotal;
}

function dealerTurn(shuffDeck) {
  let deckCopy = shuffDeck.slice().filter(card => !dealerHand.includes(card));
  let cardIndex = Math.floor(Math.random() * (deckCopy.length + 1));

  shuffle(deckCopy);

  dealerHand.push(deckCopy.splice(deckCopy[cardIndex], 1).flat());

  return undefined;
}

function resetHands() {
  playerHand = [];
  dealerHand = [];
  return undefined;
}

function resetScore() {
  scores.player = 0;
  scores.dealer = 0;
  return undefined;
}

function displayHands() {
  let pHand = readCards(playerHand);
  let dHand = readDealerCards(dealerHand);
  console.log('Dealer has: ' + dHand);
  console.log('Player has: ' + pHand + ' --- ' + handTotal(playerHand));
  return undefined;
}

function showFullHands() {
  let pHand = readCards(playerHand);
  let dHand = readCards(dealerHand);
  console.log('Dealer has: ' + dHand + ' --- ' + handTotal(dealerHand));
  console.log('Player has: ' + pHand + ' --- ' + handTotal(playerHand));
  return undefined;
}

function readCards(hand) {
  let cards = [];

  hand.forEach(function (card) {
    let name = [];

    for (let key in CARD_FACE_VALUES) {
      if (parseInt(card[1], 10)) {
        name.push(card[1]);
        break;
      }
      if (card[1] === key) {
        name.push(CARD_FACE_VALUES[key].name);
        break;
      }
    }

    for (let index in SUIT_NAMES) {
      if (card[0] === index) {
        name.push(SUIT_NAMES[index]);
        break;
      }
    }
    cards.push(name.join(' of '));
  });

  return cards.join(' and ');
}

function readDealerCards(hand) {
  let cards = readCards(hand).split(' and ');

  cards = cards.map(function (element, index) {
    if (index === 0) {
      return element;
    } else return 'Unknown Card';
  });

  return cards.join(' and ');
}

function bust(hand) {
  return handTotal(hand) > TARGET_SCORE;
}

function getRoundWinner() {
  let player = handTotal(playerHand);
  let dealer = handTotal(dealerHand);

  if (player > dealer) {
    if (player === TARGET_SCORE) {
      prompt('21! Player Wins Round!');
      scores.player += 1;
      showScore();
    } else {
      prompt('Player Wins Round!');
      scores.player += 1;
      showScore();
    }
  } else if (dealer > player) {
    if (dealer === TARGET_SCORE) {
      prompt('21! Dealer Wins Round!');
      scores.dealer += 1;
      showScore();
    } else {
      prompt('Dealer Wins Round!');
      scores.dealer += 1;
      showScore();
    }
  }
  return undefined;
}

function showScore() {
  prompt('Player Score: ' + scores.player + ' --- Dealer Score: ' + scores.dealer);
  return undefined;
}

function gameWinner() {
  if (scores.player > scores.dealer) {
    prompt('Player Wins The Game!');
  } else {
    prompt('Dealer Wins The Game!');
  }
  return undefined;
}

function checkForTie() {
  return handTotal(playerHand) === handTotal(dealerHand);
}

function playerTurnLoop(shuffDeck) {
  let choice;
  do {
    choice = hitOrStay();
    dealHitCards(shuffDeck, choice, playerHand);
    displayHands();
  } while (choice === true && !bust(playerHand));
  return undefined;
}

function dealerTurnLoop(shuffDeck) {
  do {
    dealerTurn(shuffDeck);
    displayHands();
  } while (handTotal(dealerHand) < 17);
  return undefined;
}

welcomeMsg();
/// Main Game Loop
do {
  if (!startGame()) break;

  while (!(scores.player === MAX_WINS || scores.dealer === MAX_WINS)) {
    console.clear();
    prompt('Shuffling deck...');
    let deck = initializeDeck();
    resetHands();

    dealCards(deck, playerHand, dealerHand);
    prompt('Dealing the cards...');
    displayHands();

    /// Player Turn Loop
    playerTurnLoop(deck);

    if (bust(playerHand)) {
      prompt('Player Busts - Dealer Wins Round!');
      scores.dealer += 1;
      showScore();
      if (scores.player === MAX_WINS || scores.dealer === MAX_WINS) continue;
      else prompt('Next Round...');
      if (!nextRound()) break;
      continue;
    }

    /// Dealer Turn Loop
    dealerTurnLoop(deck);

    if (bust(dealerHand)) {
      prompt('Dealer Busts - Player Wins Round!');
      scores.player += 1;
      showScore();
      if (scores.player === MAX_WINS || scores.dealer === MAX_WINS) continue;
      else prompt('Next Round...');
      if (!nextRound()) break;
      continue;
    }

    prompt('Alright - Time to show hands!');
    showFullHands();
    if (checkForTie()) {
      prompt('Its a tie! restarting round!');
      if (!nextRound()) break;
      continue;
    }
    getRoundWinner();

    if (scores.player === MAX_WINS || scores.dealer === MAX_WINS) continue;
    else prompt('Next Round');
    if (!nextRound()) break;
  }

  prompt('Game Over!');
  showScore();
  gameWinner();
  resetScore();
} while (playAgain());

prompt('Thanks for stopping by to check out twentyOne.js!');