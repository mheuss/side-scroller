import { P5CanvasInstance } from "@p5-wrapper/react";

export interface IBounds {
  x: number;
  y: number;
  w: number;
  h: number;
}

export class Sprite {
  private x: number;
  private y: number;
  protected p5: P5CanvasInstance;
  protected scale: number;
  private bounds: IBounds | null;

  /**
   * Constructor for the Sprite class
   * @param p5 A reference to the p5 base class
   * @param x The x coordinate of the sprite
   * @param y The y coordinate of the sprite
   * @param scale The scale of the sprite
   * @param bounds The bounds of the sprite. This is used for collision detection
   */
  constructor(
    p5: P5CanvasInstance,
    x: number,
    y: number,
    scale: number,
    bounds: IBounds | null = null,
  ) {
    this.x = x;
    this.y = y;
    this.p5 = p5;
    this.scale = scale;
    this.bounds = bounds;
  }

  /**
   * Getters
   */
  public getX = () => this.x;
  public getBottomY = () => {
    // No bounding box. Just return the y
    if (!this.bounds) {
      return this.y;
    }

    // Do we have an offset for x or y?
    const scaledHeight =
      this.bounds.h * this.scale + this.bounds.y * this.scale;
    return this.y + scaledHeight;
  };

  /**
   * Getters
   */
  public getY = () => this.y;

  /**
   * Moves the sprint in the x and y direction
   * @param x X coord
   * @param y Y coord
   */
  protected move = (x: number, y: number) => {
    this.x = x + this.x;
    this.y = y + this.y;
  };

  /**
   * Sets the position absolutely on the board
   *
   * @param x X coord
   * @param y Y coord
   */
  public setPosition = (x: number, y: number) => {
    this.x = x;
    this.y = y;
  };

  /**
   * When given an array of p5 commands, we will process them in order, applying
   * scale and offsets as needed.
   *
   * @param graphicData Array of p5 commands
   */
  protected processArray = (graphicData: any[][]) => {
    // For now, let's do a forEach loop to process the array
    graphicData.forEach((shape: any[]) => {
      // This can be done better. But for now, let's just get it working
      const { x, y, scale } = this;
      const [command, ...args] = shape;

      // Switch on the command, find the transformation, and apply it
      switch (command) {
        // Sanity
        default: {
          alert(
            "Hey Mike! You forgot to implement " +
              command +
              " in the Sprite class!",
          );
        }

        // Arc
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

        // Begin Shape
        case "beginShape":
          this.p5.beginShape();
          break;

        // Background
        case "background": {
          const [r, g, b] = args;
          this.p5.background(r, g, b);
          break;
        }

        // Circle
        case "circle": {
          const [x1, y1, d] = args;
          this.p5.circle(x + scale * x1, y + scale * y1, scale * d);
          break;
        }

        // CurveVertex
        case "curveVertex": {
          const [x1, y1] = args;
          this.p5.curveVertex(x + scale * x1, y + scale * y1);
          break;
        }

        // Ellipse
        case "ellipse": {
          const [x1, y1, w, h] = args;
          this.p5.ellipse(x + scale * x1, y + scale * y1, scale * w, scale * h);
          break;
        }

        // End Shape
        case "endShape":
          this.p5.endShape(...args);
          break;

        // Fill
        case "fill":
          this.p5.fill(...args);
          break;

        // Line
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

        // No Fill
        case "noFill":
          this.p5.noFill(0);
          break;

        // No Stroke
        case "noStroke":
          this.p5.noStroke();
          break;

        // Point
        case "point": {
          const [x1, y1] = args;
          this.p5.point(x + scale * x1, y + scale * y1);
          break;
        }

        // Quad
        case "quad": {
          const [x1, y1, x2, y2, x3, y3, x4, y4] = args;
          this.p5.quad(
            x + scale * x1,
            y + scale * y1,
            x + scale * x2,
            y + scale * y2,
            x + scale * x3,
            y + scale * y3,
            x + scale * x4,
            y + scale * y4,
          );
          break;
        }

        // Rect
        case "rect": {
          const [x1, y1, w, h] = args;
          this.p5.rect(x + scale * x1, y + scale * y1, scale * w, scale * h);
          break;
        }

        // Stroke
        case "stroke":
          this.p5.stroke(...args);
          break;

        // Stroke Weight
        case "strokeWeight":
          this.p5.strokeWeight(...args);
          break;

        //  Triangle
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

        // Vertex
        case "vertex": {
          const [x1, y1] = args;
          this.p5.vertex(x + scale * x1, y + scale * y1);
          break;
        }
      }
    });
  };

  /**
   * Stubbed in draw command. This method is here because I want to catch any
   * classes that don't implement their own draw method.
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
