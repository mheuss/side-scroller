import { Sprite } from "src/models/sprite";
import { P5CanvasInstance } from "@p5-wrapper/react";
import { colors } from "src/constants";
import { randomInt } from "src/utilities";

export class Collectable extends Sprite {
  private isFound: boolean = false;
  private coinColor: number[];
  private smileArc: number;
  private transforming: number = 0;

  constructor(p5: P5CanvasInstance, x: number, y: number, scale: number) {
    super(p5, x, y, scale ?? 1, { x: 0, y: 0, h: 150, w: 75 });
    this.coinColor = [
      randomInt(210, 255),
      randomInt(180, 255),
      randomInt(0, 150),
    ];

    this.smileArc = randomInt(2, 12);
  }

  public checkGather = (character_x: number, character_y: number) => {
    if (this.collisionCheck(character_x, character_y)) {
      this.isFound = true;
    }
  };

  public transformSmile = () => {
    if (this.p5.frameCount % 5 === 0) {
      this.smileArc += this.transforming;
      if (this.smileArc > 12 || this.smileArc < 2) {
        this.smileArc = this.p5.constrain(this.smileArc, 2, 12);
        this.transforming = 0;
      }
    }
  };

  public draw() {
    // Don't draw if found
    if (this.isFound) {
      return;
    }

    if (this.transforming !== 0) {
      this.transformSmile();
    }

    if (this.p5.frameCount % 60 === 0) {
      if (randomInt(0, 10) > 7) {
        this.smileArc === 12
          ? (this.transforming = -1)
          : (this.transforming = 1);
      }
    }

    const { coinOutline, coinHighlight } = colors;
    const { coinColor, smileArc } = this;

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
