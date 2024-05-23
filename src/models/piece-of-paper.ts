import { P5CanvasInstance } from "@p5-wrapper/react";
import { IBounds, Sprite } from "src/models/sprite";
import { colors } from "src/constants";
import { Collectible } from "src/models/collectible";

/**
 * Note:
 * Interface - this is typescript, a layer on top of javascript.
 * You define interfaces so your idea has an idea of what the data
 * looks like, and it'll provide safeguards if you try to use the
 * data in a way that doesn't match the interface.
 */
interface IPieceOfPaperData {
  // This variable house an array of various poses and actions the model can take
  models: IActionData[];
}

/**
 * We break our models into actions, and then orientations. This interface tells us
 * that the data is an array of arrays of arrays of any type. This is a bit of a
 * mess - the any type is what we call `code smell`, but it's a way to represent
 * the data in a way that is easy to understand.
 *
 * I chose `any` because the data can take a variety of shapes, one for each
 * p5 command that we can use to render the model.
 */
interface IModelOrientationData {
  data: any[][];
}

/**
 * This interface is a bit more specific. It tells us that the data is an array of
 * IModelOrientationData. Remember, our models are broken down into actions and
 * orientations. This is the data that represents the action of the model, which
 * then has an array of data that represents the orientation of the model.
 */
interface IActionData {
  data: IModelOrientationData[];
}

/**
 * An enum just to clarify the orientation of the model. Easier to read than
 * `magic numbers`. Hard coding magic numbers is what we call `code smell`.
 */
export enum Orientation {
  LEFT = 0,
  RIGHT = 1,
  UP = 2,
  DOWN = 3,
}

/**
 * An enum just to clarify the action of the model. Easier to read than
 * `magic numbers`. Hard coding magic numbers is what we call `code smell`.
 */
export enum Action {
  STANDING = 0,
  JUMPING = 1,
  WALKING = 2,
  PLUMMETING = 3,
}

export enum ControlledBy {
  KEYBOARD = 0,
  MOUSE = 1,
}

const JUMP_INCREMENT = 10;
const MAX_JUMP_HEIGHT = 250;

/**
 * Here is our class. It extends Sprite class, which is a class that is used to
 * render objects on the screen.
 *
 * This class defines the various shapes that can be rendered, as well as the current
 * orientation and action of the model.
 */
export class PieceOfPaper extends Sprite {
  private currentOrientation: Orientation;
  private currentAction: Action;
  private modelData: IPieceOfPaperData;
  private controlledBy: ControlledBy = ControlledBy.KEYBOARD;

  // Added variables for 3a
  private isJumping: boolean = false;
  private isFalling: boolean = false;
  private isLeft: boolean = false;
  private isRight: boolean = false;
  private isUp: boolean = false; // Added because I want to support up and down
  private isDown: boolean = false;
  private jumpHeight: number = 0; // Keeps track of, well, jump height
  private isRunning: boolean = false;
  private isPlummeting: boolean = false;

  /**
   * The constructor for the class. It sets the orientation and action of the model
   * @param p5 A reference to the p5 base class
   * @param x The x coordinate of the sprite
   * @param y The y coordinate of the sprite
   * @param scale The scale of the sprite. Scaling is used to render distant objects
   * smaller.
   */
  constructor(p5: P5CanvasInstance, x: number, y: number, scale: number) {
    const bounds: IBounds = {
      x: 0,
      y: 0,
      w: 100,
      h: 200,
    };
    super(p5, x, y, scale ?? 1, bounds);
    this.currentOrientation = Orientation.DOWN;
    this.currentAction = Action.STANDING;
    this.modelData = this.buildModels();
    this.controlledBy = ControlledBy.KEYBOARD;
  }

  public setControlledBy = (controlledBy: ControlledBy) => {
    this.controlledBy = controlledBy;
  };

