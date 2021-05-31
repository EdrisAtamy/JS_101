
function multisum(num) {
  let result = 0;
  
  for (let counter = 1; counter <= num; counter++) {
    if (counter % 3 === 0 || counter % 5 === 0) {
      result += counter;
    }
  }

  return result;
}

console.log(multisum(20));
console.log(multisum(10));