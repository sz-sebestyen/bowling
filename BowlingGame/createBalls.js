const {
  missBallMatcher,
  strikeBallMatcher,
  openFrameMatcher,
  spareFrameMatcher,
  strikeFrameMatcher,
  missFrameMatcher,
} = require("./regex");

const Ball = require("./Ball");

const NUMBER_OF_PINS = 10;

exports.createBalls = (parsedFrames, parsedBonusBalls) => {
  const balls = [];
  const parseBall = (char) =>
    parseInt(
      char.replace(missBallMatcher, "0").replace(strikeBallMatcher, "10")
    );

  parsedFrames.forEach((frame) => {
    const isOpenFrame = openFrameMatcher.test(frame);
    const isSpare = spareFrameMatcher.test(frame);
    const isStrike = strikeFrameMatcher.test(frame);
    const isDoubleMiss = missFrameMatcher.test(frame);

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
};
