import { Sprite } from "src/models/sprite";
import { P5CanvasInstance } from "@p5-wrapper/react";
import { colors } from "src/constants";

export class Canyon extends Sprite {
  constructor(p5: P5CanvasInstance, x: number, y: number, scale: number) {
    super(p5, x, y, scale ?? 1);
  }

  public draw() {
    const { blueSky, grassGreen, darkerGray, midGray, stoneGray } = colors;

    this.processArray(
      [
        ["stroke", blueSky],
        ["strokeWeight", 1],
        ["noFill"],
        ["line", 0, 0, 158, 0], //draw a horizon line
        ["noStroke"],
        ["fill", blueSky],
        ["rect", 2, 0, 158, 200],
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
        ["fill", stoneGray],
        ["quad", 100, 10, 150, 100, 150, 140, 150, 10],
        ["fill", midGray],
        ["quad", 100, 100, 150, 150, 150, 170, 150, 100],
        ["fill", grassGreen],
        ["beginShape"],
        ["vertex", 160, 0],
        ["curveVertex", 130, 0],
        ["curveVertex", 100, 10],
        ["curveVertex", 130, 35],
        ["curveVertex", 100, 10],
        ["curveVertex", 130, 35],
        ["curveVertex", 140, 80],
        ["curveVertex", 100, 100],
        ["vertex", 145, 120],
        ["vertex", 160, 200],
        ["endShape", this.p5.CLOSE],
        ["noStroke"],
        ["rect", 0, 0, 11, 200],
        ["rect", 158, 0, 5, 200],
        ["stroke", 0],
        ["strokeWeight", 1],
        ["line", 0, 0, 10, 0],
      ],
      true,
    );
  }
}
