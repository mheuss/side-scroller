import { Sprite } from "src/models/sprite";
import { P5CanvasInstance } from "@p5-wrapper/react";
import { colors } from "src/constants";

export class Collectible extends Sprite {
  private isFound: boolean = false;

  constructor(p5: P5CanvasInstance, x: number, y: number, scale: number) {
    super(p5, x, y, scale ?? 1, { x: 0, y: 0, h: 150, w: 75 });
  }

  public checkGather(character_x: number, character_y: number) {
    if (this.collisionCheck(character_x, character_y)) {
      this.isFound = true;
    }
  }

  public draw() {
    // Don't draw if found
    if (this.isFound) {
      return;
    }

    const { coinColor, coinOutline, coinHighlight } = colors;

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
      ["arc", 75, 80, 8, 0, this.p5.PI, this.p5.OPEN], // Smile
      ["noStroke"],
      ["fill", 0, 0, 0, 25],
      ["ellipse", 75, 150, 70, 10],
    ]);
  }
}
