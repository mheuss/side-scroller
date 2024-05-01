import { P5CanvasInstance } from "@p5-wrapper/react";
import { Sprite } from "src/models/sprite";

export enum Orientation {
  LEFT = 0,
  RIGHT = 1,
  UP = 2,
  DOWN = 3,
}

export class PieceOfPaper extends Sprite {
  private currentOrientation: Orientation = Orientation.DOWN;

  constructor(p5: P5CanvasInstance, x: number, y: number, scale: number) {
    super(p5, x, y, scale ?? 1);
    this.currentOrientation = Orientation.DOWN;
  }

  public setOrientation(orientation: Orientation) {
    this.currentOrientation = orientation;
  }

  private jaggyShape = (offset: number = 0) => {
    return [
      ["beginShape"],
      ["vertex", offset, offset],
      ["vertex", 100 + offset, offset],
      ["vertex", 100 + offset, 200 + offset],

      ["vertex", 83 + offset, 180 + offset],
      ["vertex", 73 + offset, 190 + offset],
      ["vertex", 66 + offset, 172 + offset],
      ["vertex", 63 + offset, 190 + offset],
      ["vertex", 58 + offset, 199 + offset],
      ["vertex", 53 + offset, 180 + offset],
      ["vertex", 39 + offset, 175 + offset],
      ["vertex", 23 + offset, 200 + offset],
      ["vertex", 18 + offset, 190 + offset],
      ["vertex", 10 + offset, 186 + offset],

      ["vertex", offset, 180 + offset],
      ["vertex", 10 + offset, 172 + offset],
      ["vertex", 20 + offset, 153 + offset],
      ["vertex", offset, 146 + offset],
      ["vertex", 20 + offset, 139 + offset],
      ["vertex", 10 + offset, 127 + offset],
      ["vertex", 20 + offset, 113 + offset],
      ["vertex", 15 + offset, 98 + offset],
      ["vertex", offset, 72 + offset],
      ["vertex", 10 + offset, 48 + offset],
      ["vertex", 5 + offset, 30 + offset],

      ["endShape", this.p5.CLOSE],
    ];
  };

  angleBetweenPoints = (x2: number, y2: number) => {
    const { x, y } = this;
    const deltaX = x2 - x;
    const deltaY = y2 - y;
    return Math.atan2(deltaY, deltaX);
  };

  private person(orientation: Orientation): any[] {
    const person: any[] = [];
    if (orientation === Orientation.UP || orientation === Orientation.DOWN) {
      person.push(
        ["noFill"],
        ["stroke", 30, 30, 30],
        ["circle", 60, 40, 40],
        ["line", 60, 60, 60, 120],
        ["line", 60, 120, 55, 145],
        ["line", 55, 145, 50, 170],
        ["line", 60, 120, 65, 145],
        ["line", 60, 120, 70, 170],
        ["line", 60, 80, 55, 100],
        ["line", 60, 80, 50, 120],
        ["line", 60, 80, 65, 100],
        ["line", 60, 80, 70, 120],
      );

      if (orientation === Orientation.DOWN) {
        person.push(
          ["fill", 0],
          ["circle", 55, 35, 2],
          ["circle", 65, 35, 2],
          ["noFill"],
          ["arc", 60, 45, 20, 0, this.p5.PI],
        );
      }

      return person;
    }

    // So, if we are here, then left and right are it

    if (orientation === Orientation.LEFT) {
      person.push(
        ["noFill"],
        ["stroke", 30, 30, 30],
        ["circle", 60, 40, 40],
        ["line", 60, 60, 60, 120],
        ["line", 60, 120, 56, 145],
        ["line", 56, 145, 56, 170],
        ["line", 60, 120, 62, 145],
        ["line", 62, 145, 64, 170],
        ["line", 60, 80, 56, 100],
        ["line", 56, 100, 36, 103],
        ["line", 60, 80, 66, 100],
        ["line", 66, 100, 64, 120],
        ["circle", 50, 35, 2],
        ["arc", 40, 45, 20, this.p5.PI + 3.3, this.p5.PI - 2.1],
      );
    } else {
      person.push(
        ["noFill"],
        ["stroke", 30, 30, 30],
        ["circle", 60, 40, 40],
        ["line", 60, 60, 60, 120],
        ["line", 60, 120, 66, 145],
        ["line", 66, 145, 66, 170],
        ["line", 60, 120, 62, 145],
        ["line", 62, 145, 58, 170],

        ["line", 60, 80, 56, 100],
        ["line", 56, 100, 58, 116],
        ["line", 60, 80, 62, 100],
        ["line", 62, 100, 64, 120],
        ["circle", 70, 35, 2],
        ["arc", 80, 45, 20, this.p5.PI - 1, this.p5.PI - 0.2],
      );
    }
    return person;
  }

  public draw() {
    const radians = this.angleBetweenPoints(this.p5.mouseX, this.p5.mouseY);
    // Let's compute the orientation
    if (radians > 0 && radians < 0.96) {
      this.setOrientation(Orientation.RIGHT);
    } else if (radians >= 0.96 && radians <= 1.76) {
      this.setOrientation(Orientation.DOWN);
    } else if (radians > 1.76 || radians < -2.23) {
      this.setOrientation(Orientation.LEFT);
    } else {
      this.setOrientation(Orientation.UP);
    }

    const [orientation] = [this.currentOrientation];

    this.processArray([
      ["fill", 0, 0, 0, 80],
      ["noStroke"],
      ...this.jaggyShape(0),
      ["fill", 255],
      ["noStroke"],
      ...this.jaggyShape(4),

      ["strokeWeight", 2],
      ["stroke", 80, 140, 250, 40],

      ["line", 30, 0, 104, 8],
      ["line", 9, 20, 104, 28],
      ["line", 9, 40, 104, 48],
      ["line", 7, 60, 104, 68],
      ["line", 5, 80, 104, 88],
      ["line", 16, 100, 104, 108],
      ["line", 16, 120, 104, 128],
      ["line", 22, 140, 104, 148],
      ["line", 18, 160, 104, 168],
      ["line", 8, 180, 104, 188],
      ...this.person(orientation),
    ]);
  }
}
