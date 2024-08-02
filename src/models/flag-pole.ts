import { Sprite } from "src/models/sprite";
import { P5CanvasInstance } from "@p5-wrapper/react";
import { colors } from "src/constants";

const FLAG_HEIGHT = 30;

export class FlagPole extends Sprite {
  private has_been_reached: boolean = false;
  private flag_height: number = 130;
  public constructor(
    p5: P5CanvasInstance,
    x: number,
    y: number,
    scale: number,
  ) {
    super(p5, x, y, scale);
  }
  /**
   * Have we crossed the finish?
   * @param character_x
   */
  public checkForFinish = (character_x: number) => {
    if (this.has_been_reached) {
      return;
    }

    if (character_x >= this.getX()) {
      this.has_been_reached = true;
      return true;
    }
    return false;
  };

  /**
   * Draws the paper. Going to do more with this, when I can think of exactly
   * what I should do with this.
   *
   */
  public drawPaper() {
    if (this.has_been_reached && this.flag_height > FLAG_HEIGHT) {
      this.flag_height -= 1;
    }
    return [
      ["fill", "white"],
      ["beginShape"],
      ["vertex", 42, this.flag_height],
      ["vertex", 140, this.flag_height + 50],
      ["vertex", 42, this.flag_height + 100],

      ["endShape"],
    ];
  }

  public draw() {
    const offset = 0;
    this.processArray([
      ["noStroke"],
      // Maybe a bad shadow idea. Let's see if we can live with it
      ["fill", 0, 0, 0, 38],
      ["rect", 20, 20, 18, 215],
      ["triangle", 20, 20, 29, 4, 38, 24],
      ["ellipse", 35, 230, 45, 15],

      // Regular pencil
      ["fill", "#FFFF00"],
      ["rect", 24, 24, 18, 200],
      ["fill", "#DDDD00"],
      ["rect", 29, 24, 13, 200],
      ["fill", "#BBBB00"],
      ["rect", 35, 24, 7, 200],
      ["noFill"],
      ["stroke", "#000000"],
      ["strokeWeight", 1],
      ["rect", 24, 24, 18, 200],
      ["fill", "orange"],
      ["rect", 24, 224, 18, 8],
      ["triangle", 24, 24, 33, 8, 42, 24],
      ["fill", colors.darkerGray],
      ["triangle", 31, 12, 33, 0, 35, 12],
      ...this.drawPaper(),
    ]);
  }
}
