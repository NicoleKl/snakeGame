import { helpers } from "./helpers.js";

export class Particle {
  constructor(canvasContext, pos, color, size, vel) {
    this.canvasContext = canvasContext;
    this.pos = pos;
    this.color = color;
    this.size = Math.abs(size / 2);
    this.ttl = 0;
    this.gravity = -0.2;
    this.vel = vel;
  }

  draw() {
    let { x, y } = this.pos;
    // let hsl = this.color
    //   .split("")
    //   .filter((l) => l.match(/[^hsl()$% ]/g))
    //   .join("")
    //   .split(",")
    //   .map((n) => +n);
    // let [r, g, b] = helpers.hsl2rgb(hsl[0], hsl[1] / 100, hsl[2] / 100);
    this.canvasContext.shadowColor = this.color;
    this.canvasContext.shadowBlur = 0;
    this.canvasContext.globalCompositeOperation = "lighter";
    this.canvasContext.fillStyle = this.color;
    this.canvasContext.fillRect(x, y, this.size, this.size);
    this.canvasContext.globalCompositeOperation = "source-over";
  }

  update() {
    this.draw();
    this.size -= 0.3;
    this.ttl += 1;
    this.pos.add(this.vel);
    this.vel.y -= this.gravity;
  }
}
