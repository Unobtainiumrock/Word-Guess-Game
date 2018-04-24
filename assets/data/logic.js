
// I pulled a comprehensive words .txt file from Google
// This code parses the .txt file, converts it into a format that can
// be interpreted by JavaScript, and then writes it to a new .json file
// This is copy and pasted into the main logic section of my word guessing game.
const fs = require('fs');

const wordsDB = fs.readFileSync('wordsDB.txt','utf-8');

const format = (textFile) => {
  const splitByCharacter = textFile.split(/\r?\n/);
  return splitByCharacter;
}

const resultData = format(wordsDB);

fs.writeFileSync('results.json',JSON.stringify(resultData),'utf-8');
