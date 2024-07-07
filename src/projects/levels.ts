import { Mountain } from "src/models/mountain";
import { Cloud } from "src/models/cloud";
import { Canyon } from "src/models/canyon";
import { Collectable } from "src/models/collectable";
import { Tree } from "src/models/tree";
import { P5CanvasInstance } from "@p5-wrapper/react";

export function getLevel(
  level: number,
  p5: P5CanvasInstance,
): {
  mountain: Mountain;
  cloud: Cloud;
  canyon: Canyon;
  collectables: Collectable[];
  trees_x: Tree[];
} {
  switch (level) {
    case 1:
      return levelOne(p5);
    default:
      throw new Error("level not implemented");
  }
}

export function levelOne(p5: P5CanvasInstance): {
  mountain: Mountain;
  cloud: Cloud;
  canyon: Canyon;
  collectables: Collectable[];
  trees_x: Tree[];
} {
  const mountain = new Mountain(p5, 465, 150, 6);
  const cloud = new Cloud(p5, 600, 100, 0.75);
  const canyon = new Canyon(p5, 200, 432, 1, 50);
  const collectables = [new Collectable(p5, 800, 400, 1)];

  const trees_x = [
    new Tree(p5, 700, 300, 1),
    new Tree(p5, 520, 310, 1),
    new Tree(p5, 850, 350, 1),
    new Tree(p5, 950, 305, 1),
    new Tree(p5, 972, 312, 1),
    new Tree(p5, 1015, 305, 1),
    new Tree(p5, 1315, 332, 1),
    new Tree(p5, 1329, 316, 1),
  ];

  return {
    mountain,
    cloud,
    canyon,
    collectables,
    trees_x,
  };
}
