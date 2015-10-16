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
    // button.setAttribute('value', gameBoard[i]);
    button.innerHTML = gameBoard[i];
    row.appendChild(button);
  };

  //set classes for player rows
  var playerClass = document.querySelectorAll('.container div');
  playerClass[0].setAttribute('class','playerTwo');
  playerClass[1].setAttribute('class','playerOne');
};

//get amount of stones in each pit from the text of the buttons
var getStones = function(){
  $('button').click(function() {
  var amtStones;

  switch ( $('button').index( this ) ) {
    case 0 :
      amtStones = Number($('#pit0').text());
      break;
    case 1 :
      amtStones = Number($('#pit1').text());
      break;
    case 2 :
      amtStones = Number($('#pit2').text());
      break;
    case 3 :
      amtStones = Number($('#pit3').text());
      break;
    case 4 :
      amtStones = Number($('#pit4').text());
      break;
    case 5 :
      amtStones = Number($('#pit5').text());
      break;
    case 6 :
      amtStones = Number($('#pit6').text());
      break;
    case 7 :
      amtStones = Number($('#pit7').text());
      break;
    case 8 :
      amtStones = Number($('#pit8').text());
      break;
    case 9 :
      amtStones = Number($('#pit9').text());
      break;
    case 10 :
      amtStones = Number($('#pit10').text());
      break;
    case 11 :
      amtStones = Number($('#pit11').text());
      break;
  }
});
};


var sowStones = function(amtStones){
  if (amtStones === 0){
    alert('invalid selection');
  } else {

  }
}

//change to do not sow sow stone to banks

renderBoard();
getStones();
