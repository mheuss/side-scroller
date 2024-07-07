import * as React from "react";
import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";
import { PieceOfPaper } from "src/models/piece-of-paper";
import { colors } from "src/constants";
import { Sprite } from "src/models/sprite";
import { levelOne } from "src/projects/levels";

function sketch(p5: P5CanvasInstance) {
  const pieceOfPaper = new PieceOfPaper(p5, 520, 420, 0.5);
  const { trees_x, collectables, canyon, cloud, mountain } = levelOne(p5);

  /** Handles they key presses */
  p5.setup = () => {
    const canvas = p5.createCanvas(1024, 576);
    // Necessary for the canvas to be able to read pixel data at optimum speed
    canvas.canvas.getContext("2d", { willReadFrequently: true });
  };

  /** Handles key presses */
  p5.keyPressed = () => {
    pieceOfPaper.handleKeyPress();
  };

  /** Handles key releases */
  p5.keyReleased = () => {
    pieceOfPaper.handleKeyRelease();
  };

  /** Draw loop */
  p5.draw = () => {
    // Camera

    // Let's check for interactions
    pieceOfPaper.checkForInteraction(collectables);

    // Let's check for input
    pieceOfPaper.handleMovementAndOrientation();

    // Get our camera
    let cameraPosX = pieceOfPaper.getCameraAdjustedX();
    if (cameraPosX < 0) {
      cameraPosX = 0;
    }

    p5.background(colors.blueSky);
    p5.smooth();
    p5.noStroke();

    // Ground
    p5.fill(colors.grassGreen);
    p5.rect(0, 432, 1024, 144);
    p5.stroke(0);
    p5.strokeWeight(1);
    p5.line(0, 432, 1024, 432);

    // Render
    p5.push();
    p5.translate(-cameraPosX, 0);

    mountain.draw();
    cloud.draw();
    canyon.draw();

    // Let's get the trees, collectible, and piece of paper to render in a specific order
    const orderedRenders = [...trees_x, ...collectables, pieceOfPaper].sort(
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
    // This should be done with a forEach on the array - the built in iterator.
    // But the course asked for a for loop, so here it is.
    for (let i = 0; i < orderedRenders.length; i++) {
      const model = orderedRenders[i];
      if (orderedRenders[i] instanceof PieceOfPaper) {
        orderedRenders[i].draw();
      } else {
        orderedRenders[i].draw();
      }
    }

    p5.pop();
  };
}

/**
 * expects the game as a React component
 * @constructor
 */
export const SideScroller = () => (
  <>
    <ReactP5Wrapper sketch={sketch} />
  </>
);