  /**
   * Actually goes and gets all permutations of a model
   * so when it comes time to render a given model doing
   * a given action, we just look up the results.
   *
   * This takes more memory, its true. But it removes the conditionals
   * when it comes time to render, and allows us to just use a look up
   * table
   */
  public buildModels = () => {
    const workingModelData: IPieceOfPaperData = {
      models: [],
    };

    // The intention here is as follows:
    // We are going to cycle through the possibles orientations and
    // actions to build the models

    // Get the orientations. Enum keys are stored by both the index number
    // and the user friendly strings. We want to filter out the user friendly
    // strings
    const orientations = Object.keys(Orientation).filter((value) =>
      isNaN(Number(value)),
    );

    // Now - create all the models needed to render a person drawn on a
    // piece of paper.
    const actions = Object.keys(Action).filter((value) => isNaN(Number(value)));
    //@ todo: We are going to add a different level - the level that'll provide character animation
    // When we do, we'll have yet another level that'll define the frames and the period
    // of time they are drawn for.

    // We want to iterate over the enum for actions
    actions.forEach((_key, actionIndex) => {
      // Initialize the working data with an empty action
      workingModelData.models[actionIndex] = {
        data: [],
      };

      // Initialize the orientation data
      orientations.forEach((_key, orientationIndex) => {
        workingModelData.models[actionIndex].data[orientationIndex] = {
          data: [],
        };

        // Now get the actual model
        workingModelData.models[actionIndex].data[orientationIndex].data.push(
          ...this.assembleModel(orientationIndex, actionIndex),
        );
      });
    });

    // Return all that data so it can get saved in the member variable.
    return workingModelData;
  };

  /**
   * Sets the orientation of the model (UP, DOWN, LEFT, RIGHT)
   * @param orientation
   */
  public setOrientation(orientation: Orientation) {
    this.currentOrientation = orientation;
  }

  /**
   * Sets the action of the model (STANDING, JUMPING, WALKING)
   * @param action
   */
  public setAction(action: Action) {
    this.currentAction = action;
  }

  /**
   * For draw priority, we need to adjust for jumping and falling
   */
  public getCalculatedY = () => {
    if (this.isJumping) {
      console.log("Jumping: ", this.getBottomY() + this.jumpHeight);
      return this.getBottomY() + this.jumpHeight;
    }

    if (this.isFalling) {
      console.log("Falling: ", this.getBottomY() + this.jumpHeight);
      return this.getBottomY() + this.jumpHeight;
    }

    return this.getBottomY();
  };

  /**
   * This returns an array that represents the shape of a jagged rip of notebook paper
   * @param offset The offset is used to allow this to be rendered n times - but for our
   * purposes, once with a black fill, and once with a white fill.
   */
  private jaggedShape = (offset: number = 0) => {
    return [
      ["beginShape"],
      ["vertex", offset, offset],
      ["vertex", 100 + offset, offset],
      ["vertex", 100 + offset, 200 + offset],

      ["vertex", 83 + offset, 180 + offset],
      ["vertex", 73 + offset, 190 + offset],
      ["vertex", 66 + offset, 172 + offset],
      ["vertex", 63 + offset, 190 + offset],
      ["vertex", 58 + offset, 199 + offset],
      ["vertex", 53 + offset, 180 + offset],
      ["vertex", 39 + offset, 175 + offset],
      ["vertex", 23 + offset, 200 + offset],
      ["vertex", 18 + offset, 190 + offset],
      ["vertex", 10 + offset, 186 + offset],

      ["vertex", offset, 180 + offset],
      ["vertex", 10 + offset, 172 + offset],
      ["vertex", 20 + offset, 153 + offset],
      ["vertex", offset, 146 + offset],
      ["vertex", 20 + offset, 139 + offset],
      ["vertex", 10 + offset, 127 + offset],
      ["vertex", 20 + offset, 113 + offset],
      ["vertex", 15 + offset, 98 + offset],
      ["vertex", offset, 72 + offset],
      ["vertex", 10 + offset, 48 + offset],
      ["vertex", 5 + offset, 30 + offset],

      ["endShape", this.p5.CLOSE],
    ];
  };

  /**
   * This will return the angle between two points. I'm gonna use this to allow my
   * character to always face the mouse pointer.
   *
   * This may be rendered moot by future assignments, however I like it for now.
   * @param x2
   * @param y2
   */
  angleBetweenPoints = (x2: number, y2: number) => {
    const x = this.getX();
    const y = this.getY();
    const deltaX = x2 - x;
    const deltaY = y2 - y;
    return Math.atan2(deltaY, deltaX);
  };

