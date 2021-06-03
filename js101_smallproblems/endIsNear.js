function penultimate(str) {
  let word = str.trim().split(' '); 
  
  if (word.length === 0) {
    return 'contains no words...'; 
  } else if ( word.length === 1) {
    return word[0];
  } else {
    return word[word.length - 2];
  }
}

console.log(penultimate('this word'));
console.log(penultimate('this is a really long string value'));
console.log(penultimate('word'));
console.log(penultimate(' '));
console.log(penultimate(''));