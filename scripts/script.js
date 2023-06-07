import { Game } from "./Game.js";

const W = 500,
  H = 500,
  C = 20;

let replayBtn = document.querySelector("#replay");
let scoreCounter = document.querySelector("#score");
let canvas = document.createElement("canvas");

document.querySelector("#canvasContainer").appendChild(canvas);
let canvasContext = canvas.getContext("2d");

canvas.width = W;
canvas.height = H;

const FRAME = {
  width: W,
  height: H,
  cells: C,
  cellSize: W/C,
};

function initialize() {
  canvasContext.imageSmoothingEnabled = false;
  const game = new Game(FRAME, canvasContext, scoreCounter);
  replayBtn.addEventListener("click", () => game.reset(scoreCounter), false);
  game.loop();
}

initialize();
