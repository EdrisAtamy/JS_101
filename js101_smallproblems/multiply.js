const multiply = (num1, num2) => num1 * num2;
const square = (num) => multiply(num, num);
const power = (num, exp) => (exp === 1 ? multiply(num, 1) : power(num, exp - 1) * num);

console.log(multiply(5, 3) === 15);
console.log(multiply(5, 3));
console.log(square(5));
console.log(power(3,4));