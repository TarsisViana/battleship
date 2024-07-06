import Ship from "./ship.js";

export default class GameBoard {
  constructor() {
    this.board = this.makeBoard();
    this.missed = [];
    this.sunkShips = 0;
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

  addShip(size, pos, vert = false) {
    let ship = new Ship(size);
    //each tile has a link to its ship, if one is placed there
    this.board[pos].ship = ship;

    let [posx, posy] = pos;

    //from the inicial point link the correct adjacent tiles to
    //the ship, depending if horizontal or vertical
    for (let i = 1; i < size; i++) {
      if (vert) {
        posy++;
      } else {
        posx++;
      }

      let newP = [posx, posy];
      this.board[newP].ship = ship;
    }
  }

  receiveAttack(pos) {
    //each tile can only be attacked once
    if (this.board[pos].hit) return;
    if (this.board[pos].ship) {
      //hit ship, mark tile, check if sunk, if so update count
      this.board[pos].ship.hit();
      this.board[pos].hit = true;

      if (this.board[pos].ship.isSunk()) {
        this.sunkShips++;
      }
    } else {
      //the tile is marked so it can´t be attacked again
      //update the missed list
      this.board[pos].hit = true;
      this.missed.push(pos);
    }
  }

  fillBoard() {
    // add boats size 4,3,3,2,1
    this.addBoatRandom(4);
    this.addBoatRandom(3);
    this.addBoatRandom(3);
    this.addBoatRandom(2);
    this.addBoatRandom(1);
  }

  addBoatRandom(size) {
    let x = parseInt(Math.random() * 8);
    let y = parseInt(Math.random() * 8);
    let pos = [x, y];

    let temp = parseInt(Math.random() * 2);
    let vert = temp == 0;

    if (this.checkBoat(size, pos, vert)) {
      this.addShip(size, pos, vert);
    } else {
      this.addBoatRandom(size, vert);
    }
  }

  checkBoat(size, pos, vert) {
    let [posx, posy] = pos;
    let newP = pos;
    for (let i = 0; i < size; i++) {
      if (posx > 7 || posy > 7) return false;
      if (this.board[newP].ship) return false;
      if (vert) {
        posy++;
      } else {
        posx++;
      }
      newP = [posx, posy];
    }
    return true;
  }
}

class Tile {
  constructor(pos, ship = null) {
    this.pos = pos;
    this.ship = ship;
    this.hit = false;
  }
}
