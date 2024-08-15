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
  const playerMarker = marker.toUpperCase();

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
        alert(`${currentPlayer.getName()} wins!`);
        return;  // End the game or reset as needed
      }
      if (checkTie()) {
        console.log(board.getBoard());
        alert("It's a tie!");
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


const displayController = (() => {
  const htmlBoard = document.querySelector("#container");
  const playerForm = document.querySelector("#playerForm");
  const gameMessages = document.querySelector("#messages");
  
  // Hide player name form and display game board
  const showGameScreen = () => {
    playerForm.classList.add("hidden");    // Hide player form
    htmlBoard.classList.remove("hidden");  // Show game container
  };
  
  // Full board render
  const renderBoard = () => {
    const board = Gameboard.getBoard();
    // Update the innerHTML of each spot on the board
    board.forEach((spot, index) => {
      const boardCell = htmlBoard.children[index];
      boardCell.textContent = spot;
    });
  };

  // Update just one cell
  const updateCell = (index, marker) => {
    const cell = document.querySelector(`[data-index='${index}']`);
    if (cell) {
      cell.textContent = marker;
    }
  }
  
  // Clear the board
  const clearBoard = () => {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => cell.textContent = "");
  }

  // Bind events to the html board
  const bindEvents = (gameInstance) => {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
      cell.addEventListener("click", () => {
        const index = cell.dataset.index;
        gameInstance.playTurn(index);
      });
    });
  };

  // Display any message to players (through a div above game board)
  const displayMessage = (message) => {
    messageElement.textContent = message;
  };

  // Show result to the message container
  const showResult = (winner) => {
    if (winner) {
      displayMessage(`${winner.getName()} wins!`);
    } else {
      displayMessage("It's a tie!");
    }
  };

  // Initialize the board
  const initializeBoard = (gameInstance) => {
    renderBoard(gameInstance.getBoard());
    bindEvents(gameInstance);
  };


  return {
    showGameScreen,
    renderBoard,
    updateCell,
    clearBoard,
    bindEvents,
    displayMessage,
    showResult,
    initializeBoard,
    restartGame
  };
})();



// Event listeners
const playButton = document.querySelector("#playButton");

// Transition to game screen
playButton.addEventListener("click", (event) => {
  event.preventDefault();  
  displayController.showGameScreen();
});
