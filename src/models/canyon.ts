import { Sprite } from "src/models/sprite";
import { P5CanvasInstance } from "@p5-wrapper/react";
import { colors } from "src/constants";

export class Canyon extends Sprite {
  private width; // Width or spread of the chasm
  constructor(
    p5: P5CanvasInstance,
    x: number,
    y: number,
    scale: number,
    width: number = 0,
  ) {
    super(p5, x, y, scale ?? 1);
    this.width = width;
  }

  public draw() {
    const { blueSky, grassGreen, darkerGray, midGray, stoneGray } = colors;
    const { width } = this;

    this.processArray([
      // First Spread
      ["stroke", blueSky],
      ["strokeWeight", 1],
      ["noFill"],
      ["line", 0, 0, 158 + width, 0], //draw a horizon line
      ["noStroke"],
      ["fill", blueSky],
      ["rect", 2, 0, 158 + width, 200],
      ["fill", darkerGray],
      ["noStroke"],
      ["beginShape"],
      ["vertex", 2, 0],
      ["vertex", 70, 20],
      ["vertex", 50, 150],
      ["vertex", 2, 150],
      ["endShape", this.p5.CLOSE],
      ["fill", midGray],
      ["beginShape"],
      ["vertex", 50, 80],
      ["vertex", 90, 80],
      ["vertex", 50, 210],
      ["endShape", this.p5.CLOSE],
      ["strokeWeight", 1],
      ["fill", grassGreen],
      ["beginShape"],
      ["vertex", 10, 0],
      ["vertex", 15, 0],
      ["vertex", 20, 0],
      ["curveVertex", 40, 5],
      ["curveVertex", 70, 20],
      ["curveVertex", 30, 45],
      ["curveVertex", 90, 75],
      ["curveVertex", 70, 95],
      ["curveVertex", 30, 110],
      ["vertex", 90, 130],
      ["vertex", 15, 200],
      ["endShape", this.p5.CLOSE],
      ["rect", 0, 0, 11, 200],
      ["rect", 158 + width, 0, 5, 200],
      // Second Half
      ["fill", stoneGray],
      [
        "quad",
        100 + width,
        10,
        150 + width,
        100,
        150 + width,
        140,
        150 + width,
        10,
      ],
      ["fill", midGray],
      [
        "quad",
        100 + width,
        100,
        150 + width,
        150,
        150 + width,
        170,
        150 + width,
        100,
      ],
      ["fill", grassGreen],
      ["beginShape"],
      ["vertex", 160 + width, 0],
      ["curveVertex", 130 + width, 0],
      ["curveVertex", 100 + width, 10],
      ["curveVertex", 130 + width, 35],
      ["curveVertex", 100 + width, 10],
      ["curveVertex", 130 + width, 35],
      ["curveVertex", 140 + width, 80],
      ["curveVertex", 100 + width, 100],
      ["vertex", 145 + width, 120],
      ["vertex", 160 + width, 200],
      ["endShape", this.p5.CLOSE],
      ["noStroke"],
      ["stroke", 0],
      ["strokeWeight", 1],
      ["line", 0, 0, 10, 0],
    ]);
  }
}
