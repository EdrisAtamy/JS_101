let readline = require('readline-sync'); 

let name = readline.question('What is your name? '); 

if (name.substring(name.length - 1) === '!') {
  console.log('HELLO ' + name.substring(0, name.length-1).toUpperCase() + '. WHY ARE YOU SCREAMING?');
} else {
  console.log('Hello ' + name + '!');
}