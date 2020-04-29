//global board with starting values in array
var gameBoard = [
  0, 4, 4, 4, 4, 4, 4,
  0, 4, 4, 4, 4, 4, 4
];

var highlighted;


//Bea's edits for switch accessible

// use
// make number/put ring around number = 
// when it starts off, put in the same starting spot
// if theres none in that, move over to the next spot


// computer AI

//set currentPlayer as 1
var currentPlayer = 'one';

//game play readout
var readOut = document.querySelector('div.info');

function renderBoard() {

  var gameContainer = document.querySelector('.container'); // render the container
  for (var i = 0; i < gameBoard.length; i++) { // go through the length of the game board

    if (i % 7 === 0) {  // if you're in one of the two rows
      var row = document.createElement('div'); // create a div
      gameContainer.appendChild(row); // add the row to the board
    };

    //add buttons to each row
    var button = document.createElement('button'); // create a button representing each pit
    button.setAttribute('class', 'pit' + i);  // each pit has a specific class depending on what it is
    button.setAttribute('id', i); // each has an ID depending on what it is 
    //assign initial values to each button
    button.innerHTML = gameBoard[i]; // each pit = the value that is in that array
    row.appendChild(button); // add it to the row
  };

  var playerClass = document.querySelectorAll('.container div'); // select all
  playerClass[0].setAttribute('class', 'playerTwo');
  playerClass[1].setAttribute('class', 'playerOne');


  setListeners();
};


function moveStones(pitIndex) { // moving at a certain pit

  var stonesInHand = this.gameBoard[pitIndex]; // the stones you have is the amount in the pit you pick up
  var pitNextIndex = pitIndex + 1; // finds next index 
  this.gameBoard[pitIndex] = 0; // setting the stones you have to 0, because you're picking all of them up
  var i;
  var tempIndex;
  if (stonesInHand > 0) { // if you click on a full pit


    var goUntil = stonesInHand + pitNextIndex;
    for (i = pitNextIndex; i < goUntil; i++) { // for each 
      // starts at the next index, makes sure you use all stones, increments
      lastIndex = i % this.gameBoard.length; // last index  that something will be dropped (when everything is out!)
      // founds the index it would be dropped at

      // supposed to skip the opponent's bank
      if ((currentPlayer == "one" && lastIndex != 7) || (currentPlayer == "two" && lastIndex != 0)) {
        this.gameBoard[lastIndex] += 1; //
      } else {
        // if it lands on an opponents bank

        lastIndex = lastIndex + 1;
        goUntil = goUntil + 1;
      }

    }
  };

  bankStones(lastIndex); //send the index
  if ((currentPlayer == 'one' && lastIndex != 0) || currentPlayer == 'two' && lastIndex != 7) {

    document.getElementById(highlighted).style.backgroundColor = "#DEB887"
    document.getElementById(highlighted).style.border = "#8B7355"


    setPlayer(); // next player's turn!
  } else { // don't change if they're in a bank
    readOut.textContent = 'It is still player ' + currentPlayer + '\'s turn!';
    if (currentPlayer == 'one') {


      document.getElementById(highlighted).style.backgroundColor = "#DEB887"
      document.getElementById(highlighted).style.border = "#8B7355"
      highlighted = 8;

      document.getElementById(highlighted).style.backgroundColor = "#abebb4";
      document.getElementById(highlighted).style.border = "#aaa9ad";
    } else if (currentPlayer == 'two') {

      document.getElementById(highlighted).style.backgroundColor = "#DEB887"
      document.getElementById(highlighted).style.border = "#8B7355"

      highlighted = 1;

      player2Turn(1);
    }
  }

};

