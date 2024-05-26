import { P5CanvasInstance } from "@p5-wrapper/react";
import { Sprite } from "src/models/sprite";
import { colors } from "src/constants";
import { randomInt } from "src/utilities";

export enum Mood {
  Happy,
  Sad,
}

export class Cloud extends Sprite {
  private mood: Mood = Mood.Happy;
  private chanceOfStrike; // 0-1000 - when the cloud is sad, it has a chance of striking - 1000 being 100%
  private chanceCounter;

  constructor(
    p5: P5CanvasInstance,
    x: number,
    y: number,
    scale: number,
    chanceOfStrike = 0,
  ) {
    super(p5, x, y, scale ?? 1);
    this.chanceOfStrike = chanceOfStrike;
    this.chanceCounter = 0;
  }

  /**
   * Sets the cloud's mood
   * @param mood The mood to set, i.e. Happy or Sad
   * @param chanceOfStrike The chance of the cloud striking - from 0 to 1000
   */
  public setMood(mood: Mood, chanceOfStrike: number = 0) {
    this.mood = mood;
    if (mood === Mood.Sad) {
      this.chanceOfStrike = chanceOfStrike;
    }
  }

  /**
   * Sets the chance of the cloud striking
   * @param chanceOfStrike The chance of the cloud striking - from 0 to 1000
   */
  public setChanceOfStrike(chanceOfStrike: number) {
    this.chanceOfStrike = chanceOfStrike;
  }

  /**
   * Drifts the cloud across the screen
   */
  private drift = () => {
    this.move(-0.4, 0);
    const x = this.getX();
    const y = this.getY();

    if (x < -200 - this.scale * 100) {
      this.setPosition(this.scale * 100 + 1024, y);
    }
  };

  private drawHappy = () => {
    this.processArray([
      ["stroke", ...colors.cloudBorder],
      ["strokeWeight", 3],
      ["fill", 255],
      ["ellipse", 30, 70, 60, 60],
      ["ellipse", 130, 70, 60, 60],
      ["ellipse", 37, 40, 50, 50],
      ["ellipse", 95, 40, 75, 75],
      ["noStroke"],
      ["rect", 23, 43, 100, 55],
      ["rect", 29, 42, 106, 55],
      ["rect", 14, 42, 50, 25],
      ["rect", 24, 32, 50, 25],
      ["rect", 12, 48, 10, 10],
      ["stroke", ...colors.cloudBorder],
      ["strokeWeight", 3],
      ["line", 30, 100, 130, 100],
      ["stroke", ...colors.cloudBorder],
      ["strokeWeight", 2],
      ["fill", ...colors.cloudBorder],
      ["ellipse", 60, 50, 10, 10],
      ["ellipse", 100, 50, 10, 10],
      ["fill", ...colors.cloudBlush],
      ["ellipse", 50, 70, 12, 12],
      ["ellipse", 110, 70, 12, 12],
      ["stroke", ...colors.cloudBorder],
      ["noFill"],
      ["arc", 80, 55, 20, 0, this.p5.PI],
    ]);
  };

  private drawSad = () => {
    const { chanceOfStrike } = this;
    let cloudFill = 180;
    if (chanceOfStrike) {
      if (this.chanceCounter === 0) {
        const strike = randomInt(0, 1000);
        if (strike < chanceOfStrike) {
          this.chanceCounter = 1;
        }
      } else {
        this.chanceCounter++;
        cloudFill = 180 - this.chanceCounter / 3;
        if (this.chanceCounter > 120) {
          this.chanceCounter = 0;
        }
      }
    }

    this.processArray([
      ["stroke", ...colors.cloudBorder],
      ["strokeWeight", 3],
      ["fill", cloudFill],
      ["ellipse", 30, 70, 60, 60],
      ["ellipse", 130, 70, 60, 60],
      ["ellipse", 37, 40, 50, 50],
      ["ellipse", 95, 40, 75, 75],
      ["noStroke"],
      ["rect", 23, 43, 100, 55],
      ["rect", 29, 42, 106, 55],
      ["rect", 14, 42, 50, 25],
      ["rect", 24, 32, 50, 25],
      ["rect", 12, 48, 10, 10],
      ["stroke", ...colors.cloudBorder],
      ["strokeWeight", 3],
      ["line", 30, 100, 130, 100],
      ["stroke", ...colors.cloudBorder],
      ["strokeWeight", 2],
      ["fill", ...colors.cloudBorder],
      ["ellipse", 60, 50, 10, 10],
      ["ellipse", 100, 50, 10, 10],
      ["stroke", ...colors.cloudBorder],
      ["noFill"],
      ["arc", 80, 75, 20, this.p5.PI, 0],
      ["strokeWeight", 3],
      ["line", 70, 45, 60, 35],
      ["line", 90, 45, 100, 35],
    ]);
  };

  /**
   * Draws the cloud
   */
  draw = () => {
    this.drift();
    const { mood } = this;

    return mood === Mood.Happy ? this.drawHappy() : this.drawSad();
  };
}
