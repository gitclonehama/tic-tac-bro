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

  return {getBoard, setBoard};
})();

const Player = ((name, marker) => {
  const playerName = name;
  const playerMarker = marker;

  const getName = () => playerName;
  const getMarker = () => playerMarker;

  return {getName, getMarker};
})();