  /**
   * This will provide an array of instructions that can be used to render
   * a jumping person, depending on his orientation
   * @param orientation
   * @returns any[][]
   */
  private jumpingPerson = (orientation: Orientation): any[] => {
    const person: any[] = [];

    if (orientation === Orientation.UP || orientation === Orientation.DOWN) {
      person.push(
        ["noFill"],
        ["stroke", 30, 30, 30],
        ["circle", 60, 60, 40],
        ["line", 60, 80, 60, 140],
        // Legs
        ["line", 60, 140, 85, 135],
        ["line", 85, 135, 80, 155],
        ["line", 60, 140, 45, 135],
        ["line", 45, 135, 40, 160],
        // Arms
        ["line", 60, 100, 45, 120],
        ["line", 45, 120, 40, 110],
        ["line", 60, 100, 85, 120],
        ["line", 85, 120, 100, 110],
      );

      if (orientation === Orientation.DOWN) {
        person.push(
          ["fill", 0],
          ["circle", 55, 55, 2],
          ["circle", 65, 55, 2],
          ["noFill"],
          ["strokeWeight", 1],
          ["line", 50, 65, 70, 65],
        );
      }

      return person;
    }

    if (orientation === Orientation.LEFT) {
      person.push(
        ["noFill"],
        ["stroke", 30, 30, 30],
        ["circle", 60, 40, 40],
        // Torso
        ["line", 60, 60, 60, 120],
        //Legs
        ["line", 60, 120, 40, 135],
        ["line", 40, 135, 46, 150],
        ["line", 60, 120, 72, 145],
        ["line", 72, 145, 84, 170],
        // Arms
        ["line", 60, 80, 40, 75],
        ["line", 40, 75, 36, 53],
        ["line", 60, 80, 66, 100],
        ["line", 66, 100, 74, 120],
        ["circle", 50, 35, 2],
        ["line", 40, 45, 50, 50],
        ["stroke", colors.lightGray],

        ["line", 80, 65, 90, 85],
        ["line", 30, 80, 40, 100],
        ["line", 45, 160, 55, 180],
        ["line", 90, 135, 100, 155],
      );
    } else {
      person.push(
        ["noFill"],
        ["stroke", 30, 30, 30],
        ["circle", 60, 40, 40],
        // Torso
        ["line", 60, 60, 60, 120],

        ["line", 60, 120, 56, 145],
        ["line", 56, 145, 46, 170],
        ["line", 60, 120, 72, 105],
        ["line", 72, 105, 60, 150],

        ["line", 60, 80, 76, 60],
        ["line", 76, 60, 88, 30],
        ["line", 60, 80, 42, 100],
        ["line", 42, 100, 34, 120],
        ["circle", 70, 35, 2],
        ["line", 80, 45, 65, 50],
        ["stroke", colors.lightGray],
        ["line", 30, 45, 20, 65],
        ["line", 30, 75, 20, 95],
        ["line", 90, 105, 80, 125],
        ["line", 90, 135, 80, 155],
      );
    }

    return person;
  };

  /**
   * This will provide an array of instructions that can be used to render
   * a standing person, depending on his orientation
   * @param orientation
   * @returns any[][]
   */
  private standingPerson = (orientation: Orientation): any[] => {
    const person: any[] = [];

    if (orientation === Orientation.UP || orientation === Orientation.DOWN) {
      person.push(
        ["noFill"],
        ["stroke", 30, 30, 30],
        ["circle", 60, 40, 40],
        ["line", 60, 60, 60, 120],
        ["line", 60, 120, 55, 145],
        ["line", 55, 145, 50, 170],
        ["line", 60, 120, 65, 145],
        ["line", 60, 120, 70, 170],
        ["line", 60, 80, 55, 100],
        ["line", 60, 80, 50, 120],
        ["line", 60, 80, 65, 100],
        ["line", 60, 80, 70, 120],
      );

      if (orientation === Orientation.DOWN) {
        person.push(
          ["fill", 0],
          ["circle", 55, 35, 2],
          ["circle", 65, 35, 2],
          ["noFill"],
          ["arc", 60, 45, 20, 0, this.p5.PI],
        );
      }

      return person;
    }

    // So, if we are here, then left and right are it

    if (orientation === Orientation.LEFT) {
      person.push(
        ["noFill"],
        ["stroke", 30, 30, 30],
        ["circle", 60, 40, 40],
        ["line", 60, 60, 60, 120],
        ["line", 60, 120, 56, 145],
        ["line", 56, 145, 56, 170],
        ["line", 60, 120, 62, 145],
        ["line", 62, 145, 64, 170],
        ["line", 60, 80, 56, 100],
        ["line", 56, 100, 36, 103],
        ["line", 60, 80, 66, 100],
        ["line", 66, 100, 64, 120],
        ["circle", 50, 35, 2],
        ["arc", 40, 45, 20, this.p5.PI + 3.3, this.p5.PI - 2.1],
      );
    } else {
      person.push(
        ["noFill"],
        ["stroke", 30, 30, 30],
        ["circle", 60, 40, 40],
        ["line", 60, 60, 60, 120],
        ["line", 60, 120, 66, 145],
        ["line", 66, 145, 66, 170],
        ["line", 60, 120, 62, 145],
        ["line", 62, 145, 58, 170],

        ["line", 60, 80, 56, 100],
        ["line", 56, 100, 58, 116],
        ["line", 60, 80, 62, 100],
        ["line", 62, 100, 64, 120],
        ["circle", 70, 35, 2],
        ["arc", 80, 45, 20, this.p5.PI - 1, this.p5.PI - 0.2],
      );
    }

    return person;
  };

