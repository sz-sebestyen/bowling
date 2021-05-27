/**
 * Ball module.
 * @module Ball
 */

/**
 * Creates a Ball with a score and index.
 * @class
 * @classdesc Represents a ball in the bowling game.
 */
module.exports = class Ball {
  /**
   * @param {number} numberOfPinsKnocked The number of pins knocked down.
   * @param {number} index The index of the ball.
   */
  constructor(numberOfPinsKnocked, index) {
    this.score = numberOfPinsKnocked;
    this.index = index;
  }
};
