/*

Problem:
  - Create a Twenty One Game program
  - create a 52 card deck, 4 suits (Hearts, Diamonds, Spades, Clubs) 13 values (2,3,4,5,6,7,8,9,10, Jack, Queen, King, Ace)

  - Rules and Goal
    - goal is to get as close to the number 21 as you can without going past 21, if past 21, it is BUST and that player loses
    - game has 2 players, Dealer and Player, for this program, Computer and Player
    - both players get 2 cards, player can see both their cards, and only 1 of the dealers cards

  - Card Values
    - the cards values are added together numerically
    - the values of cards 2-10 are taken for face value
    - Jack Queen King are all worth 10
    - Ace is worth either 1 or 11, depending on the context of the game
      - if there is more than 1 Ace in a hand, then 1 of the aces will have to be worth 1, as to not exceed 21

  - Turns
    - Player Turn
      - player will always go FIRST, will decide to either HIT or STAY
      - player can see only 1 of dealers cards
      - player can HIT as many times as they want, until they are BUST - over 21 card value
      - when player BUSTS, dealer wins, game over
    - Computer Turn (Dealer)
      - dealer will follow strict actions
      - the dealer will HIT until their card value is ATLEAST 17
      - if dealer BUSTS, player wins - game over

Examples / Test Cases:
  - Example output:
    - Dealer has: Ace and unknown card
      You have: 2 and 8

  - Implementation Pseudocode
    1. Initialize deck
    2. Deal cards to player and dealer
    3. Player turn: hit or stay
      - repeat until bust or stay
    4. If player bust, dealer wins.
    5. Dealer turn: hit or stay
      - repeat until total >= 17
    6. If dealer busts, player wins.
    7. Compare cards and declare winner.

Data Structure:
  - the Card Deck, player hand, and dealer hand, will all be nested arrays
  -

Algorithm:
  -

*/

const readline = require('readline-sync');
const SUIT_NAMES = {
  H: 'Hearts',
  D: 'Diamonds',
  S: 'Spades',
  C: 'Clubs'
};
const CARD_NAMES = {
  A: 'Ace',
  K: 'King',
  Q: 'Queen',
  J: 'Jack'
};
const CARD_VALUES = {
  A: 11,
  K: 10,
  Q: 10,
  J: 10
};
const DECK = [
  ['H','2'], ['H','3'], ['H','4'], ['H','5'], ['H','6'], ['H','7'], ['H','8'], ['H','9'], ['H','10'], ['H','J'], ['H','Q'], ['H','K'], ['H','A'],
  ['D','2'], ['D','3'], ['D','4'], ['D','5'], ['D','6'], ['D','7'], ['D','8'], ['D','9'], ['D','10'], ['D','J'], ['D','Q'], ['D','K'], ['D','A'],
  ['S','2'], ['S','3'], ['S','4'], ['S','5'], ['S','6'], ['S','7'], ['S','8'], ['S','9'], ['S','10'], ['S','J'], ['S','Q'], ['S','K'], ['S','A'],
  ['C','2'], ['C','3'], ['C','4'], ['C','5'], ['C','6'], ['C','7'], ['C','8'], ['C','9'], ['C','10'], ['C','J'], ['C','Q'], ['C','K'], ['C','A']
];
const TWENTY_ONE = 21;
const PLAY_CHOICES = ['yes', 'y', 'no', 'n'];

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
  console.log('>'.repeat(12) + ' Welcome to The Twenty-One Card Game! ' + '<'.repeat(12));
  console.log(' '.repeat(6) + '*'.repeat(50) + ' '.repeat(6));
  console.log(' '.repeat(12) + '*'.repeat(38) + ' '.repeat(12));
  console.log(' '.repeat(18) + '*'.repeat(26) + ' '.repeat(18));
  return undefined;
}

function playAgain() {
  prompt('Would you like to play again? (Yes or No)');
  let answer = readline.question().toLowerCase();
  while (!PLAY_CHOICES.includes(answer)) {
    prompt('Invalid input, enter either (Yes or No)');
    answer = readline.question().toLowerCase();
  }
  return answer;
}

function shuffle(array) {
  for (let index = array.length - 1; index > 0; index--) {
    let otherIndex = Math.floor(Math.random() * (index + 1)); // 0 to index
    [array[index], array[otherIndex]] = [array[otherIndex], array[index]]; // swap elements
  }
  return undefined;
}

function initializeDeck(deck) {
  shuffle(deck);
  return deck;
}

function hitOrStay() {
  prompt('Player\'s turn: Would you like to Hit or Stay?');
  let move = readline.question().toLowerCase();
  while (!(move === 'hit' || move === 'stay')) {
    prompt('Invalid input, please enter either: Hit or Stay');
    move = readline.question().toLowerCase();
  }
  return move;
}

function dealCards(pHand, dHand) {
  let deckCopy = DECK.slice();
  let cardIndex = Math.floor(Math.random() * (deckCopy.length + 1));

  for (let fullHand = 2; fullHand > 0; fullHand--) {
    pHand.push(deckCopy.splice(deckCopy[cardIndex], 1).flat());
    dHand.push(deckCopy.splice(deckCopy[cardIndex], 1).flat());
  }

  return undefined;
}

