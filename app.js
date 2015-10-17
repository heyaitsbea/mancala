//global board with starting values in array
var gameBoard = [0,1,2,3,4,5,6,7,8,9,10,11,12,13];

//set turn as 0
var turn = 0;

//set stone count to 0
var amtStones = 0;

//render board
var  renderBoard = function() {
  var gameContainer = document.querySelector('.container');

  for(var i = 0; i < gameBoard.length; i++){

    if(i % 7 === 0){
      var row = document.createElement('div');
      gameContainer.appendChild(row);
    };

    //add buttons to each row
    var button = document.createElement('button');
    button.setAttribute('id', 'pit'+i);
    //add listener for all buttons and call getStones function
    //assign to amtStones
    button.addEventListener('click', function(){
      amtStones = Number(this.textContent);
    });
    //assign initial values to each button
    // button.setAttribute('value', gameBoard[i]);
    button.innerHTML = gameBoard[i];
    row.appendChild(button);
  };

  //set classes for player rows
  var playerClass = document.querySelectorAll('.container div');
  playerClass[0].setAttribute('class','playerTwo');
  playerClass[1].setAttribute('class','playerOne');
};

var sowStones = function(amtStones,pitIndex){
  if (amtStones === 0){
    alert('invalid selection');
  } else {
    gameBoard.splice(pit, 1, 0);
    for(i = 0; i < amtStones; i++){
      gameBoard.splice(pit+1, 1, gameBoard[pit]+1);
    }
    return gameBoard;
  };
};

renderBoard();
sowStones();


//using pitIndex to movestones ==== needs fixing
var board = [0,1,2,3,4,5,6,7,8]
function moveStones(pitIndex){
  var stonesInHand = board[pitIndex];
  board[pitIndex] = 0;
  var i;
  if(stonesInHand > 0){
    for(i = pitIndex + 1; i < board.length; i++){
      board[pitIndex] += 1;
    }
    return board;
  } else {
    alert('error');
  }
}


///player must defined before game starts
