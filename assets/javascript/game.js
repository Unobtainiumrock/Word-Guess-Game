
$(document).ready(function() {
  // $('#audio').html('<audio autoplay><source src="assets/images/song.mp4s"');
  /**
   * Initializes and sets up game state
   */
  let initialState = new Map();

 
  /**
   * continued
   * can't put properties from Map to variables until after setState is called.
   */
  setState();
  let editableWins = initialState.get('wins');
  let editableLives = initialState.get('lives');
  let editableLettersGuessed = initialState.get('guessed');

  //continued
  // reset needs to have 'editableEmpty'
  let editableEmpty;
  reset(); /* <---- Lazy hack fix*/


  // Event handlers =========================================================================================
  /**
   * @param  {DOM} document
   */
  $(document).keyup(function(e) {
    let ltr = `${e.key}`.toLowerCase();
    let secret = initialState.get('secretWord').join('');
    let userGuess = editableEmpty.join('');

    let validKeyStroke = (65 <= e.keyCode) && (90 >= e.keyCode);

    if(validKeyStroke){

      // self-explanatory by function name
        findHitsAndUpdateEmpty(ltr,findAllIndexMatches,populateEmpty);

        // Leave this uncommented for testing if my app behaves as it should
        console.log(`Editable: ${editableEmpty.join('')} Secret: ${initialState.get('secretWord').join('')}`);

        if(userGuess === secret) {
          console.log('Winner!');
          editableWins++;
          changeWord();
        }

        if(!secret.includes(ltr)) {

          if(editableLettersGuessed && !editableLettersGuessed.includes(ltr)) {
            editableLives--;
            $('#lives').text(editableLives);
          }
          
          if(!editableLettersGuessed.includes(ltr)) {
            $('#words-guessed').append(ltr);
            $('#words-guessed').append(' ');
            editableLettersGuessed.push(ltr);
          } else {
            alert('You already guessed that letter!');
          }

        }

        if(editableLives === 0) {
          alert('Game Over Man!');
          reset();
          editableLives = 9;
          editableLettersGuessed = [];
          $('#words-guessed').text('');
        }

    } else {
        if(e.keyCode === 32) {
          console.log('RESET EVERYTHING');
          reset();
          console.log(initialState.get('secretWord'));
          console.log(initialState.get('empty'));
          // console.log(`After reset: ${initialState.get('secretWord')}`);
        } else {
          alert("Sorry! That character isn't allowed. Please provide letter values a-z");
        }
    }
  });

  //Helper functions =======================================================================================


  
  /**
   * Grabs a random word from our giant list of words
   */
  function grabSecretWord() {
    return wordsDB[Math.floor(Math.random() * wordsDB.length)].split('');
  }
  
  /**
   * Creates a span of underscores equal in length to the secretWord
   * @param  {Array} arr is the secretWord array
   */
  function createEmpty(arr) {
    return arr.map((e) => {
      return '_';
    }).join(' ');
  }

  /**
   * @param  {string} ltr: is the letter key pressed by user
   * @param  {function} matches: is the findAllIndexMatches callback
   * @param  {function} populate: is the the populateEmpty callback
   */
  function findHitsAndUpdateEmpty(ltr,matches,populate) {
    let matchesByIndex = matches(ltr,[...initialState.get('secretWord')]);
    populate(ltr,matchesByIndex);
  }
  

  /**
   * A callback used within findHitsAndUpdateEmpty
   * Takes a letter and an array and returns a list of indexes where
   * matches were found 
   * @param  {string} ltr is the letter key pressed by user
   * @param  {array} arr is the secretWord array
   * @returns {array} returns list of hits indexes
   */
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

  /**
   * A callback used within findHitsAndUpdateEmpty.
   * This portion handles populating _'s with the matching letter
   * at the corresponding position
   * @param  {string} ltr is the letter key pressed by user
   * @param  {array} hits is the array of hits returned by findAllIndexMatches
   */
  function populateEmpty(ltr,hits) {
      hits.forEach((e) => {
        editableEmpty[e] = ltr;
      });
      $('#empty').text(editableEmpty.join(' '));
    }



  function changeWord() {
    initialState.set('secretWord', grabSecretWord());
    initialState.set('empty',createEmpty(initialState.get('secretWord')));
    editableEmpty = [...initialState.get('empty')].filter( e => e!== ' ');
    $('#empty').text(initialState.get('empty'));
    $('#wins').text(editableWins);
  }
  
  // function ()

  /**
   * Resets all the game data. Invoked on spacebar presses
   */
  function reset() {
    setState();
    
    // Makes an array from the initialState's 'empty' property and removes blank values
    editableEmpty = [...initialState.get('empty')].filter( e => e!== ' ');
    // edia

  // These should never be manipulated?
    $('#empty').text(initialState.get('empty'));

    $('#wins').text(initialState.get('wins'));

    $('#lives').text(initialState.get('lives'));

    $('#countdown').text(initialState.get('countdown'));

    $('#difficulty').text(initialState.get('difficulty'));
  }
  
  /**
   * Initializes the games starting values
   */
  function setState() {
    initialState.set('secretWord',grabSecretWord());
    initialState.set('empty',createEmpty(initialState.get('secretWord')));
    initialState.set('wins', 0);
    initialState.set('lives', 9);
    initialState.set('countdown', 20);
    initialState.set('difficulty', 'easy');
    initialState.set('guessed', []);
  }

});
