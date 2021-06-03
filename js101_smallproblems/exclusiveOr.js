
function xor(a, b) {
  if (a) {
    return true;
  } else if (b) {
    return true; 
  } else {
    return false;
  }
}

console.log(xor(5, 0) === true);
console.log(xor(false, true) === true);
console.log(xor(1, 1) === false);
console.log(xor(true, true) === false);