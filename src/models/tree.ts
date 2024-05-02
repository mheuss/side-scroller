import { Sprite } from "src/models/sprite";
import { P5CanvasInstance } from "@p5-wrapper/react";
import { colors } from "src/constants";

export class Tree extends Sprite {
  constructor(p5: P5CanvasInstance, x: number, y: number, scale: number) {
    super(p5, x, y, scale ?? 1);
  }

  public draw = () => {
    const { darkFoliage, foliageOutline, lightFoliage, lightBark, darkBark } =
      colors;

    this.processArray([
      ["fill", darkFoliage],
      ["stroke", foliageOutline],
      ["strokeWeight", 2],
      ["ellipse", 50, 70, 100, 100],
      ["ellipse", 140, 80, 100, 100],
      ["ellipse", 80, 50, 100, 100],
      ["noStroke"],
      ["fill", 0, 0, 0, 30],
      ["ellipse", 90, 200, 180, 10],
      ["noStroke"],
      ["noFill"],
      ["stroke", lightBark],
      ["strokeWeight", 15],
      ["arc", 70, 90, 50, 50, this.p5.PI / 4 + 0.57, this.p5.PI],
      ["stroke", darkBark],
      ["arc", 90, 90, 50, 50, this.p5.PI + 3.3, this.p5.PI / 4 + 0.57],
      ["noStroke"],
      ["fill", lightBark],
      ["rect", 70, 100, 10, 100],
      ["fill", darkBark],
      ["rect", 80, 100, 15, 100],
      ["stroke", foliageOutline],
      ["strokeWeight", 2],
      ["fill", lightFoliage],
      ["ellipse", 120, 45, 90, 90],
      ["ellipse", 95, 85, 60, 60],
      ["ellipse", 50, 50, 80, 80],
    ]);
  };
}
