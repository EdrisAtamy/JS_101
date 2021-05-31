let readline = require('readline-sync'); 

function shortLongShort(str1, str2) {
  if (str1.length > str2.length) {
    return str2 + str1 + str2;
  } else {
    return str1 + str2 + str1;
  }
}

console.log('Welcome to shortLong.js!');

console.log('Enter 1 string to compare: ');
let answer1 = readline.prompt().toLowerCase();

console.log('Enter another string to compare: ');
let answer2 = readline.prompt().toLowerCase();

console.log(shortLongShort(answer1, answer2));