import GameBoard from "../src/gameBoard";

let game = new GameBoard();

test("makes board and places ship size 3 at 0,0 horizontaly", () => {
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
