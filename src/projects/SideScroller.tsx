import * as React from "react";
import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";
import { PieceOfPaper } from "src/models/piece-of-paper";
import { colors } from "src/constants";
import { Mountain } from "src/models/mountain";
import { Cloud } from "src/models/cloud";
import { Canyon } from "src/models/canyon";
import { Collectable } from "src/models/collectable";
import { Tree } from "src/models/tree";
import { Menu } from "src/menu";
import { Sprite } from "src/models/sprite";

function sketch(p5: P5CanvasInstance) {
  const pieceOfPaper = new PieceOfPaper(p5, 520, 420, 0.5);
  const mountain = new Mountain(p5, 465, 150, 6);
  const cloud = new Cloud(p5, 100, 100, 0.75);
  const canyon = new Canyon(p5, 200, 432, 1, 50);
  const collectables = [new Collectable(p5, 800, 400, 1)];
  // const collectable = new Collectable(p5, 800, 400, 1);
  const trees = [
    new Tree(p5, 700, 300, 1),
    new Tree(p5, 520, 310, 1),
    new Tree(p5, 850, 350, 1),
  ];

  p5.setup = () => {
    const canvas = p5.createCanvas(1024, 576);
    // Necessary for the canvas to be able to read pixel data at optimum speed
    canvas.canvas.getContext("2d", { willReadFrequently: true });
  };

  p5.keyPressed = () => {
    pieceOfPaper.handleKeyPress();
  };

  p5.keyReleased = () => {
    pieceOfPaper.handleKeyRelease();
  };

  p5.draw = () => {
    // Let's check for interactions
    pieceOfPaper.checkForInteraction(collectables);

    // Let's check for input
    // pieceOfPaper.checkKeyboardInput();
    pieceOfPaper.handleMovementAndOrientation();

    p5.background(colors.blueSky);
    p5.smooth();
    p5.noStroke();

    // Ground
    p5.fill(colors.grassGreen);
    p5.rect(0, 432, 1024, 144);
    p5.stroke(0);
    p5.strokeWeight(1);
    p5.line(0, 432, 1024, 432);

    // Actions
    cloud.drift();

    // Render
    mountain.draw();
    cloud.draw();
    canyon.draw();

    // Let's get the trees, collectible, and piece of paper to render in a specific order
    const orderedRenders = [...trees, ...collectables, pieceOfPaper].sort(
      (a: Sprite, b: Sprite) => {
        let firstY =
          a instanceof PieceOfPaper ? a.getCalculatedY() : a.getBottomY();
        let secondY =
          b instanceof PieceOfPaper ? b.getCalculatedY() : b.getBottomY();
        return firstY - secondY;
      },
    );

    // Render them in order, so objects further away than the character are rendered
    // behind him
    orderedRenders.forEach((model: Sprite) => {
      model.draw();
    });
  };
}

export const SideScroller = () => (
  <>
    <div className="flex h-16 justify-between">
      <div className="flex bg-white">
        <Menu />
      </div>
    </div>
    <ReactP5Wrapper sketch={sketch} />
  </>
);
