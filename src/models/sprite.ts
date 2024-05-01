import { P5CanvasInstance } from "@p5-wrapper/react";

export class Sprite {
  x: number;
  y: number;
  p5: P5CanvasInstance;
  scale: number;

  constructor(p5: P5CanvasInstance, x: number, y: number, scale: number = 1) {
    this.x = x;
    this.y = y;
    this.p5 = p5;
    this.scale = scale;
    console.log(this);
  }

  /**
   * Stubbed in - later I expect to use this to animate motion in the sprite
   * @param x X coord
   * @param y Y coord
   */
  protected move = (x: number, y: number) => {
    console.log("Moving to");
    this.x = x + this.x;
    this.y = y + this.y;
  };

  /**
   * Stubbed in - I expect I'll be using this later to set the position
   * @param x X coord
   * @param y Y coord
   */
  protected setPosition = (x: number, y: number) => {
    this.x = x;
    this.y = y;
  };

  protected processArray = (graphicData: any[][], debug: boolean = false) => {
    graphicData.forEach((shape: any[]) => {
      // This should be done more elegantly, but we gotta start somewhere

      if (debug) console.log("processing ", shape);

      const { x, y, scale } = this;
      const [command, ...args] = shape;
      switch (command) {
        case "arc": {
          const [x1, y1, d, start, stop] = args;
          this.p5.arc(
            x + scale * x1,
            y + scale * y1,
            scale * d,
            scale * d,
            start,
            stop,
          );
          break;
        }
        case "circle": {
          const [x1, y1, d] = args;
          this.p5.circle(x + scale * x1, y + scale * y1, scale * d);
          break;
        }
        case "line": {
          const [x1, y1, x2, y2] = args;

          this.p5.line(
            x + scale * x1,
            y + scale * y1,
            x + scale * x2,
            y + scale * y2,
          );
          break;
        }
        case "rect": {
          const [x1, y1, w, h] = args;
          this.p5.rect(x + scale * x1, y + scale * y1, scale * w, scale * h);
          break;
        }
        case "ellipse": {
          const [x1, y1, w, h] = args;
          this.p5.ellipse(x + scale * x1, y + scale * y1, scale * w, scale * h);
          break;
        }
        case "point": {
          const [x1, y1] = args;
          this.p5.point(x + scale * x1, y + scale * y1);
          break;
        }
        case "beginShape":
          this.p5.beginShape();
          break;
        case "endShape":
          this.p5.endShape(...args);
          break;
        case "vertex": {
          const [x1, y1] = args;
          this.p5.vertex(x + scale * x1, y + scale * y1);
          break;
        }
        case "fill":
          this.p5.fill(...args);
          break;
        case "stroke":
          this.p5.stroke(...args);
          break;
        case "strokeWeight":
          this.p5.strokeWeight(...args);
          break;
        case "noFill":
          this.p5.noFill(0);
          break;
        case "noStroke":
          this.p5.noStroke();
          break;
        case "triangle": {
          const [x1, y1, x2, y2, x3, y3] = args;
          this.p5.triangle(
            x + scale * x1,
            y + scale * y1,
            x + scale * x2,
            y + scale * y2,
            x + scale * x3,
            y + scale * y3,
          );
          break;
        }
      }
    });
  };

  /**
   * Stubbed in draw command
   */
  draw() {
    const { fill, stroke, strokeWeight, text } = this.p5;

    // Generic Drawing
    fill(255);
    stroke(0);
    strokeWeight(1);
    text("Draw not implemented!", 10, 10);
  }
}
