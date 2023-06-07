import { helpers } from "./helpers.js"; 
import { KEY } from "./KEY.js";

export class Snake {
  constructor(canvasContext, frameParams) {
    this.pos = new helpers.Vec(frameParams.width / 2, frameParams.height / 2);
    this.dir = new helpers.Vec(0, 0);
    this.delay = 5;
    this.canvasContext = canvasContext;
    this.frameWidth = frameParams.width;
    this.frameHeight = frameParams.height;
    this.size = frameParams.width / frameParams.cells;
    this.color = "#9fa2a5";
    this.history = [];
    this.total = 1;
  }

  draw() {
    let { x, y } = this.pos;
    this.canvasContext.fillStyle = this.color;
    this.canvasContext.shadowBlur = 20;
    this.canvasContext.shadowColor = "rgba(255,255,255, .3)";
    this.canvasContext.fillRect(x, y, this.size, this.size);
    this.canvasContext.shadowBlur = 0;
    if (this.total >= 2) {
      for (let i = 0; i < this.history.length - 1; i++) {
        let { x, y } = this.history[i];
        this.canvasContext.lineWidth = 1;
        this.canvasContext.fillStyle = "rgba(225,225,225,1)";
        this.canvasContext.fillRect(x, y, this.size, this.size);
      }
    }
  }

  walls() {
    let { x, y } = this.pos;
    if (x + this.size > this.frameWidth) {
      this.pos.x = 0;
    }
    if (y + this.size > this.frameWidth) {
      this.pos.y = 0;
    }
    if (y < 0) {
      this.pos.y = this.frameHeight - this.size;
    }
    if (x < 0) {
      this.pos.x = this.frameWidth - this.size;
    }
  }

  controlls() {
    let dir = this.size;
    if (KEY.ArrowUp) {
      this.dir = new helpers.Vec(0, -dir);
    }
    if (KEY.ArrowDown) {
      this.dir = new helpers.Vec(0, dir);
    }
    if (KEY.ArrowLeft) {
      this.dir = new helpers.Vec(-dir, 0);
    }
    if (KEY.ArrowRight) {
      this.dir = new helpers.Vec(dir, 0);
    }
  }
  
  selfCollision() {
    for (let i = 0; i < this.history.length; i++) {
      let p = this.history[i];
      if (helpers.isCollision(this.pos, p)) {
        return true;
      }
    }
  }

  update() {
    this.walls();
    this.draw();
    this.controlls();
    if (!this.delay--) {
      this.history[this.total - 1] = new helpers.Vec(this.pos.x, this.pos.y);
      for (let i = 0; i < this.total - 1; i++) {
        this.history[i] = this.history[i + 1];
      }
      this.pos.add(this.dir);
      this.delay = 5;
    }
  }
}
