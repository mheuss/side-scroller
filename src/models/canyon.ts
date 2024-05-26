import { Sprite } from "src/models/sprite";
import { P5CanvasInstance } from "@p5-wrapper/react";
import { colors } from "src/constants";
import { randomInt } from "src/utilities";

const MAX_WIDTH = 50;
const MIN_WIDTH = 0;

interface ICrevice {
  width: number;
  velocity: number;
  chanceForChange: number;
}

export class Canyon extends Sprite {
  private crevice: ICrevice; // Width or spread of the chasm

  constructor(
    p5: P5CanvasInstance,
    x: number,
    y: number,
    scale: number,
    crevice: number = 0,
  ) {
    super(p5, x, y, scale ?? 1);

    this.crevice = {
      width: p5.constrain(crevice, MIN_WIDTH, MAX_WIDTH),
      velocity: 0,
      chanceForChange: 0,
    };
  }

  /**
   * When set to a number be 1 and 100, reflects the chance of the crevice width
   * changing during the draw cycle.
   *
   * The speed of the change is random
   * @param chance
   */
  public setChanceForCreviceWidthChange = (chance: number) => {
    this.crevice.chanceForChange = chance;
  };

  /**
   * Private function that will determine if the crevice width should change.
   * If it decides it should, it'll randomly change the velocity of the crevice
   * If the crevice was changing, it could stop.
   */
  private shouldCreviceChange = () => {
    const { crevice } = this;

    const changePercent = randomInt(0, 100);

    if (changePercent < crevice.chanceForChange) {
      crevice.velocity = randomInt(0, 4) - 2;
    }

    if (crevice.velocity === 0) {
      return;
    }

    crevice.width += crevice.velocity;

    if (crevice.width >= MAX_WIDTH) {
      crevice.velocity = 0;
      crevice.width = MAX_WIDTH;
    } else if (crevice.width <= MIN_WIDTH) {
      crevice.velocity = 0;
      crevice.width = MIN_WIDTH;
    }
  };

  public draw() {
    const { blueSky, grassGreen, darkerGray, midGray, stoneGray } = colors;
    const { crevice } = this;

    this.shouldCreviceChange();

    this.processArray([
      // First Spread
      ["stroke", blueSky],
      ["strokeWeight", 1],
      ["noFill"],
      ["line", 0, 0, 158 + crevice.width, 0], //draw a horizon line
      ["noStroke"],
      ["fill", blueSky],
      ["rect", 2, -1, 158 + crevice.width, 200],
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
      ["rect", 158 + crevice.width, 0, 5, 200],
      // Second Half
      ["fill", stoneGray],
      [
        "quad",
        100 + crevice.width,
        10,
        150 + crevice.width,
        100,
        150 + crevice.width,
        140,
        150 + crevice.width,
        10,
      ],
      ["fill", midGray],
      [
        "quad",
        100 + crevice.width,
        100,
        150 + crevice.width,
        150,
        150 + crevice.width,
        170,
        150 + crevice.width,
        100,
      ],
      ["fill", grassGreen],
      ["beginShape"],
      ["vertex", 160 + crevice.width, 0],
      ["curveVertex", 130 + crevice.width, 0],
      ["curveVertex", 100 + crevice.width, 10],
      ["curveVertex", 130 + crevice.width, 35],
      ["curveVertex", 100 + crevice.width, 10],
      ["curveVertex", 130 + crevice.width, 35],
      ["curveVertex", 140 + crevice.width, 80],
      ["curveVertex", 100 + crevice.width, 100],
      ["vertex", 145 + crevice.width, 120],
      ["vertex", 160 + crevice.width, 200],
      ["endShape", this.p5.CLOSE],
      ["noStroke"],
      ["stroke", 0],
      ["strokeWeight", 0.5],
      ["line", 0, 0, 20, 0],
      ["line", 128 + crevice.width, 0, 200 + crevice.width, 0],
    ]);
  }
}
