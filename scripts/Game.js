import { Snake } from "./Snake.js";
import { Food } from "./Food.js";
import { Particle } from "./Particle.js";
import { KEY } from "./KEY.js";
import { helpers } from "./helpers.js";


export class Game {
  constructor(
    frameParams,
    canvasContext,
    scoreCounter
  ) {
    this.frameParams = frameParams;
    this.frameWidth = frameParams.width;
    this.frameHeight = frameParams.height;
    this.frameCells = frameParams.cells;
    this.cellSize = frameParams.cellSize;
    this.score = 0;
    this.maxScore = window.localStorage.getItem("maxScore") || undefined;
    this.canvasContext = canvasContext;
    this.scoreCounter = scoreCounter;
    this.isGameOver = false;
    this.snake = new Snake(canvasContext, frameParams);
    this.food = new Food(canvasContext, frameParams);
    this.particles = [];
    this.requestID = 0;
    this.splashingParticleCount = 20
  }

  clear() {
    this.canvasContext.clearRect(0, 0, this.frameWidth, this.frameHeight);
  }
  
  loop() {
    KEY.listen();
    this.clear();
    if (!this.isGameOver) {
        this.requestID = setTimeout(this.loop.bind(this), 1100 / 60);
        helpers.drawGrid(
            this.canvasContext,
            this.frameWidth,
            this.frameHeight,
            this.frameCells
        );
        if(!this.snake.delay) {
          if (helpers.isCollision(this.snake.pos, this.food.pos)) {
            this.incrementScore();
            this.particleSplash();
            this.food.spawn(this.snake.history);
            this.snake.total++;
          }
          if(this.snake.total > 3 && this.snake.selfCollision()) {
            this.clear();
            this.gameOver();
            this.isGameOver = true;
          }
        }
        this.snake.update(this.canvasContext, this.food);
        this.food.draw(this.canvasContext);
        for (let p of this.particles) {
            p.update(this.canvasContext);
        }
        helpers.garbageCollector(this.particles);
    } else {
      this.clear();
      this.gameOver();
    }
  }

  particleSplash() {
    for (let i = 0; i < this.splashingParticleCount; i++) {
      let vel = new helpers.Vec(Math.random() * 6 - 3, Math.random() * 6 - 3);
      let position = new helpers.Vec(this.food.pos.x, this.food.pos.y);
      this.particles.push(
        new Particle(
          this.canvasContext,
          position,
          this.food.color,
          this.food.size,
          vel
        )
      );
    }
  }

  gameOver() {
    this.maxScore ? null : (this.maxScore = this.score);
    this.score > this.maxScore ? (this.maxScore = this.score) : null;
    window.localStorage.setItem("maxScore", this.maxScore);
    this.canvasContext.fillStyle = "#FFB07F";
    this.canvasContext.textAlign = "center";
    this.canvasContext.font = "bold 30px Poppins, sans-serif";
    this.canvasContext.fillText("GAME OVER", this.frameWidth / 2, this.frameHeight / 2);
    this.canvasContext.font = "15px Poppins, sans-serif";
    this.canvasContext.fillText(
      `SCORE   ${this.score}`,
      this.frameWidth / 2,
      this.frameHeight / 2 + 60
    );
    this.canvasContext.fillText(
      `MAXSCORE   ${this.maxScore}`,
      this.frameWidth / 2,
      this.frameHeight / 2 + 80
    );
  }

  reset() {
    this.scoreCounter.innerText = "00";
    this.score = "00";
    this.snake = new Snake(this.canvasContext, this.frameParams);
    this.food.spawn(this.snake.history);
    KEY.resetState();
    this.isGameOver = false;
    clearTimeout(this.requestID);
    this.loop();
  }

  incrementScore() {
    this.score++;
    this.scoreCounter.innerText = this.score.toString().padStart(2, "0");
  }
}
