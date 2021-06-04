const READLINE = require('readline-sync');
let answer = '';
let loanMonths = years => years * 12;

let greet = {
  welcome: '---------- Welcome to loanCalc.JS! ----------',
  exit: '---------- Thanks for using loanCalc.JS! ----------'
};

function findRate(loan, duration, interest) {
  let loanAmount = loan;
  let loanDuration = duration;
  let percentRate = interest;
  let monthlyPayment;

  if (percentRate === 0) {
    monthlyPayment = loanAmount / loanDuration;
  } else {
    monthlyPayment = loanAmount *
    (percentRate / (1 - Math.pow((1 + percentRate), (-loanDuration))));
  }
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

function getLoan() {
  console.log('What is the Loan amount?');
  let loan = READLINE.prompt();

  while (invalid(loan)) {
    console.log('Invalid input, please input a positive integer amount:');
    loan = READLINE.prompt();
  }
  return Number(loan);
}

function getLoanDuration() {
  console.log('What is the loan duration? (In Years)');
  let loanTime = READLINE.prompt();

  while (loanTime % 1 !== 0) {
    console.log('Invalid input, please input a positive, whole integer amount (In Years)');
    loanTime = READLINE.prompt();
  }
  loanTime = loanMonths(loanTime);
  return loanTime;
}

function getAPR() {
  console.log('What is the APR of the loan? (Can input as whole number, decimal, or 0 for no interest loans)');
  let monthlyInterest = READLINE.prompt();

  while (monthlyInterest < 0) {
    console.log('Invalid input, please input a positive integer amount for the APR: (Can input as whole number, decimal, or 0 for no interest loans)');
    monthlyInterest = READLINE.prompt();
  }
  monthlyInterest = interestRate(monthlyInterest);
  return monthlyInterest;
}

function repeat() {
  console.log('Do you want to calculate another loan? (\'yes\' or \'no\')');
  let answer = READLINE.prompt().toLowerCase();

  while (!(answer === 'yes' || answer === 'no')) {
    console.log('Invalid input, please enter either \'yes\' or \'no\'...');
    answer = READLINE.prompt().toLowerCase();
  }
  return answer;
}

console.log(greet.welcome);

do {

  let loan = getLoan();

  let months = getLoanDuration();

  let interest = getAPR();

  console.log(findRate(loan, months, interest));

  answer = repeat();

} while (answer === 'yes');
console.log(greet.exit);