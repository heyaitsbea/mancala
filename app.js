//global board with starting values in array
var gameBoard = [
  4,4,4,4,4,4,
  4,4,4,4,4,4
];

//set turn as 0
var turn = 0;

//render board
var  renderBoard = function() {
  var gameContainer = document.querySelector('.container');

  for(var i = 0; i < gameBoard.length; i++){

    if(i % 6 === 0){
      var row = document.createElement('div');
      gameContainer.appendChild(row);
    };

    //add buttons to each row
    var button = document.createElement('button');
    button.setAttribute('id', 'pit'+i);
    //assign initial values to each button
    button.setAttribute('value', gameBoard[i]);
    button.innerHTML = gameBoard[i];
    row.appendChild(button);
  };

  //set classes for player rows
  var playerClass = document.querySelectorAll('.container div');
  playerClass[0].setAttribute('class','playerTwo');
  playerClass[1].setAttribute('class','playerOne');
};

renderBoard();
