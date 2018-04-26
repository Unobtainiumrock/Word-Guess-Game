// This can be useful later for hard mode.  
// Sort wordsDB in descending order in terms of length
// feed hard mode players questions in that manner.

// find the largest word.length and biggest word.
let max = 0;
let biggestWord = null;

// Find and save the biggest word
wordsDB.forEach((e) => {
  if(e.length > max) {
    max = e.length;
    biggestWord = e;
  }
})
// console.log(`Biggest word: ${biggestWord}`);