const { parseFrames } = require("./parseFrames");
const { parseBonusBalls } = require("./parseBonusBalls");
const { createFrames } = require("./createFrames");
const { createBalls } = require("./createBalls");

exports.BowlingGame = class {
  constructor(gameString) {
    this.gameString = gameString;

    const parsedFrames = parseFrames(gameString);

    this.balls = createBalls(parsedFrames, parseBonusBalls(gameString));
    this.frames = createFrames(parsedFrames);

    // TODO: count score
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