function dealHitCards(answer, pHand) {
  let deckCopy = DECK.slice().filter(card => !pHand.includes(card));
  let cardIndex = Math.floor(Math.random() * (deckCopy.length + 1));

  shuffle(deckCopy);

  if (answer === 'hit') {
    pHand.push(deckCopy.splice(deckCopy[cardIndex], 1).flat());
  }

  return undefined;
}

function handTotal(hand) {
  let handTotal = 0;

  hand.forEach(function (card) {
    for (let index in CARD_VALUES) {
      if (parseInt(card[1], 10)) {
        handTotal += Number(card[1]);
        break;
      } else if (card[1] === index) {
        handTotal += CARD_VALUES[index];
        break;
      }
    }
  });

  hand.forEach(function (card) {
    if (card[1] === 'A') {
      if (handTotal > 21)  handTotal -= 10;
    }
  });

  return handTotal;
}

function dealerTurn() {
  let deckCopy = DECK.slice().filter(card => !dealerHand.includes(card));
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

function displayHands() {
  let pHand = readCards(playerHand);
  let dHand = readDealerCards(dealerHand);
  console.log('Dealer has: ' + dHand);
  console.log('Player has: ' + pHand);
  return undefined;
}

function showFullHands() {
  let pHand = readCards(playerHand);
  let dHand = readCards(dealerHand);
  console.log('Dealer has: ' + dHand);
  console.log('Player has: ' + pHand);
  return undefined;
}

function readCards(hand) {
  let cards = [];

  hand.forEach(function (card) {
    let name = [];

    for (let index in CARD_NAMES) {
      if (parseInt(card[1], 10)) {
        name.push(card[1]);
        break;
      }
      if (card[1] === index) {
        name.push(CARD_NAMES[index]);
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
  let cards = [];

  hand.forEach(function (card) {
    let name = [];

    for (let index in CARD_NAMES) {
      if (parseInt(card[1], 10)) {
        name.push(card[1]);
        break;
      }
      if (card[1] === index) {
        name.push(CARD_NAMES[index]);
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

  cards = cards.map(function (element, index) {
    if (index === 0) {
      return element;
    } else return 'Unknown Card';
  });

  return cards.join(' and ');
}

function bust(hand) {
  return handTotal(hand) > TWENTY_ONE;
}

function getHandWinner() {
  let player = handTotal(playerHand);
  let dealer = handTotal(dealerHand);
  return player > dealer;
}

function showRoundWinner() {
  prompt('Player Score: ' + scores.player + ' --- Dealer Score: ' + scores.dealer);
}

function gameWinner() {
  if (scores.player > scores.dealer) {
    prompt('Player Wins The Game!');
  } else {
    prompt('Dealer Win The Game!');
  }
  return undefined;
}

welcomeMsg();
/// Main Game Loop
do {
  while (!(scores.player === 5 || scores.dealer === 5)) {
    prompt('Shuffling deck...');
    initializeDeck(DECK);
    resetHands();
    let pChoice;

    dealCards(playerHand, dealerHand);
    prompt('Dealing the cards...');
    displayHands();

    /// Player Turn Loop
    do {
      pChoice = hitOrStay();
      dealHitCards(pChoice, playerHand);
      displayHands();
    } while (pChoice === 'hit' && !bust(playerHand));

    if (bust(playerHand)) {
      prompt('Player Busts - Dealer Wins Round!');
      scores.dealer += 1;
      showRoundWinner();
      if (scores.player === 5 || scores.dealer === 5) continue;
      else prompt('Next Round');
      continue;
    }

    /// Dealer Turn Loop
    do {
      dealerTurn();
      displayHands();
    } while (handTotal(dealerHand) < 17);

    if (bust(dealerHand)) {
      prompt('Dealer Busts - Player Wins Round!');
      scores.player += 1;
      showRoundWinner();
      if (scores.player === 5 || scores.dealer === 5) continue;
      else prompt('Next Round');
      continue;
    }

    prompt('Alright - Time to show hands!');
    showFullHands();
    if (getHandWinner() === true) {
      if (handTotal(playerHand) === TWENTY_ONE) {
        prompt('21! Player Wins Round!');
        scores.player += 1;
        showRoundWinner();
      } else {
        prompt('Player Wins Round!');
        scores.player += 1;
        showRoundWinner();
      }
    } else if (getHandWinner() === false) {
      if (handTotal(dealerHand) === TWENTY_ONE) {
        prompt('21! Dealer Wins Round!');
        scores.dealer += 1;
        showRoundWinner();
      } else {
        prompt('Dealer Wins Round!');
        scores.dealer += 1;
        showRoundWinner();
      }
    }

    if (scores.player === 5 || scores.dealer === 5) continue;
    else prompt('Next Round');
  }

  prompt('Game Over!');
  showRoundWinner();
  gameWinner();

} while (playAgain() === 'y');