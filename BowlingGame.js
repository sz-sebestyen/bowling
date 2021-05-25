const {
  missBallMatcher,
  openFrameMatcher,
  spareFrameMatcher,
  strikeFrameMatcher,
  missFrameMatcher,
  framesMatcher,
  strikeBonusBallsMatcher,
  spareBonusBallMatcher,
  noBonusBallsMatcher,
} = require("./regex");

const { OpenFrame, Strike, Spare } = require("./Frame");
const Ball = require("./Ball");

const MAX_GAMESTRING_LENGTH = 32;

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

  static createBalls(parseFrames, parsedBonusBalls) {}

  // TODO: write tests
  static createFrames(parsedFrames) {
    const frames = [];
    let numberOfBalls = 0;

    parsedFrames.forEach((frame, frameIndex) => {
      const isOpenFrame = openFrameMatcher.test(frame);
      const isSpare = spareFrameMatcher.test(frame);
      const isStrike = strikeFrameMatcher.test(frame);
      const isDoubleMiss = missFrameMatcher.test(frame);

      if (isOpenFrame) {
        frames.push(
          new OpenFrame(frameIndex, [numberOfBalls++, numberOfBalls++])
        );
      } else if (isSpare) {
        frames.push(new Spare(frameIndex, [numberOfBalls++, numberOfBalls++]));
      } else if (isStrike) {
        frames.push(new Strike(frameIndex, [numberOfBalls++]));
      } else if (isDoubleMiss) {
        frames.push(
          new OpenFrame(frameIndex, [numberOfBalls++, numberOfBalls++])
        );
      } else {
        throw Error("Could not identify a frame!");
      }
    });

    return frames;
  }

  static parseFrames(gameString) {
    const isTooLong = (str) => str.length > MAX_GAMESTRING_LENGTH;

    if (isTooLong(gameString)) {
      throw RangeError("The game is too long!");
    }

    const getFrames = (str) => {
      const matched = str.match(framesMatcher);

      if (!matched) {
        throw RangeError("A game must have 10 frames!");
      }

      const [_, ...frames] = matched;

      return frames;
    };

    return getFrames(gameString);
  }

  static parseBonusBalls(gameString) {
    const isLastFrameOpen = gameString.match(noBonusBallsMatcher);
    const isLastFrameSpare = gameString.match(spareBonusBallMatcher);
    const isLastFrameStrike = gameString.match(strikeBonusBallsMatcher);

    if (isLastFrameOpen) {
      return [];
    } else if (isLastFrameSpare) {
      const [_, bonusBall] = isLastFrameSpare;

      return [bonusBall];
    } else if (isLastFrameStrike) {
      const [_, ...bonusBalls] = isLastFrameStrike;

      return bonusBalls;
    } else {
      throw RangeError("Then number of bonusballs must match the last frame!");
    }
  }
};
