import * as React from "react";
import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";
import { colors } from "src/constants";
import { Menu } from "src/menu";

function sketch(p5: P5CanvasInstance) {
  const animationArea = 400;

  p5.setup = () => {
    p5.createCanvas(300, 300);
  };

  p5.draw = () => {
    const background = 200;
    p5.rotate(0);
    p5.background(background);

    p5.stroke(0);
    p5.strokeWeight(5);
    p5.noFill();
    p5.curve(0, 100, 123, 244, 123, 300, 100, 300);
    p5.curve(300, 100, 177, 244, 177, 300, 200, 300);
    p5.ellipse(150, 138, 200, 220);
    // Eyes
    p5.push();
    p5.fill(0);
    p5.rotate(p5.QUARTER_PI);
    p5.ellipse(180, 40, 80, 40);
    p5.rotate(p5.HALF_PI);
    p5.ellipse(-30, -250, 80, 40);
    p5.pop();
    // Pupils
    p5.push();
    p5.fill(255);
    p5.noStroke();
    p5.circle(180, 170, 20);
    p5.circle(118, 170, 20);
    p5.pop();
    //Smile
    p5.arc(150, 200, 40, 40, 0, p5.PI, p5.PIE);
    p5.stroke(background);
    p5.line(120, 200, 180, 200);
  };
}

export const WarholSoup = () => (
  <>
    <div className="flex h-16 justify-between" style={{ width: 1024 }}>
      <div className="flex bg-white">
        <Menu />
      </div>
    </div>
    <div className={"ml-32 mt-2"}>
      <ReactP5Wrapper sketch={sketch} />
    </div>
  </>
);
