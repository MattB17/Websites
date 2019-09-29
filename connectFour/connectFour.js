playerOne = prompt("Player One: Enter Your Name, you will be Blue");

playerTwo = prompt("Player Two: Enter Your Name, you will be Red");

var pOneStr = playerOne + ": it is your turn, please pick a column to drop your blue chip";
var pTwoStr = playerTwo + ": it is your turn, please pick a column to drop your red chip";

$('h4').text(pOneStr);

var playerTurn = 1;

var positionsFilled = [0, 0, 0, 0, 0, 0, 0];

var table = $('table tr')

function getButton(rowIndex, colIndex) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button');
}

function playerOneMove(rowIdx, colIdx) {
  getButton(rowIdx, colIdx).toggleClass('turnBlue')
  playerTurn = 2;
  $('h4').text(pTwoStr);
}

function playerTwoMove(rowIdx, colIdx) {
  getButton(rowIdx, colIdx).toggleClass('turnRed');
  playerTurn = 1;
  $('h4').text(pOneStr);
}

function determineColorClass() {
  var colorClass = "";
  if (playerTurn === 1) {
    colorClass = "turnBlue";
  } else {
    colorClass = "turnRed";
  }
  return colorClass;
}

function winInCol(colorClass, colIndex) {
  win = false;
  for (var i = 0; i < 4; i++) {
    if (getButton(i, colIndex).hasClass(colorClass) && getButton(i + 1, colIndex).hasClass(colorClass) && getButton(i + 2, colIndex).hasClass(colorClass) && getButton(i + 3, colIndex).hasClass(colorClass)) {
      win = true;
      break;
    }
  }
  return win;
}

function winInRow(colorClass, rowIndex) {
  win = false;
  for (var i = 0; i < 4; i++) {
    if (getButton(rowIndex, i).hasClass(colorClass) && getButton(rowIndex, i + 1).hasClass(colorClass) && getButton(rowIndex, i + 2).hasClass(colorClass) && getButton(rowIndex, i + 3).hasClass(colorClass)) {
      win = true;
      break;
    }
  }
  return win;
}

function winInDownDiagonal(colorClass, rowIndex, colIndex) {
  win = false;
  var rowIdx = 0;
  var colIdx = 0;
  if (rowIndex < colIndex) {
    colIdx = colIndex - rowIndex;
  } else {
    rowIdx = rowIndex - colIndex;
  }
  while ((rowIdx < 4) && (colIdx < 4)) {
    if (getButton(rowIdx, colIdx).hasClass(colorClass) && getButton(rowIdx + 1, colIdx + 1).hasClass(colorClass) && getButton(rowIdx + 2, colIdx + 2).hasClass(colorClass) && getButton(rowIdx + 3, colIdx + 3).hasClass(colorClass)) {
      win = true;
      break;
    }
    rowIdx += 1;
    colIdx += 1;
  }
  return win;
}

function winInUpDiagonal(colorClass, rowIndex, colIndex) {
  win = false;
  var rowIdx = 6;
  var colIdx = 0;
  if (rowIndex + colIndex > 6) {
    colIdx = rowIndex + colIndex - 6;
  } else {
    rowIdx = colIndex + rowIndex
  }
  while ((rowIdx > 2) && (colIdx < 4)) {
    if (getButton(rowIdx, colIdx).hasClass(colorClass) && getButton(rowIdx - 1, colIdx + 1).hasClass(colorClass) && getButton(rowIdx - 2, colIdx + 2).hasClass(colorClass) && getButton(rowIdx - 3, colIdx + 3).hasClass(colorClass)) {
      win = true;
      break;
    }
    rowIdx -= 1;
    colIdx += 1;
  }
  return win
}

function reportWin() {
  $('h4').fadeOut(3000);
  var player = playerTwo;
  if (playerTurn === 2) {
    player = playerOne;
  }
  $('h1').text(player + " wins!");
  $('h3').text("Refresh your browser to play again!");
}

function columnListener(colNum) {
  var colIndex = colNum - 1;
  if (positionsFilled[colIndex] < 7) {
    rowIndex = 6 - positionsFilled[colIndex];
    colorClass = determineColorClass();
    if (playerTurn === 1) {
      playerOneMove(rowIndex, colIndex);
    } else {
      playerTwoMove(rowIndex, colIndex);
    }
    positionsFilled[colIndex] += 1;
    if (winInCol(colorClass, colIndex) || winInRow(colorClass, rowIndex) || winInUpDiagonal(colorClass, rowIndex, colIndex) || winInDownDiagonal(colorClass, rowIndex, colIndex)) {
      reportWin();
    }
  }
}

$(".col1").click(function() {columnListener(1)});
$(".col2").click(function() {columnListener(2)});
$(".col3").click(function() {columnListener(3)});
$(".col4").click(function() {columnListener(4)});
$(".col5").click(function() {columnListener(5)});
$(".col6").click(function() {columnListener(6)});
$(".col7").click(function() {columnListener(7)});
