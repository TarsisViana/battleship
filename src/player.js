import GameBoard from "./gameBoard";

export default class Player {
  constructor() {
    this.gameBoard = new GameBoard();
    this.gameBoard.fillBoard();
  }
}
