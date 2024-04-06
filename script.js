// Initialize the game board
const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let gameCounter = 1;

const winlose = document.querySelector(".winlose");
const result = document.querySelector(".result");
const cells = document.querySelectorAll(".cell");

let currentPlayer = "X";

result.textContent = `Game ${gameCounter}`;

cells.forEach((cell) => {
  cell.addEventListener("click", handleClick);
});

// Function to handle cell click
function handleClick() {
  const row = parseInt(this.dataset.row);
  const col = parseInt(this.dataset.col);

  // Check if the cell is empty
  if (board[row][col] === "") {
    // Update the cell value with the current player
    board[row][col] = currentPlayer;
    this.textContent = currentPlayer;

    // Check for a win or a draw
    if (checkWin(currentPlayer)) {
      winlose.textContent = `Player ${currentPlayer} wins!`;
      setTimeout(() => {
        resetGame();
      }, 2000);
    } else if (checkDraw()) {
      winlose.textContent = "It's a draw!";
      resetGame();
    } else {
      // Switch to the next player
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}

// Function to check for a win
function checkWin(player) {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === player &&
      board[i][1] === player &&
      board[i][2] === player
    ) {
      return true;
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] === player &&
      board[1][i] === player &&
      board[2][i] === player
    ) {
      return true;
    }
  }

  // Check diagonals
  if (
    (board[0][0] === player &&
      board[1][1] === player &&
      board[2][2] === player) ||
    (board[0][2] === player && board[1][1] === player && board[2][0] === player)
  ) {
    return true;
  }

  return false;
}

// Function to check for a draw
function checkDraw() {
  for (let row of board) {
    if (row.includes("")) {
      return false;
    }
  }
  return true;
}

// Function to reset the game
function resetGame() {
  // Clear the board
  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      board[rowIndex][colIndex] = "";
      cells[rowIndex * 3 + colIndex].textContent = "";
    });
  });
  gameCounter++;
  result.textContent = `Game ${gameCounter}`;
  // Reset the current player
  currentPlayer = "X";
}

// Add click event listener to the reset button
const resetButton = document.querySelector("#reset-button");
resetButton.addEventListener("click", resetGame);
