function evens(arr) {
  let array = []; 
  
  for (let count = 1; count < arr.length; count += 2) {
    array.push(arr[count]);
  }
  
  return array;
}

function oddities(arr) {
  let array = []; 
  let array2 = evens(arr);

  for (let count = 0; count < arr.length; count += 2) {
    array.push(arr[count]);
  }
  
  return array + ' - ' + array2;
}

console.log(oddities([2, 3, 4, 5, 6])); // logs [2, 4, 6]
console.log(oddities([1, 2, 3, 4, 5, 6])); // logs [1, 3, 5]
console.log(oddities(["abc", "def"])); // logs ['abc']
console.log(oddities([123])); // logs [123]
console.log(oddities([])); // logs []