import * as React from "react";
import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";
import { PieceOfPaper } from "src/models/piece-of-paper";
import { colors } from "src/constants";
import { Mountain } from "src/models/mountain";
import { Cloud } from "src/models/cloud";
import { Canyon } from "src/models/canyon";
import { Collectible } from "src/models/collectible";
import { Tree } from "src/models/tree";
import { Menu } from "src/menu";

function sketch(p5: P5CanvasInstance) {
  const pieceOfPaper = new PieceOfPaper(p5, 520, 420, 0.5);
  const mountain = new Mountain(p5, 465, 150, 6);
  const cloud = new Cloud(p5, 100, 100, 0.75);
  const canyon = new Canyon(p5, 300, 432, 1);
  const collectible = new Collectible(p5, 800, 400, 1);
  const trees = [
    new Tree(p5, 600, 300, 1),
    new Tree(p5, 520, 310, 1),
    new Tree(p5, 850, 350, 1),
    new Tree(p5, 100, 250, 1),
  ];
  p5.setup = () => {
    p5.createCanvas(1024, 576);
  };

  p5.mousePressed = () => {
    pieceOfPaper.setPosition(p5.mouseX, p5.mouseY);
  };

  p5.draw = () => {
    p5.background(colors.blueSky);
    p5.smooth();
    p5.noStroke();

    // Ground
    p5.fill(colors.grassGreen);
    p5.rect(0, 432, 1024, 144); //draw some green ground
    p5.stroke(0);
    p5.strokeWeight(1);
    p5.line(0, 432, 1024, 432); //draw a horizon line

    // Actions
    cloud.drift();

    // Render
    mountain.draw();
    cloud.draw();
    trees.forEach((tree) => tree.draw());
    canyon.draw();
    collectible.draw();
    pieceOfPaper.draw();
  };
}

export const TwoB = () => (
  <>
    <div className="flex h-16 justify-between">
      <div className="flex bg-white">
        <Menu />
      </div>
    </div>
    <ReactP5Wrapper sketch={sketch} />
  </>
);
