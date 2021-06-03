function intToStr(number) {
  const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  let result = '';
  number = Math.abs(number);
  
  do {
    let remainder = number % 10;
    number = Math.floor(number / 10);
    
    result = DIGITS[remainder] + result;
  } while (number > 0)
  
  return result;
}

function signIntToStr(number) {
  let sign = Math.sign(number);
  
  switch (sign) {
    case -1: return '-' + intToStr(number);
    case 1: return '+' + intToStr(number);
    case 0: return intToStr(number);
  }
}

console.log(signIntToStr(-500));
console.log(signIntToStr(500));