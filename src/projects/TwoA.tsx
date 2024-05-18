import * as React from "react";
import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";
import { Action, Orientation, PieceOfPaper } from "src/models/piece-of-paper";
import { colors } from "src/constants";
import { Menu } from "src/menu";

function sketch(p5: P5CanvasInstance) {
  const facingForward = new PieceOfPaper(p5, 23, 62, 0.4);
  const jumpingForward = new PieceOfPaper(p5, 223, 62, 0.4);
  const walkingLeft = new PieceOfPaper(p5, 23, 262, 0.4);
  const walkingRight = new PieceOfPaper(p5, 223, 262, 0.4);
  const jumpingLeft = new PieceOfPaper(p5, 223, 462, 0.4);
  const jumpingRight = new PieceOfPaper(p5, 23, 462, 0.4);

  facingForward.setOrientation(Orientation.DOWN);
  jumpingForward.setOrientation(Orientation.DOWN);
  jumpingForward.setAction(Action.JUMPING);
  walkingLeft.setOrientation(Orientation.LEFT);
  walkingRight.setOrientation(Orientation.RIGHT);
  jumpingLeft.setAction(Action.JUMPING);
  jumpingLeft.setOrientation(Orientation.LEFT);
  jumpingRight.setAction(Action.JUMPING);
  jumpingRight.setOrientation(Orientation.RIGHT);

  p5.setup = () => {
    p5.createCanvas(1024, 576);
    p5.background(colors.coinHighlight);
  };

  p5.draw = () => {
    p5.stroke(100);
    p5.fill(200, 200, 200);
    p5.rect(20, 60, 50, 80);
    p5.noStroke();
    p5.fill(0);
    p5.strokeWeight(0);
    p5.text("1. standing front facing", 20, 160);
    facingForward.draw();

    p5.stroke(100);
    p5.fill(200, 200, 200);
    p5.rect(220, 60, 50, 80);
    p5.noStroke();
    p5.fill(0);
    p5.text("2. jumping facing forwards", 220, 160);

    jumpingForward.draw();

    p5.stroke(100);
    p5.fill(200, 200, 200);
    p5.rect(20, 260, 50, 80);
    p5.noStroke();
    p5.fill(0);
    p5.text("3. Walking left", 20, 360);

    walkingLeft.draw();

    p5.stroke(100);
    p5.fill(200, 200, 200);
    p5.rect(220, 260, 50, 80);
    p5.noStroke();
    p5.fill(0);
    p5.text("4. Walking right", 220, 360);
    walkingRight.draw();

    p5.stroke(100);
    p5.fill(200, 200, 200);
    p5.rect(20, 460, 50, 80);
    p5.noStroke();
    p5.fill(0);
    p5.text("5. Jumping to the right", 20, 560);
    jumpingRight.draw();

    p5.stroke(100);
    p5.fill(200, 200, 200);
    p5.rect(220, 460, 50, 80);
    p5.noStroke();
    p5.fill(0);
    p5.text("6. Jumping to the left", 220, 560);
    jumpingLeft.draw();
  };
}

export const TwoA = () => (
  <>
    <div className="flex h-16 justify-between">
      <div className="flex bg-white">
        <Menu />
      </div>
    </div>
    <ReactP5Wrapper sketch={sketch} />
  </>
);