  /**
   * This will call the appropriate methods to return array of instructions
   * that can be used to render a person, depending on his orientation and action
   * @param orientation
   * @param action
   * @returns any[][]
   */
  private person(orientation: Orientation, action: Action): any[] {
    if (action === Action.JUMPING) {
      return this.jumpingPerson(orientation);
    }

    return this.standingPerson(orientation);
  }

  /**
   * This will return an array of instructions that can be used to render a piece of paper
   * with lines and a shadow
   */
  private paper = () => {
    return [
      ["fill", 0, 0, 0, 80],
      ["noStroke"],
      ...this.jaggedShape(0),
      ["fill", 255],
      ["noStroke"],
      ...this.jaggedShape(4),

      ["strokeWeight", 2],
      ["stroke", 80, 140, 250, 40],

      ["line", 30, 0, 104, 8],
      ["line", 9, 20, 104, 28],
      ["line", 9, 40, 104, 48],
      ["line", 7, 60, 104, 68],
      ["line", 5, 80, 104, 88],
      ["line", 16, 100, 104, 108],
      ["line", 16, 120, 104, 128],
      ["line", 22, 140, 104, 148],
      ["line", 18, 160, 104, 168],
      ["line", 8, 180, 104, 188],
      ["strokeWeight", 1],
    ];
  };

  /**
   * This function is used to build the lookup table that we will use during the
   * draw cycle to render the model, one piece at a time.
   * @param orientation
   * @param action
   */
  private assembleModel = (orientation: Orientation, action: Action) => {
    switch (action) {
      case Action.STANDING:
        return [...this.paper(), ...this.person(orientation, action)];
      default:
        return [...this.paper()];
      case Action.JUMPING:
        return [...this.paper(), ...this.person(orientation, action)];
    }
  };

  public handleKeyPress = () => {
    // Let's not do anything if we are jumping or falling
    if (this.isJumping || this.isFalling || this.isPlummeting) {
      return;
    }

    const keyCode = this.p5.keyCode;

    if (keyCode === this.p5.LEFT_ARROW) {
      this.isLeft = true;
      this.isRight = false;
    } else if (keyCode === this.p5.RIGHT_ARROW) {
      this.isRight = true;
      this.isLeft = false;
    } else if (keyCode === this.p5.UP_ARROW) {
      this.isUp = true;
      this.isDown = false;
    } else if (keyCode === this.p5.DOWN_ARROW) {
      this.isDown = true;
      this.isUp = false;
    } else if (keyCode === 16) {
      this.isRunning = true;
    } else if (keyCode === 32 && !this.isJumping && !this.isFalling) {
      this.isJumping = true;
      this.jumpHeight = 0;
    } else {
      console.log("Unhandled: ", keyCode);
    }
  };

  public handleKeyRelease = () => {
    const keyCode = this.p5.keyCode;

    if (this.isPlummeting) {
      return;
    }

    // This should be a switch statement, but the criteria is asking
    // for if statements, so here we go.
    if (keyCode === this.p5.LEFT_ARROW) {
      this.isLeft = false;
    } else if (keyCode === this.p5.RIGHT_ARROW) {
      this.isRight = false;
    } else if (keyCode === this.p5.UP_ARROW) {
      this.isUp = false;
    } else if (keyCode === this.p5.DOWN_ARROW) {
      this.isDown = false;
    } else if (keyCode === 16) {
      this.isRunning = false;
    } else if (keyCode === 32) {
      this.isJumping = false;
      this.isFalling = true;
    }
  };

