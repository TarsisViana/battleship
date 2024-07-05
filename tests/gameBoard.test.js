import GameBoard from "../src/gameBoard";

let game = new GameBoard();

test("makes board and places ship size 3 at 0,0 horizontaly", () => {
  game.addShip(3, [0, 0]);
  expect(game.board["0,0"].ship).toEqual({
    hitCount: 0,
    length: 3,
    sunk: false,
  });
});

test("is boat in all the correct tiles", () => {
  expect(game.board["1,0"].ship).toEqual({
    hitCount: 0,
    length: 3,
    sunk: false,
  });
  expect(game.board["2,0"].ship).toEqual({
    hitCount: 0,
    length: 3,
    sunk: false,
  });
  expect(game.board["3,0"].ship).toBe(undefined);
});

test("hits boat on tile 0,0", () => {
  game.receiveAttack([0, 0]);
  expect(game.board["0,0"].ship.hitCount).toBe(1);
  game.receiveAttack([1, 0]);
  expect(game.board["0,0"].ship.hitCount).toBe(2);
});

test("vertical boat at 1,2", () => {
  game.addShip(4, [1, 2], true);
  expect(game.board["1,2"].ship).toEqual({
    hitCount: 0,
    length: 4,
    sunk: false,
  });
  expect(game.board["1,3"].ship).toEqual({
    hitCount: 0,
    length: 4,
    sunk: false,
  });
  expect(game.board["1,4"].ship).toEqual({
    hitCount: 0,
    length: 4,
    sunk: false,
  });
  expect(game.board["1,5"].ship).toEqual({
    hitCount: 0,
    length: 4,
    sunk: false,
  });
  expect(game.board["1,6"].ship).toBe(undefined);
});
