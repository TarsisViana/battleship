export default async function aiPlay(board) {
  await resolveAfter2Seconds();
  let check = true;
  let x, y, pos;

  while (check) {
    x = parseInt(Math.random() * 8);
    y = parseInt(Math.random() * 8);
    pos = [x, y];
    if (board[pos].tile.hit == false) check = false;
  }

  let tile = getTile(pos);
  return [tile, pos];
}

function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1500);
  });
}

function getTile(pos) {
  const playerBoard = document.querySelector("div.board.player");
  const tile = playerBoard.querySelector(`button[pos="${pos}"]`);

  return tile;
}
