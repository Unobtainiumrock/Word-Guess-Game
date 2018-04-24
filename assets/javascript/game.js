// Mimicking require. This isn't the actual require being used.
// Scroll down below the data array to see what the custom require does.
// var data;
var wordsDB = _require(hoistData);


// test randomly pulling a word from the pseudo-DB
console.log(wordsDB[Math.floor(Math.random())]);



// Hoisted stuff below this section is for mimicking import
// ==============================================================================================================================================================================================================================
function _require(cb) {
  return cb();
}

function hoistData() {

  return data;
}