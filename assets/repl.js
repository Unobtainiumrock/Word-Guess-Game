
const test = ['c','a','t','s'];

const empty = createEmpty(test);

function checker(ltr) {
  if(test.indexOf(ltr) !== -1) {
    
  } else {
    
  }
}

function createEmpty(arr) {
  return arr.map((e) => {
    return '_';
  });
}


console.log(empty);