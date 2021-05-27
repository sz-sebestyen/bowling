/**
 * calculateScore module.
 * @module calculateScore
 */

const BowlingGame = require("./BowlingGame");

/**
 * Calculates the score of a single bowling game.
 * @param {string} gameString The bowling game represented as a string.
 * @returns {number} The score of the bowling game.
 */
module.exports = function calculateScore(gameString) {
  return new BowlingGame(gameString).getScore();
};
