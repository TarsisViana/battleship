import pubsub from "./pubsub";

const playerBoardWrapper = document.querySelector("div.board.player");
const computerBoardWrapper = document.querySelector("div.board.computer");

//Fixed button events
const resetBtn = document.querySelector("button.reset");

resetBtn.addEventListener("click", (e) => {
  pubsub.publish("reset");
});

function renderGame(player, computer) {
  //if divs are filled reset
  playerBoardWrapper.innerHTML = "";
  computerBoardWrapper.innerHTML = "";

  renderBoard(playerBoardWrapper, "player");
  renderBoard(computerBoardWrapper, "computer");

  markBoats(player, "player");
  markBoats(computer, "computer");
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

function markBoats(element, id) {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let tile;
      if (id == "computer") {
        tile = document.querySelector(`#c${i}-${j}`);
      } else {
        tile = document.querySelector(`#p${i}-${j}`);
      }
      let pos = [i, j];
      if (element.gameBoard.board[pos].ship) {
        tile.classList.add("boat");
      }
    }
  }
}

function setBoardEvents() {
  //returns a promise that sets event listeners to publish
  //attack and resolves when a button is pressed
  return new Promise((resolve) => {
    computerBoardWrapper.addEventListener("click", (e) => {
      if (e.target.classList.contains("tile")) {
        pubsub.publish("attack", e.target);
        e.target.disabled = true;
        resolve(e.target.getAttribute("pos"));
      }
    });
  });
}

function removeBoardEvents() {
  computerBoardWrapper.removeEventListener("click", (e) => {
    if (e.target.classList.contains("tile")) {
      pubsub.publish("attack", e.target);
      e.target.disabled = true;
      resolve(e.target.getAttribute("pos"));
    }
  });
}

pubsub.subscribe("hit", (tile) => {
  tile.classList.add("hit");
});
pubsub.subscribe("miss", (tile) => {
  tile.classList.add("miss");
});

export { renderGame, setBoardEvents, removeBoardEvents };
