const {
  missBallMatcher,
  openFrameMatcher,
  spareFrameMatcher,
  strikeFrameMatcher,
  missFrameMatcher,
} = require("./regex");

const { parseFrames } = require("./parseFrames");
const { parseBonusBalls } = require("./parseBonusBalls");
const { createFrames } = require("./createFrames");

const Ball = require("./Ball");

const NUMBER_OF_PINS = 10;

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

  // TODO: write tests
  static createBalls(parsedFrames, parsedBonusBalls) {
    const balls = [];

    parsedFrames.forEach((frame) => {
      const isOpenFrame = openFrameMatcher.test(frame);
      const isSpare = spareFrameMatcher.test(frame);
      const isStrike = strikeFrameMatcher.test(frame);
      const isDoubleMiss = missFrameMatcher.test(frame);

      const parseBall = (char) => parseInt(char.replace(missBallMatcher, "0"));

      if (isOpenFrame) {
        for (const ball of frame) {
          balls.push(new Ball(parseBall(ball), balls.length));
        }
      } else if (isSpare) {
        const firstBallScore = parseBall(frame[0]);
        balls.push(new Ball(firstBallScore, balls.length));
        balls.push(new Ball(NUMBER_OF_PINS - firstBallScore, balls.length));
      } else if (isStrike) {
        balls.push(new Ball(NUMBER_OF_PINS, balls.length));
      } else if (isDoubleMiss) {
        balls.push(new Ball(0, balls.length));
        balls.push(new Ball(0, balls.length));
      } else {
        throw Error("Could not identify a frame!");
      }
    });

    parsedBonusBalls.forEach((bonusBall) => {
      balls.push(new Ball(parseBall(bonusBall), balls.length));
    });

    return balls;
  }
};
