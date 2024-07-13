import pubsub from "./pubsub";

//Fixed button events
const resetBtn = document.querySelector("button.reset");

resetBtn.addEventListener("click", (e) => {
  pubsub.publish("reset");
});

export default function renderGame(player, computer) {
  const playerBoardWrapper = document.querySelector("div.board.player");
  const CompBoardWrapper = document.querySelector("div.board.computer");

  //if divs are filled reset
  playerBoardWrapper.innerHTML = "";
  CompBoardWrapper.innerHTML = "";

  renderBoard(playerBoardWrapper, "player");
  renderBoard(CompBoardWrapper, "computer");

  markBoats(playerBoardWrapper, player);
  boardEvents(playerBoardWrapper);
}

function renderBoard(element, className) {
  for (let i = 7; i >= 0; i--) {
    for (let j = 0; j < 8; j++) {
      let tile = document.createElement("button");
      if (className == "player") {
        tile.id = `p${j}-${i}`;
      } else {
        tile.id = `c${j}-${i}`;
      }
      tile.setAttribute("pos", `${j},${i}`);
      tile.classList = "board tile " + className;
      element.appendChild(tile);
    }
  }
}

function markBoats(element, player) {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let tile = document.querySelector(`#p${i}-${j}`);
      let pos = [i, j];
      if (player.gameBoard.board[pos].ship) {
        tile.classList.add("boat");
      }
    }
  }
}

function boardEvents(element) {
  element.addEventListener("click", (e) => {
    if (e.target.classList.contains("player")) {
      pubsub.publish("attack", e.target.getAttribute("pos"), "player");
    } else {
      pubsub.publish("attack", e.target.getAttribute("pos"), "computer");
    }
  });
}
