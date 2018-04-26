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







const secret = ['c','a','t','a','c','l','y','s','m'];

let blank = ['_','_','_','_','_','_','_','_','_'];














function findHitsAndUpdateBlank(ltr,matches,populate) {
  let matchesByIndex = matches(ltr,secret);
  populate(ltr,matchesByIndex);
}


findHitsAndUpdateBlank('a',findAllIndexMatches,populateBlank);

console.log(blank);





  function findAllIndexMatches(ltr,arr) {
    // looks for matches and stores their indexes in an array
    let preTrimmed = arr.map((e,i) => {
      if(ltr === e) {
        return i;
      }
    });
    // non-matches default to undefined --trim off undefined's from array
    const trimmedIndexes = preTrimmed.filter((e) => {
      return e !== undefined;
    });
    
    return trimmedIndexes;
  }
  
  
  //take hits and ltr 
  function populateBlank(ltr,hits) {
  //iterate hits
    hits.forEach((e) => {
      blank[e] = ltr;
    });
  }