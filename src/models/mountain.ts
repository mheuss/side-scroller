import { Sprite } from "src/models/sprite";
import { P5CanvasInstance } from "@p5-wrapper/react";
import { colors } from "src/constants";

export class Mountain extends Sprite {
  constructor(p5: P5CanvasInstance, x: number, y: number, scale: number) {
    super(p5, x, y, scale ?? 1);
  }

  public draw() {
    this.processArray([
      ["fill", ...colors.midGray],
      ["noStroke"],
      ["triangle", 28.57, 50, 56.67, 0, 86.67, 50],

      ["fill", ...colors.stoneGray],
      ["triangle", 0, 50, 34.29, 12, 82.86, 50],

      ["fill", ...colors.darkerGray],
      ["triangle", 53.3, 50, 76.67, 11, 100, 50],

      ["fill", 255, 255, 255],
      ["noStroke"],
      ["triangle", 46, 18, 56.67, 0, 68, 18],
      ["triangle", 28.5, 18, 34.29, 12, 42, 18],
      ["triangle", 72.5, 18, 76.67, 11, 81, 18],

      ["arc", 31, 18, 5, 0, this.p5.PI],
      ["arc", 35.5, 18, 5, 0, this.p5.PI],
      ["arc", 39.5, 18, 5, 0, this.p5.PI],

      ["arc", 48.5, 18, 5, 0, this.p5.PI],
      ["arc", 53, 18, 5, 0, this.p5.PI],
      ["arc", 57, 18, 5, 0, this.p5.PI],
      ["arc", 61, 18, 5, 0, this.p5.PI],
      ["arc", 65.2, 18, 5, 0, this.p5.PI],

      ["arc", 75, 18, 5, 0, this.p5.PI],
      ["arc", 78.5, 18, 5, 0, this.p5.PI],
    ]);
  }
}
