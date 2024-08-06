import { Sprite } from "src/models/sprite";
import { GameStats } from "src/game-stats";
import { P5CanvasInstance } from "@p5-wrapper/react";
import { colors } from "src/constants";

export class LevelComplete extends Sprite {
  public constructor(p5: P5CanvasInstance) {
    super(p5, 0, 0, 1);
  }

  public draw() {
    this.processArray([
      ["stroke", "black"],
      ["strokeWeight", 2],
      ["fill", 0, 0, 0, 70],
      ["rect", 345, 240, 365, 150],
      ["textSize", 48],
      ["fill", colors.blueSky],
      ["text", "Level Complete", 360, 300],
      ["textSize", 24],
      ["text", "Press space to continue", 400, 350],
    ]);
  }
}
