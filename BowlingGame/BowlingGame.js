const { parseFrames } = require("./parseFrames");
const { parseBonusBalls } = require("./parseBonusBalls");
const { createFrames } = require("./createFrames");
const { createBalls } = require("./createBalls");

module.exports = class BowlingGame {
  constructor(gameString) {
    this.gameString = gameString;
    this.balls = [];
    this.frames = [];
    this.score = 0;
  }

  getScore() {
    return this.score;
  }

  // TODO: write tests
  static countScore(frames, balls) {
    return frames.forEach((frame) =>
      frame.ballIndices.reduce((sum, index) => sum + balls[index].score, 0)
    );
  }

  // TODO: write tests
  static countBonusScore(frames, balls) {
    return frames.forEach((frame) =>
      frame
        .getBonusIndices()
        .reduce((sum, index) => sum + balls[index].score, 0)
    );
  }
};
