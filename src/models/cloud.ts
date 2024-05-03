import { P5CanvasInstance } from "@p5-wrapper/react";
import { Sprite } from "src/models/sprite";
import { colors } from "src/constants";

export class Cloud extends Sprite {
  constructor(p5: P5CanvasInstance, x: number, y: number, scale: number) {
    super(p5, x, y, scale ?? 1);
  }

  drift = () => {
    this.move(-0.4, 0);
    const x = this.getX();
    const y = this.getY();

    if (x < -200 - this.scale * 100) {
      this.setPosition(this.scale * 100 + 1024, y);
    }
  };

  /**
   * Draws the cloud
   */
  draw = () => {
    this.processArray([
      ["stroke", ...colors.cloudBorder],
      ["strokeWeight", 3],
      ["fill", 255],
      ["ellipse", 30, 70, 60, 60],
      ["ellipse", 130, 70, 60, 60],
      ["ellipse", 37, 40, 50, 50],
      ["ellipse", 95, 40, 75, 75],
      ["noStroke"],
      ["rect", 23, 43, 100, 55],
      ["rect", 29, 42, 106, 55],
      ["rect", 14, 42, 50, 25],
      ["rect", 24, 32, 50, 25],
      ["rect", 12, 48, 10, 10],
      ["stroke", ...colors.cloudBorder],
      ["strokeWeight", 3],
      ["line", 30, 100, 130, 100],
      ["stroke", ...colors.cloudBorder],
      ["strokeWeight", 2],
      ["fill", ...colors.cloudBorder],
      ["ellipse", 60, 50, 10, 10],
      ["ellipse", 100, 50, 10, 10],
      ["fill", ...colors.cloudBlush],
      ["ellipse", 50, 70, 12, 12],
      ["ellipse", 110, 70, 12, 12],
      ["stroke", ...colors.cloudBorder],
      ["noFill"],
      ["arc", 80, 55, 20, 0, this.p5.PI],
    ]);
  };
}
