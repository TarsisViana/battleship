import GameBoard from "./gameBoard.js";
import "./style.css";

const board = new GameBoard();
board.fillBoard();
console.log(board.board);
print(board.board);
function print(board) {
  for (let i = 0; i < 8; i++) {
    let str = "";
    for (let j = 0; j < 8; j++) {
      if (board[`${i},${j}`].ship) {
        str += "x ";
      } else {
        str += "0 ";
      }
    }
    console.log(str);
  }
}