  public isJumpingOrFalling = () => {
    let y = 0;

    if (!this.isJumping && !this.isFalling) {
      return 0;
    }

    if (this.isJumping) {
      // const jump increment
      this.jumpHeight += JUMP_INCREMENT;

      // Let's max our jump height
      if (this.jumpHeight > MAX_JUMP_HEIGHT) {
        this.isJumping = false;
        this.isFalling = true;
      }

      y -= JUMP_INCREMENT;
    } // Take care of falling
    else if (this.isFalling) {
      this.jumpHeight -= JUMP_INCREMENT;
      if (this.jumpHeight <= 0) {
        this.jumpHeight = 0;
        this.isFalling = false;
      }
      y += JUMP_INCREMENT;
    }

    return y;
  };

  public handleMovementAndOrientation = () => {
    // Get x ready to go
    let x = 0;

    // Calculate our prospective speed
    let movement_increment = this.isRunning ? 2.5 : 1;

    // Now initialize y and get any vector from jumping
    let y = this.isJumpingOrFalling();

    // If we are plummeting - do it and fast
    if (this.isPlummeting) {
      x = 0;
      y += movement_increment * 7;
    }

    if (
      (this.isUp && (this.isLeft || this.isRight)) ||
      (this.isDown && (this.isLeft || this.isRight))
    ) {
      movement_increment /= 2;
    }

    if (this.isLeft) {
      x -= movement_increment;
      this.setOrientation(Orientation.LEFT);
    } else if (this.isRight) {
      x += movement_increment;
      this.setOrientation(Orientation.RIGHT);
    }

    if (y === 0) {
      if (this.isUp) {
        y -= movement_increment;
        this.setOrientation(Orientation.UP);
      } else if (this.isDown) {
        y += movement_increment;
        this.setOrientation(Orientation.DOWN);
      }
    }

    if (this.isJumping || this.isFalling) {
      this.setAction(Action.JUMPING);
    } else {
      this.setAction(Action.STANDING);
    }

    this.move(x, y);
  };

  public checkForInteraction(objects: Sprite[]) {
    // If we are jumping, this stuff doesn't count
    if (this.isJumping || this.isFalling) {
      return;
    }

    // NOw, let's check for interactions
    objects.forEach((object) => {
      switch (object.constructor.name) {
        default:
        case "Canyon": {
          // Do nothing if not handled
          break;
        }
        case "Collectible": {
          (object as Collectible).checkGather(this.getX(), this.getBottomY());
          break;
        }
      }

      // If we are directly over sky, we've messed up somehow. Maybe canyon,
      // maybe something more devious. Let's plummet

      // Get the color of the bottom middle of our piece of paper
      const hoveringColor = this.p5.get(this.getCenterX(), this.getBottomY());
      // Check to be sure that the arrays called colors.blueSky and hoveringColor have the same entries in the same order

      if (
        colors.blueSky.every(
          (value: number, index: number) => value === hoveringColor[index],
        )
      ) {
        this.isPlummeting = true;
        this.isDown = true;
        this.isLeft = false;
        this.isUp = false;
        this.isRight = false;
      }
    });
  }
  /**
   * This is the draw method for the piece of paper. It will render the model
   * with the correct orientation and action
   */
  public draw() {
    // Do I calculate the orientation based on the mouse position?
    if (ControlledBy.MOUSE === this.controlledBy) {
      // Get me some radians
      const radians = this.angleBetweenPoints(this.p5.mouseX, this.p5.mouseY);
      // Let's compute the orientation. Since the anchoring of the sprite isn't dead in
      // the middle, we need to alter our radian thresholds just a bit.
      if (radians > 0 && radians < 0.96) {
        this.setOrientation(Orientation.RIGHT);
      } else if (radians >= 0.96 && radians <= 1.76) {
        this.setOrientation(Orientation.DOWN);
      } else if (radians > 1.76 || radians < -2.23) {
        this.setOrientation(Orientation.LEFT);
      } else {
        this.setOrientation(Orientation.UP);
      }
    }

    // Get the model data
    const modelData =
      this.modelData.models[this.currentAction].data[this.currentOrientation]
        .data;

    // Send it to the base class for processing
    this.processArray(modelData);
  }
}
