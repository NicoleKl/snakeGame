import { helpers } from "./helpers.js";
import colorScheme from "./colors.js";


export class Food {
  constructor(canvasContext, frameParams) {
    this.cells = frameParams.cells;
    this.canvasContext = canvasContext;
    this.pos = new helpers.Vec(
      ~~(Math.random() * frameParams.cells) * frameParams.cellSize,
      ~~(Math.random() * frameParams.cells) * frameParams.cellSize
    );
    this.color = colorScheme[Math.floor(Math.random() * colorScheme.length)];
    this.size = frameParams.cellSize;
  }
  
  draw() {
    console.log(this.color)
    let { x, y } = this.pos;
    this.canvasContext.shadowBlur = 15;
    this.canvasContext.shadowColor = this.color;
    this.canvasContext.fillStyle = this.color;
    this.canvasContext.fillRect(x, y, this.size, this.size);
    this.canvasContext.globalCompositeOperation = "source-over";
    this.canvasContext.shadowBlur = 0;
  }

  spawn(snakeHistory) {
    let randX = ~~(Math.random() * this.cells) * this.size;
    let randY = ~~(Math.random() * this.cells) * this.size;
    for (let path of snakeHistory) {
      if (helpers.isCollision(new helpers.Vec(randX, randY), path)) {
        return this.spawn(snakeHistory);
      }
    }
    this.color = colorScheme[Math.floor(Math.random() * colorScheme.length)];
    this.pos = new helpers.Vec(randX, randY);
  }
}
