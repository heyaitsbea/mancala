//global board with starting values in array
var gameBoard = [0,4,4,4,4,4,4,0,4,4,4,4,4,4];

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

function moveStones(pitIndex){
  var stonesInHand = gameBoard[pitIndex];
  var pitNextIndex = pitIndex + 1;
  gameBoard[pitIndex] = 0;
  var i;
  if(stonesInHand > 0){
    for(i = pitNextIndex; i < stonesInHand + pitNextIndex; i++){
      gameBoard[i % gameBoard.length] += 1;
    }
    return gameBoard;
  } else {
    alert('error');
  }
};

renderBoard();


///player must defined before game starts
