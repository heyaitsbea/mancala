//global board with starting values in array
var gameBoard = [
  0,4,4,4,4,4,4,
  0,4,4,4,4,4,4
];

//set turn as 0
var currentPlayer = 1;

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

function setPlayer(){
  if(currentPlayer = 1){
    currentPlayer = 0;
    return currentPlayer;
  } else {
    currentPlayer = 1;
    return currentPlayer;
  }
};

function moveStones(pitIndex){
  var stonesInHand = gameBoard[pitIndex];
  var pitNextIndex = pitIndex + 1;
  gameBoard[pitIndex] = 0;
  var i;
  if(stonesInHand > 0) {
    for(i = pitNextIndex; i < stonesInHand + pitNextIndex; i++){
      //will start at the first item when it reaches the end
      var lastIndex = i % gameBoard.length;
      gameBoard[lastIndex] += 1;
    }

    return gameBoard;

  } else {
    alert('error');
  };
};

function checkWin(){
  var playerOneStones = gameBoard[1]+gameBoard[2]+gameBoard[3]+gameBoard[4]+gameBoard[5]+gameBoard[6];
  var playerTwoStones = gameBoard[8]+gameBoard[9]+gameBoard[10]+gameBoard[11]+gameBoard[12]+gameBoard[13];
  if(playerOneStones === 0 || playerTwoStones === 0){
    var playerOneTotal = playerOneStones + gameBoard[0];
    var playerTwoTotal = playerTwoStones + gameBoard[7];

    if(playerOneTotal > playerTwoTotal){
      alert('Player One Wins!');
    } else {
      alert('Player Two Wins!');
    }
  } else {
    console.log('keep playing');
  };
};

var updateBoard = function (gameObject){
  gameBoard[gameObject.pits] = gameObject.value;
  var element = document.getElementById(gameObject.pits);
  element.innerHTML = gameObject.value;

  checkWin();
};


var setListeners = function(){

  for( var i = 0; i < pit.length; i++){
    var pit = document.querySelectorAll('button');
    pit.addEventListener('click', function(eventObject){
      var gameObject = {'pits': eventObject.target.id, 'value': 'test'}

      updateBoard(gameObject);
    });
  }
};

renderBoard();
setListeners();

// function bankStones(){
//   if(lastIndex === 0 || 7){
//     currentPlayer
//   } else if (gameBoard[lastIndex] === 1) {
//     gameBoard[]
//   }
// }
//
// var getCurrentPlayer = function(){
//   if(currentPlayer === 1){
//     currentPlayer = 0;
//     return currentPlayer;
//   } else {
//     currentPlayer = 1;
//     return currentPlayer;
//   }
// };
//
// var setListeners = function(){
//   for(var i = 0; i < gameBoard.length; i++){
//     var element = document.getElementById(i);
//     element.addEventListener("click", function(eventObject){
//     //let's figure out who's turn it is so we can lay down a x or o
//     var currentPlayer = getCurrentPlayer();
//     var gameObject = { "pos": eventObject.target.id, "value": turn}
//     updateGame(gameObject);
//     });
//   }
// };
//
//

//disable click event for pits
// var bankPlayerOne = document.getElementById('pit0');
// bankPlayerOne.removeEventListener('click', false);
// var bankPlayerTwo = document.getElementById('pit0');
// bankPlayerTwo.removeEventListener('click', false);
//set classes for player rows

///player must defined before game starts
