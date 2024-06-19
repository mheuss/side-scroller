import { Sprite } from "src/models/sprite";
import { P5CanvasInstance } from "@p5-wrapper/react";
import { colors } from "src/constants";

/*
I want to be able to animate the size of the smile on my coin. So I need to set
a max and min.
 */

const SMILE_MAX = 12;
const SMILE_MIN = 2;

/**
 * This class represents a collectable coin that the player can gather.
 */
export class Collectable extends Sprite {
  private isFound: boolean = false;
  private coinColor: number[];
  private smileArc: number;
  private transformSmileIncrement: number = 0;
  public className = "Collectable";

  // Initialize the coin
  constructor(p5: P5CanvasInstance, x: number, y: number, scale: number) {
    super(p5, x, y, scale ?? 1, { x: 0, y: 0, h: 150, w: 75 });
    this.coinColor = [
      this.randomInt(210, 255),
      this.randomInt(180, 255),
      this.randomInt(0, 150),
    ];

    this.smileArc = this.randomInt(SMILE_MIN, SMILE_MAX);
  }

  /**
   * Are we within gather range?
   * @param character_x
   * @param character_y
   */
  public checkGather = (character_x: number, character_y: number) => {
    if (this.collisionCheck(character_x, character_y)) {
      this.isFound = true;
    }
    // @todo We are going to need a redux dispatch function here to update the
    // state with the number of coins collected.
  };

  /**
   * Change the smile.
   */
  public transformSmile = () => {
    // Let's do this only once every five frames
    if (this.p5.frameCount % 5 === 0) {
      // Change the smile by the amount we wanna change it
      this.smileArc += this.transformSmileIncrement;
      // If we get outta bounds, let's kill the transformation increment.
      if (this.smileArc > SMILE_MAX || this.smileArc < SMILE_MIN) {
        this.smileArc = this.p5.constrain(this.smileArc, SMILE_MIN, SMILE_MAX);
        this.transformSmileIncrement = 0;
      }
    }
  };

  /**
   * Draw the coin
   */
  public draw() {
    // Don't draw if found
    if (this.isFound) {
      return;
    }

    // If we are changing the smile, do that
    if (this.transformSmileIncrement !== 0) {
      this.transformSmile();
    }

    // Every 60 frames, let's possible change the smile
    if (this.p5.frameCount % 60 === 0) {
      if (this.randomInt(0, 10) > 7) {
        this.smileArc === SMILE_MAX
          ? (this.transformSmileIncrement = -1)
          : (this.transformSmileIncrement = 1);
      }
    }

    const { coinOutline, coinHighlight } = colors;
    const { coinColor, smileArc } = this;

    // Send to the base sprite class to do the actual drawing.
    this.processArray([
      ["stroke", coinOutline],
      ["fill", coinHighlight],
      ["strokeWeight", 2],
      ["ellipse", 75, 75, 75, 75],
      ["noStroke"],
      ["fill", coinColor],
      ["ellipse", 75, 75, 67, 67],
      ["stroke", coinOutline],
      ["strokeWeight", 2],
      ["fill", coinHighlight],
      ["ellipse", 75, 75, 45, 45],
      ["noStroke"],
      ["fill", coinColor],
      ["ellipse", 75, 75, 39, 39],
      ["fill", coinOutline],
      ["ellipse", 68, 70, 7.5, 7.5], // Left eye
      ["ellipse", 82, 70, 7.5, 7.5], // Right eye
      ["fill", coinHighlight],
      ["noStroke"],
      ["ellipse", 65, 80, 6, 6], // Left dimple
      ["ellipse", 85, 80, 6, 6], // Right dimple
      ["stroke", coinOutline],
      ["fill", coinOutline],
      ["arc", 75, 80, smileArc, 0, this.p5.PI, this.p5.OPEN], // Smile
      ["noStroke"],
      ["fill", 0, 0, 0, 25],
      ["ellipse", 75, 150, 70, 10],
    ]);
  }
}
