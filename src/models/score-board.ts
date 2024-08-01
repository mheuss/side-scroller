import { Sprite } from "src/models/sprite";
import { GameStats } from "src/game-stats";
import { P5CanvasInstance } from "@p5-wrapper/react";
import { colors } from "src/constants";

export class ScoreBoard extends Sprite {
  private gameStatReference: null | GameStats = null;

  public constructor(p5: P5CanvasInstance, gameStats: GameStats) {
    super(p5, 0, 0, 1);
    this.gameStatReference = gameStats;
  }

  public draw() {
    this.processArray([
      ["textSize", 24],
      ["stroke", "black"],
      ["strokeWeight", 2],
      ["fill", colors.stoneGray],
      [
        "text",
        `Score: ${this.gameStatReference?.getScore()}  Lives: ${this.gameStatReference?.getLives()}`,
        10,
        30,
      ],
    ]);
  }
}
