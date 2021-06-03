const READLINE = require('readline-sync');
let repeat = '';
let loanMonths = years => years * 12;

let greet = {
  welcome: 'Welcome to loanCalc.JS!',
  exit: 'Thanks for using loanCalc.JS!'
};

function findRate(loan, duration, interest) {
  let loanAmount = loan;
  let loanDuration = duration;
  let percentRate = +interest;
  let monthlyPayment = loanAmount * (percentRate / (1 - Math.pow((1 + percentRate), (-loanDuration))));
  return 'Your monthly payment is $' + monthlyPayment.toFixed(2);
}

function interestRate(apr) {
  let rate;
  if (Math.round(apr) === 0) {
    apr *= 100;
    rate = ((apr / 12) / 100);
  } else {
    rate = ((apr / 12) / 100);
  }
  return rate;
}

function invalid(input) {
  return Number.isNaN(Number(input)) || input <= 0;
}

console.log(greet.welcome);

do {

  console.log('What is the Loan amount?');
  let loan = READLINE.prompt();

  while (invalid(loan)) {
    console.log('Invalid input, please input a positive integer amount:');
    loan = READLINE.prompt();
  }

  console.log('What is the loan duration? (In Years)');
  let loanTime = READLINE.prompt();

  while (invalid(loanTime)) {
    console.log('Invalid input, please input a positive integer amount (In Years)');
    loanTime = READLINE.prompt();
  }
  loanTime = loanMonths(loanTime);

  console.log('What is the APR of the loan? (Can input as whole number or decimal)');
  let monthlyInterest = READLINE.prompt();

  while (invalid(monthlyInterest)) {
    console.log('Invalid input, please input a positive integer amount for the APR: (Can input as whole number or decimal)');
    monthlyInterest = READLINE.prompt();
  }
  monthlyInterest = interestRate(monthlyInterest);

  console.log(findRate(loan, loanTime, monthlyInterest));

  console.log('Do you want to calculate another loan? (\'yes\' or \'no\')');
  repeat = READLINE.prompt().toLowerCase();

  while (!(repeat === 'yes' || repeat === 'no')) {
    console.log('Invalid input, please enter either \'yes\' or \'no\'...');
    repeat = READLINE.prompt().toLowerCase();
  }

} while (repeat === 'yes');
console.log(greet.exit);