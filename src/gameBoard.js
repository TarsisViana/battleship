import Ship from "./ship.js";

export default class GameBoard {
  constructor() {
    this.board = this.makeBoard();
    this.addShip(3, [0, 0]);
  }

  //board is an object indexed by the position of the tiles
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
    //each tile has a link to its ship, if one is placed there
    this.board[pos].ship = ship;

    let [posx, posy] = pos;

    //from the inicial point link the correct adjacent tiles to
    //the ship, depending if horizontal or vertical
    for (let i = 1; i < size; i++) {
      posx++;

      let newP = [posx, posy];
      this.board[newP].ship = ship;
    }
  }

  receiveAttack(pos) {
    //each tile can only be attacked once
    if (this.board[pos].hit) return;
    if (this.board[pos].ship) {
      this.board[pos].ship.hit();
      this.board[pos].hit = true;
    } else {
      this.board[pos].hit = true;
    }
  }
}

class Tile {
  constructor(pos, ship = null) {
    this.pos = pos;
    this.ship = ship;
    this.hit = false;
  }
}
