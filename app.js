//global board with starting values in array
var gameBoard = [
  0,4,4,4,4,4,4,
  0,4,4,4,4,4,4
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
  for(var i = 0; i < gameBoard.length; i++){ // go through the length of the game board

    if(i % 7 === 0){  // if you're in one of the two rows
      var row = document.createElement('div'); // create a div
      gameContainer.appendChild(row); // add the row to the board
    };

    //add buttons to each row
    var button = document.createElement('button'); // create a button representing each pit
    button.setAttribute('class', 'pit'+i);  // each pit has a specific class depending on what it is
    button.setAttribute('id', i); // each has an ID depending on what it is 
    //assign initial values to each button
    button.innerHTML = gameBoard[i]; // each pit = the value that is in that array
    row.appendChild(button); // add it to the row
  };

  var playerClass = document.querySelectorAll('.container div'); // select all
  playerClass[0].setAttribute('class','playerTwo'); 
  playerClass[1].setAttribute('class','playerOne');

  setListeners();
};


// pick stones up and drop one in each
// if it lands on your bank (to the right, you go again)
// if you move it to an empty space, you get what's in that space + the space across frmo you in your bank
// it still goes into the bank of the opponent no matter what

function moveStones(pitIndex){ // moving at a certain pit
  console.log("pit index is " + pitIndex);
  var stonesInHand = gameBoard[pitIndex]; // the stones you have is the amount in the pit you pick up
  var pitNextIndex = pitIndex + 1; // finds next index 
  gameBoard[pitIndex] = 0; // setting the stones you have to 0, because you're picking all of them up
  var i;
  if(stonesInHand > 0) { // if you click on a full pit

    for(i = pitNextIndex; i < stonesInHand + pitNextIndex; i++){ // for each 
      // starts at the next index, makes sure you use all stones, increments
      lastIndex = i % gameBoard.length; // last index  that something will be dropped (when everything is out!)
      // founds the index it would be dropped at
      gameBoard[lastIndex] += 1; //
      
      
    }
  };


  bankStones(lastIndex); //send the index

  if ((currentPlayer == 'one' && lastIndex != 0) || currentPlayer == 'two' && lastIndex != 7) {
    setPlayer();
  } else { // don't change if they're in a bank
    readOut.textContent = 'It is player '+currentPlayer+'\'s turn';
  }
  
};

// function player2Turn (pitIndex) { // where to get the pit

// }

function bankStones(lastIndex){   // takes in index  
  var inverse = gameBoard.length - lastIndex;  // inverse is the index ACROSS from it 
  //if lastIndex is not a bank and has one stone
  if((lastIndex != 0) && (lastIndex != 7) && (gameBoard[lastIndex] === 1)) { // if there's only 1 in the last one AND is not a bank
    if(currentPlayer === 'two'){   // if it's the opponent's turn
      if(1 <= lastIndex <= 6){  
        //move all stones in inverse pit to player 2 bank
        gameBoard[7] = gameBoard[7] + gameBoard[inverse] + 1;  
        gameBoard[lastIndex] = 0; // clears out both
        gameBoard[inverse] = 0;
      };
    } else { // if it is Your turn
      if(8 <= lastIndex <= 13){
        gameBoard[0] = gameBoard[0] + gameBoard[inverse] + 1;
        gameBoard[lastIndex] = 0;
        gameBoard[inverse] = 0;
      };
    };
  };

  updateBoard();
};

var updateBoard = function (){ // update the board
  for(var i = 0; i < gameBoard.length; i++){
    var pit = document.querySelectorAll('button');
    pit[i].textContent = gameBoard[i];
  };

  checkWin(); // check if one of the players won
};

// winning = using up all the stones on your side
function checkWin(){  // see if someone won
  var playerOneStones = gameBoard[1]+gameBoard[2]+gameBoard[3]+gameBoard[4]+gameBoard[5]+gameBoard[6];
  var playerTwoStones = gameBoard[8]+gameBoard[9]+gameBoard[10]+gameBoard[11]+gameBoard[12]+gameBoard[13];
  if(playerOneStones === 0 || playerTwoStones === 0){
    var playerOneTotal = playerOneStones + gameBoard[0];
    var playerTwoTotal = playerTwoStones + gameBoard[7];

    if(playerOneTotal > playerTwoTotal){
      readOut.textContent = 'Player One Wins!';
    } else {
      readOut.textContent = 'Player Two Wins!';
    };
  };
};

//set current player
function setPlayer(){ // set the player
  if(currentPlayer === 'one'){ // switch the string holding the current player
    currentPlayer = 'two';
    readOut.textContent = 'It is player '+currentPlayer+'\'s turn'; // text to print
    var deselectBtn = document.getElementById(highlighted);
    
    deselectBtn.style.backgroundColor = "#DEB887"; // oG color
    deselectBtn.style.border = "#8B7355";

    var selectBtn = document.getElementById("1");
    
    // go to AI function


    return currentPlayer;  
  } else {
    currentPlayer = 'one'; 
    readOut.textContent = 'It is player '+currentPlayer+'\'s turn';
    
    return currentPlayer;
  };

};


function moveStones2(e) { // when key is pressed,, call this

  console.log("hi");
  // check to see which keys
 var keyCode = e.keyCode;
  if (keyCode == 13) { // CONFIRM SELECTION
    moveStones(highlighted);
    // call moveStones
    // get current value of the index
    // how to get the current number we're in?
    // send current value of the pitIndex somehow
  } else if (keyCode == 32) { // go through options
    
    var prevHighlighted = highlighted; // keep in here

    console.log("at the start, highlighted is " + highlighted);

    if (highlighted + 1 != 7 && highlighted + 1 <= 13) { // if its within the bounds to be selected
      highlighted ++; // if its in the bounds go ahead and increase it
    } else {
      if (highlighted + 1 == 7) {
        highlighted = 8
      } else if (highlighted + 1 >= 13) {
        highlighted = 1;
      }
    }

    // need to increment the variable that you currently are on
    var prevSpot = document.getElementById(prevHighlighted);
    var selectedSpot  = document.getElementById(highlighted);


    prevSpot.style.backgroundColor = "#DEB887"; // oG color
    prevSpot.style.border = "#8B7355";

    selectedSpot.style.backgroundColor = "#abebb4"; // oG color
    selectedSpot.style.border = "#aaa9ad";
    

   
  }
}

var setListeners = function(){   // only sets at the beginning
  // 
  document.addEventListener("keydown", moveStones2, false);

  for(var i = 0; i < gameBoard.length; i++){  //setting a listener for each pit
    var pit = document.querySelectorAll('button'); // select all the stones to be listening for a click

    pit[1].style.backgroundColor =  "#abebb4";
    pit[1].style.border =  "#aaa9ad";
    highlighted = 1;

    pit[i].addEventListener('click', function(eventObject){moveStones(Number(eventObject.target.id))} );
    // moves stones when te button 
    // moveStones
  }; 
};

renderBoard();
