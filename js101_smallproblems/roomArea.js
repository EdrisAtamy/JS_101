let readline = require('readline-sync');
const SQFEET_TO_METERS = 10.7639;
let width;
let length;

function roomArea(width, length) {
  let toSqFeet = ((width * length) * SQFEET_TO_METERS);
  let toMeters =  width * length;

  if (metric === 1) {
    return 'The Area of the room is ' + toSqFeet.toFixed(2) + ' Square Feet (' + toMeters.toFixed(2) + ' Square Meters)';
  } else if (metric === 2) {
    return 'The Area of the room is ' + toMeters.toFixed(2) + ' Square Meters (' + toSqFeet.toFixed(2) + ' Square Feet)';
  }
}

console.log('What is the Area of your room?');

console.log('Do you want the Area in 1) Square Feet or 2) Square Meters: (Enter 1 or 2)');
const metric = Number(readline.question());

switch (metric) {
  case 1:
    console.log('Enter the room Width: ');
    width = Number(readline.question());
    
    console.log('Enter the room Length: ');
    length = Number(readline.question());
    
    return console.log(roomArea(width, length));
    
  case 2:
    console.log('Enter the room Width: ');
    width = Number(readline.question());
    
    console.log('Enter the room Length: ');
    length = Number(readline.question());
    
    return console.log(roomArea(width, length));
}