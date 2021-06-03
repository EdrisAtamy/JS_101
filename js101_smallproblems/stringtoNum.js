function stringToInt(str) {
  return +str;
}

function stringToSignInt(str) {
  return str * 1;
}

console.log(stringToInt("4321"));
console.log(stringToInt("570"));
console.log(stringToSignInt('+4321'));
console.log(stringToSignInt('-570'));
console.log(stringToSignInt('-1'));