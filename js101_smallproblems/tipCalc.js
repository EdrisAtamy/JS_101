let readline = require('readline-sync');
let tipRate; 
let bill; 

console.log('How much is the bill total?');
bill = parseFloat(readline.prompt());

console.log('What is the tip rate for your area?');
tipRate = parseFloat(readline.prompt());

function getRate(bill, rate) {
  let tip = (bill * (rate / 100)); 
  let total = bill + tip;
  return 'The tip is: $' + tip.toFixed(2) + '\nThe total is: $' + total.toFixed(2);
}

console.log(getRate(bill, tipRate));