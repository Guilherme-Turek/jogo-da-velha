var player,
  winner = null;

var playerChosen = document.getElementById("player");
var winnerChosen = document.getElementById("winner");
var squares = document.getElementsByClassName("square");

changePlayer("X");

function makeMove(id) {
  if (winner !== null) {
    return;
  }

  var square = document.getElementById(id);
  if (square.innerHTML !== "-") {
    return;
  }

  square.innerHTML = player;
  square.style.color = "#000";

  if (player === "X") {
    player = "O";
  } else {
    player = "X";
  }

  changePlayer(player);
  checkWinner();
}

function changePlayer(value) {
  player = value;
  playerChosen.innerHTML = player;
}

function checkWinner() {
  const winCombinations = [
    [squares[0], squares[1], squares[2]],
    [squares[3], squares[4], squares[5]],
    [squares[6], squares[7], squares[8]],
    [squares[0], squares[3], squares[6]],
    [squares[1], squares[4], squares[7]],
    [squares[2], squares[5], squares[8]],
    [squares[0], squares[4], squares[8]],
    [squares[2], squares[4], squares[6]],
  ];

  for (const combination of winCombinations) {
    if (checkSequence(combination[0], combination[1], combination[2])) {
      changeColor(combination[0], combination[1], combination[2]);
      changeWinner(combination[0]);
      return;
    }
  }

  if ([...squares].every((square) => square.innerHTML !== "-")) {
    winnerChosen.innerHTML = "Empate";
  }
}

function checkSequence(s1, s2, s3) {
  var isTrue = false;

  if (
    s1.innerHTML !== "-" &&
    s1.innerHTML === s2.innerHTML &&
    s2.innerHTML === s3.innerHTML
  ) {
    isTrue = true;
  }

  return isTrue;
}

function changeColor(s1, s2, s3) {
  s1.style.background = "#0f0";
  s2.style.background = "#0f0";
  s3.style.background = "#0f0";
}

function changeWinner(square) {
  winner = square.innerHTML;
  winnerChosen.innerHTML = winner;
}

function restartGame() {
  winner = null;
  winnerChosen.innerHTML = "";

  [...squares].forEach((square) => {
    square.style.background = "#eee";
    square.style.color = "#eee";
    square.innerHTML = "-";
  });

  changePlayer("X");
}
