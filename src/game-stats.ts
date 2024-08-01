const DEFAULT_NUMBER_OF_LIVES = 3;

export class GameStats {
  private score = 0;
  private lives = 0;

  public constructor() {
    this.reset();
  }

  /**
   * Readies another game
   */
  public reset() {
    this.score = 0;
    this.lives = DEFAULT_NUMBER_OF_LIVES;
  }

  /**
   * Returns the score
   */
  public getScore() {
    return this.score;
  }

  /**
   * This function will reset the lives property to 3 lives
   */
  public resetLives() {
    this.lives = DEFAULT_NUMBER_OF_LIVES;
  }

  /**
   * Returns the number of lives we care about
   */
  public getLives() {
    return this.lives;
  }

  /**
   * Subtracts the number of lives
   */
  public loseALife() {
    return this.lives--;
  }

  /**
   * Add another life to the total
   */
  public addLife() {
    return this.lives++;
  }
}
