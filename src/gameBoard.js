import Ship from "./ship.js";

export default class GameBoard {
  constructor() {
    this.board = this.makeBoard();
    this.addShip(3, [0, 0]);
  }

  makeBoard() {
    let board = {};
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let tile = new Tile([i, j]);
        board[`${i},${j}`] = { tile };
      }
    }
    return board;
  }

  addShip(size, pos) {
    let ship = new Ship(size);
    this.board[pos].ship = ship;

    let [posx, posy] = pos;

    for (let i = 1; i < size; i++) {
      posx++;

      let newP = [posx, posy];
      this.board[newP].ship = ship;
    }
  }
}

class Tile {
  constructor(pos, ship = null) {
    this.pos = pos;
    this.ship = ship;
  }
}
