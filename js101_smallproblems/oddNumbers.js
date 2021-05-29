/*
let num = 1;

while (num <= 100) {
  console.log(num);
  num += 2;
} */

let counter;
let endRange;

let readline = require('readline-sync');

console.log('Enter the number that you where you want to start incrementation: ');
counter = Number(readline.question());

console.log('Enter the end range of odd numbers you want to increment to: ');
endRange = Number(readline.question());

do {
  if (counter % 2 === 0) {
    counter += 1;
  } else if (counter % 2 !== 0) {
    console.log(counter);
    counter += 2;
  }
} while (counter < endRange);