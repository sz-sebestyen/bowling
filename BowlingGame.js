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
    this._frames = BowlingGame._parseFrames(gameString);
    this._bonusBalls = [];
    this._score = 0;
  }

  static _parseFrames(gameString) {
    const isTooLong = (str) => str.length > MAX_GAMESTRING_LENGTH;

    if (isTooLong(gameString)) {
      throw RangeError("The game is too long!");
    }

    const getFrames = (str) => {
      const [matched, ...frames] = str.match(framesMatcher);

      if (!matched) {
        throw RangeError("A game must have 10 frames!");
      }

      return frames;
    };

    return getFrames(gameString);
  }

  getScore() {
    return this._score;
  }
};
