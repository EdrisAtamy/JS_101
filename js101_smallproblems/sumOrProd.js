let readline = require('readline-sync');

function sum(num) {
  let result = 0;
  for (let count = 1; count <= num; count++) {
    result += count;
  }
  return result;
}

function prod(num) {
  let result = 1;
  for (let count = 1; count <= num; count++) {
    result *= count;
  }
  return result;
}

console.log('Please enter an integer greater than 0: ');
let number = parseInt(readline.prompt(), 10);

while (Number.isNaN(number)) {
  console.log('Invalid input: Enter a number');
  number = parseInt(readline.prompt(), 10);
}

console.log('Enter \'s\' to compute the Sum, or \'p\' to compute the Product: ');
let answer = readline.prompt().toLowerCase();

while (!(answer === 's' || answer === 'p')) {
  console.log('Invalid input: Enter a string (either \'s\' for Sum, or \'p\' for Product)');
  answer = readline.prompt().toLowerCase();
}

if (answer === 's') {
    console.log('The sum of the integers between 1 and ' + number + ' is ' + sum(number)); 
} else if (answer === 'p') {
    console.log('The product of the integers between 1 and ' + number + ' is ' + prod(number));
}