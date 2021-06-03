let array = ['Edris', 'Atamy']; 
let obj = {title: 'Master', Occupation: 'Coffee Drinker'}; 

function greeting(array, obj) {
  return 'Hello ' + array.join(' ') + '! Nice to have a ' + obj.title + obj.Occupation + ' around!';
}

console.log(greeting(array, obj));