// implemented an AI player to make gameplay more accessible
function player2Turn(pitIndex) { // where to get the pit

  // LOOP THROUGH ALL POSITIONS
  // pitIndex = 7 - pitIndex; // get the one closest to the bank
  var tempGameBoard = [];
  var potentialTotal = []; // potential gain for each possible move

  for (let i = pitIndex; i < 7; i++) {
    for (let j = 0; j < gameBoard.length; j++) { // reset the game board every time
      tempGameBoard[j] = this.gameBoard[j];
    }



    var stonesInHand = tempGameBoard[i]; // check with these amounts

    if (stonesInHand > 0) {

      var pitNextIndex = i + 1; // finds next index 
      tempGameBoard[i] = 0; // setting the stones you have to 0, because you're picking all of them up
      var j;
      for (j = i; j < stonesInHand + pitNextIndex; j++) { // for each 
        // starts at the next index, makes sure you use all stones, increments
        lastIndex = j % tempGameBoard.length; // last index  that something will be dropped (when everything is out!)
        // founds the index it would be dropped at

        // supposed to skip the opponent's bank
        if ((currentPlayer == "one" && lastIndex != 7) || (currentPlayer == "two" && lastIndex != 0)) {
          tempGameBoard[lastIndex] += 1; //
        }

      }

      var inverse = tempGameBoard.length - lastIndex;  // inverse is the index ACROSS from it 
      //if lastIndex is not a bank and has one stone
      if ((lastIndex != 0) && (lastIndex != 7) && (tempGameBoard[lastIndex] === 1)) { // if there's only 1 in the last one AND is not a bank
        if (currentPlayer === 'two') {   // if it's the opponent's turn
          if (1 <= lastIndex <= 6) {
            //move all stones in inverse pit to player 2 bank

            tempGameBoard[7] = tempGameBoard[7] + tempGameBoard[inverse] + 1;
            tempGameBoard[lastIndex] = 0; // clears out both
            tempGameBoard[inverse] = 0;
          };
        }
      };
      potentialTotal[i] = tempGameBoard[7];
    } else {
      potentialTotal[i] = this.gameBoard[7]; // no gain.
    }


  }



  var maxGain = 0;
  var maxGainIndex = 1;
  for (let i = 1; i < 7; i++) { // cycle through all the potential options


    if (potentialTotal[i] > maxGain) { // this is potential gain
      maxGain = potentialTotal[i];
      maxGainIndex = i; // keep track of this 

    }

  }

  var selectBtn = document.getElementById(maxGainIndex); // where are you gonna make the move?

  highlighted = maxGainIndex;
  var delayInMilliseconds = 3000; // 3 seconds

  setTimeout(function () {
    setTimeout(function () {
      moveStones(maxGainIndex); // board

    }, delayInMilliseconds)

    selectBtn.style.backgroundColor = "#f56e5f";
    selectBtn.style.border = "#aaa9ad";

  }, delayInMilliseconds);

};

function bankStones(lastIndex) {   // takes in index  

  var inverse = gameBoard.length - lastIndex;  // inverse is the index ACROSS from it 
  //if lastIndex is not a bank and has one stone
  if ((lastIndex != 0) && (lastIndex != 7) && (this.gameBoard[lastIndex] === 1)) { // if there's only 1 in the last one AND is not a bank
    if (currentPlayer === 'two') {   // if it's the opponent's turn
      if (lastIndex >= 1 && lastIndex <= 6) { // make sure that it's on their side
        //move all stones in inverse pit to player 2 bank
        this.gameBoard[7] = this.gameBoard[7] + this.gameBoard[inverse] + 1;
        this.gameBoard[lastIndex] = 0; // clears out both
        this.gameBoard[inverse] = 0;

      };
    } else { // if it is Your turn
      if (lastIndex >= 8 && lastIndex <= 13) {
        this.gameBoard[0] = this.gameBoard[0] + this.gameBoard[inverse] + 1;
        this.gameBoard[lastIndex] = 0;
        this.gameBoard[inverse] = 0;
      };
    };
  };


  updateBoard();
};

var updateBoard = function () { // update the board


  console.log("Updating the board");
  for (var i = 0; i < gameBoard.length; i++) {
    var pit = document.getElementById(i);
    pit.textContent = gameBoard[i];

  };
  console.log(this.gameBoard);
  console.log("PLAYER 1 : " + this.gameBoard[0]);
  console.log("PLAYER 2 : " + this.gameBoard[7]);




  checkWin(); // check if one of the players won
};

// winning = using up all the stones on your side
function checkWin() {  // see if someone won


  var playerOneStones = this.gameBoard[1] + this.gameBoard[2] + this.gameBoard[3] + this.gameBoard[4] + this.gameBoard[5] + this.gameBoard[6];
  var playerTwoStones = this.gameBoard[8] + this.gameBoard[9] + this.gameBoard[10] + this.gameBoard[11] + this.gameBoard[12] + this.gameBoard[13];


  if (playerOneStones === 0 || playerTwoStones === 0) { // this ends the game
    var playerOneTotal = this.gameBoard[0];
    var playerTwoTotal = this.gameBoard[7];

    if (playerOneTotal > playerTwoTotal) {
      alert('With this move, player one wins! THE SCORE IS ' + playerOneTotal + " vs " + playerTwoTotal);

      readOut.textContent = 'Player One Wins!';
      window.location.href = window.location.href;
    } else {
      alert('With this move, player two wins! THE SCORE IS ' + playerOneTotal + " vs " + playerTwoTotal);
      readOut.textContent = 'Player Two Wins!';
      window.location.href = window.location.href;
      ;

    };
  };
};

