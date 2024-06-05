import { Sprite } from "src/models/sprite";
import { P5CanvasInstance } from "@p5-wrapper/react";
import { colors } from "src/constants";
import { randomInt } from "src/utilities";

/**
 * This class represents a mountain range - 1 to 3 mountains.
 */
export class Mountain extends Sprite {
  private drawArray: any[][];
  constructor(p5: P5CanvasInstance, x: number, y: number, scale: number) {
    super(p5, x, y, scale ?? 1);

    // Define a random gray, within a given range.
    let stoneColor = randomInt(100, 200);

    /*
    In our constructor, we are going to randomly define the mountains that
    this single instance of mountain has. They will be drawn later, but
    I want to get the basics in place now.

     */
    const mntn1 = [
      // 1st Mnt
      ["fill", stoneColor, stoneColor, stoneColor],
      ["noStroke"],
      ["triangle", 28.57, 50, 56.67, 0, 86.67, 50],

      ["fill", 255, 255, 255],
      ["triangle", 46, 18, 56.67, 0, 68, 18],

      ["arc", 48.5, 18, 5, 0, this.p5.PI],
      ["arc", 53, 18, 5, 0, this.p5.PI],
      ["arc", 57, 18, 5, 0, this.p5.PI],
      ["arc", 61, 18, 5, 0, this.p5.PI],
      ["arc", 65.2, 18, 5, 0, this.p5.PI],
    ];

    // Do it again
    stoneColor = randomInt(100, 200);

    const mntn2 = [
      // Second mnt
      ["fill", stoneColor, stoneColor, stoneColor],
      ["triangle", 0, 50, 34.29, 12, 82.86, 50],

      ["fill", 255, 255, 255],
      ["triangle", 28.5, 18, 34.29, 12, 42, 18],
      ["arc", 31, 18, 5, 0, this.p5.PI],
      ["arc", 35.5, 18, 5, 0, this.p5.PI],
      ["arc", 39.5, 18, 5, 0, this.p5.PI],
    ];

    // And again
    stoneColor = randomInt(100, 200);

    const mtn3 = [
      // 3rd mountain
      ["fill", stoneColor, stoneColor, stoneColor],
      ["triangle", 53.3, 50, 76.67, 11, 100, 50],

      ["fill", 255, 255, 255],
      ["noStroke"],
      ["triangle", 72.5, 18, 76.67, 11, 81, 18],

      ["arc", 75, 18, 5, 0, this.p5.PI],
      ["arc", 78.5, 18, 5, 0, this.p5.PI],
    ];

    // I wanna remove the stroke
    this.drawArray = [["noStroke"]];

    // 30% chance of first mountain
    if (randomInt(1, 10) > 7) {
      // Use the spread operator to add the draw commands to the array
      this.drawArray = [...this.drawArray, ...mntn1];
    }
    // 40% chance of second mountain
    if (randomInt(1, 10) > 6) {
      // Use the spread operator to add the draw commands to the array
      this.drawArray = [...this.drawArray, ...mntn2];
    }
    // 40% chance of third mountain
    if (randomInt(1, 10) > 6) {
      // Use the spread operator to add the draw commands to the array
      this.drawArray = [...this.drawArray, ...mtn3];
    }
    // If no mountains added, add them all
    if (this.drawArray.length === 1) {
      // Add everything. Just throw it all at it.
      this.drawArray = [...this.drawArray, ...mntn1, ...mntn2, ...mtn3];
    }
  }

  /**
   * Do the drawing
   */
  public draw() {
    this.processArray(this.drawArray);
  }
}
