import { Mountain } from "src/models/mountain";
import { Cloud, Mood } from "src/models/cloud";
import { Canyon } from "src/models/canyon";
import { Collectable } from "src/models/collectable";
import { Tree } from "src/models/tree";
import { P5CanvasInstance } from "@p5-wrapper/react";
import { FlagPole } from "src/models/flag-pole";
import { GameStats } from "src/game-stats";

export function levelOne(
  p5: P5CanvasInstance,
  gameStats: GameStats,
): {
  mountains: Mountain[];
  clouds: Cloud[];
  canyons: Canyon[];
  collectables: Collectable[];
  trees: Tree[];
  flagpole: FlagPole;
} {
  const mountains: Mountain[] = [
    new Mountain(p5, 465, 150, 6),
    new Mountain(p5, 665, 150, 6),
    new Mountain(p5, 865, 150, 6),
    new Mountain(p5, 2065, 150, 6),
    new Mountain(p5, 2265, 150, 6),
    new Mountain(p5, 2665, 150, 6),
    new Mountain(p5, 2865, 150, 6),
  ];

  const clouds: Cloud[] = [
    new Cloud(p5, 600, 100, 0.75),
    new Cloud(p5, 1300, 100, 1),
    new Cloud(p5, 1800, 100, 0.55),
    new Cloud(p5, 1950, 100, 0.85),
    new Cloud(p5, 2500, 100, 1),
    new Cloud(p5, 2750, 100, 1.1),
  ];

  // Let's make one sad
  clouds[1].setMood(Mood.Sad, 100);
  clouds[5].setMood(Mood.Sad, 220);

  const canyons = [
    new Canyon(p5, 200, 432, 1, 50),
    new Canyon(p5, 1671.25, 432, 1, 30),
    new Canyon(p5, 3571.25, 432, 1, 100),
  ];

  canyons[1].setChanceForCreviceWidthChange(30);
  canyons[2].setChanceForCreviceWidthChange(5);

  const collectables = [
    new Collectable(p5, 800, 400, 1),
    new Collectable(p5, 1100, 405, 1),
    new Collectable(p5, 1400, 370, 1),
    new Collectable(p5, 1800, 305, 1),
    new Collectable(p5, 2000, 340, 1),
    new Collectable(p5, 2200, 360, 1),
  ];

  const trees_x = [
    new Tree(p5, 700, 300, 1),
    new Tree(p5, 520, 310, 1),
    new Tree(p5, 850, 350, 1),
    new Tree(p5, 950, 305, 1),
    new Tree(p5, 972, 312, 1),
    new Tree(p5, 1015, 305, 1),
    new Tree(p5, 1315, 332, 1),
    new Tree(p5, 1329, 316, 1),
    new Tree(p5, 1420, 310, 1),
    new Tree(p5, 1850, 350, 1),
    new Tree(p5, 1950, 305, 1),
    new Tree(p5, 1972, 312, 1),
    new Tree(p5, 1915, 305, 1),
    new Tree(p5, 2315, 332, 1),
    new Tree(p5, 2429, 316, 1),
    new Tree(p5, 2529, 330, 1),
    new Tree(p5, 2629, 320, 1),
    new Tree(p5, 2689, 339, 1),
    new Tree(p5, 2709, 400, 1),
    new Tree(p5, 2809, 350, 1),
    new Tree(p5, 2925, 340, 1),
    new Tree(p5, 2965, 300, 1),
    new Tree(p5, 3000, 422, 1),
    new Tree(p5, 4690, 321, 1),
    new Tree(p5, 3200, 398, 1),
    new Tree(p5, 3300, 290, 1),
    new Tree(p5, 4810, 325, 1),
    new Tree(p5, 3390, 301, 1),
    new Tree(p5, 4990, 375, 1),
    new Tree(p5, 3425, 382, 1),
    new Tree(p5, 3800, 330, 1),
    new Tree(p5, 3875, 320, 1),
    new Tree(p5, 5192, 339, 1),
    new Tree(p5, 4000, 400, 1),
    new Tree(p5, 4170, 350, 1),
    new Tree(p5, 4208, 340, 1),
    new Tree(p5, 4299, 300, 1),
    new Tree(p5, 4350, 422, 1),
    new Tree(p5, 4376, 321, 1),
    new Tree(p5, 4399, 398, 1),
    new Tree(p5, 4460, 290, 1),
    new Tree(p5, 4472, 325, 1),
    new Tree(p5, 4481, 301, 1),
    new Tree(p5, 4500, 375, 1),
    new Tree(p5, 4530, 382, 1),
  ];

  const flagpole = new FlagPole(p5, 6000, 250, 1);

  return {
    flagpole,
    mountains,
    clouds,
    canyons,
    collectables,
    trees: trees_x,
  };
}