//set current player
function setPlayer() { // set the player

  if (currentPlayer === 'one') { // switch the string holding the current player
    highlighted = 1;
    currentPlayer = 'two';
    readOut.textContent = 'It is player ' + currentPlayer + '\'s turn'; // text to print
    var deselectBtn = document.getElementById(highlighted);

    deselectBtn.style.backgroundColor = "#DEB887"; // oG color and border
    deselectBtn.style.border = "#8B7355";

    var selectBtn = document.getElementById("1");

    // selectBtn.style.backgroundColor = "#f56e5f"
    // selectBtn.style.border = "#aaa9ad";
    player2Turn(1);
    return currentPlayer;
  } else {
    currentPlayer = 'one';
    highlighted = 8;
    readOut.textContent = 'It is player ' + currentPlayer + '\'s turn';
    var deselectBtn = document.getElementById(highlighted);

    deselectBtn.style.backgroundColor = "#DEB887"; // oG color and border
    deselectBtn.style.border = "#8B7355";



    var selectBtn = document.getElementById("8");
    selectBtn.style.backgroundColor = "#abebb4";
    selectBtn.style.border = "#aaa9ad";
    return currentPlayer;
  };

};


function moveStones2(e) { // when key is pressed,, call this
  if (e.repeat) {
    return;
  }  

  if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }


  // check to see which keys
  var keyCode = e.keyCode;

  if (keyCode == 13 && currentPlayer == 'one') { // CONFIRM SELECTION
    moveStones(highlighted);
    // call moveStones
    // get current value of the index
    // how to get the current number we're in?
    // send current value of the pitIndex somehow
  } else if (keyCode == 32 && currentPlayer == 'one') { // go through options

    var prevHighlighted = highlighted; // keep in here


    if (highlighted + 1 <= 13) { // if its within the bounds to be selected
      highlighted++; // if its in the bounds go ahead and increase it
    } else {
      if (highlighted + 1 == 14) {
        highlighted = 8
      }
    }

    // need to increment the variable that you currently are on
    var prevSpot = document.getElementById(prevHighlighted);
    var selectedSpot = document.getElementById(highlighted);
    prevSpot.style.backgroundColor = "#DEB887"; // oG color
    prevSpot.style.border = "#8B7355";

    selectedSpot.style.backgroundColor = "#abebb4";
    selectedSpot.style.border = "#aaa9ad";
  }
}

var toggleOptions = function (index) {
  if (currentPlayer == 'one') {
    var prevHighlighted = highlighted;
    if (highlighted + 1 <= 13) {
      highlighted++;
    } else {
      if (highlighted + 1 == 14) {
        highlighted = 8
      }
    }
    var prevSpot = document.getElementById(prevHighlighted);
    var selectedSpot = document.getElementById(highlighted);
    prevSpot.style.backgroundColor = "#DEB887"; // oG color
    prevSpot.style.border = "#8B7355";

    selectedSpot.style.backgroundColor = "#abebb4";
    selectedSpot.style.border = "#aaa9ad";
  }


  document.getElementById("select").style.backgroundColor = "white"
  document.getElementById("toggle").style.backgroundColor = "#bce3eb"


}

var selectOption = function () {


  document.getElementById("toggle").style.backgroundColor = "white"
  document.getElementById("select").style.backgroundColor = "#bce3eb"
  moveStones(highlighted);
}

var setListeners = function () {   // only sets at the beginning
  document.addEventListener("keydown", moveStones2, false);
  document.getElementById('8').style.backgroundColor = "#abebb4";
  document.getElementById('8').style.border = "#aaa9ad";
  highlighted = 8;

  document.getElementById("toggle").addEventListener('click', function (eventObject) { toggleOptions(highlighted) })

  document.getElementById("select").addEventListener('click', function (eventObject) { selectOption() })

};

renderBoard();

