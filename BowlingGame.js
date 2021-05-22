const MAX_GAMESTRING_LENGTH = 32;
const MIN_GAMESTRING_LENGTH = 20;

module.exports = class BowlingGame {
  constructor(gameString) {
    this.gameString = gameString;
    this._frames = [];
    this._bonusBalls = [];
    this._score = 0;
  }

  static _parseFrames(gameString) {
    const isTooLong = (str) => str.length > MAX_GAMESTRING_LENGTH;
    const isTooShort = (str) => str.length < MIN_GAMESTRING_LENGTH;

    if (isTooLong(gameString)) {
      throw RangeError("Game is too long!");
    } else if (isTooShort(gameString)) {
      throw RangeError("Game is too short!");
    }

    return [];
  }

  getScore() {
    return this._score;
  }
};
