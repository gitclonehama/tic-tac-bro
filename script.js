console.log("Hello, World!");

const Gameboard = (() => {
  let board = ["", "", "",
               "", "", "", 
               "", "", ""];
  
  const getBoard = () => board;

  const setBoard = (index, marker) => {
    if (board[index] === "") {
      board[index] = marker;
      return true;
    }
    else {
      alert("Spot taken!")
      return false;
    }
  };

  const resetBoard = () => {
    board = ["", "", "","", "", "", "", "", ""];
    return board;
  };

  return {getBoard, setBoard, resetBoard};
})();

const Player = (name, marker) => {
  const playerName = name;
  const playerMarker = marker;

  const getName = () => playerName;
  const getMarker = () => playerMarker;

  return {getName, getMarker};
};


const Game = (name1, name2) => {
  // Initialize players
  const player1 = Player(name1, "X");
  const player2 = Player(name2, "O");
  let currentPlayer = player1;

  // Initialize gameboard
  const board = Gameboard;
  console.log(board.getBoard());

  // Start or restart game
  const startGame = () => {
    board.resetBoard();
    currentPlayer = player1;
  };

  // Play a turn (playing marker on board)
  const playTurn = (index) => {
    if (board.setBoard(index, currentPlayer.getMarker())) {  // Check if move is valid
      if (checkWin()) {
        console.log(board.getBoard());
        console.log(`${currentPlayer.getName()} wins!`);
        return;  // End the game or reset as needed
      }
      if (checkTie()) {
        console.log(board.getBoard());
        console.log("It's a tie!");
        return;  // End the game or reset as needed
      }
      console.log(board.getBoard());
      switchTurn();  // Move to the next player's turn
    }
  };

  // Switch the active player
  const switchTurn = () => {
    currentPlayer = (currentPlayer === player1) ? player2 : player1;
  };

  // Check if there's a winning combination on the board
  const checkWin = () => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
      [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    return winningCombinations.some(combination => {
      const [a, b, c] = combination;
      return board.getBoard()[a] !== "" &&
             board.getBoard()[a] === board.getBoard()[b] &&
             board.getBoard()[a] === board.getBoard()[c];
    });
  };

  // Check if all spots are filled, indicating a tie
  const checkTie = () => {
    return board.getBoard().every(spot => spot !== "");
  };

  // Return the public methods
  return { startGame, playTurn };
};


const displayController = () => {
  const renderBoard = () => {
    const htmlBoard = document.querySelector("#container");
    const board = Gameboard.getBoard();

    // Update the innerHTML of each spot on the board
    board.forEach((spot, index) => {
      const spotElement = htmlBoard.children[index];
      spotElement.textContent = spot;
    });
  };
}



// JS for welcome screen and pre game UI
const playButton = document.querySelector("#playButton");
const gameContainer = document.querySelector("#container");
const playerForm = document.querySelector("#playerForm");

playButton.addEventListener("click", () => {
  event.preventDefault();  
  // when playButton is clicked, add .hidden to form and
  playerForm.classList.add("hidden");
  // remove .hidden from gameContainer
  gameContainer.classList.remove("hidden");
});