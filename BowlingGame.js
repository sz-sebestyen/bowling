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

const MAX_GAMESTRING_LENGTH = 32;

module.exports = class BowlingGame {
  constructor(gameString) {
    this.gameString = gameString;
    this._balls = [];
    this._frames = BowlingGame.parseFrames(gameString);
    this._bonusBalls = BowlingGame.parseBonusBalls(gameString);
    this._score = 0;
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
    const [isLastFrameOpen] = gameString.match(noBonusBallsMatcher);
    const [isLastFrameSpare, bonusBall] = gameString.match(
      spareBonusBallMatcher
    );
    const [isLastFrameStrike, ...bonusBalls] = gameString.match(
      strikeBonusBallsMatcher
    );

    if (isLastFrameOpen) {
      return [];
    } else if (isLastFrameSpare) {
      return [bonusBall];
    } else if (isLastFrameStrike) {
      return bonusBalls;
    } else {
      throw RangeError("Then number of bonusballs must match the last frame!");
    }
  }

  getScore() {
    return this._score;
  }
};
