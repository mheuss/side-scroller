import { Sprite } from "src/models/sprite";
import { P5CanvasInstance } from "@p5-wrapper/react";
import { colors } from "src/constants";
import { randomInt } from "src/utilities";

export interface IRandomizedElements {
  x: number;
  y: number;
  width: number;
}

interface ITreeRandomizedElements {
  backgroundCanopy: IRandomizedElements[];
  foregroundCanopy: IRandomizedElements[];
}

export class Tree extends Sprite {
  private randomizedElements: ITreeRandomizedElements = {
    backgroundCanopy: [],
    foregroundCanopy: [],
  };

  constructor(p5: P5CanvasInstance, x: number, y: number, scale: number) {
    super(p5, x, y, scale ?? 1, { x: 70, y: 100, h: 100, w: 25 });

    // Randomize the tree's elements
    this.randomizedElements = {
      backgroundCanopy: [
        {
          x: 50 + (randomInt(0, 40) - 20),
          y: 70 + (randomInt(0, 20) - 10),
          width: 100 + (randomInt(0, 40) - 20),
        },
        {
          x: 140 + (randomInt(0, 40) - 20),
          y: 80 + (randomInt(0, 20) - 10),
          width: 100 + (randomInt(0, 40) - 20),
        },
        {
          x: 80 + (randomInt(0, 40) - 20),
          y: 50 + (randomInt(0, 20) - 10),
          width: 100 + (randomInt(0, 40) - 20),
        },
      ],
      foregroundCanopy: [
        {
          x: 120 + (randomInt(0, 40) - 20),
          y: 45 + (randomInt(0, 20) - 10),
          width: 90 + (randomInt(0, 30) - 15),
        },
        {
          x: 95 + (randomInt(0, 40) - 20),
          y: 85 + (randomInt(0, 20) - 10),
          width: 90 + (randomInt(0, 30) - 15),
        },
        {
          x: 50 + (randomInt(0, 40) - 20),
          y: 50 + (randomInt(0, 20) - 10),
          width: 90 + (randomInt(0, 30) - 15),
        },
      ],
    };
  }

  public draw = () => {
    const { darkFoliage, foliageOutline, lightFoliage, lightBark, darkBark } =
      colors;

    const { backgroundCanopy, foregroundCanopy } = this.randomizedElements;

    this.processArray([
      ["fill", darkFoliage],
      ["stroke", foliageOutline],
      ["strokeWeight", 2],
      [
        "ellipse",
        backgroundCanopy[0].x,
        backgroundCanopy[0].y,
        backgroundCanopy[0].width,
        backgroundCanopy[0].width,
      ],
      [
        "ellipse",
        backgroundCanopy[1].x,
        backgroundCanopy[1].y,
        backgroundCanopy[1].width,
        backgroundCanopy[1].width,
      ],
      [
        "ellipse",
        backgroundCanopy[2].x,
        backgroundCanopy[2].y,
        backgroundCanopy[2].width,
        backgroundCanopy[2].width,
      ],

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
      [
        "ellipse",
        foregroundCanopy[0].x,
        foregroundCanopy[0].y,
        foregroundCanopy[0].width,
        foregroundCanopy[0].width,
      ],
      [
        "ellipse",
        foregroundCanopy[1].x,
        foregroundCanopy[1].y,
        foregroundCanopy[1].width,
        foregroundCanopy[1].width,
      ],
      [
        "ellipse",
        foregroundCanopy[2].x,
        foregroundCanopy[2].y,
        foregroundCanopy[2].width,
        foregroundCanopy[2].width,
      ],
    ]);
  };
}
