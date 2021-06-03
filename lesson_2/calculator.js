// ask user for 1st number
// ask user for 2nd number
// ask user for operation
// perform operation
// display result of the operation


const readline = require('readline-sync');
let repeat; 
const MESSAGE = require('./calculator_messages.json');
const LANG = 'en';

function prompt(msg) {
  return console.log('=> ' + msg);
}

function invalid(num) {
  return Number.isNaN(Number(num)) || num.trimStart() === '';
}

function messages(message, lang='en') {
  return MESSAGE[lang][message];
}

prompt(messages('welcome', LANG));

do { 

let number1 = readline.question(prompt('Enter the 1st number: '));

while (invalid(number1)) {
  prompt('INVALID INPUT, PLEASE ENTER NUMBER...');
  number1 = readline.question();
}

let number2 = readline.question(prompt('Enter the 2nd number: '));

while (invalid(number2)) {
  prompt('INVALID INPUT, PLEASE ENTER NUMBER...');
  number2 = readline.question();
}

let operation = Number(readline.question(prompt('What operation would you like to perform?\n=> 1) Add 2) Subtract 3) Multiply 4) Divide - ')));

while (![1,2,3,4].includes(operation)) {
  prompt('INVALID INPUT, PLEASE ENTER EITHER 1, 2, 3, OR 4...');
  operation = Number(readline.question());
}

let result;

switch (operation) {
  case 1:
    result = Number(number1) + Number(number2);
    break;
  case 2:
    result = Number(number1) - Number(number2);
    break;
  case 3:
    result = Number(number1) * Number(number2);
    break;
  case 4:
    result = Number(number1) / Number(number2);
    break;
}

prompt('The result is ' + result);
prompt('Would you like to do another calculation? (Enter: y or n)'); 
repeat = readline.question().toLowerCase();

} while ( repeat === 'y' || repeat === 'yes');