import * as React from "react";
import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";
import { colors } from "src/constants";
import { Menu } from "src/menu";

function sketch(p5: P5CanvasInstance) {
  const animationArea = 400;

  p5.setup = () => {
    p5.createCanvas(500, 500);
  };

  p5.draw = () => {
    p5.background(255);

    // Draw the matrix, light gray, every two pixels
    p5.stroke(200);
    p5.strokeWeight(1);
    for (let i = 0; i < animationArea; i += 4) {
      p5.line(i, 0, i, animationArea);
    }

    for (let i = 0; i < animationArea; i += 4) {
      p5.line(0, i, animationArea, i);
    }
  };
}

export const Animator = () => (
  <>
    <div className="flex h-16 justify-between" style={{ width: 1024 }}>
      <div className="flex bg-white">
        <Menu />
      </div>
    </div>
    <div>
      <ReactP5Wrapper sketch={sketch} />
    </div>
    <p>Model</p>
    <textarea className="w-full h-1/2 border-black">Hello World</textarea>
  </>
);
