import { Sprite } from "src/models/sprite";
import { GameStats } from "src/game-stats";
import { P5CanvasInstance } from "@p5-wrapper/react";
import { colors } from "src/constants";

export class ScoreBoard extends Sprite {
  public constructor(p5: P5CanvasInstance) {
    super(p5, 0, 0, 1);
  }

  public draw() {
    this.processArray([
      ["textSize", 24],
      ["stroke", "black"],
      ["strokeWeight", 2],
      ["fill", colors.stoneGray],
      [
        "text",
        `Score: ${GameStats.getScore()}  Lives: ${GameStats.getLives()}`,
        10,
        30,
      ],
    ]);
  }
}
