//global board with starting values in array
var gameBoard = [
  0,4,4,4,4,4,4,
  0,4,4,4,4,4,4
];

//set currentPlayer as 1
var currentPlayer = 'one';

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
    button.setAttribute('class', 'pit'+i);
    button.setAttribute('id', i);
    //assign initial values to each button
    button.innerHTML = gameBoard[i];
    row.appendChild(button);
  };

  var playerClass = document.querySelectorAll('.container div');
  playerClass[0].setAttribute('class','playerTwo');
  playerClass[1].setAttribute('class','playerOne');

  setListeners();
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
  };

  bankStones(lastIndex);
  setPlayer();
};

function bankStones(lastIndex){
  var inverse = gameBoard.length - lastIndex;
  //if lastIndex is not a bank and has one stone
  if((lastIndex != 0) && (lastIndex != 7) && (gameBoard[lastIndex] === 1)) {
    if(currentPlayer === 'two'){
      if(1 <= lastIndex <= 6){
        //move all stones in inverse pit to player 2 bank
        gameBoard[7] = gameBoard[7] + gameBoard[inverse] + 1;
        gameBoard[lastIndex] = 0;
        gameBoard[inverse] = 0;
      };
    } else {
      if(8 <= lastIndex <= 13){
        gameBoard[0] = gameBoard[0] + gameBoard[inverse] + 1;
        gameBoard[lastIndex] = 0;
        gameBoard[inverse] = 0;
      };
    };

    //player who lands on bank will have an extra turn
  } else if (lastIndex === 0){
    currentPlayer = 'two';
  } else if (lastIndex === 7){
    currentPlayer = 'one';
  };

  updateBoard();
};

var updateBoard = function (){
  for(var i = 0; i < gameBoard.length; i++){
    var pit = document.querySelectorAll('button');
    pit[i].textContent = gameBoard[i];
  };

  checkWin();
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
  };
};

//set current player
function setPlayer(){
  if(currentPlayer === 'one'){
    currentPlayer = 'two';
    readOut.textContent = 'It is player '+currentPlayer+'\'s turn';
    return currentPlayer;
  } else {
    currentPlayer = 'one';
    readOut.textContent = 'It is player '+currentPlayer+'\'s turn';
    return currentPlayer;
  };

};

var setListeners = function(){
  for(var i = 0; i < gameBoard.length; i++){
    var pit = document.querySelectorAll('button');
    pit[i].addEventListener('click', function(eventObject){moveStones(Number(eventObject.target.id))} );
  };
};

renderBoard();
