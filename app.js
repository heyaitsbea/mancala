//global board with starting values in array
var gameBoard = [
  0,4,4,4,4,4,4,
  0,4,4,4,4,4,4
];

//set currentPlayer as 1
var currentPlayer = 1;

//game play readout
var readOut = document.querySelector('div.info');

//render board
function renderBoard() {
  var gameContainer = document.querySelector('.container');

  for(var i = 0; i < gameBoard.length; i++){

    if(i % 7 === 0){
      var row = document.createElement('div');
      gameContainer.appendChild(row);
    };

    //add buttons to each row
    var button = document.createElement('button');
    button.setAttribute('id', 'pit'+i);
    //assign initial values to each button
    button.innerHTML = gameBoard[i];
    row.appendChild(button);
  };

  var playerClass = document.querySelectorAll('.container div');
  playerClass[0].setAttribute('class','playerTwo');
  playerClass[1].setAttribute('class','playerOne');
};

function moveStones(pitIndex){
  var stonesInHand = gameBoard[pitIndex];
  var pitNextIndex = pitIndex + 1;
  gameBoard[pitIndex] = 0;
  var i;
  if(stonesInHand > 0) {
    for(i = pitNextIndex; i < stonesInHand + pitNextIndex; i++){
      //will start at the first item when it reaches the end
      lastIndex = i % gameBoard.length;
      gameBoard[lastIndex] += 1;
    }
    return gameBoard;
    //call bankStones
    bankStones();
  } else {
    alert('error');
  };
};

function bankStones(){
  var inverse = gameBoard.length - lastIndex;
  //if lastIndex is not a bank
  if(lastIndex != 0 || 7) {
    if(currentPlayer === 1) {
      if(gameBoard[lastIndex] === 1){
        //move all stones in inverse pit to player 2 bank
        gameBoard[7] += gameBoard[inverse] + 1;
        gameBoard[lastIndex] = 0;
        return gameBoard;
      };
    } else {
      gameBoard[0] += gameBoard[inverse] + 1;
      gameBoard[lastIndex] = 0;
    };
  };
};

function checkWin(){
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
  } else {
    //if there is no winner then player is changed
    setPlayer();
  };
};


//set current player
function setPlayer(){
  if(currentPlayer = 1){
    currentPlayer = 0;
    return currentPlayer;
  } else {
    currentPlayer = 1;
    return currentPlayer;
  }
};

var updateBoard = function (gameObject){
  gameBoard[gameObject.pits] = gameObject.value;
  var element = document.getElementById(gameObject.pits);
  element.innerHTML = gameObject.value;

  checkWin();
};


var setListeners = function(){

  for( var i = 0; i < gameBoard.length; i++){
    var pit = document.querySelectorAll('button');
    pit.addEventListener('click', function(eventObject){
      var gameObject = {'pits': eventObject.target.id, 'value': gameBoard}

      updateBoard(gameObject);
    });
  }
};

renderBoard();
setListeners();

//disable click event for pits
// var bankPlayerOne = document.getElementById('pit0');
// bankPlayerOne.removeEventListener('click', false);
// var bankPlayerTwo = document.getElementById('pit0');
// bankPlayerTwo.removeEventListener('click', false);
//set classes for player rows

///player must defined before game starts
