import * as React from "react";
import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";
import { PieceOfPaper } from "src/models/piece-of-paper";
import { colors } from "src/constants";
import { Sprite } from "src/models/sprite";
import { levelOne } from "src/levels";
import { GameStats } from "src/game-stats";
import { ScoreBoard } from "src/models/score-board";

export const START_X = 520;
export const START_Y = 420;

export const viewPortWidth = 1024;
export const viewPortHeight = 576;

function sketch(p5: P5CanvasInstance) {
  // Get the scoreboard and stats initialized
  const stats = new GameStats();
  const scoreBoard = new ScoreBoard(p5);

  // Get our main character started
  const pieceOfPaper = new PieceOfPaper(p5, START_X, START_Y, 0.5);

  /*
  All of our level data is stored in the levelOne function. We can destructure it,
  and use that.

  I choose to use this method, so I can call more levels in the future.
   */
  const { flagpole, trees, collectables, canyons, clouds, mountains } =
    levelOne(p5, stats);

  /** Set things up */
  p5.setup = () => {
    const canvas = p5.createCanvas(viewPortWidth, viewPortHeight);
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
    pieceOfPaper.checkForInteraction([...collectables, flagpole]);

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

    mountains.forEach((mountain) => {
      mountain.draw();
    });

    clouds.forEach((cloud) => {
      cloud.draw();
    });

    canyons.forEach((canyon) => {
      canyon.draw();
    });

    // Let's get the trees, collectible, and piece of paper to render in a
    // specific order
    const orderedRenders = [
      ...trees,
      ...collectables,
      pieceOfPaper,
      flagpole,
    ].sort((a: Sprite, b: Sprite) => {
      let firstY =
        a instanceof PieceOfPaper ? a.getCalculatedY() : a.getBottomY();
      let secondY =
        b instanceof PieceOfPaper ? b.getCalculatedY() : b.getBottomY();
      return firstY - secondY;
    });

    // Render them in order, so objects further away than the character are rendered
    // behind him
    // This should be done with a forEach on the array - the built-in iterator.
    // But the course asked for a for loop, so here it is.
    for (let i = 0; i < orderedRenders.length; i++) {
      orderedRenders[i].draw();
    }

    p5.pop();

    scoreBoard.draw();
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
