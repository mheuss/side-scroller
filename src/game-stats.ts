const DEFAULT_NUMBER_OF_LIVES = 3;

// Game score is bad naming - we are in a game, so it is redundant. Going with score
let score = 0;
let lives = DEFAULT_NUMBER_OF_LIVES;
export class GameStats {
  /**
   * Returns the score
   */
  public static getScore() {
    return score;
  }

  /**
   * Adds to the score
   */
  public static addToScore(points: number = 1) {
    score += points;
  }

  /**
   * Readies another game
   */
  public static reset() {
    score = 0;
    lives = DEFAULT_NUMBER_OF_LIVES;
  }

  /**
   * This function will reset the lives property to 3 lives
   */
  public static resetLives() {
    lives = DEFAULT_NUMBER_OF_LIVES;
  }

  /**
   * Returns the number of lives we care about
   */
  public static getLives() {
    return lives;
  }

  /**
   * Awfully named function, but it is what was asked for.
   */
  public static checkPlayerDie() {
    return lives < 1;
  }

  /**
   * Subtracts the number of lives
   */
  public static loseALife() {
    return lives--;
  }

  /**
   * Add another life to the total
   */
  public static addLife() {
    return lives++;
  }
}
