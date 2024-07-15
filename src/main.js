import "./style.css";
import { renderGame, setBoardEvents, removeBoardEvents } from "./DOMhandler";
import Player from "./player.js";
import pubsub from "./pubsub.js";
import aiPlay from "./AI.js";

const playGame = (() => {
  let player = new Player();
  let computer = new Player();

  renderGame(player, computer);
  gameController(); //start game

  function end(gameBoard) {
    if (gameBoard.sunkShips == 5) return true;
  }

  async function gameController() {
    let gameEnd = false;
    let playerTurn = true;

    while (!gameEnd) {
      if (playerTurn) {
        //set events and wait for play
        let play = await setBoardEvents();

        //check hit
        if (!computer.gameBoard.board[play].ship) {
          removeBoardEvents();
          playerTurn = false;
        } else {
          //check game end
          if (end(computer.gameBoard) == true) {
            alert("You Win!");
            removeBoardEvents();
            gameEnd = true;
          }
        }
      } else {
        let [computerPlay, compPos] = await aiPlay(player.gameBoard.board);

        pubsub.publish("compAttack", computerPlay);

        if (!player.gameBoard.board[compPos].ship) {
          playerTurn = true;
        } else {
          //check game end
          if (end(computer.gameBoard) == true) {
            alert("How could you lose?");
            gameEnd = true;
          }
        }
      }
    }
  }

  //link buttons to game logic
  //rethink this to use a game controll func
  pubsub.subscribe("attack", (tile) => {
    let pos = tile.getAttribute("pos");
    computer.gameBoard.receiveAttack(pos);

    if (computer.gameBoard.board[pos].ship) {
      if (computer.gameBoard.board[pos].ship.isSunk()) {
        console.log("ship sunk");
      }
      pubsub.publish("hit", tile);
    } else {
      pubsub.publish("miss", tile);
    }
  });

  pubsub.subscribe("compAttack", (tile) => {
    let pos = tile.getAttribute("pos");
    player.gameBoard.receiveAttack(pos);

    if (player.gameBoard.board[pos].ship) {
      if (player.gameBoard.board[pos].ship.isSunk()) {
        console.log("ship sunk");
      }
      pubsub.publish("hit", tile);
    } else {
      pubsub.publish("miss", tile);
    }
  });

  pubsub.subscribe("reset", () => {
    player = new Player();
    computer = new Player();

    renderGame(player, computer);
    gameController();
  });
})();
