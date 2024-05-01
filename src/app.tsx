import * as React from "react";
import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";
import { Orientation, PieceOfPaper } from "src/models/piece-of-paper";
import { colors } from "src/constants";
import { Mountain } from "src/models/mountain";
import { Cloud } from "src/models/cloud";
// import { Canyon } from "src/models/canyon";

function sketch(p5: P5CanvasInstance) {
  const pieceOfPaper = new PieceOfPaper(p5, 100, 440, 0.5);
  const mountain = new Mountain(p5, 465, 150, 6);
  const cloud = new Cloud(p5, 100, 100, 0.75);
  // const canyon = new Canyon(p5, 400, 400, 1);
  p5.setup = () => {
    p5.createCanvas(1024, 576);
  };

  p5.mousePressed = () => {
    pieceOfPaper.move(p5.mouseX, p5.mouseY);
  };

  p5.draw = () => {
    // Sky
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

    // canyon.draw();
    pieceOfPaper.draw();
  };
}

export const App = () => (
  <div className="h-screen flex items-center justify-center">
    <div className={"border-gray-500 border border-solid"}>
      <ReactP5Wrapper sketch={sketch} />
    </div>
  </div>
);
