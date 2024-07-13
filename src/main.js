import "./style.css";
import renderGame from "./DOMhandler";
import Player from "./player.js";
import pubsub from "./pubsub.js";

const playGame = (() => {
  let player = new Player();
  let computer = new Player();

  renderGame(player, computer);

  //link buttons to game logic
  pubsub.subscribe("attack", (pos, turn) => {
    if (turn == "player") {
      player.gameBoard.receiveAttack(pos);
      console.log(player.gameBoard.board[pos]);
      if (player.gameBoard.board[pos].ship) {
        console.log(player.gameBoard.board[pos].ship.hitCount);
      }
    }
  });

  pubsub.subscribe("reset", () => {
    let player = new Player();
    let computer = new Player();
    console.log(player);
    renderGame(player, computer);
  });
})();
