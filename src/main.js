import "./style.css";
import { renderGame, setBoardEvents, removeBoardEvents } from "./DOMhandler";
import Player from "./player.js";
import pubsub from "./pubsub.js";
import aiPlay from "./AI.js";

const playGame = (() => {
  let player = new Player();
  let computer = new Player();

  renderGame(player, computer);

  function end(board) {
    if (board.sunkShips() == 4) return true;
  }

  //while ships are not sunk
  //players turn:
  //set envent listeners - ok
  //wait for input - ok
  //if hit do it again (check for game end) -ok
  //if miss change to computer's turn: - remove event listeners XXXX
  //computers turn:
  //disable event listeners
  //get comps play
  //if hit play again (check for game end)
  //if not change to players turn

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
          //check gameEnd
        }
      } else {
        console.log("comps turn");
        break;
      }
    }
  }

  gameController();

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

  pubsub.subscribe("reset", () => {
    player = new Player();
    computer = new Player();

    renderGame(player, computer);
  });

  //testing
  document.querySelector(".hey").addEventListener("click", async () => {
    let hey = await aiPlay();
    console.log(hey);
  });
})();
