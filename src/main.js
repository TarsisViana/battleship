import "./style.css";
import renderGame from "./DOMhandler";
import Player from "./player.js";
import pubsub from "./pubsub.js";

const playGame = (() => {
  let player = new Player();
  let computer = new Player();

  renderGame(player, computer);

  //link buttons to game logic
  pubsub.subscribe("attack", (tile, turn) => {
    let pos = tile.getAttribute("pos");
    if (turn == "player") {
      computer.gameBoard.receiveAttack(pos);
      if (computer.gameBoard.board[pos].ship) {
        if (computer.gameBoard.board[pos].ship.isSunk())
          console.log("ship sunk");
        pubsub.publish("hit", tile);
      } else {
        pubsub.publish("miss", tile);
      }
    }
  });

  pubsub.subscribe("reset", () => {
    let player = new Player();
    let computer = new Player();

    renderGame(player, computer);
  });
})();
